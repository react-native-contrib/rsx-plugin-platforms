const utils = require('rsx-common');
const path = require('path');
const listPlatforms = require('./list');
const log = utils.log;

log.heading = 'rsx-platforms';

const appRoot = process.env['RN_PROJECT_ROOT'];

const actions = {
  'add': require('./add'),
  'rm': require('./list'),
  'ls': require('./list'),
};

module.exports = function platforms(args, callback) {

  const action       = args[0];
  const platformName = args[1];

  if (Object.keys(actions).indexOf(action) !== -1) {

    actions[action](platformName);
    return;

  }

  log.error(action + ' is not a valid action for this command');

};
