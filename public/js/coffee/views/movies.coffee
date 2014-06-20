class App.View.Movies extends App.View
  template: "page_movie"

  model: new App.Model.Movie

  initialize: ->
    @listenTo @model, "change", @render
    @listenToOnce @model, "change", @render_title
    @model.fetch({data: $.param({id: @$el.data('id'), api_key: App.api.key})})
