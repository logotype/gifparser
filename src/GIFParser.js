const ASCII = `string`;
const UINT8 = `Uint8`;
const UINT16LE = `Uint16LE`;
const LSD = `LOGICAL_SCREEN_DESCRIPTOR`;
const COLOR_TABLE = `ColorTable`;
const DEBUG_BITS = false;

class GIFParser {

    constructor() {
        this.cursor = 0;
        this.arrayBuffer = null;
        this.colorTable = [];
    }

    static getBit(byte, position) {
        return (byte >> position) & 1;
    }

    static getHex(component) {
        let hex = component.toString(16);
        return (hex.length === 1 ? `0${hex}` : `${hex}`).toUpperCase();
    }

    parseFromArrayBuffer(arrayBuffer) {
        this.arrayBuffer = arrayBuffer;
        this.dataView = new DataView(this.arrayBuffer);
        this._parse();
    }

    peek(offset = 0) {
        return this.dataView.getUint8(this.cursor + offset);
    }

    parseGraphicsControlExtension() {
        //
    }

    parseHeader(length, type) {
        let result = null;

        switch(type) {
            case ASCII:
                let characterArray = [];
                for(let i = this.cursor; i < (this.cursor + length); i++) {
                    characterArray.push(String.fromCharCode(this.dataView.getUint8(i)));
                }
                result = characterArray.join(``);
                break;

            case UINT8:
                result = this.dataView.getUint8(this.cursor);
                break;

            case UINT16LE:
                result = this.dataView.getUint16(this.cursor, true); // Little-endian
                break;

            case LSD: {
                let byteRead = this.dataView.getUint16(this.cursor, true);

                let bitArray = new Uint8Array(8);

                bitArray[0] = GIFParser.getBit(byteRead, 0);
                bitArray[1] = GIFParser.getBit(byteRead, 1);
                bitArray[2] = GIFParser.getBit(byteRead, 2);
                bitArray[3] = GIFParser.getBit(byteRead, 3);
                bitArray[4] = GIFParser.getBit(byteRead, 4);
                bitArray[5] = GIFParser.getBit(byteRead, 5);
                bitArray[6] = GIFParser.getBit(byteRead, 6);
                bitArray[7] = GIFParser.getBit(byteRead, 7);

                if(DEBUG_BITS) {
                    console.log(bitArray[0] + ` size of global color table`);
                    console.log(bitArray[1] + ` size of global color table`);
                    console.log(bitArray[2] + ` size of global color table`);
                    console.log(bitArray[3] + ` sort flag`);
                    console.log(bitArray[4] + ` color resolution`);
                    console.log(bitArray[5] + ` color resolution`);
                    console.log(bitArray[6] + ` color resolution`);
                    console.log(bitArray[7] + ` global color table flag`);
                }

                let globalColorTableSizeBits = (bitArray[0] ? 1 : 0 ) + (bitArray[1] ? 2 : 0 ) + (bitArray[2] ? 4 : 0 );
                let globalColorTableSize = Math.pow(2, globalColorTableSizeBits + 1);
                let globalColorTableBytes = 3 * globalColorTableSize;

                let colorResolutionBits = (bitArray[4] ? 1 : 0 ) + (bitArray[5] ? 2 : 0 ) + (bitArray[6] ? 4 : 0 );
                let bitsPerPixel = Math.pow(2, colorResolutionBits + 1);

                result = {
                    globalColorTable: bitArray[7] ? true : false,
                    globalColorTableSorting: bitArray[3] ? `Yes` : `Not ordered`,
                    globalColorTableSize: `${globalColorTableSize} colors (0b${bitArray[2]}${bitArray[1]}${bitArray[0]}, bit-size ${globalColorTableSizeBits})`,
                    globalColorTableBytes: globalColorTableBytes,
                    colorResolution: `${bitsPerPixel} bits/pixel (0b${bitArray[6]}${bitArray[5]}${bitArray[4]}, bit-size ${colorResolutionBits})`
                };
                break;
            }

            case COLOR_TABLE: {

                let colors = [];

                for(let i = this.cursor; i < (this.cursor + length); i += 3) {
                    let intR = this.dataView.getUint8(i),
                        intG = this.dataView.getUint8(i + 1),
                        intB = this.dataView.getUint8(i + 2),
                        hex = `#${GIFParser.getHex(intR)}${GIFParser.getHex(intG)}${GIFParser.getHex(intB)}`;

                    colors.push({ hex: hex, red: intR, green: intG, blue: intB });
                }
                result = colors;

                break;
            }

            default:
                break;
        }
        this.cursor += length;
        return result;
    }

    _parse() {
        let logicalScreenDescriptor,
            graphicsControlExtension;
        console.log(`signature: ${this.parseHeader(3, ASCII)}`);
        console.log(`version: ${this.parseHeader(3, ASCII)}`);
        console.log(`width: ${this.parseHeader(2, UINT16LE)} pixels`);
        console.log(`height: ${this.parseHeader(2, UINT16LE)} pixels`);
        logicalScreenDescriptor = this.parseHeader(1, LSD);
        console.log(`logical screen descriptor: `, logicalScreenDescriptor);
        console.log(`bkg color index: ${this.parseHeader(1, UINT8)}`);
        console.log(`aspect ratio: ${this.parseHeader(1, UINT8)}`);
        if(logicalScreenDescriptor.globalColorTable) {
            this.colorTable = this.parseHeader(logicalScreenDescriptor.globalColorTableBytes, COLOR_TABLE);
            console.log(`color table: `, this.colorTable);
        }

        while (this.cursor < this.dataView.byteLength) {

            switch(this.peek()) {
                case 0x21: {
                    console.log('0x21 Ext');

                    switch(this.peek(1)) {
                        case 0xF9: {
                            console.log('     0xf9 Graphics Control Extension');
                            graphicsControlExtension = this.parseGraphicsControlExtension();
                            break;
                        }

                        case 0x01: {
                            console.log('     0x01 Plain Text Extension');
                            break;
                        }

                        case 0xFF: {
                            console.log('     0x01 Application Extension');
                            break;
                        }

                        case 0xFE: {
                            console.log('     0x01 Comment Extension');
                            break;
                        }

                        default: {
                            console.log('     0x', this.peek(1).toString(16));
                            break;
                        }
                    }

                    break;
                }

                default: {
                    // console.log('NO DATA FOUND');
                    break;
                }
            }



            this.cursor++;
        }


        console.log(`-----------------------------------------------`);
    }
}

module.exports = GIFParser;