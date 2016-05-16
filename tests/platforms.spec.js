'use strict';

let utils = require('rsx-common');
let chai = require('chai');
let rewire = require('rewire');
let sinon = require('sinon');
let path = require('path');

let expect = chai.expect;
let log = utils.log;

log.level = 'silent';

describe('platforms', () => {

    describe('main', () => {

        it('should throw an error if an invalid action is specified', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');
            const spy = sinon.spy();
            const command = require('../src/platforms');
            command(['pppppp'], spy);

            expect(spy.calledWith('pppppp is not a valid action for this command'));
        });

        it('should execute the subcommand if a valid action is specified', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'platform-project');
            const spy = sinon.spy();
            const command = require('../src/platforms');
            command(['ls'], spy);

            expect(spy.calledOnce).to.deep.equals(true);
        });

    });

    describe('ls', () => {

        it('should show a list of installed platforms', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'platform-project');
            let result;
            const command = require('../src/list');
            command({}, (platforms) => {
                result = platforms;
            });

            expect(result).to.deep.equals(['android', 'ios']);
        });

        it('should return an empty array if no installed platforms are found', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'no-platform-project');
            let result;
            let errors;
            const command = require('../src/list');
            command({}, (platforms, err) => {
                result = platforms;
                errors = err;
            });

            expect(result).to.deep.equals([]);
            expect(errors.length).to.deep.equals(2);
        });

    });

    describe('add', () => {

        it('should add a platform project for React Native', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'no-platform-project');

            let commandMock = rewire('../src/add');
            commandMock.__set__('yeoman', {
                createEnv: () => {
                    return {
                        register: () => {},
                        run: (args, callback) => { callback(); },
                    };
                },
            });

            const spy = sinon.spy();
            commandMock('ios', spy);

            expect(spy.calledOnce).to.deep.equals(true);
        });
    });

    describe('rm', () => {

        it('should remove a platform project for React Native', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'platform-project');

            let commandMock = rewire('../src/remove');
            let rimrafSpy   = sinon.spy();
            let callbackSpy = sinon.spy();
            commandMock.__set__('rimraf', {
                sync: rimrafSpy,
            });

            commandMock('ios', callbackSpy);

            expect(rimrafSpy.calledOnce).to.deep.equals(true);
            expect(callbackSpy.calledOnce).to.deep.equals(true);
        });

    });

});
