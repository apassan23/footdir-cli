const footballAPI = require('../lib/footballAPI');
const KeyManager = require('../lib/KeyManager');
const colors = require('colors');

const get = {
  league: (cmd) => {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();

      const footBallAPI = new footballAPI(key);
      footBallAPI
        .getLeagueData(cmd.country)
        .then((output) => console.log(output));
    } catch (error) {
      console.log(error.message.red);
    }
  },

  team: (cmd) => {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();

      const footBallAPI = new footballAPI(key);
      footBallAPI
        .getTeamData(cmd.country, cmd.name)
        .then((output) => console.log(output));
    } catch (error) {
      console.log(error.message.red);
    }
  },
  standings: (cmd) => {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();

      const footBallAPI = new footballAPI(key);
      footBallAPI
        .getStandingsData(cmd.league, cmd.team, cmd.season)
        .then((output) => console.log(output))
        .catch((err) => {
          console.log(err.message.red);
        });
    } catch (error) {
      console.log(error.message.red);
    }
  },
};

module.exports = get;
