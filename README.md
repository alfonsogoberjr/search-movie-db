# Search The Movie Database

An api-driven Backbone app in Node.js

## Local requirements

    npm install -g coffee-script nodemon grunt-cli
    gem install sass bourbon neat

### Install required local packages

    npm install

### Start app with grunt (development)

In your Terminal, simply type

    grunt

to start the server. That's it! Grunt takes care of the nodemon, sass, and compass tasks concurrently. This means the app will restart after crashes, automatically compile and build stylesheets, and minify javascripts and css output.

## Testing

Mocha and ZombieJS testing is configured to run automated unit tests. To run all tests, enter

	grunt test

