import fs from 'fs';

export function readFile(file) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(file);
        let arrayBuffer = null;

        readStream
            .on('data', (chunk) => {
                arrayBuffer = chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength);
            })
            .on('end', () => {
                resolve(arrayBuffer);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}
