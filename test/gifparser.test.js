import path from 'path';

import { readFile } from './utils';
import GIFParser from './../src/GIFParser';

describe('GIFParser', () => {
    describe('parseFromArrayBuffer', () => {

        it('should throw an error when having no arguments', () => {
            const gifParser = new GIFParser();
            expect(() => {
                gifParser.parseFromArrayBuffer();
            }).toThrowError('No ArrayBuffer specified!');
        });

        it('should throw an error when having wrong arguments', () => {
            const gifParser = new GIFParser();
            expect(() => {
                gifParser.parseFromArrayBuffer('abc');
            }).toThrowError('No ArrayBuffer specified!');
        });

        describe('should parse a GIF header from an ArrayBuffer', () => {
            let gifParser = null;
            let gif = null;

            beforeEach(() => {
                gifParser = new GIFParser();
                return readFile(path.join(__dirname, '/../samples/colors2.gif'))
                    .then((arrayBuffer) => {
                        gif = gifParser.parseFromArrayBuffer(arrayBuffer);
                    });
            });

            it('should be valid', () => {
                expect(gif.header.valid).toBe(true);
            });
            it('should have signature', () => {
                expect(gif.header.signature).toBe('GIF');
            });
            it('should have version', () => {
                expect(gif.header.version).toBe('89a');
            });
            it('should have width', () => {
                expect(gif.header.width).toBe(320);
            });
            it('should have height', () => {
                expect(gif.header.height).toBe(240);
            });
        });

        describe('should parse a GIF background color index from an ArrayBuffer', () => {
            let gifParser = null;
            let gif = null;

            beforeEach(() => {
                gifParser = new GIFParser();
                return readFile(path.join(__dirname, '/../samples/colors2.gif'))
                    .then((arrayBuffer) => {
                        gif = gifParser.parseFromArrayBuffer(arrayBuffer);
                    });
            });

            it('should not have background color index', () => {
                expect(gif.backgroundColorIndex).toBe(0);
            });
        });

        describe('should parse a GIF aspect ratio from an ArrayBuffer', () => {
            let gifParser = null;
            let gif = null;

            beforeEach(() => {
                gifParser = new GIFParser();
                return readFile(path.join(__dirname, '/../samples/colors2.gif'))
                    .then((arrayBuffer) => {
                        gif = gifParser.parseFromArrayBuffer(arrayBuffer);
                    });
            });

            it('should have aspect ratio', () => {
                expect(gif.aspectRatio).toBe(51);
            });
        });

    });
});