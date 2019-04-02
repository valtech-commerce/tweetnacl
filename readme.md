# @absolunet/tweetnacl

[![npm](https://img.shields.io/npm/v/@absolunet/tweetnacl.svg)](https://www.npmjs.com/package/@absolunet/tweetnacl)
[![npm dependencies](https://david-dm.org/absolunet/tweetnacl-js/status.svg)](https://david-dm.org/absolunet/tweetnacl-js)
[![npms](https://badges.npms.io/%40absolunet%2Ftweetnacl.svg)](https://npms.io/search?q=%40absolunet%2Ftweetnacl)
[![Travis CI](https://travis-ci.com/absolunet/tweetnacl-js.svg?branch=master)](https://travis-ci.com/absolunet/tweetnacl-js/builds)
[![Code style ESLint](https://img.shields.io/badge/code_style-@absolunet/library-659d32.svg)](https://github.com/absolunet/eslint-config)


> [TweetNaCl](https://tweetnacl.js.org) wrapper

Wrap TweetNaCl functionalities


## Install

```shell
$ npm install @absolunet/tweetnacl
```


## Usage

```js
// Node.js
const tweetnacl = require('@absolunet/tweetnacl');

// Browser
//   Load TweetNaCl libraries
//   - /node_modules/tweetnacl/nacl-fast.js
//   - /node_modules/tweetnacl-util/nacl-util.js
const { tweetnacl } = window.kafe;


// Lock the box
const { box, key } = tweetnacl.secretbox.lock('Dirty little secret');
console.log({ box, key });

// Outputs:
// {
//   box: "ThyOjmYtUvWSGne8lxXK7sJWGc/oigJ+I51pauSN/xTLpoufdAVNcCCQmtnwHlsu/hD7xnNZr7snkW4="
//   key: "ri4kzZ4V1pMGhGLqeqQayT3m2yT8FY79e1snqp2UAFg="
// }


// Unlock the box
const message = tweetnacl.secretbox.unlock(box, key);
console.log(message);

// Outputs:
// Dirty little secret
```


<br>

## API

### secretbox.lock(message)
Wraps [`nacl.secretbox`](https://github.com/dchest/tweetnacl-js/blob/master/README.md#naclsecretboxmessage-nonce-key) with autogeneration of `nonce` and `key`<br>
Returns an `Object` with `String` properties of `box` and `key`

#### message
*Required*<br>
Type: `String`<br>
Message to lock



<br>

### secretbox.unlock(box, key)
Wraps [`nacl.secretbox.open`](https://github.com/dchest/tweetnacl-js/blob/master/README.md#naclsecretboxopenbox-nonce-key) with autoextraction of `nonce` from box<br>
Returns a `String` message

#### box
*Required*<br>
Type: `String`<br>
Box containing encrypted message and nonce

#### key
*Required*<br>
Type: `String`<br>
Key to unlock box





<br><br>

## License
MIT © [Absolunet](https://absolunet.com)
