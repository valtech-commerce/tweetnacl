//--------------------------------------------------------
//-- TweetNaCl
//--------------------------------------------------------

import secretbox from './lib/secretbox';


class TweetNaCl {

	get secretbox() {
		return secretbox;
	}

}


export default new TweetNaCl();
