const fs = require('fs');

// for(var i = 0; i < rawData.length; i++) {
//     compareAtCursor(i);
// }
// function compareAtCursor(cursor) {
//     var rd = rawData[cursor];
//     var ab = dataView.getUint8(cursor);
//     console.log((rd === ab).toString().toUpperCase() + ' rd: ' + rd + ' ab: ' + ab);
// }

const GIFParser = require('./src/gifparser').default;

function readFile(file) {
    const readStream = fs.createReadStream(file);
    const parser = new GIFParser();

    let arrayBuffer = null;

    readStream
        .on('data', (chunk) => {
            arrayBuffer = chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength);
        })
        .on('end', () => {
            console.log('file: ', file);
            parser.parseFromArrayBuffer(arrayBuffer);
        });
}
// readFile('./samples/colors2.gif');
// readFile('./samples/colors4.gif');
// readFile('./samples/colors8.gif');
// readFile('./samples/colors16.gif');
// readFile('./samples/colors32.gif');
// readFile('./samples/colors64.gif');
// readFile('./samples/colors128.gif'); // Application ext, GCE, Application ext, Comment ext, Plain Text ext
// readFile('./samples/colors256.gif');
//
// readFile('./samples/sample_1.gif');
// readFile('./samples/selective_diffusion_transp_colors256_dither100.gif');
// readFile('./samples/perceptual_diffusion_colors34_dither100.gif');
// readFile('./samples/restrictive_noise_colors4.gif');
// readFile('./samples/adaptive_pattern_transp_noisetransp_colors16.gif');
//
// readFile('./samples/win.gif');
// readFile('./samples/128x64.gif'); // works with GCE
// readFile('./samples/rgb3x1.gif');
// readFile('./samples/comment.gif');
// readFile('./samples/comment2.gif');
readFile('./samples/animated1.gif');
// readFile('./samples/animated1_100ms.gif');
// readFile('./samples/animated1_1000ms.gif');
// readFile('./samples/animated2.gif');
// readFile('./samples/animated3.gif');
// readFile('./samples/animated4.gif');
