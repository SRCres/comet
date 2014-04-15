require.config({
  paths: {
    backbone: 'vendor/backbone/backbone',
    underscore: 'vendor/underscore/underscore',
    jquery: 'vendor/jquery/dist/jquery',
    three: 'vendor/threejs/build/three',
    box2d: 'vendor/box2d.js/box2d.umd'
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
    three: {
      exports: 'THREE'
    }
  }
});