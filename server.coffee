###########################################################
#																													#
#								Zola Books in Node.js!										#
#																													#
###########################################################

#	Module variables instantiated.
express			= require("express")
path				= require("path")
dust 				= require("dustjs-linkedin")
cons 				= require("consolidate")
moment 			= require('moment')
colors 			= require('colors')
favicon     = require('serve-favicon')

#	Set the app
app	= express()

#	Set the server port
app.set 'port', process.env.PORT or 9001
app.set 'version', require('./package').version
app.set 'description', require('./package').description

#	Configure dust templates
app.engine "dust", cons.dust
app.set "view engine", "dust"

#	Configure client-side
app.use express.static "#{__dirname}/public"
app.use '/', require('./routes')(app)

#	Configure favicon
#app.use favicon("#{__dirname}/public/favicon.png")

#	Create the server with timestamp
server = require('http').createServer(app)
server.listen app.get("port"), ->
	now = new Date()
	timestamp = moment().format('D MMM H:mm:ss')
	console.log("%s - %s v%s ("+"%s".blue+") port "+"%d".red, timestamp, app.get('description'), app.get('version'), app.get('env'), app.get('port'))

#	Handle crashes
process.on 'SIGINT', ->
  setTimeout ->
    console.error "Forcefully shutting down".red
    process.exit(1)
  , 1000

module.exports = app
