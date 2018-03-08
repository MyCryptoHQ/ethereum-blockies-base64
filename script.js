/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/example/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/pnglib/lib/pnglib.js":
/*!*******************************************!*\
  !*** ./node_modules/pnglib/lib/pnglib.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * A handy class to calculate color values.\r\n *\r\n * @version 1.0\r\n * @author Robert Eisele <robert@xarg.org>\r\n * @copyright Copyright (c) 2010, Robert Eisele\r\n * @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/\r\n * @license http://www.opensource.org/licenses/bsd-license.php BSD License\r\n *\r\n */\r\n\r\n// Modified by George Chan <gchan@21cn.com>\r\n\r\nmodule.exports = function(width,height,depth) {\r\n\r\n\r\n    // helper functions for that ctx\r\n    function write(buffer, offs) {\r\n        for (var i = 2; i < arguments.length; i++) {\r\n            for (var j = 0; j < arguments[i].length; j++) {\r\n                buffer[offs++] = arguments[i].charAt(j);\r\n            }\r\n        }\r\n    }\r\n\r\n    function byte2(w) {\r\n        return String.fromCharCode((w >> 8) & 255, w & 255);\r\n    }\r\n\r\n    function byte4(w) {\r\n        return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);\r\n    }\r\n\r\n    function byte2lsb(w) {\r\n        return String.fromCharCode(w & 255, (w >> 8) & 255);\r\n    }\r\n\r\n    this.width   = width;\r\n    this.height  = height;\r\n    this.depth   = depth;\r\n\r\n    // pixel data and row filter identifier size\r\n    this.pix_size = height * (width + 1);\r\n\r\n    // deflate header, pix_size, block headers, adler32 checksum\r\n    this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;\r\n\r\n    // offsets and sizes of Png chunks\r\n    this.ihdr_offs = 0;\t\t\t\t\t\t\t\t\t// IHDR offset and size\r\n    this.ihdr_size = 4 + 4 + 13 + 4;\r\n    this.plte_offs = this.ihdr_offs + this.ihdr_size;\t// PLTE offset and size\r\n    this.plte_size = 4 + 4 + 3 * depth + 4;\r\n    this.trns_offs = this.plte_offs + this.plte_size;\t// tRNS offset and size\r\n    this.trns_size = 4 + 4 + depth + 4;\r\n    this.idat_offs = this.trns_offs + this.trns_size;\t// IDAT offset and size\r\n    this.idat_size = 4 + 4 + this.data_size + 4;\r\n    this.iend_offs = this.idat_offs + this.idat_size;\t// IEND offset and size\r\n    this.iend_size = 4 + 4 + 4;\r\n    this.buffer_size  = this.iend_offs + this.iend_size;\t// total PNG size\r\n\r\n    this.buffer  = new Array();\r\n    this.palette = new Object();\r\n    this.pindex  = 0;\r\n\r\n    var _crc32 = new Array();\r\n\r\n    // initialize buffer with zero bytes\r\n    for (var i = 0; i < this.buffer_size; i++) {\r\n        this.buffer[i] = \"\\x00\";\r\n    }\r\n\r\n    // initialize non-zero elements\r\n    write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), \"\\x08\\x03\");\r\n    write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');\r\n    write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');\r\n    write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');\r\n    write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');\r\n\r\n    // initialize deflate header\r\n    var header = ((8 + (7 << 4)) << 8) | (3 << 6);\r\n    header+= 31 - (header % 31);\r\n\r\n    write(this.buffer, this.idat_offs + 8, byte2(header));\r\n\r\n    // initialize deflate block headers\r\n    for (var i = 0; (i << 16) - 1 < this.pix_size; i++) {\r\n        var size, bits;\r\n        if (i + 0xffff < this.pix_size) {\r\n            size = 0xffff;\r\n            bits = \"\\x00\";\r\n        } else {\r\n            size = this.pix_size - (i << 16) - i;\r\n            bits = \"\\x01\";\r\n        }\r\n        write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));\r\n    }\r\n\r\n    /* Create crc32 lookup table */\r\n    for (var i = 0; i < 256; i++) {\r\n        var c = i;\r\n        for (var j = 0; j < 8; j++) {\r\n            if (c & 1) {\r\n                c = -306674912 ^ ((c >> 1) & 0x7fffffff);\r\n            } else {\r\n                c = (c >> 1) & 0x7fffffff;\r\n            }\r\n        }\r\n        _crc32[i] = c;\r\n    }\r\n\r\n    // compute the index into a png for a given pixel\r\n    this.index = function(x,y) {\r\n        var i = y * (this.width + 1) + x + 1;\r\n        var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;\r\n        return j;\r\n    }\r\n\r\n    // convert a color and build up the palette\r\n    this.color = function(red, green, blue, alpha) {\r\n\r\n        alpha = alpha >= 0 ? alpha : 255;\r\n        var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;\r\n\r\n        if (typeof this.palette[color] == \"undefined\") {\r\n            if (this.pindex == this.depth) return \"\\x00\";\r\n\r\n            var ndx = this.plte_offs + 8 + 3 * this.pindex;\r\n\r\n            this.buffer[ndx + 0] = String.fromCharCode(red);\r\n            this.buffer[ndx + 1] = String.fromCharCode(green);\r\n            this.buffer[ndx + 2] = String.fromCharCode(blue);\r\n            this.buffer[this.trns_offs+8+this.pindex] = String.fromCharCode(alpha);\r\n\r\n            this.palette[color] = String.fromCharCode(this.pindex++);\r\n        }\r\n        return this.palette[color];\r\n    }\r\n\r\n    // output a PNG string, Base64 encoded\r\n    this.getBase64 = function() {\r\n\r\n        var s = this.getDump();\r\n\r\n        var ch = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\";\r\n        var c1, c2, c3, e1, e2, e3, e4;\r\n        var l = s.length;\r\n        var i = 0;\r\n        var r = \"\";\r\n\r\n        do {\r\n            c1 = s.charCodeAt(i);\r\n            e1 = c1 >> 2;\r\n            c2 = s.charCodeAt(i+1);\r\n            e2 = ((c1 & 3) << 4) | (c2 >> 4);\r\n            c3 = s.charCodeAt(i+2);\r\n            if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }\r\n            if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }\r\n            r+= ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);\r\n        } while ((i+= 3) < l);\r\n        return r;\r\n    }\r\n\r\n    // output a PNG string\r\n    this.getDump = function() {\r\n\r\n        // compute adler32 of output pixels + row filter bytes\r\n        var BASE = 65521; /* largest prime smaller than 65536 */\r\n        var NMAX = 5552;  /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */\r\n        var s1 = 1;\r\n        var s2 = 0;\r\n        var n = NMAX;\r\n\r\n        for (var y = 0; y < this.height; y++) {\r\n            for (var x = -1; x < this.width; x++) {\r\n                s1+= this.buffer[this.index(x, y)].charCodeAt(0);\r\n                s2+= s1;\r\n                if ((n-= 1) == 0) {\r\n                    s1%= BASE;\r\n                    s2%= BASE;\r\n                    n = NMAX;\r\n                }\r\n            }\r\n        }\r\n        s1%= BASE;\r\n        s2%= BASE;\r\n        write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));\r\n\r\n        // compute crc32 of the PNG chunks\r\n        function crc32(png, offs, size) {\r\n            var crc = -1;\r\n            for (var i = 4; i < size-4; i += 1) {\r\n                crc = _crc32[(crc ^ png[offs+i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);\r\n            }\r\n            write(png, offs+size-4, byte4(crc ^ -1));\r\n        }\r\n\r\n        crc32(this.buffer, this.ihdr_offs, this.ihdr_size);\r\n        crc32(this.buffer, this.plte_offs, this.plte_size);\r\n        crc32(this.buffer, this.trns_offs, this.trns_size);\r\n        crc32(this.buffer, this.idat_offs, this.idat_size);\r\n        crc32(this.buffer, this.iend_offs, this.iend_size);\r\n\r\n        // convert PNG to string\r\n        return \"\\211PNG\\r\\n\\032\\n\"+this.buffer.join('');\r\n    }\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./node_modules/pnglib/lib/pnglib.js?");

