'use strict';

let utils  = require('rsx-common');
let path   = require('path');
let yeoman = require('yeoman-environment');

let log   = utils.log;

const registerGenerators = (env) => {
    env.register(require.resolve('rsx-generator-ios'), 'rsx:ios');
    env.register(require.resolve('rsx-generator-android'), 'rsx:android');
    return env;
};

module.exports = function add(args, callback) {
    log.heading    = 'rsx-platforms add';
    let platform = args;
    let rootPath = process.cwd();
    let appRoot  = process.env.RN_PROJECT_ROOT;
    let name     = path.basename(appRoot);
    process.chdir(appRoot);

    let env = registerGenerators(yeoman.createEnv());
    env.run([`rsx:${platform}`, name], () => {
        log.info(`The ${platform} platform has been added to ${appRoot}`);
        process.chdir(rootPath);

        if (callback) { callback(); }
    });
};
