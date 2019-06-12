//inside create_test.js
const assert = require('assert');
const User = require('../modules/user'); //imports the User model.
const Ticket = require('../modules/ticket'); //imports the User model.

describe('Creating documents', () => {
    it('check if user creation works with correct input', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const user = new User({ name: 'Tarik', email: 'some@mail.com', username: 'user', password: 'password'});
        user.save() //takes some time and returns a promise
            .then(() => {
                assert(!user.isNew); //if user is saved to db it is not new
                done();
            });
    });
});