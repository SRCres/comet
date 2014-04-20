define([
  'backbone',
  'box2d',
  'appConfig',
  'app',
  'js/models/AstronomyObject'
], function(Backbone, Box2D, appConfig, App, AstronomyObject) {
  var CometModel = AstronomyObject.extend({
    initialize: function() {
      var shape = new Box2D.b2CircleShape();
      shape.set_m_p(new Box2D.b2Vec2(0, 0));
      shape.set_m_radius(this.get('radius') / appConfig.conversion.factor);

      var fixture_def = new Box2D.b2FixtureDef();
      fixture_def.set_restitution(0);
      fixture_def.set_friction(1);
      fixture_def.set_density(1);
      fixture_def.set_shape(shape);

      var body_def = new Box2D.b2BodyDef(),
          position = new Box2D.b2Vec2(
            this.get('position').x / appConfig.conversion.factor,
            this.get('position').y / appConfig.conversion.factor
          );
      body_def.set_type(Box2D.b2_dynamicBody);
      body_def.set_position(position);

      var force = new Box2D.b2Vec2(
        this.get('initial_force').x / appConfig.conversion.factor,
        this.get('initial_force').y / appConfig.conversion.factor
      );
      force.op_mul(-appConfig.conversion.factor * 0.5);

      this.body = App.world.CreateBody(body_def);
      this.body.CreateFixture(fixture_def);
      this.body.SetLinearVelocity(force, position);
      this.body.model = this;
    },

    contact: function(contactBody) {
      this.destroy();
    }
  });

  return CometModel;
});