const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080; 






//************************************************************************************************* 
//Checks if current cookie corresponds with a user in the userDatabase 

const cookieHasUser = function(cookie, userDatabase) {
    for (const user in userDatabase) {
      if (cookie === user) {
        return true;
      }
    } return false;
  };

//Generate a Random Short URL ID function

function generateRandomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
console.log(generateRandomString(6));


/* Returns an object of short URLs specific to the passed in userID */
const urlsForUser = function(id, urlDatabase) {
    const userUrls = {};
    for (const shortURL in urlDatabase) {
      if (urlDatabase[shortURL].userID === id) {
        userUrls[shortURL] = urlDatabase[shortURL];
      }
    }
    return userUrls;
  };

//**************************************************************************************************


const urlDatabase = { 
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {};

app.set("view engine", "ejs");

//Getting Ready for POST Requests
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser({
}));


                                                    //****GETS ****/


app.get("/", (req, res) => { //*********/
res.send("Hello!");
});


app.get("/", (req, res) => {
    if (cookieHasUser(users)) {
      res.redirect("/urls");
    } else {
      res.redirect("/login");
    }
  });


  app.get("/urls", (req, res) => {
    let templateVars = {
      urls: urlsForUser(req.session, urlDatabase),
      user: users[req.session],
    };
    res.render("urls_index", templateVars);
  });



  app.get("/urls", (req, res) => {
    const templateVars = {
      username: req.cookies["username"],
      // ... any other vars
    };
    res.render("urls_index", templateVars);
  });  


  
  //Add a GET Route to Show the Form
  app.get("/urls/new", (req, res) => {
    if (!cookieHasUser(req.session, users)) {
      res.redirect("/login");
    } else {
      let templateVars = {
        user: users[req.session],
      };
      res.render("urls_new", templateVars);
    }
  });


  app.get("/login", (req, res) => {
    if (cookieHasUser(req.session, users)) {
      res.redirect("/urls");
    } else {
      let templateVars = {
        user: users[req.session],
      };
      res.render("urls_login", templateVars);
    }
  });



//Adding a Second Route and Template
app.get("/urls/:shortURL", (req, res) => {
  if (urlDatabase[req.params.shortURL]) {
    let templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[req.params.shortURL].longURL,
      urlUserID: urlDatabase[req.params.shortURL].userID,
      user: users[req.session],
    };
    res.render("urls_show", templateVars);
  } else {
    res.status(404).send("The short URL you entered does not correspond with a long URL at this time.");
  }
});





//urlDatabase[req.params.shortURL].longURL;
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





                                                          //****POSTS ****/




//Redirect After Form Submission
app.post("/urls", (req, res) => {
    if (req.session) {
      const shortURL = generateRandomString();
      urlDatabase[shortURL] = {
        longURL: req.body.longURL,
        userID: req.session,
      };
      res.redirect(`/urls/${shortURL}`);
    } else {
      res.status(401).send("You must be logged in to a valid account to create short URLs.");
    }
  });
  


//Add an endpoint to handle a POST to /login in your Express server.
  app.post("/login", (req, res) => {
        req.session = userID;
        res.redirect("/urls");
      });
      
     
     
 app.post("/logout", (req, res) => {
        req.session = null;
        res.redirect('/urls');
      });



//Add a POST route that removes a URL resource: POST /urls/:id/delete

  app.post("/urls/:shortURL/delete", (req, res) => {
  const userID = req.session;
  const userUrls = urlsForUser(userID, urlDatabase);
  if (Object.keys(userUrls).includes(req.params.shortURL)) {
    const shortURL = req.params.shortURL;
    delete urlDatabase[shortURL];
    res.redirect('/urls');
  } else {
    res.status(401).send("You do not have authorization to delete this short URL.");
  }
});

//Add a POST route that updates a URL resource; POST /urls/:id and have it update the value of your
// stored long URL based on the new value in req.body.
// Finally, redirect the client back to /urls.
app.post("/urls/:id", (req, res) => {
    const userID = req.session;
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










//   app.get("/urls/:id", (req, res) => {
//     const templateVars = { id: req.params.id, longURL: "http://www.lighthouselabs.ca"};
//     res.render("urls_show", templateVars);
//   });


// //Redirect any request to "/u/:id" to its longURL
// app.get("/u/:id", (req, res) => {
//     const longURL = "http://www.lighthouselabs.ca";
//     res.redirect(longURL);
//   });


//   app.get("/hello", (req, res) => {
//     res.send("<html><body>Hello <b>World</b></body></html>\n");
//   });


//Sending Data to urls_index.ejs

//   app.get("/urls", (req, res) => {
//     const templateVars = { urls: urlDatabase };
//     res.render("urls_index", templateVars);
//   });


  //Add a POST Route to Receive the Form Submission
//   app.post("/urls", (req, res) => {
//     console.log(req.body); // Log the POST request body to the console
//     res.send("Ok"); // Respond with 'Ok' (we will replace this)
//   });