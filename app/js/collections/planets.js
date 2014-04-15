define([
  'backbone',
  'js/models/planet'
], function(Backbone, PlanetModel) {
  var PlanetsCollection = Backbone.Collection.extend({
    model: PlanetModel
  });

  return PlanetsCollection;
});