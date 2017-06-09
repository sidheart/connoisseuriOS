/**
 * Created by tygiacalone on 5/13/16.
 */

const use_ec2 = true;
var localhost = 'http://localhost:3000/';
var userServer = 'http://localhost:8090/';
var restaurantServer = 'http://localhost:8020/';
var ec2 = 'http://52.11.254.37:3000/';
var url = localhost;

var Routes = {
  addUser: userServer + 'ws-account/api/register',
  updateUser: url + 'updateUser',
  auth: userServer + 'ws-account/api/loginsession',
  search: restaurantServer + 'restaurant/city/Westwood',
  addRating: url + 'addRating',
  addBookmark: url + 'addBookmark',
  getBookmarks: url + 'getBookmarks',
  removeBookmark: url + 'removeBookmark',
  getUser: url + 'getUser'
};

module.exports = Routes;
