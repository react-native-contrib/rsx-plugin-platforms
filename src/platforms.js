const utils = require('rsx-common');
const path = require('path');
const listPlatforms = require('./list');
const log = utils.log;

log.heading = 'rsx-platforms';

const appRoot = process.env['RN_PROJECT_ROOT'];

const actions = [
  'add',
  'rm',
  'ls',
];

module.exports = function platforms(args, callback) {

  const action     = args[0];
  const platformName = args[1];

  if (actions.indexOf(action) !== -1) {

    switch(action) {
      case 'add':
        // addPlatform(platformName);
        break;
      case 'rm':
        // removePlatform(platformName);
        break;
      case 'ls':
      default:
        listPlatforms();
        break;
    }

    return;

  }

  log.error(action + ' is not a valid action for this command');

};
