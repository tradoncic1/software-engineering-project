// update_test.js
const assert = require('assert');
const User = require('../modules/user');
describe('Deleting a user', () => {

  let user;
  
  beforeEach((done) => {
    const user = new User({ name: 'Tarik', email: 'some@mail.com', username: 'user', password: 'password'});
    user.save()
      .then(() => done());
  });
  
  function assertHelper(statement, done) {
    statement
     .then(() => User.find({}))
     .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Tarik');
      done();
    });
  }

  it('update all matching users', (done) => {
    assertHelper(User.update({ name: 'user' }, { name: 'Amina' }), done);
  });

  it('update one user', (done) => {
    assertHelper(User.findOneAndUpdate({ name: 'user' }, { name: 'amina' }), done);
  });
});