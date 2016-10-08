import ArrayBufferView from './../ArrayBufferView';

export default class GraphicsControlExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        this._parse();
    }

    _validateBlock() {
        return this._peek() === 0x21 && this._peek(1) === 0xF9;
    }

    _parse() {
        if(!this._validateBlock()) {
            throw new Error('wrong Graphics Control Extension');
        }

        console.log('     -> VALID Graphics Control Extension');
    }

}
