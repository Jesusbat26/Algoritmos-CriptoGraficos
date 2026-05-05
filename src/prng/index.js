"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const prng = (type, size, min, max, encoding) => {
    switch (type) {
        case 'bytes':
            return crypto.randomBytes(size).toString(encoding);
        case 'int':
            return crypto.randomInt(min, max).toString();
        case 'uuid':
            return crypto.randomUUID();
    }
};
module.exports = prng;
//# sourceMappingURL=index.js.map