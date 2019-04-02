module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//--------------------------------------------------------
//-- Export wrapper for Node.js build
//--------------------------------------------------------


/* eslint-disable no-process-env */
module.exports = __webpack_require__(1).default;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_secretbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
//--------------------------------------------------------
//-- TweetNaCl
//--------------------------------------------------------




class TweetNaCl {

	get secretbox() {
		return _lib_secretbox__WEBPACK_IMPORTED_MODULE_0__["default"];
	}

}


/* harmony default export */ __webpack_exports__["default"] = (new TweetNaCl());


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//--------------------------------------------------------
//-- Secret box
//--------------------------------------------------------

const nacl = __webpack_require__(3);
const util = __webpack_require__(4);


class TweetNaClSecretBox {

	lock(message) {
		const keyArray   = nacl.randomBytes(nacl.secretbox.keyLength);
		const nonceArray = nacl.randomBytes(nacl.secretbox.nonceLength);

		const boxArray = nacl.secretbox(util.decodeUTF8(message), nonceArray, keyArray);

		const boxArrayWithNonce = new Uint8Array(nonceArray.length + boxArray.length);
		boxArrayWithNonce.set(nonceArray);
		boxArrayWithNonce.set(boxArray, nonceArray.length);

		return {
			key: util.encodeBase64(keyArray),
			box: util.encodeBase64(boxArrayWithNonce)
		};
	}


	unlock(box, key) {
		const boxArray     = util.decodeBase64(box);
		const nonceArray   = boxArray.slice(0, nacl.secretbox.nonceLength);
		const messageArray = boxArray.slice(nacl.secretbox.nonceLength, box.length);

		const message = nacl.secretbox.open(messageArray, nonceArray, util.decodeBase64(key));

		if (!message) {
			throw new Error('Could not unlock secret box');
		}

		return util.encodeUTF8(message);
	}

}


/* harmony default export */ __webpack_exports__["default"] = (new TweetNaClSecretBox());


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("tweetnacl");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("tweetnacl-util");

/***/ })
/******/ ]);