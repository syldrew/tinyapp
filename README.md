# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

# Purpose of this Project

    Build a simple multipage app:

- with authentication protection
- that reacts appropriately to the user's logged-in state,
- and permits the user to create, read, update, and delete (CRUD) a simple entity (e.g. blog posts, URL shortener).


## Final Product


*Main page*
![Alt text](/docs/MainPage.png)

*Registration page*
![Alt text](/docs/Register.png)

*Create a TinyURL page*
![Alt text](/docs/CreateTinyURL.png)

*Editing a URL*
![Alt text](/docs/EditURL.png)

*Display created URLS Links*
![Alt text](/docs/DisplayURLS.png)


## Dependencies


- Node.js
- Express
- EJS
- bcryptjs
- cookie-session
- body-parser


## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
- Go to localhost:8080 on your browser, have fun!!!

## How To Use TinyApp

Users must be logged in to create new links, view them, and edit them.

Just click Register on right top, put in your email and password, and you're good to go.

#### Create New Links

Either click Create a New Short Link in My URLs page, or Create New URL on navigation bar.

Then simply enter the long URL you want to shorten.

#### Edit or Delete Short Links

In My URLs, you can delete any link you want.

You can also click Edit, and then enter a new long URL to update your link. It will redirect to an updated long URL.