# gifparser

This is the ECMAScript library for working with GIF images. Compliant with GIF87a and GIF89a.

The Graphics Interchange Format is a bitmap image format that was developed by CompuServe in 1987 and has since come into widespread usage on the World Wide Web due to its wide support and portability.


Quick start
-----------

Install with `npm install gifparser`.

Create an instance of the `GIFParser` class:

```javascript
import GIFParser from 'gifparser';
let gifParser = new GIFParser(),
    parsedGIF = gifParser.parseFromArrayBuffer(fileBuffer);
console.log(parsedGIF);
```


Features
--------
+ Written in pure javascript, no dependencies
+ Modern, written in ES6/ES2015
+ Validation (extension introducers, block sizes and block terminators)
+ Supports various types of GIF's (e.g. animated, 2-256 colors, etc)
+ Supports GIF extensions: Application Extension, Comments, Plain Text, Graphic Control, XMP packets
+ Clean and lightweight code
+ Supports both node.js and browser environments


Authors
-------

**Victor Norgren**

+ https://twitter.com/logotype
+ https://github.com/logotype
+ https://logotype.se


Copyright and license
---------------------

Copyright © 2017 logotype

Author: Victor Norgren

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:  The above copyright
notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

--------------------------
Built with IntelliJ IDEA Open Source License

<a href="https://www.jetbrains.com/buy/opensource/"><img src="https://s3-ap-southeast-1.amazonaws.com/www.logotype.se/assets/logo-text.svg" width="200"></a>

The people at JetBrains supports the Open Source community by offering free licenses. Check out <a href="https://www.jetbrains.com/buy/opensource/">JetBrains Open Source</a> to apply for your project. Thank you!
