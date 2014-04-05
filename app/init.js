require([
  'backbone',
  'js/views/app',
  'js/routers/router'
], function(Backbone, AppView, AppRouter) {
  new AppRouter();
  Backbone.history.start();

  new AppView();
});