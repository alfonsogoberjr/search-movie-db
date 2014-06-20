express = require('express')
app     = express()
config 	= require('./../config')

module.exports = (core) ->
	app.set 'views', "./views/dust"

	app.get '/', (req, res) ->
		console.log 'GET /'.green
		res.render "page", {page: "home"}

	app.get '/api/images', (req, res) ->
		console.log 'GET /api/images'.green
		res.json config.images

	# App can be extended with hard routes for the actual pages
	###
	app.get '/person/:id', (req, res) ->
		console.log 'GET /person/'.green+req.params.id.green
		res.render "page", {page: "person", isbn: req.params.isbn}

	app.get '/movie/:id', (req, res) ->
		console.log 'GET /person/'.green+req.params.id.green
		res.render "page", {page: "movie", isbn: req.params.isbn}
	###

	return app
