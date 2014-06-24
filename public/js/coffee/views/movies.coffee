class App.View.Movies extends App.View
  template: "page_movie"

  model: new App.Model.Movie

  initialize: ->
  	if @$el.data('id') and @$el.hasClass('movie-result')
  		@template = "movie_result"
  		@listenTo @model, "change", @render_as_search_result
  		@model.fetch({url: "#{App.api.baseUrl}/movie/#{@$el.data('id')}", data: $.param({api_key: App.api.key})})

  render_as_search_result: ->
  	@model.set({"image_url": "#{App.api.images.base_url}#{App.api.images.poster_sizes[1]}#{@$el.data('poster-path')}"})
  	@render()