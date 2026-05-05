// ✅ YARGS EN COMMONJS (CORRECTO)
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// ✅ TUS MÓDULOS
const prng = require('./prng');
const cipher = require('./cipher');
const decipher = require('./decipher');
const hmac = require('./hmac');
const hash = require('./hash');
const diffie = require('./diffie-hellman');
const keypair = require('./key-pair');
const sign = require('./sign');
const verify = require('./verify');

// ❌ ELIMINADO: declare const hmac: any;

// 🔹 CONFIGS
const encoding = {
  alias: "enc",
  choices: [
    "ascii","utf8","utf-8","utf16le","utf-16le",
    "ucs2","ucs-2","base64","base64url",
    "latin1","binary","hex",
  ],
  default: "hex",
};

const input = {
  alias: "i",
  type: "string",
  demandOption: true,
};

const output = {
  alias: "o",
  type: "string",
  demandOption: true,
};

// 🔥 CLI
yargs(hideBin(process.argv))

  .scriptName('cli')

  // ===== PRNG =====
  .command({
    command: 'prng',
    describe: 'Generate a pseudo-random number',
    builder: {
      type: {
        choices: ["bytes", "int", "uuid"],
        demandOption: true
      },
      size: {
        alias: 's',
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
      encoding
    },
    handler: (args: any) => {
      console.log(
        prng(
          args.type,
          args.size || 16,
          args.min || 0,
          args.max || 100,
          args.encoding || 'hex'
        )
      );
    },
  })

  // ===== CIFRAR =====
  .command({
    command: 'cipher',
    describe: 'Encrypt a file using AES',
    builder: {
      password: { alias: 'p', type: 'string' },
      salt: { type: 'string' },
      size: { choices: [128,192,256], default: 128 },
      input,
      output
    },
    handler: (args: any) => {
      cipher(args.password, args.salt, args.size, args.input, args.output);
    }
  })

  // ===== DESCIFRAR =====
  .command({
    command: 'decipher',
    describe: 'Decrypt a file using AES',
    builder: {
      password: { alias: 'p', type: 'string' },
      salt: { type: 'string' },
      size: { choices: [128,192,256], default: 128 },
      input,
      output
    },
    handler: (args: any) => {
      decipher(args.password, args.salt, args.size, args.input, args.output);
    }
  })

  // ===== HASH =====
  .command({
    command: "hash",
    describe: "Hash a file",
    builder: {
      algorithm: { alias: 'a', type: 'string', default: 'sha256' },
      input,
      encoding
    },
    handler: (args: any) => {
      console.log(hash(args.algorithm, args.encoding, args.input));
    }
  })

  // ===== HMAC =====
  .command({
    command: "hmac",
    describe: "Generate an HMAC",
    builder: {
      algorithm: { alias: "a", default: "sha256" },
      key: { alias: "k", demandOption: true },
      input,
      encoding
    },
    handler: (args: any) => {
      console.log(hmac(args.algorithm, args.key, args.encoding, args.input));
    }
  })

  // ===== DIFFIE =====
  .command({
    command: 'diffie',
    describe: 'Execute Diffie-Hellman',
    handler: () => {
      diffie.diffieHellmanExample();
    }
  })

  // ===== KEYPAIR =====
  .command({
    command: 'keypair',
    describe: 'Generate RSA keys',
    handler: () => {
      const keys = keypair.generateKeys();
      console.log(keys.publicKey.export({ type: 'spki', format: 'pem' }).toString());
      console.log(keys.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString());
    }
  })

  // ===== SIGN =====
  .command({
    command: 'sign',
    describe: 'Sign a message',
    builder: {
      message: { alias: 'm', demandOption: true },
      key: { alias: 'k', demandOption: true }
    },
    handler: (args: any) => {
    console.log("KEY PATH:", args.key);
      console.log(sign.signMessage(args.key, args.message));
    }
  })

  // ===== VERIFY =====
  .command({
    command: 'verify',
    describe: 'Verify a signature',
    builder: {
      message: { alias: 'm', demandOption: true },
      key: { alias: 'k', demandOption: true },
      signature: { alias: 's', demandOption: true }
    },
    handler: (args: any) => {
      console.log(verify.verifyMessage(args.key, args.message, args.signature));
    }
  })

  .demandCommand(1, 'Debes especificar un comando')
  .strict()
  .help()
  .parse();