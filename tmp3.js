process.argv=['node','bin.js','prng','--type','uuid'];
const yargs=require('yargs');
console.log('process.argv', process.argv);
const argv=yargs()
  .command({
    command:'prng',
    describe:'prng',
    builder:{
      type:{choices:['uuid'], demandOption:true}
    },
    handler:(args)=>console.log('handler', args)
  })
  .demandCommand(1, 'need command')
  .help()
  .argv;
console.log('argv', argv);
