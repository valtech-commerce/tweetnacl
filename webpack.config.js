//--------------------------------------------------------
//-- webpack configuration
//--------------------------------------------------------
/* globals __dirname, module */

const LibraryBuilder = require('@absolunet/library-builder');

const builder = new LibraryBuilder({
	name: 'tweetnacl',
	root: __dirname
});


//-- Node.js
const nodeExternals = {
	externals: [
		'tweetnacl',
		'tweetnacl-util'
	]
};


//-- kafe
const kafeExternals = {
	externals: {
		'tweetnacl':      'window.nacl',
		'tweetnacl-util': 'window.nacl.util'
	}
};


module.exports = [
	builder.config.mergeWithNode(nodeExternals),
	builder.config.mergeWithKafe(kafeExternals),
	builder.config.mergeWithKafeES5(kafeExternals)
];
