import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('should parse a GIF global table color data from an ArrayBuffer (128 colors)', () => {
    let gifParser = null;
    let gif = null;

    beforeEach(() => {
        gifParser = new GIFParser();
        return readFile(path.join(__dirname, '/../samples/colors128.gif'))
            .then((arrayBuffer) => {
                gif = gifParser.parseFromArrayBuffer(arrayBuffer);
            });
    });

    describe('should parse a GIF Logical Screen Descriptor from an ArrayBuffer', () => {
        let gifParser = null;
        let gif = null;

        beforeEach(() => {
            gifParser = new GIFParser();
            return readFile(path.join(__dirname, '/../samples/colors128.gif'))
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
            expect(gif.logicalScreenDescriptorData.globalColorTableSize).toBe(128);
            expect(gif.logicalScreenDescriptorData.globalColorTableSizeDescription).toBe('128 colors (0b110, bit-size 6)');
        });
        it('should have global color table size in bytes', () => {
            expect(gif.logicalScreenDescriptorData.globalColorTableBytes).toBe(384);
        });
        it('should have color resolution', () => {
            expect(gif.logicalScreenDescriptorData.colorResolution).toBe(7);
            expect(gif.logicalScreenDescriptorData.colorResolutionDescription).toBe('7 bits/pixel (0b110, bit-size 6)');
        });
    });

    it('should have global table color data', () => {
        expect(gif.globalColorTableData).toEqual(expect.arrayContaining([
            { blue: 45, green: 82, hex: '#4C522D', index: 0, red: 76 },
            { blue: 112, green: 49, hex: '#2C3170', index: 1, red: 44 },
            { blue: 45, green: 111, hex: '#746F2D', index: 2, red: 116 },
            { blue: 50, green: 148, hex: '#239432', index: 3, red: 35 },
            { blue: 116, green: 114, hex: '#297274', index: 4, red: 41 },
            { blue: 85, green: 141, hex: '#6D8D55', index: 5, red: 109 },
            { blue: 33, green: 208, hex: '#46D021', index: 6, red: 70 },
            { blue: 183, green: 147, hex: '#1793B7', index: 7, red: 23 },
            { blue: 76, green: 204, hex: '#B1CC4C', index: 8, red: 177 },
            { blue: 66, green: 109, hex: '#486D42', index: 9, red: 72 },
            { blue: 215, green: 101, hex: '#3865D7', index: 10, red: 56 },
            { blue: 177, green: 238, hex: '#D0EEB1', index: 11, red: 208 },
            { blue: 136, green: 184, hex: '#AEB888', index: 12, red: 174 },
            { blue: 131, green: 226, hex: '#75E283', index: 13, red: 117 },
            { blue: 143, green: 160, hex: '#79A08F', index: 14, red: 121 },
            { blue: 69, green: 149, hex: '#8A9545', index: 15, red: 138 },
            { blue: 102, green: 203, hex: '#35CB66', index: 16, red: 53 },
            { blue: 250, green: 213, hex: '#52D5FA', index: 17, red: 82 },
            { blue: 56, green: 252, hex: '#FAFC38', index: 18, red: 250 },
            { blue: 21, green: 201, hex: '#2CC915', index: 19, red: 44 },
            { blue: 69, green: 72, hex: '#0A4845', index: 20, red: 10 },
            { blue: 199, green: 183, hex: '#36B7C7', index: 21, red: 54 },
            { blue: 71, green: 227, hex: '#BCE347', index: 22, red: 188 },
            { blue: 35, green: 217, hex: '#35D923', index: 23, red: 53 },
            { blue: 148, green: 25, hex: '#2D1994', index: 24, red: 45 },
            { blue: 85, green: 175, hex: '#8CAF55', index: 25, red: 140 },
            { blue: 83, green: 179, hex: '#4AB353', index: 26, red: 74 },
            { blue: 24, green: 144, hex: '#469018', index: 27, red: 70 },
            { blue: 119, green: 19, hex: '#261377', index: 28, red: 38 },
            { blue: 36, green: 175, hex: '#6AAF24', index: 29, red: 106 },
            { blue: 52, green: 111, hex: '#166F34', index: 30, red: 22 },
            { blue: 7, green: 185, hex: '#27B907', index: 31, red: 39 },
            { blue: 67, green: 20, hex: '#001443', index: 32, red: 0 },
            { blue: 34, green: 139, hex: '#358B22', index: 33, red: 53 },
            { blue: 205, green: 82, hex: '#1252CD', index: 34, red: 18 },
            { blue: 4, green: 215, hex: '#CCD704', index: 35, red: 204 },
            { blue: 35, green: 4, hex: '#000423', index: 36, red: 0 },
            { blue: 235, green: 51, hex: '#1733EB', index: 37, red: 23 },
            { blue: 215, green: 238, hex: '#EAEED7', index: 38, red: 234 },
            { blue: 51, green: 220, hex: '#D6DC33', index: 39, red: 214 },
            { blue: 199, green: 169, hex: '#27A9C7', index: 40, red: 39 },
            { blue: 82, green: 204, hex: '#C5CC52', index: 41, red: 197 },
            { blue: 121, green: 29, hex: '#2E1D79', index: 42, red: 46 },
            { blue: 103, green: 119, hex: '#857767', index: 43, red: 133 },
            { blue: 69, green: 173, hex: '#58AD45', index: 44, red: 88 },
            { blue: 149, green: 58, hex: '#4A3A95', index: 45, red: 74 },
            { blue: 104, green: 209, hex: '#86D168', index: 46, red: 134 },
            { blue: 103, green: 143, hex: '#568F67', index: 47, red: 86 },
            { blue: 22, green: 234, hex: '#50EA16', index: 48, red: 80 },
            { blue: 18, green: 37, hex: '#122512', index: 49, red: 18 },
            { blue: 119, green: 37, hex: '#052577', index: 50, red: 5 },
            { blue: 19, green: 213, hex: '#64D513', index: 51, red: 100 },
            { blue: 18, green: 52, hex: '#063412', index: 52, red: 6 },
            { blue: 42, green: 20, hex: '#12142A', index: 53, red: 18 },
            { blue: 56, green: 16, hex: '#151038', index: 54, red: 21 },
            { blue: 17, green: 86, hex: '#345611', index: 55, red: 52 },
            { blue: 38, green: 21, hex: '#071526', index: 56, red: 7 },
            { blue: 26, green: 67, hex: '#21431A', index: 57, red: 33 },
            { blue: 239, green: 134, hex: '#1286EF', index: 58, red: 18 },
            { blue: 140, green: 247, hex: '#EEF78C', index: 59, red: 238 },
            { blue: 187, green: 77, hex: '#664DBB', index: 60, red: 102 },
            { blue: 170, green: 234, hex: '#ACEAAA', index: 61, red: 172 },
            { blue: 57, green: 237, hex: '#96ED39', index: 62, red: 150 },
            { blue: 168, green: 67, hex: '#3543A8', index: 63, red: 53 },
            { blue: 40, green: 215, hex: '#9AD728', index: 64, red: 154 },
            { blue: 98, green: 167, hex: '#21A762', index: 65, red: 33 },
            { blue: 121, green: 113, hex: '#5A7179', index: 66, red: 90 },
            { blue: 21, green: 238, hex: '#65EE15', index: 67, red: 101 },
            { blue: 51, green: 119, hex: '#0C7733', index: 68, red: 12 },
            { blue: 8, green: 84, hex: '#265408', index: 69, red: 38 },
            { blue: 85, green: 35, hex: '#002355', index: 70, red: 0 },
            { blue: 24, green: 77, hex: '#634D18', index: 71, red: 99 },
            { blue: 87, green: 53, hex: '#143557', index: 72, red: 20 },
            { blue: 151, green: 227, hex: '#45E397', index: 73, red: 69 },
            { blue: 27, green: 237, hex: '#84ED1B', index: 74, red: 132 },
            { blue: 57, green: 40, hex: '#222839', index: 75, red: 34 },
            { blue: 51, green: 186, hex: '#31BA33', index: 76, red: 49 },
            { blue: 164, green: 71, hex: '#2547A4', index: 77, red: 37 },
            { blue: 18, green: 178, hex: '#9DB212', index: 78, red: 157 },
            { blue: 98, green: 6, hex: '#070662', index: 79, red: 7 },
            { blue: 16, green: 93, hex: '#6C5D10', index: 80, red: 108 },
            { blue: 228, green: 8, hex: '#1A08E4', index: 81, red: 26 },
            { blue: 82, green: 240, hex: '#DEF052', index: 82, red: 222 },
            { blue: 58, green: 218, hex: '#39DA3A', index: 83, red: 57 },
            { blue: 40, green: 168, hex: '#32A828', index: 84, red: 50 },
            { blue: 77, green: 161, hex: '#18A14D', index: 85, red: 24 },
            { blue: 40, green: 231, hex: '#38E728', index: 86, red: 56 },
            { blue: 214, green: 91, hex: '#225BD6', index: 87, red: 34 },
            { blue: 135, green: 216, hex: '#CED887', index: 88, red: 206 },
            { blue: 93, green: 127, hex: '#837F5D', index: 89, red: 131 },
            { blue: 64, green: 85, hex: '#565540', index: 90, red: 86 },
            { blue: 8, green: 89, hex: '#425908', index: 91, red: 66 },
            { blue: 192, green: 8, hex: '#0F08C0', index: 92, red: 15 },
            { blue: 82, green: 183, hex: '#B7B752', index: 93, red: 183 },
            { blue: 58, green: 199, hex: '#3EC73A', index: 94, red: 62 },
            { blue: 127, green: 51, hex: '#3E337F', index: 95, red: 62 },
            { blue: 89, green: 137, hex: '#808959', index: 96, red: 128 },
            { blue: 159, green: 108, hex: '#606C9F', index: 97, red: 96 },
            { blue: 66, green: 152, hex: '#969842', index: 98, red: 150 },
            { blue: 8, green: 200, hex: '#29C808', index: 99, red: 41 },
            { blue: 247, green: 16, hex: '#0D10F7', index: 100, red: 13 },
            { blue: 41, green: 248, hex: '#EFF829', index: 101, red: 239 },
            { blue: 40, green: 182, hex: '#22B628', index: 102, red: 34 },
            { blue: 8, green: 69, hex: '#324508', index: 103, red: 50 },
            { blue: 94, green: 51, hex: '#01335E', index: 104, red: 1 },
            { blue: 169, green: 142, hex: '#618EA9', index: 105, red: 97 },
            { blue: 202, green: 163, hex: '#A7A3CA', index: 106, red: 167 },
            { blue: 153, green: 189, hex: '#C5BD99', index: 107, red: 197 },
            { blue: 206, green: 173, hex: '#9DADCE', index: 108, red: 157 },
            { blue: 41, green: 216, hex: '#D6D829', index: 109, red: 214 },
            { blue: 24, green: 89, hex: '#325918', index: 110, red: 50 },
            { blue: 59, green: 67, hex: '#1B433B', index: 111, red: 27 },
            { blue: 215, green: 214, hex: '#2DD6D7', index: 112, red: 45 },
            { blue: 189, green: 206, hex: '#CDCEBD', index: 113, red: 205 },
            { blue: 226, green: 201, hex: '#BDC9E2', index: 114, red: 189 },
            { blue: 247, green: 216, hex: '#DED8F7', index: 115, red: 222 },
            { blue: 247, green: 238, hex: '#EFEEF7', index: 116, red: 239 },
            { blue: 97, green: 239, hex: '#F7EF61', index: 117, red: 247 },
            { blue: 215, green: 181, hex: '#3CB5D7', index: 118, red: 60 },
            { blue: 222, green: 206, hex: '#D6CEDE', index: 119, red: 214 },
            { blue: 239, green: 231, hex: '#DEE7EF', index: 120, red: 222 },
            { blue: 231, green: 246, hex: '#F7F6E7', index: 121, red: 247 },
            { blue: 189, green: 222, hex: '#E7DEBD', index: 122, red: 231 },
            { blue: 206, green: 189, hex: '#BDBDCE', index: 123, red: 189 },
            { blue: 156, green: 206, hex: '#CECE9C', index: 124, red: 206 },
            { blue: 222, green: 161, hex: '#9DA1DE', index: 125, red: 157 },
            { blue: 162, green: 222, hex: '#DEDEA2', index: 126, red: 222 },
            { blue: 33, green: 202, hex: '#A3CA21', index: 127, red: 163 }
        ]));
    });

    it('should correct number of colors', () => {
        expect(gif.globalColorTableData.length).toEqual(128);
    });
});
