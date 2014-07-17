define([
  'box2d',
  'appConfig',
  'app',
  'js/collections/Comets',
  'js/collections/Planets',
  'js/models/Comet',
  'js/models/Planet',
  'js/views/Comet',
  'js/views/Planet',
  'js/views/app'
], function(
  Box2D,
  appConfig,
  App,
  CometsCollection,
  PlanetsCollection,
  CometModel,
  PlanetModel,
  CometView,
  PlanetView,
  appView
) {
  var appController = {
    contactListener: new Box2D.b2ContactListener(),
    collisions: [],

    initialize: function() {
      this.cometsCollection = new CometsCollection();
      this.planetsCollection = new PlanetsCollection();

      appView.on('add:astronomy-object', function(config) {
        this.addAstronomyObject((appView.isShifted ? 'planet' : 'comet'), config);
      }.bind(this));

      this.initContactListener();

      this.animate();
    },

    initContactListener: function() {
      Box2D.customizeVTable(this.contactListener, [{
        original: Box2D.b2ContactListener.prototype.BeginContact,
        replacement: function(thsPtr, contactPointer) {
          var contact = Box2D.wrapPointer(contactPointer, Box2D.b2Contact),
              fixtureA = contact.GetFixtureA(),
              fixtureB = contact.GetFixtureB(),
              bodyA = fixtureA.GetBody(),
              bodyB = fixtureB.GetBody();

          this.collisions.push({ object: bodyA, contactedObject: bodyB });
          this.collisions.push({ object: bodyB, contactedObject: bodyA });
        }.bind(this)
      }]);

      App.world.SetContactListener(this.contactListener);
    },

    animate: function() {
      requestAnimationFrame(this.animate.bind(this));

      App.world.Step(1/appConfig.fps, appConfig.velocity_iterations, appConfig.position_iterations);

      this.cometsCollection.each(function(comet) {
        var cometBody = comet.body,
            cometPosition = cometBody.GetWorldCenter();

        this.planetsCollection.each(function(planet) {
          var planetBody = planet.body,
              planetPosition = planetBody.GetWorldCenter(),
              distance = new Box2D.b2Vec2(0, 0),
              force;

          distance.set_x(cometPosition.get_x() - planetPosition.get_x());
          distance.set_y(cometPosition.get_y() - planetPosition.get_y());

          force = App.G*((cometBody.GetMass()*(planet.get('mass')/appConfig.conversion.factor))/Math.pow(distance.Length(), 2));

          distance.op_mul(-force);
          cometBody.ApplyForce(distance, cometPosition);
        });

        comet.set('position', {
          x: cometPosition.get_x()*appConfig.conversion.factor,
          y: cometPosition.get_y()*appConfig.conversion.factor,
          z: 0
        });
      }, this);

      _.each(this.collisions, function(collision) {
        if (collision.object.model.get('type') === 'comet') {
          collision.object.model.contact();
        }
      }, this);

      this.collisions = [];

      App.renderer.render(App.scene, App.camera);
    },

    addAstronomyObject: function(astronomyObject, data) {
      var config = { type: astronomyObject },
          model,
          view;
          
      switch(astronomyObject) {
        case 'comet':
          config.initial_force = data.distance;
          config.position = data.position;
          config.radius = appConfig.comet.radius;
          model = new CometModel(config);
          view = new CometView({ model: model });
          this.cometsCollection.add(model);
          break;

        case 'planet':
          config.radius = data.radius;
          config.mass = data.radius * appConfig.planet.mass_mult;
          config.position = data.position;
          config.color = Math.round(Math.random()*0xFFFFFF);
          model = new PlanetModel(config);
          view = new PlanetView({ model: model });
          this.planetsCollection.add(model);
          break;
      }
    }
  };

  return appController;
});