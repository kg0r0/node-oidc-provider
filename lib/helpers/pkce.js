const assert = require('assert');
const crypto = require('crypto');

const base64url = require('base64url');

const { InvalidGrant } = require('../helpers/errors');

module.exports = function checkPKCE(verifier, challenge, method) {
  if (verifier || challenge) {
    try {
      let expected = verifier;
      assert(expected);

      if (method === 'S256') {
        expected = base64url(crypto.createHash('sha256').update(expected).digest());
      }

      assert.deepEqual(challenge, expected);
    } catch (err) {
      throw new InvalidGrant('PKCE verification failed');
    }
  }
};
