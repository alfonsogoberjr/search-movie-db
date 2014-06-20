class App.View.People extends App.View
  template: "page_person"

  model: new App.Model.Person

  initialize: ->
  	if @$el.data('id') and @$el.hasClass('person-result')
  		@template = "person_result"
  		@listenTo @model, "change", @render_as_search_result
  		@model.fetch({url: "#{App.api.baseUrl}/person/#{@$el.data('id')}", data: $.param({api_key: App.api.key})})

  render_as_search_result: ->
  	@model.set({"image_url": "#{App.api.images.base_url}#{App.api.images.profile_sizes[1]}#{@$el.data('profile-path')}"})
  	@render()