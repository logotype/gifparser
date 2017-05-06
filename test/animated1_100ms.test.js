import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF animation from an ArrayBuffer (100ms)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/animated1_100ms.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    it('should have a Graphic Control Extension', () => {
        const gifData = gif.data
            .filter((item) => item.name === 'EXTENSION_INTRODUCER');

        const filteredData = gifData
            .filter((item) => {
                let contains = false;
                item.data.forEach((subItem) => {
                    if(subItem.name === 'GRAPHIC_CONTROL_EXTENSION') {
                        contains = true;
                    }
                });
                return contains;
            });

        const result = filteredData[0].data[0].data;

        expect(result).toEqual({
            valid: true,
            extensionIntroducer: '0x21',
            extensionLabel: '0xf9 (Graphic Control Extension)',
            blockSize: 4,
            reserved3: 0,
            reserved2: 0,
            reserved1: 0,
            disposalMethod3: 0,
            disposalMethod2: 0,
            disposalMethod1: 1,
            userInputFlag: 0,
            transparentColor: 1,
            delayTime: 10,
            delayTimePerFrameMs: 100,
            transparentColorIndex: 15
        });
    });

});