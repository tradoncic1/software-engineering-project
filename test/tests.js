const assert = require('chai').assert;
const mongodbTest = require('../app').mongodbTest;

describe('App', function() {
    it('Checks the database connection', function () {
        assert.equal(mongodbTest(), true);
    })
});