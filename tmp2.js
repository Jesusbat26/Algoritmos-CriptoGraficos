"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require('yargs');
console.log('ARGS', process.argv);
const { argv } = yargs()
    .command({
    command: 'prng',
    describe: 'Generate',
    handler: (args) => { console.log('HANDLER'); },
    builder: {
        type: {
            choices: ['uuid'],
            demandOption: true
        }
    }
})
    .demandCommand(1, 'need command')
    .help();
console.log('PARSED', argv);
//# sourceMappingURL=tmp2.js.map