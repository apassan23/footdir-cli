const inquirer = require('inquirer');
const colors = require('colors');
const KeyManager = require('../lib/KeyManager');
const { isRequired } = require('../utils/validation');

const key = {
  set: () => {
    const keyManager = new KeyManager();
    let key = '';
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'key',
          message: 'Enter API Key '.green + 'https://api-football.com',
          validate: isRequired,
        },
      ])
      .then((input) => {
        if (keyManager.setKey(input.key)) console.log('API Key Set'.blue);
      });
  },
  show: () => {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();
      console.log('Current API Key:', key.yellow);
      return key;
    } catch (error) {
      console.log(error.message.red);
    }
  },
  remove: () => {
    try {
      const keyManager = new KeyManager();
      keyManager.deleteKey();
      console.log('API Key removed '.blue);
    } catch (error) {
      console.log(error.message.red);
    }
  },
};

module.exports = key;
