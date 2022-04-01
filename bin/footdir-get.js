const { Command } = require('commander');
const program = new Command();
const get = require('../commands/get');

program
  .command('league')
  .description('Get the Major Leagues')
  .option('--country <countryName>', 'Name of the Country', 'All')
  .action((cmd) => get.league(cmd));

program
  .command('team')
  .description('Get Teams')
  .option('--country <countryName>', 'Name of the country', 'All')
  .option('--name <teamName>', 'Name of the Team', 'none')
  .action((cmd) => get.team(cmd));

program
  .command('standings')
  .description('Get Standings')
  .option('--league <leagueID>', 'ID of the league', 'All')
  .option('--team <teamID>', 'ID of the Team', 'none')
  .option('--season <year>', 'year of the season', '2021')
  .action((cmd) => get.standings(cmd));

program.parse(process.argv);
