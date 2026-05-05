const fs = require('fs');
const crypto = require('crypto');

function signMessage(privateKeyPath: string, message: string) {
  const privateKey = fs.readFileSync(privateKeyPath);

  const signature = crypto.sign(
    "sha256",
    Buffer.from(message),
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    }
  );

  return signature.toString('hex');
}

module.exports = {
  signMessage,
};