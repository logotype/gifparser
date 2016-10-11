import chalk from 'chalk';

import ArrayBufferView from './../ArrayBufferView';

export default class GraphicControlExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {
        if(!this._validateBlock(0x21, 0xFF, 0x0B)) {
            console.log(chalk.red('     -> Application Extension validation failed (block size should be 11)'));
        }

        const extensionIntroducer = this._getUint8(0);
        console.log(`     -> Extension Introducer: 0x${extensionIntroducer.toString(16)}`);

        const applicationExtensionLabel = this._getUint8(0);
        console.log(`     -> Application Extension Label: 0x${applicationExtensionLabel.toString(16)}`);

        const blockSize = this._getUint8(0);
        console.log(`     -> Block Size: ${blockSize} bytes`);

        const application = this._getASCII(8);
        console.log(`     -> Application Identifier (8 bytes): ${application}`);

        const version = this._getASCII(3);
        console.log(`     -> Application Authentication Code (3 bytes): ${version}`);

        const subBlockDataSize = this._getUint8(0);
        console.log(`          -> Sub-block Data Size: ${subBlockDataSize}`);

        if(application === 'NETSCAPE' && version === '2.0') {
            const subBlockID = this._getUint8(0);
            console.log(`          -> Sub-block ID: ${subBlockID}`);

            const loops = this._getUint8(1);
            console.log(`          -> Loop Count (2 bytes): ${loops}`);
        } else if(application === 'XMP Data' && version === 'XMP') {
            let data = '';
            for(let i = 0; i < subBlockDataSize; i++) {
                if(this._peek(0) === 0x00) {
                    break;
                }

                data += String.fromCharCode(this._getUint8(0));
            }

            console.log(`          -> XMP Data: ${data}`);
        } else {
            let data = '';
            for(let i = 0; i < subBlockDataSize; i++) {
                if(this._peek(0) === 0x00) {
                    break;
                }

                data += String.fromCharCode(this._getUint8(0));
            }

            console.log(`          -> Data: ${data}`);
        }

        const extensionTerminator = this._getUint8(0);
        console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

        if(extensionTerminator !== 0x00) {
            console.log(chalk.red('     -> Missing Application Extension Block Terminator'));
        }
    }

}
