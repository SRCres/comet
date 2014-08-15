define([
  'jquery',
  'underscore',
  'backbone',
  'three',
  'appConfig',
  'app'
], function($, _, Backbone, THREE, appConfig, App) {
  var PlanetView = Backbone.View.extend({
    initialize: function() {
      var material = new THREE.MeshLambertMaterial({
            color: this.model.get('color')
          }),
          radius = this.model.get('radius'),
          position = this.model.get('position'),
          sphereGeometry = new THREE.SphereGeometry(radius, appConfig.render.sphere.width_segments, appConfig.render.sphere.height_segments);
      
      this.sphere = new THREE.Mesh(sphereGeometry, material);
      this.sphere.position = new THREE.Vector3(position.x, position.y, 0);

      App.scene.add(this.sphere);

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.destroy);
    },

    render: function() {
      var position = this.model.get('position');
      this.sphere.position.x = position.x;
      this.sphere.position.y = position.y;
    },

    destroy: function() {
      App.scene.remove(this.sphere);
      this.remove();
    }
  });

  return PlanetView;
});