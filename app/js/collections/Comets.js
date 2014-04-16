define([
  'backbone',
  'js/models/comet'
], function(Backbone, CometModel) {
  var CometsCollection = Backbone.Collection.extend({
    model: CometModel
  });

  return CometsCollection;
});