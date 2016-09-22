var assert = require('assert');
var gh = require('../src/github.js');

describe('Github', function() {
    describe('request repo info', function() {
        it('should not have an error', function(done) {
            gh((err, res, body) => {
                if (err) {
                    done(err);
                }
                assert(res != undefined, 'response was undefined');
                assert(body != undefined, 'body was undefined');
                done();
            });
        });
    });
});