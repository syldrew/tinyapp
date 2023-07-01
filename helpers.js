
// Checks if given email corresponds to a user in a given database, returns true or false //
const getUserByEmail = function(email, userDatabase) {
    for (const user in userDatabase) {
      if (userDatabase[user].email === email) {
        return userDatabase[user];
      }
    }
    return undefined;
  };

  //Takes an email and userDatabase and returns the user ID for the user with the given email address //
const userIdFromEmail = function(email, userDatabase) {
    for (const user in userDatabase) {
      if (userDatabase[user].email === email) {
        return userDatabase[user].id;
      }
    }
  };

// Generates a random string, used for creating short URLs and userIDs//
function generateRandomString() {
    let genRes = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    for (let i = 0; i < 6; i++) {
      genRes += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return genRes;
  };


//Checks if current cookie corresponds with a user in the userDatabase//
const cookieHasUser = function(cookie, userDatabase) {
    for (const user in userDatabase) {
      if (cookie === user) {
        return true;
      }
    } return false;
  };


  // returns the URLs where the userID is equal to the id of the currently logged-in user.//
const urlsForUser = function(id, urlDatabase) {
    const userUrls = {};
    for (const shortURL in urlDatabase) {
      if (urlDatabase[shortURL].userID === id) {
        userUrls[shortURL] = urlDatabase[shortURL];
      }
    }
    return userUrls;
  };

  module.exports = {
    generateRandomString,
    getUserByEmail,
    userIdFromEmail,
    urlsForUser,
    cookieHasUser
  };