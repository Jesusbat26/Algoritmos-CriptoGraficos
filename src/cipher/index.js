"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);
const cipher = async (password, salt, size, input, output) => {
    const key = crypto.scryptSync(password, salt, size / 8);
    const iv = Buffer.alloc(16, 0);
    const cipherStream = crypto.createCipheriv(`aes-${size}-cbc`, key, iv);
    await pipelineAsync(fs.createReadStream(input), cipherStream, fs.createWriteStream(output));
};
module.exports = cipher;
//# sourceMappingURL=index.js.map