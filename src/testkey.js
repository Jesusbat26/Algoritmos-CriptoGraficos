function signMessage(_, message) {
  const privateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/jgaYkAtCwwhq
... (tu clave completa aquí)
-----END PRIVATE KEY-----`;

  const crypto = require('crypto');

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  sign.end();

  return sign.sign(privateKeyPem, 'hex');

}