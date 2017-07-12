// import chalk from 'chalk';

import BaseExtension from './BaseExtension';

export default class CommentExtension extends BaseExtension {

    parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
        this.arrayBuffer = arrayBuffer;
        this.cursor = cursor;
        this.dataView = dataView;
        return this._parse();
    }

    _parse() {
        const data = {
            valid: true
        };

        if(!this._validateBlock(0x21, 0xFE)) {
            data.valid = false;
            //console.log(chalk.red('>>>>>>>>>>>>>> ERROR IN Comment Extension'));
        }

        //console.log(`     -> Extension Introducer: 0x${this.extensionIntroducer.toString(16)}`);
        data.extensionIntroducer = `0x${this.extensionIntroducer.toString(16)}`;
        //console.log(`     -> Extension Label: 0x${this.extensionLabel.toString(16)} (Comment Extension)`);
        data.extensionLabel = `0x${this.extensionLabel.toString(16)} (Comment Extension)`;

        const blockSize = this._getUint8(0);
        //console.log(`     -> Block Size: ${blockSize} bytes`);
        data.blockSize = blockSize;

        let comment = '';
        for(let i = 0; i < blockSize; i++) {
            comment += String.fromCharCode(this._getUint8(0));
        }
        //console.log(`     -> Data: ${comment}`);
        data.comment = comment;

        const extensionTerminator = this._getUint8(0);
        //console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

        if(extensionTerminator !== 0x00) {
            //console.log(chalk.red('     -> Missing Comment Extension Block Terminator'));
        }

        return data;
    }

}
