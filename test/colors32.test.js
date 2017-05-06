import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF global table color data from an ArrayBuffer (32 colors)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/colors32.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    describe('should parse a GIF Logical Screen Descriptor from an ArrayBuffer', () => {
        let gifParser = null;
        let gif = null;

        beforeEach(() => {
            gifParser = new GIFParser();
            return readFile(path.join(__dirname, '/../samples/colors32.gif'))
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
            expect(gif.logicalScreenDescriptorData.globalColorTableSize).toBe(32);
            expect(gif.logicalScreenDescriptorData.globalColorTableSizeDescription).toBe('32 colors (0b100, bit-size 4)');
        });
        it('should have global color table size in bytes', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableBytes).toBe(96);
        });
        it('should have color resolution', () => {
            expect(gif.logicalScreenDescriptorData.colorResolution).toBe(5);
            expect(gif.logicalScreenDescriptorData.colorResolutionDescription).toBe('5 bits/pixel (0b100, bit-size 4)');
        });
    });

    it('should have global table color data', () => {
        expect(gif.globalColorTableData).toEqual(expect.arrayContaining([
            { blue: 40, green: 238, hex: '#E7EE28', index: 0, red: 231 },
            { blue: 39, green: 153, hex: '#1E9927', index: 1, red: 30 },
            { blue: 92, green: 95, hex: '#1C5F5C', index: 2, red: 28 },
            { blue: 104, green: 98, hex: '#5C6268', index: 3, red: 92 },
            { blue: 99, green: 155, hex: '#5C9B63', index: 4, red: 92 },
            { blue: 159, green: 218, hex: '#50DA9F', index: 5, red: 80 },
            { blue: 169, green: 169, hex: '#9AA9A9', index: 6, red: 154 },
            { blue: 9, green: 221, hex: '#9BDD09', index: 7, red: 155 },
            { blue: 135, green: 14, hex: '#050E87', index: 8, red: 5 },
            { blue: 73, green: 208, hex: '#76D049', index: 9, red: 118 },
            { blue: 16, green: 210, hex: '#38D210', index: 10, red: 56 },
            { blue: 67, green: 45, hex: '#072D43', index: 11, red: 7 },
            { blue: 46, green: 161, hex: '#36A12E', index: 12, red: 54 },
            { blue: 64, green: 55, hex: '#2B3740', index: 13, red: 43 },
            { blue: 57, green: 106, hex: '#376A39', index: 14, red: 55 },
            { blue: 201, green: 194, hex: '#2CC2C9', index: 15, red: 44 },
            { blue: 35, green: 220, hex: '#C4DC23', index: 16, red: 196 },
            { blue: 21, green: 25, hex: '#2D1915', index: 17, red: 45 },
            { blue: 30, green: 16, hex: '#21101E', index: 18, red: 33 },
            { blue: 82, green: 57, hex: '#153952', index: 19, red: 21 },
            { blue: 117, green: 29, hex: '#2E1D75', index: 20, red: 46 },
            { blue: 73, green: 116, hex: '#7D7449', index: 21, red: 125 },
            { blue: 37, green: 63, hex: '#4D3F25', index: 22, red: 77 },
            { blue: 127, green: 16, hex: '#13107F', index: 23, red: 19 },
            { blue: 27, green: 91, hex: '#685B1B', index: 24, red: 104 },
            { blue: 138, green: 39, hex: '#1F278A', index: 25, red: 31 },
            { blue: 66, green: 129, hex: '#858142', index: 26, red: 133 },
            { blue: 185, green: 86, hex: '#4256B9', index: 27, red: 66 },
            { blue: 59, green: 188, hex: '#B5BC3B', index: 28, red: 181 },
            { blue: 128, green: 57, hex: '#3B3980', index: 29, red: 59 },
            { blue: 199, green: 144, hex: '#7C90C7', index: 30, red: 124 },
            { blue: 33, green: 203, hex: '#C5CB21', index: 31, red: 197 }
        ]));
    });

    it('should correct number of colors', () => {
        expect(gif.globalColorTableData.length).toEqual(32);
    });
});
