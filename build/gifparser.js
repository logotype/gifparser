(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gifparser"] = factory();
	else
		root["gifparser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayBufferView = function () {
    function ArrayBufferView() {
        _classCallCheck(this, ArrayBufferView);

        this.cursor = {
            counter: 0
        };
        this.arrayBuffer = null;
    }

    _createClass(ArrayBufferView, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer) {
            if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
                throw new Error('No ArrayBuffer specified!');
            }
            this.arrayBuffer = arrayBuffer;
            this.dataView = new DataView(this.arrayBuffer);
            return this._parse();
        }
    }, {
        key: '_addCounter',
        value: function _addCounter() {
            var additional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            // console.log(`[Byte ${this.cursor.counter}]`);
            this.cursor.counter += additional;
            return this.cursor.counter++;
        }
    }, {
        key: '_getBit',
        value: function _getBit(byte, position) {
            return byte >> position & 1;
        }
    }, {
        key: '_getHex',
        value: function _getHex(component) {
            var hex = component.toString(16);
            return (hex.length === 1 ? '0' + hex : '' + hex).toUpperCase();
        }
    }, {
        key: '_getUint8',
        value: function _getUint8() {
            var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return this.dataView.getUint8(this._addCounter(length));
        }
    }, {
        key: '_getUint16',
        value: function _getUint16() {
            var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var result = this.dataView.getUint16(this.cursor.counter, littleEndian);
            this._addCounter(length);
            return result;
        }
    }, {
        key: '_getInt16',
        value: function _getInt16() {
            var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var result = this.dataView.getInt16(this.cursor.counter, littleEndian);
            this._addCounter(length);
            return result;
        }
    }, {
        key: '_getASCII',
        value: function _getASCII() {
            var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var ascii = '';
            for (var i = 0; i < length; i++) {
                ascii += String.fromCharCode(this._getUint8(0));
            }
            return ascii;
        }
    }, {
        key: '_peek',
        value: function _peek() {
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return this.dataView.getUint8(this.cursor.counter + offset);
        }
    }, {
        key: '_validateBlock',
        value: function _validateBlock(values) {
            var _this = this;

            return !values.map(function (value, index) {
                return _this._peek(index) === value;
            }).some(function (valid) {
                return valid === false;
            });
        }
    }, {
        key: '_parse',
        value: function _parse() {
            throw new Error('_parse has to be overridden!');
        }
    }]);

    return ArrayBufferView;
}();

exports.default = ArrayBufferView;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
const escapeStringRegexp = __webpack_require__(8);
const ansiStyles = __webpack_require__(9);
const supportsColor = __webpack_require__(14);

const template = __webpack_require__(15);

const isSimpleWindowsTerm = process.platform === 'win32' && !(Object({"NODE_ENV":"production"}).TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	obj.level = options.level === undefined ? supportsColor.level : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling chalk.constructor()
	// by itself will have a `this` of a previously constructed chalk object.
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], key);
		}
	};
}

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype.
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = argsLen !== 0 && String(arguments[0]);

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	const args = [].slice.call(arguments, 2);

	if (!Array.isArray(strings)) {
		return strings.toString();
	}

	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(args[i - 1].toString().replace(/[{}]/g, '\\$&'));
		parts.push(strings.raw[i]);
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = supportsColor;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ArrayBufferView2 = __webpack_require__(0);

var _ArrayBufferView3 = _interopRequireDefault(_ArrayBufferView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseExtension = function (_ArrayBufferView) {
    _inherits(BaseExtension, _ArrayBufferView);

    function BaseExtension() {
        _classCallCheck(this, BaseExtension);

        return _possibleConstructorReturn(this, (BaseExtension.__proto__ || Object.getPrototypeOf(BaseExtension)).apply(this, arguments));
    }

    _createClass(BaseExtension, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;

            this.extensionIntroducer = null;
            this.extensionLabel = null;

            return this._parse();
        }
    }, {
        key: '_validateBlock',
        value: function _validateBlock() {
            for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
                values[_key] = arguments[_key];
            }

            var isValid = _get(BaseExtension.prototype.__proto__ || Object.getPrototypeOf(BaseExtension.prototype), '_validateBlock', this).call(this, values);
            if (isValid) {
                this.extensionIntroducer = this._getUint8(0);
                this.extensionLabel = this._getUint8(0);
            }
            return isValid;
        }
    }]);

    return BaseExtension;
}(_ArrayBufferView3.default);

