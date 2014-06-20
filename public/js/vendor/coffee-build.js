(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.App = {
    views: {},
    models: {},
    api: {
      baseUrl: 'https://api.themoviedb.org/3',
      key: 'f655c8635868fc68fe7ecf4d88e409f2'
    },
    current_query: "",
    init: function() {
      switch ($('[data-page]').data('page')) {
        case "home":
          this.views['App.View.Home'] = new this.View.Home({
            el: $('[data-page]')
          });
          break;
        case "person":
          if ($('[data-id]').length) {
            this.views['App.View.Person'] = new this.View.People({
              el: $('[data-page]')
            });
          }
          break;
        case "movie":
          if ($('[data-id]').length) {
            this.views['App.View.Movie'] = new this.View.Movies({
              el: $('[data-page]')
            });
          }
      }
      this.configureApi();
      return toastr.options = {
        "closeButton": true,
        "timeOut": "2500"
      };
    },
    configureApi: function() {
      return $.ajax("/api/images", {
        type: 'GET',
        error: function(jqXHR, textStatus, errorThrown) {
          return console.error("Error: Could not configure API!");
        },
        success: function(data, textStatus, jqXHR) {
          return App.api.images = data;
        }
      });
    }
  };

  App.Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Backbone.Model);

  App.Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Backbone.Collection);

  App.View = (function(_super) {
    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.initialize = function() {
      return console.log("App.View initialized.");
    };

    View.prototype.render = function(opts) {
      var options;
      options = {
        template: this.template,
        data: this.model.attributes,
        method: "html",
        element: this.$el
      };
      if (this.$el.data('template')) {
        options.template = this.$el.data('template');
      }
      if (opts) {
        if (opts.template) {
          options.template = opts.template;
        }
        if (opts.data) {
          options.data = opts.data;
        }
        if (opts.method) {
          options.method = opts.method;
        }
        if (opts.element) {
          options.element = opts.element;
        }
      }
      return dust.render(options.template, options.data, (function(_this) {
        return function(err, out) {
          if (!err) {
            return $(options.element)[options.method](out);
          }
        };
      })(this));
    };

    View.prototype.render_title = function() {
      return this.render({
        data: this.model.get('data'),
        template: "title",
        element: $('title')
      });
    };

    return View;

  })(Backbone.View);

  $(function() {
    App.init();
    return $.ajaxSetup({
      cache: false
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Model.Movie = (function(_super) {
    __extends(Movie, _super);

    function Movie() {
      return Movie.__super__.constructor.apply(this, arguments);
    }

    Movie.prototype.urlRoot = App.api.baseUrl + '/movie';

    return Movie;

  })(App.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Model.Person = (function(_super) {
    __extends(Person, _super);

    function Person() {
      return Person.__super__.constructor.apply(this, arguments);
    }

    Person.prototype.urlRoot = App.api.baseUrl + '/person';

    return Person;

  })(App.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Model.Search = (function(_super) {
    __extends(Search, _super);

    function Search() {
      return Search.__super__.constructor.apply(this, arguments);
    }

    Search.prototype.urlRoot = App.api.baseUrl + '/search/person';

    return Search;

  })(App.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.View.Home = (function(_super) {
    __extends(Home, _super);

    function Home() {
      return Home.__super__.constructor.apply(this, arguments);
    }

    Home.prototype.template = "page_home";

    Home.prototype.events = {
      'click #submit': 'search',
      'keypress input[type=search]': 'enter'
    };

    Home.prototype.model = new App.Model.Search;

    Home.prototype.initialize = function() {
      this.render();
      this.render_title();
      this.listenTo(this.model, "change", this.parse_search_results);
      return App.models[App.models.length] = this.model;
    };

    Home.prototype.search = function() {
      var query;
      query = $('input[type=search]').val();
      if (query) {
        console.log("Search for " + query);
        if (query !== App.current_query) {
          $('.search-results').empty();
          $('.person-result').empty();
          this.model.fetch({
            data: $.param({
              query: query,
              api_key: App.api.key
            })
          });
          return App.current_query = query;
        } else {

        }
      } else {
        return toastr.error("Please enter a name.");
      }
    };

    Home.prototype.parse_search_results = function() {
      var person;
      if (this.model.get('results').length) {
        person = this.model.get('results')[0];
        $('.person-result').data({
          'profile-path': person.profile_path,
          'id': person.id
        });
        this.person = new App.View.People({
          el: $('.person-result')
        });
        return $.ajax("" + App.api.baseUrl + "/person/" + person.id + "/combined_credits?api_key=" + App.api.key, {
          type: 'GET',
          context: this,
          error: function(jqXHR, textStatus, errorThrown) {
            return $('body').append("AJAX Error: " + textStatus);
          },
          success: function(data, textStatus, jqXHR) {
            var role, roles, self, _i, _len;
            if (data && data.cast) {
              roles = _.sortBy(data.cast, function(o) {
                return o.release_date;
              });
              roles.reverse();
              self = this;
              for (_i = 0, _len = roles.length; _i < _len; _i++) {
                role = roles[_i];
                if (role.release_date) {
                  role.release_date = self.parse_date(role.release_date);
                }
                if (role.poster_path) {
                  role.poster_url = "" + App.api.images.base_url + App.api.images.poster_sizes[1] + role.poster_path;
                }
                self.render({
                  data: role,
                  template: "search_result",
                  method: "append",
                  element: $('.search-results')
                });
              }
            } else {
              toastr.error("No roles were found for " + person.name);
            }
            return console.log($('.search-result'));
          }
        });
      } else {
        return toastr.error("No person found. Try a different search term.");
      }
    };

    Home.prototype.enter = function(e) {
      if (e.keyCode === 13) {
        return this.search();
      }
    };

    Home.prototype.parse_date = function(str) {
      var date;
      date = new Date(str);
      return "" + (date.getMonth()) + "/" + (date.getDate()) + "/" + (date.getFullYear());
    };

    return Home;

  })(App.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.View.Movies = (function(_super) {
    __extends(Movies, _super);

    function Movies() {
      return Movies.__super__.constructor.apply(this, arguments);
    }

    Movies.prototype.template = "page_movie";

    Movies.prototype.model = new App.Model.Movie;

    Movies.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      this.listenToOnce(this.model, "change", this.render_title);
      return this.model.fetch({
        data: $.param({
          id: this.$el.data('id'),
          api_key: App.api.key
        })
      });
    };

    return Movies;

  })(App.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.View.People = (function(_super) {
    __extends(People, _super);

    function People() {
      return People.__super__.constructor.apply(this, arguments);
    }

    People.prototype.template = "page_person";

    People.prototype.model = new App.Model.Person;

    People.prototype.initialize = function() {
      if (this.$el.data('id') && this.$el.hasClass('person-result')) {
        this.template = "person_result";
        this.listenTo(this.model, "change", this.render_as_search_result);
        return this.model.fetch({
          url: "" + App.api.baseUrl + "/person/" + (this.$el.data('id')),
          data: $.param({
            api_key: App.api.key
          })
        });
      }
    };

    People.prototype.render_as_search_result = function() {
      this.model.set({
        "image_url": "" + App.api.images.base_url + App.api.images.profile_sizes[1] + (this.$el.data('profile-path'))
      });
      return this.render();
    };

    return People;

  })(App.View);

}).call(this);
