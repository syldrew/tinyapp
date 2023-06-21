const express = require("express");
const app = express();
const PORT = 8080; // default port 8080


//Generate a Random Short URL ID

function generateRandomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
console.log(generateRandomString(6));


app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

//Getting Ready for POST Requests
app.use(express.urlencoded({ extended: true }));

//******* Add a route for /urls*******
app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
  });


  //Add a GET Route to Show the Form
  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

  //Adding a Second Route and Template
  app.get("/urls/:id", (req, res) => {
    const templateVars = { id: req.params.id, longURL: "http://www.lighthouselabs.ca"};
    res.render("urls_show", templateVars);
  });

  app.get("/hello", (req, res) => {
    res.send("<html><body>Hello <b>World</b></body></html>\n");
  });


//Sending Data to urls_index.ejs

  app.get("/urls", (req, res) => {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
  });

  //Add a POST Route to Receive the Form Submission

  app.post("/urls", (req, res) => {
    console.log(req.body); // Log the POST request body to the console
    res.send("Ok"); // Respond with 'Ok' (we will replace this)
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
