class App.View.Home extends App.View
  template: "page_home"

  events: {
  	'click #submit': 'search'
  	'keypress input[type=search]': 'enter'
  }

  model: new App.Model.Search

  initialize: ->
  	@render()
  	@render_title()
  	@listenTo @model, "change", @parse_search_results
  	App.models[App.models.length] = @model

  search: ->
  	query = $('input[type=search]').val()
  	if query
      console.log "Search for #{query}"
      previousTerm = App.search_history[(App.search_history.length-1)] unless not App.search_history.length
      if query isnt previousTerm
        $('.search-results').empty()
        $('.person-result').empty()
        $('.movie-result').empty()
        @model.fetch({data: $.param({query: query, api_key: App.api.key})})
        App.search_history.push(query)
      else
        return
  	else
  		toastr.error "Please enter a name."

  parse_search_results: ->
  	if @model.get('results').length
      result = @model.get('results')[0]
      @search_person(result) if result.name
      @search_movie(result) if result.title

      if not result.name and not result.title
        toastr.error "No results found. Try a different search term."

  	else toastr.error "No results found. Try a different search term."

  enter: (e) ->
  	@search() if e.keyCode == 13

  parse_date: (str) ->
  	date = new Date(str)
  	return "#{date.getMonth()}/#{date.getDate()}/#{date.getFullYear()}"

  search_person: (person) ->
    $('.person-result').data({
      'profile-path': person.profile_path
      'id': person.id
      })
    @person = new App.View.People(el: $('.person-result'))
        
    $.ajax "#{App.api.baseUrl}/person/#{person.id}/combined_credits?api_key=#{App.api.key}",
      type: 'GET'
      context: @
      error: (jqXHR, textStatus, errorThrown) ->
        $('body').append "AJAX Error: #{textStatus}"
      success: (data, textStatus, jqXHR) ->
        if data and data.cast
          roles = _.sortBy data.cast, (o) -> 
            return o.release_date
          roles.reverse()
          self = @
          for role in roles
            role.release_date = self.parse_date(role.release_date) if role.release_date
            role.poster_url = "#{App.api.images.base_url}#{App.api.images.poster_sizes[1]}#{role.poster_path}" if role.poster_path
            self.render {data: role, template: "search_result", method: "append", element: $('.search-results')}

        else toastr.error "No roles were found for #{person.name}"

   search_movie: (movie) ->
    $('.movie-result').data({
      'poster-path': movie.poster_path
      'id': movie.id
      })
    @movie = new App.View.Movies(el: $('.movie-result'))