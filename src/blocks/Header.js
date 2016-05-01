const ArrayBufferView = require('./../ArrayBufferView');

class GraphicsControlExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {

        let signature,
            version,
            isValid,
            width,
            height;

        signature = String.fromCharCode(this._getUint8()) + String.fromCharCode(this._getUint8()) + String.fromCharCode(this._getUint8());
        version = String.fromCharCode(this._getUint8()) + String.fromCharCode(this._getUint8()) + String.fromCharCode(this._getUint8());

        isValid = (signature === 'GIF' && (version === '87a' || version === '89a'));

        width = this._getUint16(1, true);
        height = this._getUint16(1, true);

        return {
            valid: isValid,
            signature: signature,
            version: version,
            width: width,
            height: height
        }
    }

}

module.exports = GraphicsControlExtension;