const { assert } = require('chai');
const { getUserByEmail, userIdFromEmail, urlsForUser } = require('../helpers');


const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

const testUrlDatabase = {
    "b2xVn2": {
      longUrl: "http://www.lighthouselabs.ca",
      userID: "userRandomID"
    },
    "9sm5xK": {
      longUrl: "http://www.google.com",
      userID: "userRandomID"
    },
    "s2a4cm": {
      longUrl: "http://www.deviant.com",
      userID: "user2RandomID"
    }
  };

describe('getUserByEmail', function() {
  
    it('should return true if email corresponds to a user in the database', function() {
      const existingEmail = getUserByEmail("user@example.com", testUsers);
      const expectedOutput = true;
      assert.equal(existingEmail, expectedOutput);
    });
  
    it('should return false if email does not correspond to a user in the database', function() {
      const nonExistantEmail = getUserByEmail("fake_email@test.com", testUsers);
      const expectedOutput = false;
      assert.equal(nonExistantEmail, expectedOutput);
    });
  });

  describe('urlsForUser', function() {

    it('should return an object of url information specific to the given user ID', function() {
      const specificUrls = urlsForUser("userRandomID", testUrlDatabase);
      const expectedOutput = {
        "b2xVn2": {
          longUrl: "http://www.lighthouselabs.ca",
          userID: "userRandomID"
        },
        "9sm5xK": {
          longUrl: "http://www.google.com",
          userID: "userRandomID"
        }
      };
      assert.deepEqual(specificUrls, expectedOutput);
    });
  
    it('should return an empty object if no urls exist for a given user ID', function() {
      const noSpecificUrls = urlsForUser("fakeUser", testUrlDatabase);
      const expectedOutput = {};
      assert.deepEqual(noSpecificUrls, expectedOutput);
    });
  });

  describe('userIdFromEmail', function() {

    it('should return a user with a valid email', function() {
      const user = userIdFromEmail("user@example.com", testUsers);
      const expectedOutput = "userRandomID";
      assert.equal(user, expectedOutput);
    });
  
    it('should return undefined when no user exists for a given email address', function() {
      const user = userIdFromEmail("me@test.com", testUsers);
      const expectedOutput = undefined;
      assert.equal(user, expectedOutput);
    });
  });