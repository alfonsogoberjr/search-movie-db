window.App =
  views: {}
  models: {}
  api: {
    baseUrl: 'https://api.themoviedb.org/3'
    key: 'f655c8635868fc68fe7ecf4d88e409f2'
  }
  search_history: []

  init: ->
    switch $('[data-page]').data('page')
      when "home" then @views['App.View.Home'] = new @View.Home(el: $('[data-page]'))
      when "person" then @views['App.View.Person'] = new @View.People(el: $('[data-page]')) if $('[data-id]').length
      when "movie" then @views['App.View.Movie'] = new @View.Movies(el: $('[data-page]')) if $('[data-id]').length

    @configureApi()
    toastr.options = {
      "closeButton": true
      "timeOut": "2500"
    }

  configureApi: ->
    $.ajax "/api/images",
        type: 'GET'
        error: (jqXHR, textStatus, errorThrown) ->
            console.error "Error: Could not configure API!"
        success: (data, textStatus, jqXHR) ->
            App.api.images = data

class App.Model extends Backbone.Model

class App.Collection extends Backbone.Collection

class App.View extends Backbone.View

  initialize: ->
    console.log "App.View initialized."

  render: (opts) ->
    options = {
      template: @template  
      data: @model.attributes
      method: "html"
      element: @$el
    }

    options.template = @$el.data('template') if @$el.data('template')

    if opts
      options.template = opts.template if opts.template
      options.data = opts.data if opts.data
      options.method = opts.method if opts.method
      options.element = opts.element if opts.element

    dust.render options.template, options.data, (err, out) =>
      $(options.element)[options.method](out) unless err
      @check_height()

  render_title: ->
    @render {data: @model.get('data'), template: "title", element: $('title')}

  check_height: ->
    if $('.search-results').height() >= $('body').height()
      $('main').removeClass('full-height')
    else
      $('main').addClass('full-height')

$ ->
  App.init()
  $.ajaxSetup { cache: false }
