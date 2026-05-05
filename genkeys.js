const { generateKeyPairSync } = require('crypto');
const fs = require('fs');

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

fs.writeFileSync('private.pem', privateKey.export({
  type: 'pkcs1',   // 🔥 FORZAMOS RSA
  format: 'pem'
}));

fs.writeFileSync('public.pem', publicKey.export({
  type: 'spki',
  format: 'pem'
}));

console.log('✅ Claves RSA generadas correctamente');