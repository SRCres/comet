define([
  'jquery',
  'three',
  'app'
], function($, THREE, App) {
  var renderer = new THREE.WebGLRenderer({ clearColor: 0x000000, antialias: true });

  App.container.append(renderer.domElement);

  var updateSize = function() {
    renderer.setSize(App.container.innerWidth(), App.container.innerHeight());
  };
  $(window).resize(updateSize);
  updateSize();

  return renderer;
});