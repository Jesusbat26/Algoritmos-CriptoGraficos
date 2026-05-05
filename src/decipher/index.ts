const crypto = require('crypto');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');

type PathLike = string | Buffer | URL | number;

const pipelineAsync = promisify(pipeline);

const decipher = async (password: string, salt: string, size: 128 | 192 | 256,
    input: PathLike, output: PathLike) => {
    const key = crypto.scryptSync(password, salt, size / 8);
    const iv = Buffer.alloc(16, 0);
    const decipherStream = crypto.createDecipheriv(`aes-${size}-cbc`, key, iv);

    await pipelineAsync(
        fs.createReadStream(input),
        decipherStream,
        fs.createWriteStream(output),
    );
};

module.exports = decipher;