exports.default = BaseExtension;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(12);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var v;

	if (max === 0) {
		s = 0;
	} else {
		s = (delta / max * 1000) / 10;
	}

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	v = ((max / 255) * 1000) / 10;

	return [h, s, v];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayBufferView2 = __webpack_require__(0);

var _ArrayBufferView3 = _interopRequireDefault(_ArrayBufferView2);

var _Header = __webpack_require__(5);

var _Header2 = _interopRequireDefault(_Header);

var _ApplicationExtension = __webpack_require__(6);

var _ApplicationExtension2 = _interopRequireDefault(_ApplicationExtension);

var _CommentExtension = __webpack_require__(16);

var _CommentExtension2 = _interopRequireDefault(_CommentExtension);

var _PlainTextExtension = __webpack_require__(17);

var _PlainTextExtension2 = _interopRequireDefault(_PlainTextExtension);

var _GlobalColorTable = __webpack_require__(18);

var _GlobalColorTable2 = _interopRequireDefault(_GlobalColorTable);

var _GraphicControlExtension = __webpack_require__(19);

var _GraphicControlExtension2 = _interopRequireDefault(_GraphicControlExtension);

var _LogicalScreenDescriptor = __webpack_require__(20);

var _LogicalScreenDescriptor2 = _interopRequireDefault(_LogicalScreenDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GIFParser = function (_ArrayBufferView) {
    _inherits(GIFParser, _ArrayBufferView);

    function GIFParser() {
        _classCallCheck(this, GIFParser);

        var _this = _possibleConstructorReturn(this, (GIFParser.__proto__ || Object.getPrototypeOf(GIFParser)).call(this));

        _this.colorTable = [];
        _this.header = new _Header2.default();
        _this.applicationExtension = new _ApplicationExtension2.default();
        _this.graphicControlExtension = new _GraphicControlExtension2.default();
        _this.commentExtension = new _CommentExtension2.default();
        _this.plainTextExtension = new _PlainTextExtension2.default();
        _this.logicalScreenDescriptor = new _LogicalScreenDescriptor2.default();
        _this.globalColorTable = new _GlobalColorTable2.default();
        return _this;
    }

    _createClass(GIFParser, [{
        key: '_parse',
        value: function _parse() {
            var data = {
                data: []
            };

            var headerData = this.header.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
            data.header = headerData;
            //console.log(`signature: ${headerData.signature}`);
            //console.log(`version: ${headerData.version}`);
            //console.log(`width: ${headerData.width} pixels`);
            //console.log(`height: ${headerData.height} pixels`);

            var logicalScreenDescriptorData = this.logicalScreenDescriptor.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
            data.logicalScreenDescriptorData = logicalScreenDescriptorData;
            //console.log('logical screen descriptor: ', logicalScreenDescriptorData);

            var backgroundColorIndex = this._getUint8(1);
            data.backgroundColorIndex = backgroundColorIndex;
            //console.log(`bkg color index: ${backgroundColorIndex}`);

            var aspectRatio = this._getUint8(0);
            data.aspectRatio = aspectRatio;
            //console.log(`aspect ratio: ${aspectRatio}`);

            var globalColorTableData = null;
            data.globalColorTableData = null;

            if (logicalScreenDescriptorData.globalColorTable) {
                globalColorTableData = this.globalColorTable.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView, logicalScreenDescriptorData.globalColorTableBytes);
                data.globalColorTableData = globalColorTableData;
                //console.log('color table: ', globalColorTableData);
            }

            while (this.cursor.counter < this.dataView.byteLength) {
                var currentBlock = {
                    name: 'UNKNOWN',
                    data: []
                };
                var blockData = null;

                switch (this._peek()) {

                    case GIFParser.EXTENSION_INTRODUCER:
                        {
                            currentBlock.name = 'EXTENSION_INTRODUCER';

                            //console.log('0x21 Extension Block');

                            switch (this._peek(1)) {
                                case GIFParser.GRAPHIC_CONTROL_EXTENSION:
                                    {
                                        //console.log('     0xF9 Graphic Control Extension');
                                        blockData = this.graphicControlExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                                        currentBlock.data.push({
                                            name: 'GRAPHIC_CONTROL_EXTENSION',
                                            data: blockData
                                        });
                                        break;
                                    }

                                case GIFParser.PLAINTEXT_EXTENSION:
                                    {
                                        // console.log('     0x01 Plain Text Extension');
                                        blockData = this.plainTextExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                                        currentBlock.data.push({
                                            name: 'PLAINTEXT_EXTENSION',
                                            data: blockData
                                        });
                                        break;
                                    }

                                case GIFParser.APPLICATION_EXTENSION:
                                    {
                                        //console.log('     0xFF Application Extension');
                                        blockData = this.applicationExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                                        currentBlock.data.push({
                                            name: 'APPLICATION_EXTENSION',
                                            data: blockData
                                        });
                                        break;
                                    }

                                case GIFParser.COMMENT_EXTENSION:
                                    {
                                        // console.log('     0xFE Comment Extension');
                                        blockData = this.commentExtension.parseFromArrayBuffer(this.arrayBuffer, this.cursor, this.dataView);
                                        currentBlock.data.push({
                                            name: 'COMMENT_EXTENSION',
                                            data: blockData
                                        });
                                        break;
                                    }

                                case GIFParser.IMAGE_DESCRIPTOR:
                                    {
                                        currentBlock.data.push({
                                            name: 'IMAGE_DESCRIPTOR',
                                            data: null
                                        });
                                        //console.log('     0x2C Image Descriptor');
                                        break;
                                    }

                                default:
                                    {
                                        //console.log(`     0x${this._peek(1).toString(16).toUpperCase()}`);
                                        break;
                                    }
                            }

                            break;
                        }

                    case GIFParser.BLOCK_TERMINATOR:
                        {
                            currentBlock.name = 'BLOCK_TERMINATOR';
                            //console.log('0x00 Block Terminator');
                            break;
                        }

                    case GIFParser.TRAILER:
                        {
                            currentBlock.name = 'TRAILER';
                            // //console.log('0x3B Trailer');

                            break;
                        }

                    default:
                        {
                            break;
                        }
                }

                this._addCounter();
                if (currentBlock.name !== 'UNKNOWN') {
                    data.data.push(currentBlock);
                }
            }

            return data;
            //console.log('-----------------------------------------------');
        }
    }]);

    return GIFParser;
}(_ArrayBufferView3.default);

