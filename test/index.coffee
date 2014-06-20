process.env.NODE_ENV = 'test'
app = require('../server.coffee')
Browser = require('zombie')
assert = require('assert')
http = require('http')
expect = require('chai').expect

describe 'home page', ->
	
	before (done) -> 
    @server = http.createServer(app).listen 3000
    @browser = new Browser { site: 'http://localhost:3000' }
    @browser.visit '/', done

  it 'should show a search form', ->
    assert.ok @browser.success
    assert.ok @browser.query 'input'
    assert.ok @browser.button '#submit'

  after () ->
  	@server.close()
