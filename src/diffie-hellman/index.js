"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createDiffieHellman } = require('crypto');
function diffieHellmanExample() {
    const alice = createDiffieHellman(2048);
    const aliceKey = alice.generateKeys();
    const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
    const bobKey = bob.generateKeys();
    const secret1 = alice.computeSecret(bobKey);
    const secret2 = bob.computeSecret(aliceKey);
    console.log('¿Secretos iguales?', secret1.equals(secret2));
}
module.exports = {
    diffieHellmanExample,
};
//# sourceMappingURL=index.js.map