GIFParser.EXTENSION_INTRODUCER = 0x21;
GIFParser.IMAGE_DESCRIPTOR = 0x2C;
GIFParser.TRAILER = 0x3B;
GIFParser.GRAPHIC_CONTROL_EXTENSION = 0xF9;
GIFParser.APPLICATION_EXTENSION = 0xFF;
GIFParser.COMMENT_EXTENSION = 0xFE;
GIFParser.PLAINTEXT_EXTENSION = 0x01;
GIFParser.BLOCK_TERMINATOR = 0x00;
exports.default = GIFParser;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayBufferView2 = __webpack_require__(0);

var _ArrayBufferView3 = _interopRequireDefault(_ArrayBufferView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphicControlExtension = function (_ArrayBufferView) {
    _inherits(GraphicControlExtension, _ArrayBufferView);

    function GraphicControlExtension() {
        _classCallCheck(this, GraphicControlExtension);

        return _possibleConstructorReturn(this, (GraphicControlExtension.__proto__ || Object.getPrototypeOf(GraphicControlExtension)).apply(this, arguments));
    }

    _createClass(GraphicControlExtension, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;
            return this._parse();
        }
    }, {
        key: '_parse',
        value: function _parse() {
            var signature = this._getASCII(3),
                version = this._getASCII(3);

            var isValid = null,
                width = null,
                height = null;

            isValid = signature === 'GIF' && (version === '87a' || version === '89a');

            width = this._getUint16(1, true);
            height = this._getUint16(1, true);

            return {
                valid: isValid,
                signature: signature,
                version: version,
                width: width,
                height: height
            };
        }
    }]);

    return GraphicControlExtension;
}(_ArrayBufferView3.default);

exports.default = GraphicControlExtension;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = __webpack_require__(1);

var _chalk2 = _interopRequireDefault(_chalk);

var _BaseExtension2 = __webpack_require__(2);

