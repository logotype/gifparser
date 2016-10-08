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

        // Skip 0x21, 0xFF
        this._addCounter(1);

        const length = this._getUint8(0);
        console.log(`     -> Length: ${length} bytes`);

        let comment = '';
        for(let i = 0; i < length; i++) {
            comment += String.fromCharCode(this._getUint8(0));
        }

        // if(this._peek(0) !== 0x00) {
        //     throw new Error('Missing Comment Extension Sub-Block Terminator');
        // }

        console.log(`     -> Data: ${comment}`);

        console.log('     -> VALID Comment Extension');
    }

}
