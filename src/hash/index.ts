const crypto = require('crypto');
const { readFileSync } = require('fs');

const hash = (
    algorithm: string,
    encoding: string,
    input: string
) => {
    return crypto
        .createHash(algorithm)
        .update(readFileSync(input))
        .digest(encoding);
};

module.exports = hash;