var _BaseExtension3 = _interopRequireDefault(_BaseExtension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphicControlExtension = function (_BaseExtension) {
    _inherits(GraphicControlExtension, _BaseExtension);

    function GraphicControlExtension() {
        _classCallCheck(this, GraphicControlExtension);

        return _possibleConstructorReturn(this, (GraphicControlExtension.__proto__ || Object.getPrototypeOf(GraphicControlExtension)).apply(this, arguments));
    }

    _createClass(GraphicControlExtension, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;
            return this._parse();
        }
    }, {
        key: '_parse',
        value: function _parse() {
            if (!this._validateBlock(0x21, 0xFF, 0x0B)) {}
            //console.log(chalk.red('     -> Application Extension validation failed (block size should be 11)'));


            //console.log(`     -> Extension Introducer: 0x${this.extensionIntroducer.toString(16)}`);
            //console.log(`     -> Extension Label: 0x${this.extensionLabel.toString(16)} (Application Extension)`);

            var blockSize = this._getUint8(0);
            //console.log(`     -> Block Size: ${blockSize} bytes`);

            var application = this._getASCII(8);
            //console.log(`     -> Application Identifier (8 bytes): ${application}`);

            var version = this._getASCII(3);
            //console.log(`     -> Application Authentication Code (3 bytes): ${version}`);

            var subBlockDataSize = this._getUint8(0);
            //console.log(`          -> Sub-block Data Size: ${subBlockDataSize}`);

            if (application === 'NETSCAPE' && version === '2.0') {
                var subBlockID = this._getUint8(0);
                //console.log(`          -> Sub-block ID: ${subBlockID}`);

                var loops = this._getUint8(1);
                //console.log(`          -> Loop Count (2 bytes): ${loops}`);
            } else if (application === 'XMP Data' && version === 'XMP') {
                var data = '';
                for (var i = 0; i < subBlockDataSize; i++) {
                    if (this._peek(0) === 0x00) {
                        break;
                    }

                    data += String.fromCharCode(this._getUint8(0));
                }

                //console.log(`          -> XMP Data: ${data}`);
            } else {
                var _data = '';
                for (var _i = 0; _i < subBlockDataSize; _i++) {
                    if (this._peek(0) === 0x00) {
                        break;
                    }

                    _data += String.fromCharCode(this._getUint8(0));
                }

                //console.log(`          -> Data: ${data}`);
            }

            var extensionTerminator = this._getUint8(0);
            //console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

            if (extensionTerminator !== 0x00) {
                //console.log(chalk.red('     -> Missing Application Extension Block Terminator'));
            }
        }
    }]);

    return GraphicControlExtension;
}(_BaseExtension3.default);

