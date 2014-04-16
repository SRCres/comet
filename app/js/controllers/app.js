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
], function(Box2D, appConfig, App, CometsCollection, PlanetsCollection, CometModel, PlanetModel, CometView, PlanetView, appView) {
  var appController = {
    initialize: function() {
      this.cometsCollection = new CometsCollection();
      this.planetsCollection = new PlanetsCollection();

      appView.on('add:astronomy-object', function(config) {
        this.addAstronomyObject((appView.isShifted ? 'planet' : 'comet'), config);
      }.bind(this));

      this.animate();
    },

    animate: function() {
      requestAnimationFrame(this.animate.bind(this));

      App.world.Step(1/appConfig.fps, appConfig.velocity_iterations, appConfig.position_iterations);

      for (var i = 0; i < this.cometsCollection.length; i++) {
        var comet = this.cometsCollection.at(i),
            cometBody = comet.body,
            cometPosition = cometBody.GetWorldCenter();

        for (var j = 0; j < this.planetsCollection.length; j++) {
          var planet = this.planetsCollection.at(j),
              planetBody = planet.body,
              planetPosition = planetBody.GetWorldCenter(),
              distance = new Box2D.b2Vec2(0, 0),
              force;

          distance.set_x(cometPosition.get_x() - planetPosition.get_x());
          distance.set_y(cometPosition.get_y() - planetPosition.get_y());

          force = App.G*((cometBody.GetMass() * (planet.get('mass') / appConfig.conversion.factor)) / Math.pow(distance.Length(), 2));

          distance.op_mul(-force);
          cometBody.ApplyForce(distance, cometPosition);
        }

        comet.set('position', {
          x: cometPosition.get_x() * appConfig.conversion.factor,
          y: cometPosition.get_y() * appConfig.conversion.factor,
          z: 0
        });
      }

      App.renderer.render(App.scene, App.camera);
    },

    addAstronomyObject: function(astronomyObject, data) {
      var config = {},
          model;
      switch(astronomyObject) {
        case 'comet':
          config.initial_force = data.distance;
          config.position = data.position;
          config.radius = appConfig.comet.radius;
          model = new CometModel(config);
          new CometView({ model: model });
          this.cometsCollection.add(model);
          break;
        case 'planet':
          config.radius = data.radius;
          config.mass = data.radius * appConfig.planet.mass_mult;
          config.position = data.position;
          model = new PlanetModel(config);
          new PlanetView({ model: model });
          this.planetsCollection.add(model);
          break;
      }
    }

  };

  return appController;
});