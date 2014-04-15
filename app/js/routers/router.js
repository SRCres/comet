define([
  'backbone',
  'app',
  'js/helpers/world',
  'js/helpers/camera',
  'js/helpers/scene',
  'js/helpers/renderer',
  'js/helpers/ambientLight',
  'js/helpers/directionalLight',
  'js/controllers/app'
], function(Backbone, App, world, camera, scene, renderer, ambientLight, directionalLight, appController) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'home': 'init',
      '*actions': 'init'
    },

    init: function() {
      App.world = world;
      App.camera = camera;
      App.renderer = renderer;
      App.scene = scene;
      App.ambientLight = ambientLight;
      App.directionalLight = directionalLight;

      App.scene.add(App.camera);
      //App.scene.add(App.ambientLight);
      App.scene.add(App.directionalLight);

      appController.initialize();
    }
  });

  return AppRouter;
});