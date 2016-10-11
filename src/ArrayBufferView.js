export default class ArrayBufferView {

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
        console.log(`[Byte ${this.cursor.counter}]`);
        this.cursor.counter += additional;
        return this.cursor.counter++;
    }

    _getBit(byte, position) {
        return (byte >> position) & 1;
    }

    _getHex(component) {
        const hex = component.toString(16);
        return (hex.length === 1 ? `0${hex}` : `${hex}`).toUpperCase();
    }

    _getUint8(length = 0) {
        return this.dataView.getUint8(this._addCounter(length));
    }

    _getUint16(length = 0, littleEndian = true) {
        const result = this.dataView.getUint16(this.cursor.counter, littleEndian);
        this._addCounter(length);
        return result;
    }

    _getInt16(length = 0, littleEndian = true) {
        const result = this.dataView.getInt16(this.cursor.counter, littleEndian);
        this._addCounter(length);
        return result;
    }

    _getASCII(length = 1) {
        let ascii = '';
        for(let i = 0; i < length; i++) {
            ascii += String.fromCharCode(this._getUint8(0));
        }
        return ascii;
    }

    _peek(offset = 0) {
        return this.dataView.getUint8(this.cursor.counter + offset);
    }

    _validateBlock(...values) {
        return !values
            .map((value, index) => this._peek(index) === value)
            .some((valid) => valid === false);
    }

    _parse() {
        throw new Error('_parse has to be overridden!');
    }
}