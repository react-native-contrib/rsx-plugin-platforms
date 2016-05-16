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
            let spy = sinon.spy();
            let command = require('../src/platforms');
            command(['pppppp'], spy);

            expect(spy.called).to.be.false;
        });

        it('should execute the subcommand if a valid action is specified', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'platform-project');
            let spy = sinon.spy();
            let command = require('../src/platforms');
            command(['ls'], spy);

            expect(spy.calledOnce).to.be.true;
        });

    });

    describe('ls', () => {

        it('should show a list of installed platforms', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'platform-project');
            let result;
            let command = require('../src/list');
            command({}, (platforms) => {
                result = platforms;
            });

            expect(result).to.eql(['android', 'ios']);
        });

        it('should return an empty array if no installed platforms are found', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures', 'no-platform-project');
            let result;
            let errors;
            let command = require('../src/list');
            command({}, (platforms, err) => {
                result = platforms;
                errors = err;
            });

            expect(result).to.be.empty;
            expect(errors).to.have.length.of(2);
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

            let spy = sinon.spy();
            commandMock('ios', spy);

            expect(spy.calledOnce).to.be.true;
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

            expect(rimrafSpy.calledOnce).to.be.true;
            expect(callbackSpy.calledOnce).to.be.true;
        });

    });

});
