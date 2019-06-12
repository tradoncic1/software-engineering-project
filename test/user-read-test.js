//inside read_test.js
const mongoose = require("mongoose");
const assert = require('assert');
const User = require('../modules/user');
let user;
beforeEach((done) => {
    const user = new User({ name: 'Tarik', email: 'some1@mail.com', username: 'user1', password: 'password'});
    user.save()
        .then(() => {
            done();
        });
});

describe('Reading user details', () => {
    it('finds user with the name of Pikachu', (done) => {
        const foundUser = User.findOne({ name: 'Pikachu' })
            .then((done) => {
                assert(foundUser.name === 'Pikachu'); 
            });
            done();
    });
});