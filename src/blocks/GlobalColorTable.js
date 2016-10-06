import ArrayBufferView from './../ArrayBufferView';

export default class GlobalColorTable extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView, byteLength) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        this.byteLength = byteLength;
        return this._parse();
    }

    _parse() {
        const colors = [];
        let colorIndex = 0;

        for(let i = this.cursor.counter; i < (this.cursor.counter + this.byteLength); i += 3) {
            const intR = this.dataView.getUint8(i),
                intG = this.dataView.getUint8(i + 1),
                intB = this.dataView.getUint8(i + 2),
                hex = `#${this._getHex(intR)}${this._getHex(intG)}${this._getHex(intB)}`;

            colors.push({ index: colorIndex, hex: hex, red: intR, green: intG, blue: intB });
            colorIndex++;
        }

        return colors;
    }

}
