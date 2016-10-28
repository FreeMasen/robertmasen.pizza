var assert = require('assert');
var gh = require('../src/github.js');

describe('Github', function() {
    describe('request repo info', function() {
        it('callback should have err == null and repos != undefined', function(done) {
            gh.repos((err, repos) => {
                if (err) {
                    done(err);
                }
                it('repos != undefined', function(done) {
                    assert(repos != undefined, 'repos was undefined')
                    done()
                })
                it('typeof repos == "object', function(done) {
                    assert(typeof repos == 'object', 'repos was not an object')
                })
                it('Array.isArray(repos)', function(done) {
                    assert(Array.isArray(repos), 'Repos was not an array')
                })
                done();
            })
        })
    })
    describe('request events info', function() {
        it('callback should have err == nul and res.body != undefined', function(done) {
            gh.events((err, events) => {
                if(err) {
                    done(err)
                }
                it('events != undefined', function(done) {
                    assert(events != undefined, 'events was undefined')
                    done()
                })
                it('typeof events == "object', function(done) {
                    assert(typeof events == 'object', 'events was not an object')
                })
                it('Array.isArray(events)', function(done) {
                    assert(Array.isArray(events), 'events was not an array')
                })
                done();
            })  
        })
    })
    describe('')
})