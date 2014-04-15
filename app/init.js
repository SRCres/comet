require([
  'backbone',
  'app',
  'js/routers/router'
], function(Backbone, App, AppRouter) {
  new AppRouter();
  Backbone.history.start();

  App.initialize();
});