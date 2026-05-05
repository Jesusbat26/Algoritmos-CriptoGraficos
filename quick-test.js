const { signMessage } = require('./src/sign/index');

console.log(signMessage('private.pem', 'hola'));