exports.default = GraphicControlExtension;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
const colorConvert = __webpack_require__(11);

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	Object.keys(styles).forEach(groupName => {
		const group = styles[groupName];

		Object.keys(group).forEach(styleName => {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});

	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {};
	styles.color.ansi256 = {};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {};
	styles.bgColor.ansi256 = {};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (const key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(3);
var route = __webpack_require__(13);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(3);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

// https://jsperf.com/object-keys-vs-for-in-with-closure/3
var models = Object.keys(conversions);

function buildGraph() {
	var graph = {};

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = false;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function data(parent) {
	return {
		styles: [],
		parent,
		contents: []
	};
}

const zeroBound = n => n < 0 ? 0 : n;
const lastIndex = a => zeroBound(a.length - 1);

const last = a => a[lastIndex(a)];

const takeWhileReverse = (array, predicate, start) => {
	const out = [];

	for (let i = start; i >= 0 && i <= start; i--) {
		if (predicate(array[i])) {
			out.unshift(array[i]);
		} else {
			break;
		}
	}

	return out;
};

/**
 * Checks if the character at position i in string is a normal character a.k.a a non control character.
 * */
const isNormalCharacter = (string, i) => {
	const char = string[i];
	const backslash = '\\';

	if (!(char === backslash || char === '{' || char === '}')) {
		return true;
	}

	const n = i === 0 ? 0 : takeWhileReverse(string, x => x === '\\', zeroBound(i - 1)).length;

	return n % 2 === 1;
};

const collectStyles = data => data ? collectStyles(data.parent).concat(data.styles) : ['reset'];

/**
 * Computes the style for a given data based on it's style and the style of it's parent. Also accounts for !style styles
 * which remove a style from the list if present.
 * */
const sumStyles = data => {
	const negateRegex = /^~.+/;
	let out = [];

	for (const style of collectStyles(data)) {
		if (negateRegex.test(style)) {
			const exclude = style.slice(1);
			out = out.filter(x => x !== exclude);
		} else {
			out.push(style);
		}
	}

	return out;
};

/**
 * Takes a string and parses it into a tree of data objects which inherit styles from their parent.
 * */
function parse(string) {
	const root = data(null);
	let pushingStyle = false;

	let current = root;

	for (let i = 0; i < string.length; i++) {
		const char = string[i];

		const addNormalCharacter = () => {
			const lastChunk = last(current.contents);

			if (typeof lastChunk === 'string') {
				current.contents[lastIndex(current.contents)] = lastChunk + char;
			} else {
				current.contents.push(char);
			}
		};

		if (pushingStyle) {
			if (' \t'.indexOf(char) > -1) {
				pushingStyle = false;
			} else if (char === '\n') {
				pushingStyle = false;
				addNormalCharacter();
			} else if (char === '.') {
				current.styles.push('');
			} else {
				current.styles[lastIndex(current.styles)] = (last(current.styles) || '') + char;
			}
		} else if (isNormalCharacter(string, i)) {
			addNormalCharacter();
		} else if (char === '{') {
			pushingStyle = true;
			const nCurrent = data(current);
			current.contents.push(nCurrent);
			current = nCurrent;
		} else if (char === '}') {
			current = current.parent;
		}
	}

	if (current !== root) {
		throw new Error('literal template has an unclosed block');
	}

	return root;
}

/**
 * Takes a tree of data objects and flattens it to a list of data objects with the inherited and negations styles
 * accounted for.
 * */
function flatten(data) {
	let flat = [];

	for (const content of data.contents) {
		if (typeof content === 'string') {
			flat.push({
				styles: sumStyles(data),
				content
			});
		} else {
			flat = flat.concat(flatten(content));
		}
	}

	return flat;
}

function assertStyle(chalk, style) {
	if (!chalk[style]) {
		throw new Error(`invalid Chalk style: ${style}`);
	}
}

/**
 * Checks if a given style is valid and parses style functions.
 * */
function parseStyle(chalk, style) {
	const fnMatch = style.match(/^\s*(\w+)\s*\(\s*([^)]*)\s*\)\s*/);
	if (!fnMatch) {
		assertStyle(chalk, style);
		return chalk[style];
	}

	const name = fnMatch[1].trim();
	const args = fnMatch[2].split(/,/g).map(s => s.trim());

	assertStyle(chalk, name);

	return chalk[name].apply(chalk, args);
}

/**
 * Performs the actual styling of the string, essentially lifted from cli.js.
 * */
function style(chalk, flat) {
	return flat.map(data => {
		const fn = data.styles.reduce(parseStyle, chalk);
		return fn(data.content.replace(/\n$/, ''));
	}).join('');
}

module.exports = (chalk, string) => style(chalk, flatten(parse(string)));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = __webpack_require__(1);

var _chalk2 = _interopRequireDefault(_chalk);

var _BaseExtension2 = __webpack_require__(2);

var _BaseExtension3 = _interopRequireDefault(_BaseExtension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentExtension = function (_BaseExtension) {
    _inherits(CommentExtension, _BaseExtension);

    function CommentExtension() {
        _classCallCheck(this, CommentExtension);

        return _possibleConstructorReturn(this, (CommentExtension.__proto__ || Object.getPrototypeOf(CommentExtension)).apply(this, arguments));
    }

    _createClass(CommentExtension, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;
            return this._parse();
        }
    }, {
        key: '_parse',
        value: function _parse() {
            var data = {
                valid: true
            };

            if (!this._validateBlock(0x21, 0xFE)) {
                data.valid = false;
                //console.log(chalk.red('>>>>>>>>>>>>>> ERROR IN Comment Extension'));
            }

            //console.log(`     -> Extension Introducer: 0x${this.extensionIntroducer.toString(16)}`);
            data.extensionIntroducer = '0x' + this.extensionIntroducer.toString(16);
            //console.log(`     -> Extension Label: 0x${this.extensionLabel.toString(16)} (Comment Extension)`);
            data.extensionLabel = '0x' + this.extensionLabel.toString(16) + ' (Comment Extension)';

            var blockSize = this._getUint8(0);
            //console.log(`     -> Block Size: ${blockSize} bytes`);
            data.blockSize = blockSize;

            var comment = '';
            for (var i = 0; i < blockSize; i++) {
                comment += String.fromCharCode(this._getUint8(0));
            }
            //console.log(`     -> Data: ${comment}`);
            data.comment = comment;

            var extensionTerminator = this._getUint8(0);
            //console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

            if (extensionTerminator !== 0x00) {
                //console.log(chalk.red('     -> Missing Comment Extension Block Terminator'));
            }

            return data;
        }
    }]);

    return CommentExtension;
}(_BaseExtension3.default);

exports.default = CommentExtension;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = __webpack_require__(1);

var _chalk2 = _interopRequireDefault(_chalk);

var _BaseExtension2 = __webpack_require__(2);

var _BaseExtension3 = _interopRequireDefault(_BaseExtension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlainTextExtension = function (_BaseExtension) {
    _inherits(PlainTextExtension, _BaseExtension);

    function PlainTextExtension() {
        _classCallCheck(this, PlainTextExtension);

        return _possibleConstructorReturn(this, (PlainTextExtension.__proto__ || Object.getPrototypeOf(PlainTextExtension)).apply(this, arguments));
    }

    _createClass(PlainTextExtension, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;
            return this._parse();
        }
    }, {
        key: '_parse',
        value: function _parse() {
            if (!this._validateBlock(0x21, 0x01)) {}
            //console.log(chalk.red('>>>>>>>>>>>>>> ERROR IN Plain Text Extension'));


            //console.log(`     -> Extension Introducer: 0x${this.extensionIntroducer.toString(16)}`);
            //console.log(`     -> Extension Label: 0x${this.extensionLabel.toString(16)} (Plain Text Extension)`);

            var blockSize = this._getUint8(0);
            //console.log(`     -> Block Size: ${blockSize} bytes`);

            var textGridLeftPos = this._getUint16(1, true);
            //console.log(`     -> Text Grid Left Position: ${textGridLeftPos}`);

            var textGridTopPos = this._getUint16(1, true);
            //console.log(`     -> Text Grid Top Position: ${textGridTopPos}`);

            var textGridWidth = this._getUint16(1, true);
            //console.log(`     -> Text Grid Width: ${textGridWidth}`);

            var textGridHeight = this._getUint16(1, true);
            //console.log(`     -> Text Grid Height: ${textGridHeight}`);

            var characterCellWidth = this._getUint8(0);
            //console.log(`     -> Character Cell Width: ${characterCellWidth}`);

            var characterCellHeight = this._getUint8(0);
            //console.log(`     -> Character Cell Height: ${characterCellHeight}`);

            var textForegroundIndex = this._getUint8(0);
            //console.log(`     -> Text Foreground Color Index: ${textForegroundIndex}`);

            var textBackgroundIndex = this._getUint8(0);
            //console.log(`     -> Text Background Color Index: ${textBackgroundIndex}`);

            var plainText = '';
            for (var i = 0; i < blockSize; i++) {
                plainText += String.fromCharCode(this._getUint8(0));
            }
            //console.log(`     -> Data: ${plainText}`);

            var extensionTerminator = this._getUint8(0);
            //console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

            if (extensionTerminator !== 0x00) {
                //console.log(chalk.red('     -> Missing Plain Text Extension Block Terminator'));
            }
        }
    }]);

    return PlainTextExtension;
}(_BaseExtension3.default);

