#! /usr/bin/env node

const {program} = require('commander');
const Server = require('../src/server');

program
  .name('momo')
  .usage('terminal tool')
  .option('-p, --port <value>', 'set port')
  .option('-d, --directory <value>', 'set root directory')
  .option('-h, --host <value>', 'config host')

const defaultConfig = {
  port: 4200,
  directory: process.cwd(),
  host: 'localhost'
};

let {port, directory, host} = program.parse(process.argv);

const config = {
  port: port || defaultConfig.port,
  directory: directory || defaultConfig.directory,
  host: host || defaultConfig.host
};

const server = new Server(config);

server.start();

