//--------------------------------------------------------
//-- Secret box
//--------------------------------------------------------

const nacl = require('tweetnacl');
const util = require('tweetnacl-util');


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


export default new TweetNaClSecretBox();