/***/ }),

/***/ "./src/blockies.js":
/*!*************************!*\
  !*** ./src/blockies.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const pnglib = __webpack_require__(/*! pnglib */ \"./node_modules/pnglib/lib/pnglib.js\");\nconst hsl2rgb = __webpack_require__(/*! ./hsl2rgb */ \"./src/hsl2rgb.js\");\n\n// The random number is a js implementation of the Xorshift PRNG\nconst randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values\n\nfunction seedrand(seed) {\n  for (let i = 0; i < randseed.length; i++) {\n    randseed[i] = 0;\n  }\n  for (let i = 0; i < seed.length; i++) {\n    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);\n  }\n}\n\nfunction rand() {\n  // based on Java's String.hashCode(), expanded to 4 32bit values\n  const t = randseed[0] ^ (randseed[0] << 11);\n\n  randseed[0] = randseed[1];\n  randseed[1] = randseed[2];\n  randseed[2] = randseed[3];\n  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);\n\n  return (randseed[3] >>> 0) / (1 << 31 >>> 0);\n}\n\nfunction createColor() {\n  //saturation is the whole color spectrum\n  const h = Math.floor(rand() * 360);\n  //saturation goes from 40 to 100, it avoids greyish colors\n  const s = rand() * 60 + 40;\n  //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%\n  const l = (rand() + rand() + rand() + rand()) * 25 ;\n\n  return [h / 360,s / 100,l / 100];\n}\n\nfunction createImageData(size) {\n  const width = size; // Only support square icons for now\n  const height = size;\n\n  const dataWidth = Math.ceil(width / 2);\n  const mirrorWidth = width - dataWidth;\n\n  const data = [];\n  for (let y = 0; y < height; y++) {\n    let row = [];\n    for (let x = 0; x < dataWidth; x++) {\n      // this makes foreground and background color to have a 43% (1/2.3) probability\n      // spot color has 13% chance\n      row[x] = Math.floor(rand() * 2.3);\n    }\n    const r = row.slice(0, mirrorWidth).reverse();\n    row = row.concat(r);\n\n    for (let i = 0; i < row.length; i++) {\n      data.push(row[i]);\n    }\n  }\n\n  return data;\n}\n\n// Modifies the passed PNG to fill in a specified rectangle\nfunction fillRect(png, x, y, w, h, color) {\n  for(let i = 0; i < w; i++) {\n    for (let j = 0; j < h; j++) {\n      png.buffer[png.index(x + i, y + j)] = color;\n    }\n  }\n}\n\nfunction buildOpts(opts) {\n  if (!opts.seed) {\n   throw 'No seed provided'\n  }\n\n  seedrand(opts.seed);\n\n  return Object.assign({\n    size: 8,\n    scale: 16,\n    color: createColor(),\n    bgcolor: createColor(),\n    spotcolor: createColor(),\n  }, opts)\n}\n\nfunction makeBlockie(address) {\n  const opts = buildOpts({seed: address.toLowerCase()});\n\n  const imageData = createImageData(opts.size);\n  const width = Math.sqrt(imageData.length);\n\n  const p = new pnglib(opts.size*opts.scale, opts.size*opts.scale, 3)\n  const bgcolor = p.color(...hsl2rgb(...opts.bgcolor))\n  const color = p.color(...hsl2rgb(...opts.color))\n  const spotcolor = p.color(...hsl2rgb(...opts.spotcolor))\n\n  for (let i = 0; i < imageData.length; i++) {\n    const row = Math.floor(i / width);\n    const col = i % width;\n    // if data is 0, leave the background\n    if (imageData[i]) {\n      // if data is 2, choose spot color, if 1 choose foreground\n      const pngColor = imageData[i] == 1 ? color : spotcolor;\n      fillRect(p, col * opts.scale, row * opts.scale, opts.scale, opts.scale, pngColor);\n    }\n  }\n  return `data:image/png;base64,${p.getBase64()}`;\n}\n\nmodule.exports = makeBlockie;\n\n\n//# sourceURL=webpack:///./src/blockies.js?");

