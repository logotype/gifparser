import ArrayBufferView from './../ArrayBufferView';

export default class CommentExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        this._parse();
    }

    _validateBlock() {
        return this._peek() === 0x21 && this._peek(1) === 0xFE;
    }

    _parse() {
        if(!this._validateBlock()) {
            throw new Error('wrong Comment Extension');
        }

        const extensionLabel = this._getUint8(0);
        console.log(`     -> Extension Label: 0x${extensionLabel.toString(16)}`);

        const applicationExtensionLabel = this._getUint8(0);
        console.log(`     -> Comment Extension Label: 0x${applicationExtensionLabel.toString(16)}`);

        const length = this._getUint8(0);
        console.log(`     -> Length: ${length} bytes`);

        let comment = '';
        for(let i = 0; i < length; i++) {
            comment += String.fromCharCode(this._getUint8(0));
        }

        if(this._peek(0) !== 0x00) {
            throw new Error('Missing Comment Extension Sub-Block Terminator');
        }

        console.log(`     -> Data: ${comment}`);
    }

}
