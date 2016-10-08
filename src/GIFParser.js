import ArrayBufferView from './ArrayBufferView';
import Header from './blocks/Header';

import ApplicationExtension from './extensions/ApplicationExtension';
import CommentExtension from './extensions/CommentExtension';
import GlobalColorTable from './blocks/GlobalColorTable';
import GraphicsControlExtension from './extensions/GraphicsControlExtension';
import LogicalScreenDescriptor from './blocks/LogicalScreenDescriptor';

export default class GIFParser extends ArrayBufferView {

    static EXTENSION_INTRODUCER = 0x21;
    static IMAGE_DESCRIPTOR = 0x2C;
    static TRAILER = 0x3B;

    static GRAPHIC_CONTROL_EXTENSION = 0xF9;
    static APPLICATION_EXTENSION = 0xFF;
    static COMMENT_EXTENSION = 0xFE;
    static PLAINTEXT_EXTENSION = 0x01;
    static BLOCK_TERMINATOR = 0x00;

    constructor() {
        super();
        this.colorTable = [];
        this.header = new Header();
        this.applicationExtension = new ApplicationExtension();
        this.graphicsControlExtension = new GraphicsControlExtension();
        this.commentExtension = new CommentExtension();
        this.logicalScreenDescriptor = new LogicalScreenDescriptor();
        this.globalColorTable = new GlobalColorTable();
    }

    _parse() {
        const headerData = this.header.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
        console.log(`signature: ${headerData.signature}`);
        console.log(`version: ${headerData.version}`);
        console.log(`width: ${headerData.width} pixels`);
        console.log(`height: ${headerData.height} pixels`);

        const logicalScreenDescriptorData = this.logicalScreenDescriptor.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
        console.log('logical screen descriptor: ', logicalScreenDescriptorData);

        const backgroundColorIndex = this._getUint8(1);
        console.log(`bkg color index: ${backgroundColorIndex}`);

        const aspectRatio = this._getUint8(0);
        console.log(`aspect ratio: ${aspectRatio}`);

        let globalColorTableData = null;

        if(logicalScreenDescriptorData.globalColorTable) {
            globalColorTableData = this.globalColorTable.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView, logicalScreenDescriptorData.globalColorTableBytes);
            console.log('color table: ', globalColorTableData);
        }

        while (this.cursor.counter < this.dataView.byteLength) {

            switch(this._peek()) {

                case GIFParser.EXTENSION_INTRODUCER: {
                    console.log('0x21 Extension Block');

                    switch(this._peek(1)) {
                        case GIFParser.GRAPHIC_CONTROL_EXTENSION: {
                            console.log('     0xF9 Graphics Control Extension');
                            this.graphicsControlExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                            break;
                        }

                        case GIFParser.PLAINTEXT_EXTENSION: {
                            console.log('     0x01 Plain Text Extension');
                            break;
                        }

                        case GIFParser.APPLICATION_EXTENSION: {
                            console.log('     0xFF Application Extension');
                            this.applicationExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                            break;
                        }

                        case GIFParser.COMMENT_EXTENSION: {
                            console.log('     0xFE Comment Extension');
                            this.commentExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                            break;
                        }

                        default: {
                            // console.log('     0x', this._peek(1).toString(16));
                            break;
                        }
                    }

                    break;
                }

                // case GIFParser.BLOCK_TERMINATOR: {
                //     console.log('0x00 Block Terminator');
                //     break;
                //}

                case GIFParser.TRAILER: {
                    // console.log('0x3B Trailer');

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
