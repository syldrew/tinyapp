const getUserByEmail = function(email, userDatabase) {
    for (const user in userDatabase) {
      if (userDatabase[user].email === email) {
        return userDatabase[user];
      }
    }
    return undefined;
  };

const userIdFromEmail = function(email, userDatabase) {
    for (const user in userDatabase) {
      if (userDatabase[user].email === email) {
        return userDatabase[user].id;
      }
    }
  };

function generateRandomString() {
    let genRes = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    for (let i = 0; i < 6; i++) {
      genRes += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return genRes;
  };

const cookieHasUser = function(cookie, userDatabase) {
    for (const user in userDatabase) {
      if (cookie === user) {
        return true;
      }
    } return false;
  };

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