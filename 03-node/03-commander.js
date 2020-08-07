const commander = require('commander');

const {program} = commander;

program
    .name('桃桃')
    .usage('命令行工具')
    .option('-p,--port <v>', 'set port')
    .option('-c,--config <v>', 'config file path')

program.command('create').action(() => {
    console.log('创建一个项目');
})

let args = program.parse(process.argv);

console.log(args);

