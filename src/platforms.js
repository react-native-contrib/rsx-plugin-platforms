const utils = require('rsx-common');
const log = utils.log;

const actions = {
    'add': require('./add'),
    'rm': require('./remove'),
    'ls': require('./list'),
};

module.exports = function platforms(args, callback) {
    log.heading    = 'rsx-platforms';
    const action   = args[0];
    const platform = args[1];

    if (Object.keys(actions).indexOf(action) === -1) {
        log.error(`${action} is not a valid action for this command`);
        return;
    }

    actions[action](platform, callback);
};
