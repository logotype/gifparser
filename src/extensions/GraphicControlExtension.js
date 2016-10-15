import chalk from 'chalk';

import BaseExtension from './BaseExtension';

const DEBUG_BITS = true;

export default class GraphicControlExtension extends BaseExtension {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {
        if(!this._validateBlock(0x21, 0xF9, 4)) {
            console.log(chalk.red('     -> Graphic Control Extension validation failed (block size should be 4)'));
        }

        console.log(`     -> Extension Introducer: 0x${this.extensionIntroducer.toString(16)}`);
        console.log(`     -> Extension Label: 0x${this.extensionLabel.toString(16)} (Graphic Control Extension)`);

        const byteSize = this._getUint8(0);
        console.log(`     -> Block Size: ${byteSize}`);

        const byteRead = this._getInt16(0, true),
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
            console.log(`          -> Bit Field: ${bitArray[7]} reserved for future use`);
            console.log(`          -> Bit Field: ${bitArray[6]} reserved for future use`);
            console.log(`          -> Bit Field: ${bitArray[5]} reserved for future use`);
            console.log(`          -> Bit Field: ${bitArray[4]} disposal method`);
            console.log(`          -> Bit Field: ${bitArray[3]} disposal method`);
            console.log(`          -> Bit Field: ${bitArray[2]} disposal method`);
            console.log(`          -> Bit Field: ${bitArray[1]} user input flag`);
            console.log(`          -> Bit Field: ${bitArray[0]} transparent color flag`);
        }

        const delayTime = this._getUint8(0);
        console.log(`     -> Delay Time: ${delayTime} hundredths of a second (${delayTime * 10} ms per frame)`);

        this._addCounter(0);

        const transparentColorIndex = this._getUint8(0);
        console.log(`     -> Transparent Color Index: ${transparentColorIndex}`);

        const extensionTerminator = this._getUint8(0);
        console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

        if(extensionTerminator !== 0x00) {
            console.log(chalk.red('     -> Missing Graphic Control Extension Block Terminator'));
        }
    }
}
