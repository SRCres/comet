define([
  'backbone',
  'js/models/Planet'
], function(Backbone, PlanetModel) {
  var PlanetsCollection = Backbone.Collection.extend({
    model: PlanetModel
  });

  return PlanetsCollection;
});