import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF global table color data from an ArrayBuffer (16 colors)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/colors16.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    describe('should parse a GIF Logical Screen Descriptor from an ArrayBuffer', () => {
        let gifParser = null;
        let gif = null;

        beforeEach(() => {
            gifParser = new GIFParser();
            return readFile(path.join(__dirname, '/../samples/colors16.gif'))
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
            expect(gif.logicalScreenDescriptorData.globalColorTableSize).toBe(16);
            expect(gif.logicalScreenDescriptorData.globalColorTableSizeDescription).toBe('16 colors (0b011, bit-size 3)');
        });
        it('should have global color table size in bytes', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableBytes).toBe(48);
        });
        it('should have color resolution', () => {
            expect(gif.logicalScreenDescriptorData.colorResolution).toBe(4);
            expect(gif.logicalScreenDescriptorData.colorResolutionDescription).toBe('4 bits/pixel (0b011, bit-size 3)');
        });
    });

    it('should have global table color data', () => {
        expect(gif.globalColorTableData).toEqual(expect.arrayContaining([
            { blue: 17, green: 227, hex: '#D7E311', index: 0, red: 215 },
            { blue: 38, green: 24, hex: '#0F1826', index: 1, red: 15 },
            { blue: 36, green: 149, hex: '#1C9524', index: 2, red: 28 },
            { blue: 92, green: 81, hex: '#1A515C', index: 3, red: 26 },
            { blue: 106, green: 98, hex: '#5C626A', index: 4, red: 92 },
            { blue: 103, green: 157, hex: '#5F9D67', index: 5, red: 95 },
            { blue: 155, green: 219, hex: '#53DB9B', index: 6, red: 83 },
            { blue: 74, green: 201, hex: '#8FC94A', index: 7, red: 143 },
            { blue: 68, green: 211, hex: '#39D344', index: 8, red: 57 },
            { blue: 64, green: 157, hex: '#379D40', index: 9, red: 55 },
            { blue: 56, green: 102, hex: '#396638', index: 10, red: 57 },
            { blue: 45, green: 191, hex: '#2CBF2D', index: 11, red: 44 },
            { blue: 127, green: 34, hex: '#2C227F', index: 12, red: 44 },
            { blue: 64, green: 131, hex: '#808340', index: 13, red: 128 },
            { blue: 114, green: 65, hex: '#414172', index: 14, red: 65 },
            { blue: 33, green: 97, hex: '#716121', index: 15, red: 113 }
        ]));
    });

    it('should correct number of colors', () => {
        expect(gif.globalColorTableData.length).toEqual(16);
    });
});
