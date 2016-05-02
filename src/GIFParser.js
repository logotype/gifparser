const ArrayBufferView = require('./ArrayBufferView');
const Header = require('./blocks/Header');
const LogicalScreenDescriptor = require('./blocks/LogicalScreenDescriptor');
const GlobalColorTable = require('./blocks/GlobalColorTable');

const GraphicsControlExtension = require('./extensions/GraphicsControlExtension');

class GIFParser extends ArrayBufferView {

    constructor() {
        super();
        this.colorTable = [];
        this.header = new Header();
        this.graphicsControlExtension = new GraphicsControlExtension();
        this.logicalScreenDescriptor = new LogicalScreenDescriptor();
        this.globalColorTable = new GlobalColorTable();
    }

    _parse() {
        let headerData = null,
            logicalScreenDescriptorData = null,
            globalColorTableData = null,
            backgroundColorIndex = null,
            aspectRatio = null;

        headerData = this.header.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
        logicalScreenDescriptorData = this.logicalScreenDescriptor.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
        backgroundColorIndex = this._getUint8(1);
        aspectRatio = this._getUint8(0);

        if(logicalScreenDescriptorData.globalColorTable) {
            globalColorTableData = this.globalColorTable.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView, logicalScreenDescriptorData.globalColorTableBytes);
        }

        console.log(`signature: ${headerData.signature}`);
        console.log(`version: ${headerData.version}`);
        console.log(`width: ${headerData.width} pixels`);
        console.log(`height: ${headerData.height} pixels`);
        console.log('logical screen descriptor: ', logicalScreenDescriptorData);
        console.log(`bkg color index: ${backgroundColorIndex}`);
        console.log(`aspect ratio: ${aspectRatio}`);
        console.log('color table: ', globalColorTableData);

        while (this.cursor.counter < this.dataView.byteLength) {

            switch(this._peek()) {

                case 0x21: {
                    console.log('0x21 Extension Block');

                    switch(this._peek(1)) {
                        case 0xF9: {
                            console.log('     0xf9 Graphics Control Extension');
                            this.graphicsControlExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
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
                            // console.log('     0x', this._peek(1).toString(16));
                            break;
                        }
                    }

                    break;
                }

                case 0x3b: {
                    console.log('0x3b Trailer');

                    break;
                }

                default: {
                    // console.log('NO DATA FOUND');
                    break;
                }
            }

            this._addCounter(1);
        }


        console.log(`-----------------------------------------------`);
    }
}

module.exports = GIFParser;