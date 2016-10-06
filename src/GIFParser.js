import ArrayBufferView from './ArrayBufferView';
import Header from './blocks/Header';
import LogicalScreenDescriptor from './blocks/LogicalScreenDescriptor';
import GlobalColorTable from './blocks/GlobalColorTable';
import GraphicsControlExtension from './extensions/GraphicsControlExtension';
import CommentExtension from './extensions/CommentExtension';

export default class GIFParser extends ArrayBufferView {

    constructor() {
        super();
        this.colorTable = [];
        this.header = new Header();
        this.graphicsControlExtension = new GraphicsControlExtension();
        this.commentExtension = new CommentExtension();
        this.logicalScreenDescriptor = new LogicalScreenDescriptor();
        this.globalColorTable = new GlobalColorTable();
    }

    _parse() {
        const headerData = this.header.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
        const logicalScreenDescriptorData = this.logicalScreenDescriptor.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
        const backgroundColorIndex = this._getUint8(1);
        const aspectRatio = this._getUint8(0);
        let globalColorTableData = null;

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
                            console.log('     0xF9 Graphics Control Extension');
                            this.graphicsControlExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                            break;
                        }

                        case 0x01: {
                            console.log('     0x01 Plain Text Extension');
                            break;
                        }

                        case 0xFF: {
                            console.log('     0xFF Application Extension');
                            break;
                        }

                        case 0xFE: {
                            console.log('     0xFE Comment Extension');
                            this.commentExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                            break;
                        }

                        default: {
                            console.log('     0x', this._peek(1).toString(16));
                            break;
                        }
                    }

                    break;
                }

                case 0x3B: {
                    console.log('0x3B Trailer');

                    break;
                }

                default: {
                    break;
                }
            }

            this._addCounter();
        }


        console.log('-----------------------------------------------');
    }
}
