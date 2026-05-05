const fs = require('fs');
const crypto = require('crypto');

const key = fs.readFileSync('private.pem', 'utf8');

try {
  const obj = crypto.createPrivateKey(key);
  console.log('✅ Clave válida');
} catch (e) {
  console.error('❌ Clave inválida');
  console.error(e.message);
}