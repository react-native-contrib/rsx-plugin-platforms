const utils = require('rsx-common');
const path  = require('path');
const env   = require('yeoman-environment').createEnv();

const log   = utils.log;

const registerGenerators = () => {
    env.register(require.resolve('rsx-generator-ios'), 'rsx:ios');
    env.register(require.resolve('rsx-generator-android'), 'rsx:android');
};

module.exports = function add(args, callback) {
    log.heading    = 'rsx-platforms add';
    const platform = args;
    const appRoot  = process.env.RN_PROJECT_ROOT;
    const name     = utils.path.getProjectFolderName(appRoot);

    registerGenerators();

    env.run([`rsx:${platform}`, name], () => {
        log.info(`The ${platform} platform has been added to ${appRoot}`);

        if (callback) { callback(); }
    });
};
