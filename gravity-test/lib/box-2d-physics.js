'use strict';

var Box = window.Box2D;

var defaults = {
    id: 'physics',
    sortIndex: 1001,

    gravity: 9.81,
    b2scale: 0.1
};

var Box2dPhysics = function(settings) {
    Object.assign(this, defaults, settings);

    this.Box2D = Box;
};

Object.assign(Box2dPhysics.prototype, {
    onInit: function() {
        this.world = new this.Box2D.b2World(new this.Box2D.b2Vec2(0.0, this.gravity));
    },

    onUpdate: function() {
        this.world.Step(1 / 60, 3, 2);
    }
});

module.exports = Box2dPhysics;