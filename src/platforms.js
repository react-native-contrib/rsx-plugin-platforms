'use strict';

let utils = require('rsx-common');
let log = utils.log;

const actions = {
    'add': require('./add'),
    'rm': require('./remove'),
    'ls': require('./list'),
};

module.exports = function platforms(args, callback) {
    log.heading    = 'rsx-platforms';
    let action   = args[0];
    let platform = args[1];

    if (Object.keys(actions).indexOf(action) === -1) {

        try {
            throw Error(`${action} is not a valid action for this command`);
        } catch(e) {
            log.error(e.message);
        }

        return;
    }

    actions[action](platform, callback);
};
