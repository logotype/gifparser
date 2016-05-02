import ArrayBufferView from './../ArrayBufferView';

class GraphicsControlExtension extends ArrayBufferView {

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
            throw new Error('wrong GCE');
        }

        console.log('     -> GCE is valid');
    }

}

module.exports = GraphicsControlExtension;