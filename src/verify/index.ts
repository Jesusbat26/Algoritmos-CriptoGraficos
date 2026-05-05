const fs = require('fs');
const crypto = require('crypto');

function verifyMessage(publicKeyPath: string, message: string, signature: string) {
  const publicKey = fs.readFileSync(publicKeyPath);

  return crypto.verify(
    "sha256",
    Buffer.from(message),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    },
    Buffer.from(signature, 'hex')
  );
}

module.exports = {
  verifyMessage,
};