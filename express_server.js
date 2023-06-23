const express = require("express");
const PORT = 8080; 


const app = express();

//Generate a Random Short URL ID

function generateRandomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
console.log(generateRandomString(6));


const urlDatabase = { 
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


app.set("view engine", "ejs");

//Getting Ready for POST Requests
app.use(express.urlencoded({ extended: true }));




                                                    //****GETS ****/


app.get("/", (req, res) => { //*********/
res.send("Hello!");
});


// //******* Add a route for /urls*******
// app.get("/urls.json", (req, res) => { //******/
//     res.json(urlDatabase);
//   });





  //Add a GET Route to Show the Form
  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });



  app.get("/login", (req, res) => {
   
      res.redirect("/urls");
   
  });


//   //Adding a Second Route and Template
//   app.get("/urls/:id", (req, res) => {
//     const templateVars = { id: req.params.id, longURL: "http://www.lighthouselabs.ca"};
//     res.render("urls_show", templateVars);
//   });

app.get("/urls/:shortURL", (req, res) => {
    let templateVars = {
        shortURL: req.params.shortURL,
        longURL: urlDatabase[req.params.shortURL].longURL,
        };
        res.render("urls_show", templateVars);
});




// //Redirect any request to "/u/:id" to its longURL

// app.get("/u/:id", (req, res) => {
//     const longURL = "http://www.lighthouselabs.ca";
//     res.redirect(longURL);
//   });

//urlDatabase[req.params.shortURL].longURL;
app.get("/u/:shortURL", (req, res) => {
    const longURL = "http://www.lighthouselabs.ca"; /**giving me  */
    res.redirect(longURL);
});
 


//   app.get("/hello", (req, res) => {
//     res.send("<html><body>Hello <b>World</b></body></html>\n");
//   });


//Sending Data to urls_index.ejs

  app.get("/urls", (req, res) => {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
  });


                                                          //****POSTS ****/



  //Add a POST Route to Receive the Form Submission

//   app.post("/urls", (req, res) => {
//     console.log(req.body); // Log the POST request body to the console
//     res.send("Ok"); // Respond with 'Ok' (we will replace this)
//   });

//Redirect After Form Submission
app.post("/urls", (req, res) => {
   // if (req.session.user_id) {
      const shortURL = generateRandomString();
      urlDatabase[shortURL] = {
        longURL: req.body.longURL,
       // userID: req.session.user_id,
      };
      res.redirect(`/urls/${shortURL}`);
   // } else {
     // res.status(401).send("You must be logged in to a valid account to create short URLs.");
    //}
  });

//Add a POST route that removes a URL resource: POST /urls/:id/delete

  app.post("/urls/:shortURL/delete", (req, res) => {
      const shortURL = req.params.shortURL;
      delete urlDatabase[shortURL];
      res.redirect('/urls'); 
  });


//Add a POST route that updates a URL resource; POST /urls/:id and have it update the value of your
// stored long URL based on the new value in req.body.
// Finally, redirect the client back to /urls.
  app.post("/urls/:id", (req, res) => {
    const shortURL = req.params.id;
      urlDatabase[shortURL].longURL = req.body.newURL;
      res.redirect('/urls');
  });



  //Add an endpoint to handle a POST to /login in your Express server.
  app.post("/login", (req, res) => {

    res.redirect("/urls");
  });


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});