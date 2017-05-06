import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF global table color data from an ArrayBuffer (64 colors)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/colors64.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    describe('should parse a GIF Logical Screen Descriptor from an ArrayBuffer', () => {
        let gifParser = null;
        let gif = null;

        beforeEach(() => {
            gifParser = new GIFParser();
            return readFile(path.join(__dirname, '/../samples/colors64.gif'))
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
            expect(gif.logicalScreenDescriptorData.globalColorTableSize).toBe(64);
            expect(gif.logicalScreenDescriptorData.globalColorTableSizeDescription).toBe('64 colors (0b101, bit-size 5)');
        });
        it('should have global color table size in bytes', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableBytes).toBe(192);
        });
        it('should have color resolution', () => {
            expect(gif.logicalScreenDescriptorData.colorResolution).toBe(6);
            expect(gif.logicalScreenDescriptorData.colorResolutionDescription).toBe('6 bits/pixel (0b101, bit-size 5)');
        });
    });

    it('should have global table color data', () => {
        expect(gif.globalColorTableData).toEqual(expect.arrayContaining([
            { blue: 159, green: 221, hex: '#50DD9F', index: 0, red: 80 },
            { blue: 169, green: 169, hex: '#99A9A9', index: 1, red: 153 },
            { blue: 9, green: 223, hex: '#9ADF09', index: 2, red: 154 },
            { blue: 137, green: 14, hex: '#050E89', index: 3, red: 5 },
            { blue: 245, green: 213, hex: '#78D5F5', index: 4, red: 120 },
            { blue: 209, green: 248, hex: '#F4F8D1', index: 5, red: 244 },
            { blue: 50, green: 216, hex: '#D0D832', index: 6, red: 208 },
            { blue: 73, green: 176, hex: '#28B049', index: 7, red: 40 },
            { blue: 16, green: 211, hex: '#38D310', index: 8, red: 56 },
            { blue: 67, green: 40, hex: '#062843', index: 9, red: 6 },
            { blue: 49, green: 167, hex: '#35A731', index: 10, red: 53 },
            { blue: 77, green: 76, hex: '#2A4C4D', index: 11, red: 42 },
            { blue: 45, green: 82, hex: '#4C522D', index: 12, red: 76 },
            { blue: 112, green: 50, hex: '#2B3270', index: 13, red: 43 },
            { blue: 47, green: 111, hex: '#746F2F', index: 14, red: 116 },
            { blue: 51, green: 147, hex: '#259333', index: 15, red: 37 },
            { blue: 117, green: 114, hex: '#2A7275', index: 16, red: 42 },
            { blue: 33, green: 142, hex: '#6E8E21', index: 17, red: 110 },
            { blue: 75, green: 147, hex: '#18934B', index: 18, red: 24 },
            { blue: 64, green: 110, hex: '#466E40', index: 19, red: 70 },
            { blue: 215, green: 97, hex: '#3761D7', index: 20, red: 55 },
            { blue: 59, green: 237, hex: '#D0ED3B', index: 21, red: 208 },
            { blue: 21, green: 197, hex: '#2EC515', index: 22, red: 46 },
            { blue: 196, green: 71, hex: '#0A47C4', index: 23, red: 10 },
            { blue: 35, green: 228, hex: '#B9E423', index: 24, red: 185 },
            { blue: 85, green: 25, hex: '#2D1955', index: 25, red: 45 },
            { blue: 79, green: 182, hex: '#48B64F', index: 26, red: 72 },
            { blue: 21, green: 142, hex: '#428E15', index: 27, red: 66 },
            { blue: 119, green: 16, hex: '#211077', index: 28, red: 33 },
            { blue: 36, green: 172, hex: '#6BAC24', index: 29, red: 107 },
            { blue: 35, green: 111, hex: '#166F23', index: 30, red: 22 },
            { blue: 31, green: 80, hex: '#14501F', index: 31, red: 20 },
            { blue: 82, green: 51, hex: '#163352', index: 32, red: 22 },
            { blue: 121, green: 29, hex: '#2E1D79', index: 33, red: 46 },
            { blue: 103, green: 119, hex: '#857767', index: 34, red: 133 },
            { blue: 69, green: 174, hex: '#58AE45', index: 35, red: 88 },
            { blue: 104, green: 59, hex: '#4A3B68', index: 36, red: 74 },
            { blue: 37, green: 143, hex: '#568F25', index: 37, red: 86 },
            { blue: 26, green: 16, hex: '#13101A', index: 38, red: 19 },
            { blue: 140, green: 134, hex: '#12868C', index: 39, red: 18 },
            { blue: 98, green: 77, hex: '#664D62', index: 40, red: 102 },
            { blue: 21, green: 113, hex: '#5A7115', index: 41, red: 90 },
            { blue: 85, green: 119, hex: '#0C7755', index: 42, red: 12 },
            { blue: 27, green: 77, hex: '#634D1B', index: 43, red: 99 },
            { blue: 98, green: 38, hex: '#1F2662', index: 44, red: 31 },
            { blue: 230, green: 93, hex: '#6C5DE6', index: 45, red: 108 },
            { blue: 41, green: 240, hex: '#E3F029', index: 46, red: 227 },
            { blue: 138, green: 163, hex: '#1DA38A', index: 47, red: 29 },
            { blue: 93, green: 129, hex: '#85815D', index: 48, red: 133 },
            { blue: 60, green: 85, hex: '#56553C', index: 49, red: 86 },
            { blue: 186, green: 86, hex: '#3D56BA', index: 50, red: 61 },
            { blue: 59, green: 182, hex: '#B3B63B', index: 51, red: 179 },
            { blue: 134, green: 57, hex: '#3C3986', index: 52, red: 60 },
            { blue: 89, green: 146, hex: '#829259', index: 53, red: 130 },
            { blue: 94, green: 108, hex: '#606C5E', index: 54, red: 96 },
            { blue: 199, green: 142, hex: '#618EC7', index: 55, red: 97 },
            { blue: 30, green: 197, hex: '#C3C51E', index: 56, red: 195 },
            { blue: 192, green: 68, hex: '#2144C0', index: 57, red: 33 },
            { blue: 223, green: 203, hex: '#C0CBDF', index: 58, red: 192 },
            { blue: 222, green: 220, hex: '#D8DCDE', index: 59, red: 216 },
            { blue: 232, green: 231, hex: '#DEE7E8', index: 60, red: 222 },
            { blue: 182, green: 231, hex: '#E7E7B6', index: 61, red: 231 },
            { blue: 222, green: 189, hex: '#B6BDDE', index: 62, red: 182 },
            { blue: 33, green: 222, hex: '#DEDE21', index: 63, red: 222 }
        ]));
    });

    it('should correct number of colors', () => {
        expect(gif.globalColorTableData.length).toEqual(64);
    });
});
