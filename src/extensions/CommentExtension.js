import chalk from 'chalk';

import ArrayBufferView from './../ArrayBufferView';

export default class CommentExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {
        if(!this._validateBlock(0x21, 0xFE)) {
            console.log(chalk.red('>>>>>>>>>>>>>> ERROR IN Comment Extension'));
        }

        const extensionIntroducer = this._getUint8(0);
        console.log(`     -> Extension Introducer: 0x${extensionIntroducer.toString(16)}`);

        const applicationExtensionLabel = this._getUint8(0);
        console.log(`     -> Comment Extension Label: 0x${applicationExtensionLabel.toString(16)}`);

        const length = this._getUint8(0);
        console.log(`     -> Length: ${length} bytes`);

        let comment = '';
        for(let i = 0; i < length; i++) {
            comment += String.fromCharCode(this._getUint8(0));
        }
        console.log(`     -> Data: ${comment}`);

        const extensionTerminator = this._getUint8(0);
        console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

        if(extensionTerminator !== 0x00) {
            console.log(chalk.red('     -> Missing Comment Extension Block Terminator'));
        }
    }

}
