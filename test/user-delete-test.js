// delete_test.js
const assert = require('assert');
const User = require('../modules/user');
describe('Deleting a user', () => {

  let user;

  beforeEach((done) => {
    const user = new User({ name: 'Tarik', email: 'some@mail.com', username: 'user', password: 'password'});
    user.save()
      .then(() => done());
  });

  it('removes multiple users', (done) => {
    User.remove({ name: 'Tarik' })
      .then(() => User.findOne({ name: 'Tarik' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('removes a user', (done) => {
    User.findOneAndRemove({ name: 'Tarik' })
      .then(() => User.findOne({ name: 'Tarik' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
})