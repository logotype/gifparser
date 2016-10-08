import ArrayBufferView from './../ArrayBufferView';

export default class GraphicsControlExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        this._parse();
    }

    _validateBlock() {
        return this._peek(0) === 0x21 &&
            this._peek(1) === 0xFF &&
            this._peek(2) === 0x0B;
    }

    _parse() {
        if(!this._validateBlock()) {
            throw new Error('Wrong Application Extension');
        }

        const extensionLabel = this._getUint8(0);
        console.log(`     -> Extension Label: 0x${extensionLabel.toString(16)}`);

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

        if(this._peek(0) !== 0x00) {
            throw new Error('Missing Application Extension Terminator');
        }
    }

}
