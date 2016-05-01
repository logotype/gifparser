class BinaryUtils {

    constructor() {
        this.cursor = {
            counter: 0
        };
        this.arrayBuffer = null;
    }

    parseFromArrayBuffer(arrayBuffer) {
        this.arrayBuffer = arrayBuffer;
        this.dataView = new DataView(this.arrayBuffer);
        this._parse();
    }

    _addCounter(additional = 0) {
        this.cursor.counter += additional;
        return this.cursor.counter++;
    }

    _getBit(byte, position) {
        return (byte >> position) & 1;
    }

    _getHex(component) {
        let hex = component.toString(16);
        return (hex.length === 1 ? `0${hex}` : `${hex}`).toUpperCase();
    }

    _getUint8(length = 0) {
        return this.dataView.getUint8(this._addCounter(length));
    }

    _getUint16(length = 0, littleEndian = true) {
        let result = this.dataView.getUint16(this.cursor.counter, littleEndian);
        this._addCounter(length);
        return result;
    }

    _peek(offset = 0) {
        return this.dataView.getUint8(this.cursor.counter + offset);
    }

    _parse() {
        throw new Error('_parse has to be overridden!');
    }
}

module.exports = BinaryUtils;