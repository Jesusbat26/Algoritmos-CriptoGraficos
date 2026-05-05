const crypto = require('crypto');

type PRNG = 'bytes' | 'int' | 'uuid';

const prng = (type: PRNG, size: number, min: number, max: number, encoding: BufferEncoding) => {
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