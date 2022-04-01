#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('key', 'Manage API Key -- https://api-football.com')
  .command('get', 'Get Info on Major Football Competitions')
  .parse(process.argv);
