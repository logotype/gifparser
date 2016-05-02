import ArrayBufferView from './../ArrayBufferView';

const DEBUG_BITS = true;

class LogicalScreenDescriptor extends ArrayBufferView {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {
        const byteRead = this.dataView.getUint16(this.cursor.counter, true),
            bitArray = new Uint8Array(8);

        bitArray[0] = this._getBit(byteRead, 0);
        bitArray[1] = this._getBit(byteRead, 1);
        bitArray[2] = this._getBit(byteRead, 2);
        bitArray[3] = this._getBit(byteRead, 3);
        bitArray[4] = this._getBit(byteRead, 4);
        bitArray[5] = this._getBit(byteRead, 5);
        bitArray[6] = this._getBit(byteRead, 6);
        bitArray[7] = this._getBit(byteRead, 7);

        if(DEBUG_BITS) {
            console.log(`${bitArray[0]} size of global color table`);
            console.log(`${bitArray[1]} size of global color table`);
            console.log(`${bitArray[2]} size of global color table`);
            console.log(`${bitArray[3]} sort flag`);
            console.log(`${bitArray[4]} color resolution`);
            console.log(`${bitArray[5]} color resolution`);
            console.log(`${bitArray[6]} color resolution`);
            console.log(`${bitArray[7]} global color table flag`);
        }

        const globalColorTableSizeBits = (bitArray[0] ? 1 : 0 ) + (bitArray[1] ? 2 : 0 ) + (bitArray[2] ? 4 : 0 );
        const globalColorTableSize = Math.pow(2, globalColorTableSizeBits + 1);
        const globalColorTableBytes = 3 * globalColorTableSize;

        const colorResolutionBits = (bitArray[4] ? 1 : 0 ) + (bitArray[5] ? 2 : 0 ) + (bitArray[6] ? 4 : 0 );
        const bitsPerPixel = Math.pow(2, colorResolutionBits + 1);

        return {
            globalColorTable: bitArray[7] ? true : false,
            globalColorTableSorting: bitArray[3] ? true : false,
            globalColorTableSize: `${globalColorTableSize} colors (0b${bitArray[2]}${bitArray[1]}${bitArray[0]}, bit-size ${globalColorTableSizeBits})`,
            globalColorTableBytes: globalColorTableBytes,
            colorResolution: `${bitsPerPixel} bits/pixel (0b${bitArray[6]}${bitArray[5]}${bitArray[4]}, bit-size ${colorResolutionBits})`
        };
    }

}

module.exports = LogicalScreenDescriptor;