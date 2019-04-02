//--------------------------------------------------------
//-- Tests
//--------------------------------------------------------
'use strict';

const ow            = require('ow');
const tester        = require('@absolunet/tester');
const { ava: test } = tester;

const nacl = require('../dist/node');


tester.npmPackage.validateLibrary();


//-- Basic check
test('Base works', (t) => {
	const MESSAGE = 'Dirty little secret';

	const { box, key } = nacl.secretbox.lock(MESSAGE);
	t.true(ow.isValid(box, ow.string), 'Box must be a string');
	t.true(ow.isValid(key, ow.string), 'Key must be a string');

	const decrypted = nacl.secretbox.unlock(box, key);
	t.is(decrypted, MESSAGE, 'Decrypted message must be identical to original message');


	const { box: box2, key: key2 } = nacl.secretbox.lock(MESSAGE);
	t.not(box2, box, 'Each call must return a different box for same message');
	t.not(key2, key, 'Each call must return a different key for same message');

	const decrypted2 = nacl.secretbox.unlock(box2, key2);
	t.is(decrypted2, decrypted, 'Decrypted messages must be identical every call');

});
