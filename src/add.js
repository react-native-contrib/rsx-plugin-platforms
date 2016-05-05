const utils = require('rsx-common');
const path = require('path');
const yeoman = require('yeoman-environment');
const log = utils.log;

module.exports = function add(args, callback) {
    log.heading = 'rsx-platforms add';
    const appRoot = process.env['RN_PROJECT_ROOT'];
    const oldRoot = process.cwd();
    process.chdir(appRoot);

    const name = appRoot.split(path.sep).pop();
    const platform = args;

    const env = yeoman.createEnv();
    env.register(require.resolve('rsx-generator-ios'), 'rsx:ios');
    env.register(require.resolve('rsx-generator-android'), 'rsx:android');
    env.run(['rsx:' + platform, name], () => {
        log.info('The ' + platform + ' platform has been added to ' + appRoot);
        process.chdir(oldRoot);
    });
}