/***/ }),

/***/ "./src/example/script.js":
/*!*******************************!*\
  !*** ./src/example/script.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const makeBlockie = __webpack_require__(/*! ../blockies */ \"./src/blockies.js\");\nconst addresses = __webpack_require__(/*! ./testAddresses.json */ \"./src/example/testAddresses.json\");\n\nconsole.log(makeBlockie);\n\nconst container = document.getElementById('icons');\nfor (i = 0; i < addresses.length; i++) {\n  // Create the blockie image\n  var address = addresses[i];\n  var icon = document.createElement('div');\n  icon.title = address;\n  icon.style.backgroundImage = `url(${makeBlockie(address)})`;\n  var title = document.createElement('h5');\n  title.innerHTML = address;\n\n  // Create the container element\n  var div = document.createElement('div');\n  icon.classList.add('icon');\n  div.appendChild(icon);\n  div.appendChild(title)\n  div.classList.add('icon-wrapper')\n\n  // Insert\n  container.appendChild(div);\n}\n\n\n//# sourceURL=webpack:///./src/example/script.js?");

/***/ }),

/***/ "./src/example/testAddresses.json":
/*!****************************************!*\
  !*** ./src/example/testAddresses.json ***!
  \****************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, default */
/***/ (function(module) {

eval("module.exports = [\"0x4bbeEB066eD09B7AEd07bF39EEe0460DFa261520\",\"0x000528583ba0c881f4d26a1ff50886fc89efc03f\",\"0x01122df2b7d1c0a6ad94589da045af3885bedbbc\",\"0x000ba5e704c33c58b5e7949f67344821fa54bd29\",\"0x000587ac53175fc48d7b3e36d9c62f87275e1f2f \",\"0x000a9a0c2fb94536452aba2d199f11c404d508d3\",\"0x12333e7c757cf270bd55bf988ca267014aaa463c \",\"0x068899cceb463ed483b79b565dde3bdbc90f598a\",\"0x000eace0089e5d3c984bbd84bd4290426b0d71d1\",\"0x0009a464895f4ddd47595da98d38e9e9ec110fff \",\"0x01235557747af9cd120aca462dac992c329304bd\",\"0x000b82bb1f7db0eed2a69b78ba4dc655ca8086d6 \",\"0x00112ba39c66a00926aa1852e6f721f4f6505e72\",\"0x000f7474c7236159bf7d51e8d260c388f7567ea9\",\"0x000217dd5ce5985880567e8832ecba9a4cec7bb6\",\"0x00098e3e0fdb9ca774645eba75331af5c072f848 \",\"0x000738aa02f0a97baddb03aafba537ca1244ca7c\",\"0x000bda3063fce7699bf70ce31ff7f8ff69d9ccb7\",\"0x0002bad45b918ab01e931ab049806530180aed8a\",\"0x0008a0d473810aa819b471eef3d95743eb32ea89\",\"0x0008e430ca209924db554c8efe125479272538ea \",\"0x07999deff8024f153d1a34bcd1372c7162f76d07\",\"0x0009e6974cab530b6545da1e3d8354ff5f059a9f \",\"0x0001c190d5f71d37113c043498f8d69cd59bb7ba\"];\n\n//# sourceURL=webpack:///./src/example/testAddresses.json?");

/***/ }),