exports.default = PlainTextExtension;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayBufferView2 = __webpack_require__(0);

var _ArrayBufferView3 = _interopRequireDefault(_ArrayBufferView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlobalColorTable = function (_ArrayBufferView) {
    _inherits(GlobalColorTable, _ArrayBufferView);

    function GlobalColorTable() {
        _classCallCheck(this, GlobalColorTable);

        return _possibleConstructorReturn(this, (GlobalColorTable.__proto__ || Object.getPrototypeOf(GlobalColorTable)).apply(this, arguments));
    }

    _createClass(GlobalColorTable, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView, byteLength) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;
            this.byteLength = byteLength;
            return this._parse();
        }
    }, {
        key: '_parse',
        value: function _parse() {
            var colors = [];
            var colorIndex = 0;

            for (var i = this.cursor.counter; i < this.cursor.counter + this.byteLength; i += 3) {
                var intR = this.dataView.getUint8(i),
                    intG = this.dataView.getUint8(i + 1),
                    intB = this.dataView.getUint8(i + 2),
                    hex = '#' + this._getHex(intR) + this._getHex(intG) + this._getHex(intB);

                colors.push({ index: colorIndex, hex: hex, red: intR, green: intG, blue: intB });
                colorIndex++;
            }

            return colors;
        }
    }]);

    return GlobalColorTable;
}(_ArrayBufferView3.default);

