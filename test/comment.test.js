import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF comment from an ArrayBuffer (file 1)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/comment.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    it('should have a comment', () => {
        const gifData = gif.data
            .filter((item) => item.name === 'EXTENSION_INTRODUCER');

        const filteredData = gifData
            .filter((item) => {
                let contains = false;
                item.data.forEach((subItem) => {
                    if(subItem.name === 'COMMENT_EXTENSION') {
                        contains = true;
                    }
                });
                return contains;
            });

        const result = filteredData[0].data[0].data;

        expect(result).toEqual({
            valid: true,
            extensionIntroducer: '0x21',
            extensionLabel: '0xfe (Comment Extension)',
            blockSize: 43,
            comment: 'This comment is hidden inside the CIA logo!'
        });
    });
});
