const axios = require('axios');
const colors = require('colors');

class footballAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://v3.football.api-sports.io';
  }

  getConfig() {
    return {
      headers: {
        'x-rapidapi-key': this.apiKey,
      },
    };
  }

  getLeagueData(country) {
    return axios
      .get(
        `${this.baseUrl}/leagues?` +
          (country === 'All' ? '' : `country=${country}`),
        this.getConfig()
      )
      .then((res) => {
        let output = '';
        res.data.response.forEach((league) => {
          output += `id: ${String(league.league.id).white}, Name: ${
            league.league.name.blue
          }, Country: ${league.country.name.green}\n`;
        });
        return output;
      });
  }

  getTeamData(country, name) {
    return axios
      .get(
        `${this.baseUrl}/teams?` +
          (country === 'All' ? '' : `country=${country}`) +
          (name === 'none' ? '' : `&name=${name.replace(' ', '+')}`),
        this.getConfig()
      )
      .then((res) => {
        let output = '';
        res.data.response.forEach((team) => {
          output += `id: ${String(team.team.id).white}, Name: ${
            team.team.name.blue
          }, Country: ${team.team.country.green}, Founded: ${
            String(team.team.founded).yellow
          }, Stadium: ${
            team.venue.name == null ? 'NA'.dim : team.venue.name.magenta
          }, City: ${
            team.venue.city == null ? 'NA'.dim : team.venue.city.cyan
          }\n`;
        });
        return output;
      });
  }

  getStandingsData(leagueID, teamID, season) {
    return axios
      .get(
        `${this.baseUrl}/standings?season=${season}` +
          (leagueID === 'All' ? '' : `&league=${leagueID}`) +
          (teamID === 'none' ? '' : `&team=${teamID}`),
        this.getConfig()
      )
      .then((res) => {
        let output = '';
        if (res.data.errors.length != 0) {
          throw Error(
            Object.keys(res.data.errors)
              .map((key) =>
                res.data.errors[key]
                  .replace('field', 'option')
                  .slice(0, res.data.errors[key].length)
              )
              .join(' or ')
          );
        }

        res.data.response.forEach((standings) => {
          standings.league.standings[0].forEach((team) => {
            output += `Rank: ${String(team.rank).white}, Name: ${
              team.team.name.blue
            }, Points: ${String(team.points).green}, Goal Difference: ${
              String(team.goalsDiff).red
            }, Form: ${team.form == null ? 'NA'.dim : team.form.cyan}\n`;
          });
        });
        return output;
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
}

module.exports = footballAPI;
