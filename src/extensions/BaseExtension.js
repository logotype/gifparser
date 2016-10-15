import ArrayBufferView from './../ArrayBufferView';

export default class BaseExtension extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;

        this.extensionIntroducer = null;
        this.extensionLabel = null;

        return this._parse();
    }

    _validateBlock(...values) {
        const isValid = super._validateBlock(values);
        if(isValid) {
            this.extensionIntroducer = this._getUint8(0);
            this.extensionLabel = this._getUint8(0);
        }
        return isValid;
    }

}
