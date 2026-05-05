"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);
const decipher = async (password, salt, size, input, output) => {
    const key = crypto.scryptSync(password, salt, size / 8);
    const iv = Buffer.alloc(16, 0);
    const decipherStream = crypto.createDecipheriv(`aes-${size}-cbc`, key, iv);
    await pipelineAsync(fs.createReadStream(input), decipherStream, fs.createWriteStream(output));
};
module.exports = decipher;
//# sourceMappingURL=index.js.map