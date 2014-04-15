define([
  'backbone'
], function(Backbone) {
  var AstronomyObject = Backbone.Model.extend({
    defaults: {
      mass: 0,
      radius: 0,
      color: 0x999999,
      position: { x: 0, y: 0, z: 0 }
    },

    initialize: function() {

    },

    toGrow: function() {

    }
  });

  return AstronomyObject;
});