exports.default = GlobalColorTable;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = __webpack_require__(1);

var _chalk2 = _interopRequireDefault(_chalk);

var _BaseExtension2 = __webpack_require__(2);

var _BaseExtension3 = _interopRequireDefault(_BaseExtension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEBUG_BITS = true;

var GraphicControlExtension = function (_BaseExtension) {
    _inherits(GraphicControlExtension, _BaseExtension);

    function GraphicControlExtension() {
        _classCallCheck(this, GraphicControlExtension);

        return _possibleConstructorReturn(this, (GraphicControlExtension.__proto__ || Object.getPrototypeOf(GraphicControlExtension)).apply(this, arguments));
    }

    _createClass(GraphicControlExtension, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;
            return this._parse();
        }
    }, {
        key: '_parse',
        value: function _parse() {
            var data = {
                valid: true
            };

            if (!this._validateBlock(0x21, 0xF9, 4)) {
                data.valid = false;
                //console.log(chalk.red('     -> Graphic Control Extension validation failed (block size should be 4)'));
            }

            //console.log(`     -> Extension Introducer: 0x${this.extensionIntroducer.toString(16)}`);
            data.extensionIntroducer = '0x' + this.extensionIntroducer.toString(16);
            //console.log(`     -> Extension Label: 0x${this.extensionLabel.toString(16)} (Graphic Control Extension)`);
            data.extensionLabel = '0x' + this.extensionLabel.toString(16) + ' (Graphic Control Extension)';

            var byteSize = this._getUint8(0);
            //console.log(`     -> Block Size: ${byteSize}`);
            data.blockSize = byteSize;

            var byteRead = this._getInt16(0, true),
                bitArray = new Uint8Array(8);

            bitArray[0] = this._getBit(byteRead, 0);
            bitArray[1] = this._getBit(byteRead, 1);
            bitArray[2] = this._getBit(byteRead, 2);
            bitArray[3] = this._getBit(byteRead, 3);
            bitArray[4] = this._getBit(byteRead, 4);
            bitArray[5] = this._getBit(byteRead, 5);
            bitArray[6] = this._getBit(byteRead, 6);
            bitArray[7] = this._getBit(byteRead, 7);

            if (DEBUG_BITS) {
                //console.log(`          -> Bit Field: ${bitArray[7]} reserved for future use`);
                data.reserved3 = bitArray[7];
                //console.log(`          -> Bit Field: ${bitArray[6]} reserved for future use`);
                data.reserved2 = bitArray[6];
                //console.log(`          -> Bit Field: ${bitArray[5]} reserved for future use`);
                data.reserved1 = bitArray[5];
                //console.log(`          -> Bit Field: ${bitArray[4]} disposal method`);
                data.disposalMethod3 = bitArray[4];
                //console.log(`          -> Bit Field: ${bitArray[3]} disposal method`);
                data.disposalMethod2 = bitArray[3];
                //console.log(`          -> Bit Field: ${bitArray[2]} disposal method`);
                data.disposalMethod1 = bitArray[2];
                //console.log(`          -> Bit Field: ${bitArray[1]} user input flag`);
                data.userInputFlag = bitArray[1];
                //console.log(`          -> Bit Field: ${bitArray[0]} transparent color flag`);
                data.transparentColor = bitArray[0];
            }

            var delayTime = this._getUint8(0);
            data.delayTime = delayTime;
            data.delayTimePerFrameMs = delayTime * 10;
            // console.log(`     -> Delay Time: ${delayTime} hundredths of a second (${delayTime * 10} ms per frame)`);

            this._addCounter(0);

            var transparentColorIndex = this._getUint8(0);
            data.transparentColorIndex = transparentColorIndex;
            //console.log(`     -> Transparent Color Index: ${transparentColorIndex}`);

            var extensionTerminator = this._getUint8(0);
            //console.log(`     -> Extension Terminator: 0x${extensionTerminator.toString(16).toUpperCase()}`);

            if (extensionTerminator !== 0x00) {
                //console.log(chalk.red('     -> Missing Graphic Control Extension Block Terminator'));
            }

            return data;
        }
    }]);

    return GraphicControlExtension;
}(_BaseExtension3.default);

