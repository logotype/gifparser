import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF global table color data from an ArrayBuffer (4 colors)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/colors4.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    describe('should parse a GIF Logical Screen Descriptor from an ArrayBuffer', () => {
        let gifParser = null;
        let gif = null;

        beforeEach(() => {
            gifParser = new GIFParser();
            return readFile(path.join(__dirname, '/../samples/colors4.gif'))
                .then((arrayBuffer) => {
                    gif = gifParser.parseFromArrayBuffer(arrayBuffer);
                });
        });

        it('should have a global color table value', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTable).toBe(1);
        });
        it('should not have global color table sorting', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableSorting).toBe(0);
        });
        it('should have global color table size', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableSize).toBe(4);
            expect(gif.logicalScreenDescriptorData.globalColorTableSizeDescription).toBe('4 colors (0b001, bit-size 1)');
        });
        it('should have global color table size in bytes', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableBytes).toBe(12);
        });
        it('should have color resolution', () => {
            expect(gif.logicalScreenDescriptorData.colorResolution).toBe(2);
            expect(gif.logicalScreenDescriptorData.colorResolutionDescription).toBe('2 bits/pixel (0b001, bit-size 1)');
        });
    });

    it('should have global table color data', () => {
        expect(gif.globalColorTableData).toEqual(expect.arrayContaining([
            { blue: 62, green: 50, hex: '#20323E', index: 0, red: 32 },
            { blue: 215, green: 177, hex: '#31B1D7', index: 1, red: 49 },
            { blue: 126, green: 226, hex: '#D3E27E', index: 2, red: 211 },
            { blue: 33, green: 161, hex: '#77A121', index: 3, red: 119 }
        ]));
    });

    it('should correct number of colors', () => {
        expect(gif.globalColorTableData.length).toEqual(4);
    });
});
