const utils  = require('rsx-common');
const path   = require('path');
const yeoman = require('yeoman-environment');

const log   = utils.log;

const registerGenerators = (env) => {
    env.register(require.resolve('rsx-generator-ios'), 'rsx:ios');
    env.register(require.resolve('rsx-generator-android'), 'rsx:android');
    return env;
};

module.exports = function add(args, callback) {
    log.heading    = 'rsx-platforms add';
    const platform = args;
    const rootPath = process.cwd();
    const appRoot  = process.env.RN_PROJECT_ROOT;
    const name     = utils.path.getProjectFolderName(appRoot);
    process.chdir(appRoot);

    const env = registerGenerators(yeoman.createEnv());
    env.run([`rsx:${platform}`, name], () => {
        log.info(`The ${platform} platform has been added to ${appRoot}`);
        process.chdir(rootPath);

        if (callback) { callback(); }
    });
};