exports.default = GraphicControlExtension;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayBufferView2 = __webpack_require__(0);

var _ArrayBufferView3 = _interopRequireDefault(_ArrayBufferView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEBUG_BITS = true;

var LogicalScreenDescriptor = function (_ArrayBufferView) {
    _inherits(LogicalScreenDescriptor, _ArrayBufferView);

    function LogicalScreenDescriptor() {
        _classCallCheck(this, LogicalScreenDescriptor);

        return _possibleConstructorReturn(this, (LogicalScreenDescriptor.__proto__ || Object.getPrototypeOf(LogicalScreenDescriptor)).apply(this, arguments));
    }

    _createClass(LogicalScreenDescriptor, [{
        key: 'parseFromArrayBuffer',
        value: function parseFromArrayBuffer(arrayBuffer, cursor, dataView) {
            this.arrayBuffer = arrayBuffer;
            this.cursor = cursor;
            this.dataView = dataView;
            return this._parse();
        }
    }, {
        key: '_parse',
        value: function _parse() {
            var byteRead = this._getUint16(0, true),
                bitArray = new Uint8Array(8);

            bitArray[0] = this._getBit(byteRead, 0);
            bitArray[1] = this._getBit(byteRead, 1);
            bitArray[2] = this._getBit(byteRead, 2);
            bitArray[3] = this._getBit(byteRead, 3);
            bitArray[4] = this._getBit(byteRead, 4);
            bitArray[5] = this._getBit(byteRead, 5);
            bitArray[6] = this._getBit(byteRead, 6);
            bitArray[7] = this._getBit(byteRead, 7);

            if (DEBUG_BITS) {
                //console.log(`  -> Bit Field: ${bitArray[0]} size of global color table`);
                //console.log(`  -> Bit Field: ${bitArray[1]} size of global color table`);
                //console.log(`  -> Bit Field: ${bitArray[2]} size of global color table`);
                //console.log(`  -> Bit Field: ${bitArray[3]} sort flag`);
                //console.log(`  -> Bit Field: ${bitArray[4]} color resolution`);
                //console.log(`  -> Bit Field: ${bitArray[5]} color resolution`);
                //console.log(`  -> Bit Field: ${bitArray[6]} color resolution`);
                //console.log(`  -> Bit Field: ${bitArray[7]} global color table flag`);
            }

            var globalColorTableSizeBits = (bitArray[0] ? 1 : 0) + (bitArray[1] ? 2 : 0) + (bitArray[2] ? 4 : 0);
            var globalColorTableSize = Math.pow(2, globalColorTableSizeBits + 1);
            var globalColorTableBytes = 3 * globalColorTableSize;

            var colorResolutionBits = (bitArray[4] ? 1 : 0) + (bitArray[5] ? 2 : 0) + (bitArray[6] ? 4 : 0);
            var bitsPerPixel = globalColorTableSizeBits + 1;

            return {
                globalColorTable: bitArray[7],
                globalColorTableSorting: bitArray[3],
                globalColorTableSize: globalColorTableSize,
                globalColorTableSizeDescription: globalColorTableSize + ' colors (0b' + bitArray[2] + bitArray[1] + bitArray[0] + ', bit-size ' + globalColorTableSizeBits + ')',
                globalColorTableBytes: globalColorTableBytes,
                colorResolution: bitsPerPixel,
                colorResolutionDescription: bitsPerPixel + ' bits/pixel (0b' + bitArray[6] + bitArray[5] + bitArray[4] + ', bit-size ' + colorResolutionBits + ')'
            };
        }
    }]);

    return LogicalScreenDescriptor;
}(_ArrayBufferView3.default);

exports.default = LogicalScreenDescriptor;

/***/ })
/******/ ]);
});
//# sourceMappingURL=gifparser.js.map