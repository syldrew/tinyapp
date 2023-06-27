const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');

const app = express();
const PORT = 8080; 


const urlDatabase = { 
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
  };

  const users = {
    userRandomID: {
      id: "userRandomID",
      email: "user@example.com",
      password: "purple-monkey-dinosaur",
    },
    user2RandomID: {
      id: "user2RandomID",
      email: "user2@example.com",
      password: "dishwasher-funk",
    },
  };
  

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: 'session',
  secret: 'secret'
}));

// FUNCTIONS IMPLEMENTATION **********************************************************************************

function generateRandomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
console.log(generateRandomString(6));


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



 

//***********************************************************************************************************/
                                                   // Express and Routes




app.get("/", (req, res) => {
    if (cookieHasUser(req.session.user_id, users)) {
      res.redirect("/urls");
    } else {
      res.redirect("/login");
    }
  });
  
  
app.get("/urls", (req, res) => {
    let templateVars = {
      urls: urlsForUser(req.session.user_id, urlDatabase),
      user: users[req.session.user_id],
    };
    res.render("urls_index", templateVars);
  });


app.get("/urls/new", (req, res) => {
    if (!cookieHasUser(req.session.user_id, users)) {
      res.redirect("/login");
    } else {
      let templateVars = {
        user: users[req.session.user_id],
      };
      res.render("urls_new", templateVars);
    }
  });


app.get("/register", (req, res) => {
    if (cookieHasUser(req.session.user_id, users)) {
      res.redirect("/urls");
    } else {
      let templateVars = {
        user: users[req.session.user_id],
      };
      res.render("urls_registration", templateVars);
    }
  });


app.get("/login", (req, res) => {
    if (cookieHasUser(req.session.user_id, users)) {
      res.redirect("/urls");
    } else {
      let templateVars = {
        user: users[req.session.user_id],
      };
      res.render("urls_login", templateVars);
    }
  });

app.get("/urls/:shortURL", (req, res) => {
    if (urlDatabase[req.params.shortURL]) {
      let templateVars = {
        shortURL: req.params.shortURL,
        longURL: urlDatabase[req.params.shortURL].longURL,
        urlUserID: urlDatabase[req.params.shortURL].userID,
        user: users[req.session.user_id],
      };
      res.render("urls_show", templateVars);
    } else {
      res.status(404).send("The short URL you entered does not correspond with a long URL at this time.");
    }
  });


app.get("/u/:shortURL", (req, res) => {
    if (urlDatabase[req.params.shortURL]) {
      const longURL = urlDatabase[req.params.shortURL].longURL;
      if (longURL === undefined) {
        res.status(302);
      } else {
        res.redirect(longURL);
      }
    } else {
      res.status(404).send("The short URL you are trying to access does not correspond with a long URL at this time.");
    }
  });



  app.post("/urls", (req, res) => {
    if (req.session.user_id) {
      const shortURL = generateRandomString();
      urlDatabase[shortURL] = {
        longURL: req.body.longURL,
        userID: req.session.user_id,
      };
      res.redirect(`/urls/${shortURL}`);
    } else {
      res.status(401).send("You must be logged in to a valid account to create short URLs.");
    }
  });


  app.post("/register", (req, res) => {
    const newUserID = generateRandomString();
    users[newUserID] = {
      id: newUserID,
      email: "user@example.com",
      password: "purple-monkey-dinosaur",
    };
    req.session.user_id = newUserID;
    res.redirect("/urls");
    });

    app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
      res.redirect("/urls");
    });
  
    app.post("/logout", (req, res) => {
        req.session = null;
        res.redirect("/login");
      });

    app.post("/urls/:shortURL/delete", (req, res) => {
        const userID = req.session.user_id;
        const userUrls = urlsForUser(userID, urlDatabase);
        if (Object.keys(userUrls).includes(req.params.shortURL)) {
          const shortURL = req.params.shortURL;
          delete urlDatabase[shortURL];
          res.redirect('/urls');
        } else {
          res.status(401).send("You do not have authorization to delete this short URL.");
        }
      });

      app.post("/urls/:id", (req, res) => {
        const userID = req.session.user_id;
        const userUrls = urlsForUser(userID, urlDatabase);
        if (Object.keys(userUrls).includes(req.params.id)) {
          const shortURL = req.params.id;
          urlDatabase[shortURL].longURL = req.body.newURL;
          res.redirect('/urls');
        } else {
          res.status(401).send("You do not have authorization to edit this short URL.");
        }
      });




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

