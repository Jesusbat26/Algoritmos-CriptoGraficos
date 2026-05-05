// test-all.js
const sign = require('./src/sign');
const verify = require('./src/verify');

const msg = "hola";

const signature = sign.signMessage('private.pem', msg);
console.log("Firma:", signature);

const valid = verify.verifyMessage('public.pem', msg, signature);
console.log("¿Válido?:", valid);