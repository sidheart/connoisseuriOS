/**
 * Created by tygiacalone on 5/13/16.
 */

const use_ec2 = true;
var localhost = 'http://localhost:3000/';
var ec2 = 'http://54.187.107.93:3000/';
var url = use_ec2 ? ec2 : localhost;

var Routes = {
  addUser: url + 'addUser',
  updateUser: url + 'updateUser',
  auth: url + 'auth',
  search: url + 'search',
  addRating: url + 'addRating',
  addBookmark: url + 'addBookmark',
  getBookmarks: url + 'getBookmarks',
  removeBookmark: url + 'removeBookmark'
};

module.exports = Routes;
