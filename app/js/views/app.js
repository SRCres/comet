define([
  'jquery',
  'underscore',
  'backbone',
  'appConfig',
  'app'
], function($, _, Backbone, appConfig, App) {
  var AppView = Backbone.View.extend({
    el: '#comet-container',
    isShifted: false,
    startPosition: null,
    endPosition: null,
    distance: {},
    radius: 0,
    handler: null,

    events: {
      'mousedown': 'onMouseDown',
      'mouseup': 'onMouseUp'
    },

    initialize: function() {
      $(document).on('keydown keyup', this.onKeypress.bind(this));
    },

    onKeypress: function(evt) {
      this.isShifted = evt.shiftKey;
      if (evt.type === 'keyup') {
        this.$el.off('mousemove');
      }
    },

    onMouseDown: function(evt) {
      this.startPosition = this.getMousePosition(evt.clientX, evt.clientY);
      this.distance = { x: 0, y: 0 };
      this.$el.off('mousemove');
      this.$el.on('mousemove', this.onMouseMove.bind(this));
    },

    onMouseMove: function(evt) {
      this.endPosition = this.getMousePosition(evt.clientX, evt.clientY);
      this.distance = {
        x: this.endPosition.x - this.startPosition.x,
        y: this.endPosition.y - this.startPosition.y
      };
      this.radius = Math.sqrt(
        Math.pow(this.endPosition.x - this.startPosition.x, 2) +
        Math.pow(this.endPosition.y - this.startPosition.y, 2)
      );

      if (this.isShifted) {
        this.clearPlanetHandler();
        this.showPlanetHandler();
      } else {
        this.clearCometHandler();
        this.showCometHandler();
      }
    },

    onMouseUp: function(evt) {
      if (this.isShifted) {
        this.clearPlanetHandler();
      } else {
        this.clearCometHandler();
      }
      this.$el.off('mousemove');
      this.trigger('add:astronomy-object', {
        position: this.startPosition,
        distance: this.distance,
        radius: this.radius
      });
    },

    showPlanetHandler: function() {
      var material = new THREE.LineBasicMaterial({ color: 0x00B7FF, linewidth: 3 }),
          geometry = new THREE.CircleGeometry(this.radius, appConfig.render.circle.segments),
          vector = new THREE.Vector3(this.startPosition.x, this.startPosition.y, this.startPosition.z);
      
      geometry.vertices.shift();

      this.planetHandler = new THREE.Line(geometry, material);
      this.planetHandler.position = vector;

      App.scene.add(this.planetHandler);
    },

    clearPlanetHandler: function() {
      App.scene.remove(this.planetHandler);
    },

    showCometHandler: function() {
      var material = new THREE.LineBasicMaterial({ color: 0x00B7FF, linewidth: 3 }),
          geometry = new THREE.Geometry(),
          vector1 = new THREE.Vector3(this.startPosition.x, this.startPosition.y, this.startPosition.z),
          vector2 = new THREE.Vector3(this.endPosition.x, this.endPosition.y, this.endPosition.z);

      geometry.vertices.push(vector1);
      geometry.vertices.push(vector2);
      this.cometHandler = new THREE.Line(geometry, material);

      App.scene.add(this.cometHandler);
    },

    clearCometHandler: function() {
      App.scene.remove(this.cometHandler);
    },

    getMousePosition: function(clientX, clientY) {
      var projector = new THREE.Projector(),
          x = (clientX / App.renderer.domElement.width) * 2 - 1,
          y = - (clientY / App.renderer.domElement.height) * 2 + 1,
          vector = new THREE.Vector3(x, y),
          position;

      if (App.camera instanceof THREE.OrthographicCamera) {
        var ray = projector.pickingRay(vector, App.camera);
        position = vector.clone();
      } else {
        var direction, distance;
        projector.unprojectVector(vector, App.camera);
        direction = vector.sub(App.camera.position).normalize();
        distance = - App.camera.position.z / direction.z;
        position = App.camera.position.clone().add(direction.multiplyScalar(distance));
      }

      return { x: position.x, y: position.y, z: position.z };
    }

  });

  return new AppView();
});