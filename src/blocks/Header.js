import ArrayBufferView from './../ArrayBufferView';

export default class GraphicControlExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {
        const signature = this._getASCII(3),
            version = this._getASCII(3);

        let isValid = null,
            width = null,
            height = null;

        isValid = (signature === 'GIF' && (version === '87a' || version === '89a'));

        width = this._getUint16(1, true);
        height = this._getUint16(1, true);

        return {
            valid: isValid,
            signature: signature,
            version: version,
            width: width,
            height: height
        };
    }

}
