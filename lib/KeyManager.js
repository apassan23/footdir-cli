const Conf = require('conf');
const pkg = require('../package.json');

class KeyManager {
  constructor() {
    this.config = new Conf(pkg.name);
  }

  setKey(key) {
    this.config.set('apiKey', key);
    return key;
  }

  getKey() {
    const key = this.config.get('apiKey');
    if (!key) {
      throw new Error(
        'No API Key Found -- Get a Key at https://api-football.com'
      );
    }

    return key;
  }

  deleteKey() {
    const key = this.config.get('apiKey');
    if (!key) {
      throw new Error(
        'No API Key Found -- Get a Key at https://api-football.com'
      );
    }

    this.config.delete('apiKey');
  }
}

module.exports = KeyManager;
