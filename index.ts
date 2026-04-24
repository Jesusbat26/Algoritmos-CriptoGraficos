
import demandOption = require("yargs");
import choices = require("yargs");
const encoding = {
  alias: "enc",
  choices: [
    "ascii",
    "utf8",
    "utf-8",
    "utf16le",
    "utf-16le",
    "ucs2",
    "ucs-2",
    "base64",
    "base64url",
    "latin1",
    "binary",
    "hex",
  ] as const,
  default: "hex",
} as const;

const input = {
  alias: "i",
  type: "string",
  demandOption: true,
} as const;

const output = {
  alias: "o",
  type: "string",
  demandOption: true,
} as const;

const yargs = require("yargs");
const prng = require('./prng');
const cipher = require('./cipher');
const decipher = require('./decipher');
const hash = require('./hash');
declare const hmac: any;
const diffie = require('./diffie-hellman');
const keypair = require('./key-pair');
const sign = require('./sign');
const verify = require('./verify');

console.log('process.argv', process.argv);

type PRNGArgs = {
    type: 'bytes' | 'int' | 'uuid';
    size?: number;
    min?: number;
    max?: number;
    encoding?: BufferEncoding;
};

const argv = yargs(process.argv.slice(2))
  .scriptName('cli')
  .command({
    command: 'prng',
    describe: 'Generate a pseudo-random number',
    builder: {
        type: {
            choices: ["bytes", "int", "uuid"] as const,
            description: 'Type of random output',
            demandOption: true
        },
        size: {
            alias: 's',
            description: 'Aleatority size',
            default: 16
        },
        max: {
           type: 'number',
           default: 100
        },
        min: {
            type: 'number',
            default: 0
        },
        encoding: {
            alias: 'enc',
            choices: [
             "ascii",
             "utf8",
             "utf-8",
             "utf16le",
             "utf-16le",
             "ucs2",
             "ucs-2",
             "base64",
             "base64url",
             "latin1",
             "binary",
             "hex",
            ] as const,
            default: "hex",
        },
    },
    handler: (args: PRNGArgs) => {
        console.log(prng(args.type, args.size || 16, args.min || 0, args.max || 100, args.encoding || 'hex'));
    },
  })
  .command({
    command: 'cipher',
    describe: 'Encrypt a file using AES',
    handler: ({ password, salt, size, input, output}: any) => {
        cipher(password, salt, size, input, output);
    },
    builder: {
        password: {
            alias: 'p',
            description: 'Password for encryption',
            type: 'string'
    },
    salt: {
        description: 'Salt for key derivation',
        type: 'string'
    },
    size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
    },
    input: {
        alias: "i",
        description: "The file to be encrypted",
        type: "string",
        demandOption: true
    },
    output: {
        alias: "o",
        description: "The output file for the encrypted data",
        type: "string",
        demandOption: true,
    },
    },
  })
  .command({
    command: 'decipher',
    describe: 'Decrypt a file using AES',
    handler: ({ password, salt, size, input, output}: any) => {
        decipher(password, salt, size, input, output);
    },
    builder: {
        password: {
            alias: 'p',
            description: 'Password for encryption',
            type: 'string'
    },
    salt: {
        description: 'Salt for key derivation',
        type: 'string'
    },
    size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
    },
    input: {
        alias: "i",
        description: "The file to be encrypted",
        type: "string",
        demandOption: true
    },
    output: {
        alias: "o",
        description: "The output file for the encrypted data",
        type: "string",
        demandOption: true,
    },
    },
  })
  .command({
    command: "hash",
    describe: "Hash a file",
    handler: ({ algorithm, encoding, input }: any) => {
        console.log(hash(algorithm, encoding, input));
    },
    builder: {
        algorithm: {
            alias: 'a',
            description: 'The algorithm to use',
            type: 'string',
            demandOption: true,
            default: 'sha256',
        },
        input: Object.assign({}, input, { description: 'The file to hash' }),
        encoding: encoding,
    },
  })
  .command({
    command: "hmac",
    describe: "Generate an HMAC for a file",
    handler: ({ algorithm, key, encoding, input }: any) => {
      console.log(hmac(algorithm, key, encoding, input));
    },
    builder: {
      algorithm: {
        alias: "a",
        description: "The algorithm to use",
        type: "string",
        default: "sha256",
      },
      input: Object.assign({}, input, { description: "The file to hmac" }),
      key: {
          alias: "k",
          description: "The key to use",
          type: "string",
          demandOption: true,
      },
      encoding,
    },
  })
  .command({
  command: 'diffie',
  describe: 'Execute Diffie-Hellman key exchange',
  handler: () => {
    diffie.diffieHellmanExample();
  }
})
.command({
  command: 'keypair',
  describe: 'Generate RSA key pair',
  handler: () => {
    const keys = keypair.generateKeys();

    console.log(
      keys.publicKey.export({ type: 'spki', format: 'pem' }).toString()
    );

    console.log(
      keys.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString()
    );
  }
})
.command({
  command: 'sign',
  describe: 'Sign a message',
  builder: {
    message: {
      alias: 'm',
      type: 'string',
      demandOption: true
    },
    key: {
      alias: 'k',
      type: 'string',
      demandOption: true
    }
  },
  handler: ({ message, key }: any) => {
    const signature = sign.signMessage(key, message);
    console.log(signature);
  }
})
.command({
  command: 'verify',
  describe: 'Verify a signature',
  builder: {
    message: {
      alias: 'm',
      type: 'string',
      demandOption: true
    },
    key: {
      alias: 'k',
      type: 'string',
      demandOption: true
    },
    signature: {
      alias: 's',
      type: 'string',
      demandOption: true
    }
  },
  handler: ({ message, key, signature }: any) => {
    const result = verify.verifyMessage(key, message, signature);
    console.log(result);
  }
})
  .demandCommand(1, 'You need to specify a command')
  .strict()
  .help()
  .parse();

console.log(argv);
