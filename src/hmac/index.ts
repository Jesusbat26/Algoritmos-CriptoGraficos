const crypto = require('crypto');
const fs = require('fs');

function hmac(algorithm: string, key: string, encoding: string, input: string) {
  const data = fs.readFileSync(input);

  return crypto
    .createHmac(algorithm, key)
    .update(data)
    .digest(encoding);
}

module.exports = hmac;
