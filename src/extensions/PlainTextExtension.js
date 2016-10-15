import chalk from 'chalk';

import BaseExtension from './BaseExtension';

export default class PlainTextExtension extends BaseExtension {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {
        if(!this._validateBlock(0x21, 0x01)) {
            console.log(chalk.red('>>>>>>>>>>>>>> ERROR IN Plain Text Extension'));
        }

        console.log(`     -> Extension Introducer: 0x${this.extensionIntroducer.toString(16)}`);
        console.log(`     -> Extension Label: 0x${this.extensionLabel.toString(16)} (Plain Text Extension)`);

        const blockSize = this._getUint8(0);
        console.log(`     -> Block Size: ${blockSize} bytes`);

        const textGridLeftPos = this._getUint16(1, true);
        console.log(`     -> Text Grid Left Position: ${textGridLeftPos}`);

        const textGridTopPos = this._getUint16(1, true);
        console.log(`     -> Text Grid Top Position: ${textGridTopPos}`);

        const textGridWidth = this._getUint16(1, true);
        console.log(`     -> Text Grid Width: ${textGridWidth}`);

        const textGridHeight = this._getUint16(1, true);
        console.log(`     -> Text Grid Height: ${textGridHeight}`);

        const characterCellWidth = this._getUint8(0);
        console.log(`     -> Character Cell Width: ${characterCellWidth}`);

        const characterCellHeight = this._getUint8(0);
        console.log(`     -> Character Cell Height: ${characterCellHeight}`);

        const textForegroundIndex = this._getUint8(0);
        console.log(`     -> Text Foreground Color Index: ${textForegroundIndex}`);

        const textBackgroundIndex = this._getUint8(0);
        console.log(`     -> Text Background Color Index: ${textBackgroundIndex}`);

        let plainText = '';
        for(let i = 0; i < blockSize; i++) {
            plainText += String.fromCharCode(this._getUint8(0));
        }
        console.log(`     -> Data: ${plainText}`);

        const extensionTerminator = this._getUint8(0);
        console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

        if(extensionTerminator !== 0x00) {
            console.log(chalk.red('     -> Missing Plain Text Extension Block Terminator'));
        }
    }

}
