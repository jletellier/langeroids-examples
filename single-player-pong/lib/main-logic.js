var langeroids = require('langeroids');
var _ = langeroids._;
var Timer = require('langeroids/lib/timer');

var PedalEntity = require('./pedal-entity');
var BallEntity = require('./ball-entity');

var defaults = {

};

var MainLogic = module.exports = function(settings) {
    _.extend(this, defaults, settings);
};

_.extend(MainLogic.prototype, {
    onInit: function(game) {
        this.pedal = new PedalEntity();
        this.ball = new BallEntity();
    },

    onUpdate: function() {
        this.ball.onUpdate();
    },

    onKeydown: function(input) {
        if (input.lastKey === 37) {
            this.pedal.moveLeft();
        }
        else if (input.lastKey === 39) {
            this.pedal.moveRight();
        }
    },

    onDraw: function(renderer) {
        renderer.clear('rgb(0,0,0)');
        this.pedal.onDraw(renderer);
        this.ball.onDraw(renderer);
    }
});