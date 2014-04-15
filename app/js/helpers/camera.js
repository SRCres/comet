define([
  'jquery',
  'three',
  'app'
], function($, THREE, App) {
  var w = App.container.innerWidth(),
      h = App.container.innerHeight(),
      //camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
      camera = new THREE.OrthographicCamera(w / - 2,w / 2, h / 2, h / - 2, 1, 1000);
  camera.position.z = 400;

  var updateSize = function() {
    var w = App.container.innerWidth(),
        h = App.container.innerHeight();

    if (camera instanceof THREE.OrthographicCamera) {
      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;
    } else {
      camera.aspect = w / h;
    }

    camera.updateProjectionMatrix();
  };
  $(window).resize(updateSize);
  updateSize();

  return camera;
});