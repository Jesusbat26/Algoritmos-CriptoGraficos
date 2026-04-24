const yargs = require('yargs');
console.log('ARGS', process.argv);
const { argv } = yargs()
  .command({
    command: 'prng',
    describe: 'Generate',
    handler: (args: any) => { console.log('HANDLER'); },
    builder: {
      type: {
        choices: ['uuid'] as const,
        demandOption: true
      }
    }
  })
  .demandCommand(1, 'need command')
  .help();
console.log('PARSED', argv);