/***/ "./src/hsl2rgb.js":
/*!************************!*\
  !*** ./src/hsl2rgb.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion\n/**\n * Converts an HSL color value to RGB. Conversion formula\n * adapted from http://en.wikipedia.org/wiki/HSL_color_space.\n * Assumes h, s, and l are contained in the set [0, 1] and\n * returns r, g, and b in the set [0, 255].\n *\n * @param   {number}  h       The hue\n * @param   {number}  s       The saturation\n * @param   {number}  l       The lightness\n * @return  {Array}           The RGB representation\n */\n\n function hue2rgb(p, q, t) {\n   if(t < 0) t += 1;\n   if(t > 1) t -= 1;\n   if(t < 1/6) return p + (q - p) * 6 * t;\n   if(t < 1/2) return q;\n   if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;\n   return p;\n }\n\nfunction hsl2rgb(h, s, l){\n  let r, g, b;\n\n  if (s == 0) {\n    r = g = b = l; // achromatic\n  } else {\n    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;\n    const p = 2 * l - q;\n    r = hue2rgb(p, q, h + 1/3);\n    g = hue2rgb(p, q, h);\n    b = hue2rgb(p, q, h - 1/3);\n  }\n\n  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 255];\n}\n\nmodule.exports = hsl2rgb;\n\n\n//# sourceURL=webpack:///./src/hsl2rgb.js?");

/***/ })

/******/ });