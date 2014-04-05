require.config({
  paths: {
    backbone: 'vendor/backbone/backbone',
    underscore: 'vendor/underscore/underscore',
    jquery: 'vendor/jquery/dist/jquery',
    box2d: 'vendor/box2D/box2d',
    threejs: 'vendor/threejs/build/threejs'
  },

  shim: {
    jquery: {
      exports: 'jQuery'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    box2d: {
      exports: 'Box2D'
    },
    threejs: {
      exports: 'THREE'
    }
  }
});