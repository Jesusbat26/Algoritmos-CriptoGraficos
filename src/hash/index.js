"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const { readFileSync } = require('fs');
const hash = (algorithm, encoding, input) => {
    return crypto
        .createHash(algorithm)
        .update(readFileSync(input))
        .digest(encoding);
};
module.exports = hash;
//# sourceMappingURL=index.js.map