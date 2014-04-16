define([
  'backbone',
  'js/models/Comet'
], function(Backbone, CometModel) {
  var CometsCollection = Backbone.Collection.extend({
    model: CometModel
  });

  return CometsCollection;
});