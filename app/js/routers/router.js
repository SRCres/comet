define([
  'backbone'
], function(Backbone) {
  AppRouter = Backbone.Router.extend({
    routes: {
      'init': 'init'
    },

    init: function() {

    }
  });

  return AppRouter;
});