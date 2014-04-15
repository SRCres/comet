define([
  'box2d'
], function(Box2D) {
  var gravity = new Box2D.b2Vec2(0, 0),
      world = new Box2D.b2World(gravity, true);

  return world;
});