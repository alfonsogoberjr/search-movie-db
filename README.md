# Search The Movie Database

An api-driven Backbone app in Node.js

## About

As part of a challenge, I was to write a web application that will allow you to search for an actor’s name (ex. Bill Murray) and list the movies Bill Murray has acted in chronological order. You should be able to search for any actor’s movies. Below are a few requirements for this project.

* Use [The Movie DB](http://www.themoviedb.org/) APIs
* Deploy working code to a free service such as Heroku (https://heroku.com/)
* Write all code as if it were going to be deployed into production.
* I had 3 days to complete this task (I did it in two!)

## Local requirements

    npm install -g coffee-script nodemon grunt-cli
    gem install sass bourbon neat

### Install required local packages

    npm install

### Start app with grunt

In your Terminal, simply type

    grunt

to start the server. That's it! Grunt takes care of the nodemon, sass, and compass tasks concurrently. This means the app will restart after crashes, automatically compile and build stylesheets, and minify javascripts and css output.

## Testing

Mocha and ZombieJS testing is configured to run automated unit tests. To run all tests, enter

	grunt test

