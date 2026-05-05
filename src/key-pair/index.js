"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { generateKeyPairSync } = require('crypto');
function generateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    return { publicKey, privateKey };
}
module.exports = {
    generateKeys,
};
//# sourceMappingURL=index.js.map