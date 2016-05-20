/**
 * Created by tygiacalone on 5/13/16.
 */

const use_ec2 = true;
var localhost = 'http://localhost:3000/';
var ec2 = 'http://54.187.107.93:3000/';
var url = '';

if (use_ec2) {
  url = ec2;
} else {
  url = localhost;
}

var Routes = {
  addUser: url + 'addUser',
  auth: url + 'auth',
  search: url + 'search'
};

module.exports = Routes;