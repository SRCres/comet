define([
  'jquery',
  'underscore',
  'backbone'
],
function($, _, Backbone) {
  var AppView = Backbone.View.extend({
    el: '#comet-container',

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.text('Hello Comet!');
    }
  });

  return AppView;
});