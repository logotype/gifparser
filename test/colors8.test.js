import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF global table color data from an ArrayBuffer (8 colors)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/colors8.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    describe('should parse a GIF Logical Screen Descriptor from an ArrayBuffer', () => {
        let gifParser = null;
        let gif = null;

        beforeEach(() => {
            gifParser = new GIFParser();
            return readFile(path.join(__dirname, '/../samples/colors8.gif'))
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
            expect(gif.logicalScreenDescriptorData.globalColorTableSize).toBe(8);
            expect(gif.logicalScreenDescriptorData.globalColorTableSizeDescription).toBe('8 colors (0b010, bit-size 2)');
        });
        it('should have global color table size in bytes', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableBytes).toBe(24);
        });
        it('should have color resolution', () => {
            expect(gif.logicalScreenDescriptorData.colorResolution).toBe(3);
            expect(gif.logicalScreenDescriptorData.colorResolutionDescription).toBe('3 bits/pixel (0b010, bit-size 2)');
        });
    });

    it('should have global table color data', () => {
        expect(gif.globalColorTableData).toEqual(expect.arrayContaining([
            { blue: 216, green: 191, hex: '#33BFD8', index: 0, red: 51 },
            { blue: 19, green: 226, hex: '#D5E213', index: 1, red: 213 },
            { blue: 35, green: 25, hex: '#111923', index: 2, red: 17 },
            { blue: 108, green: 107, hex: '#186B6C', index: 3, red: 24 },
            { blue: 138, green: 118, hex: '#6D768A', index: 4, red: 109 },
            { blue: 68, green: 192, hex: '#7DC044', index: 5, red: 125 },
            { blue: 55, green: 102, hex: '#3D6637', index: 6, red: 61 },
            { blue: 33, green: 51, hex: '#353321', index: 7, red: 53 }
        ]));
    });

    it('should correct number of colors', () => {
        expect(gif.globalColorTableData.length).toEqual(8);
    });
});
