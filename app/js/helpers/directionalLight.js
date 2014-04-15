define([
  'three'
], function(THREE) {
  var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(0, 0, 1).normalize();

  return directionalLight;
});