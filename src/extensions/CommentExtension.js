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

        let comment = '';

        this._addCounter(2);

        for(let i = 0; i < 16277216; i++) {
            if(this._peek() === 0x00) {
                break;
            } else {

                const byteRead = this._getUint8(0);
                comment += String.fromCharCode(byteRead);
            }
        }

        console.log(`     -> Data: ${comment}`);

        console.log('     -> Comment Extension is valid');
    }

}
