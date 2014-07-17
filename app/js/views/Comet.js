define([
  'jquery',
  'underscore',
  'backbone',
  'three',
  'appConfig',
  'app'
], function($, _, Backbone, THREE, appConfig, App) {
  var CometView = Backbone.View.extend({
    initialize: function() {
      var sphereMaterial = new THREE.MeshLambertMaterial({
            color: this.model.get('color')
          }),
          radius = this.model.get('radius'),
          position = this.model.get('position'),
          sphereGeometry = new THREE.SphereGeometry(radius, appConfig.render.sphere.width_segments, appConfig.render.sphere.height_segments);
      
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      this.sphere.position = new THREE.Vector3(position.x, position.y, 0);
      App.scene.add(this.sphere);

      var pathMaterial = new THREE.LineDashedMaterial({
            color: 0xFFFFFF,
            dashSize: 10,
            gapSize: 10
          }),
          pathGeometry = new THREE.Geometry();

      this.vertices = [];
      for (var i = 0; i < 100; i++) {
        this.vertices.push(this.sphere.position.clone());
      }
      pathGeometry.vertices = this.vertices;

      this.path = new THREE.Line(pathGeometry, pathMaterial);
      App.scene.add(this.path);

      this.listenTo(this.model, 'change:position', this.render);
      this.listenTo(this.model, 'destroy', this.destroy);
    },

    renderPath: function() {
      this.vertices.pop();
      this.vertices.unshift(this.sphere.position.clone());
      this.path.geometry.vertices = this.vertices;
      this.path.geometry.computeLineDistances();
      this.path.geometry.verticesNeedUpdate = true;
      this.path.geometry.lineDistancesNeedUpdate = true;
    },

    render: function() {
      var position = this.model.get('position');
      this.sphere.position.x = position.x;
      this.sphere.position.y = position.y;
      this.renderPath();
    },

    destroy: function() {
      App.scene.remove(this.sphere);
      App.scene.remove(this.path);
      this.remove();
    }
  });

  return CometView;
});