var langeroids = require('langeroids');
var _ = langeroids._;
var Timer = require('langeroids/lib/timer');

var defaults = {
    width: 80,
    height: 20,
    posX: 160,
    posY: 370,
    step: 5
};

var PedalEntity = module.exports = function(settings) {
    _.extend(this, defaults, settings);
};

_.extend(PedalEntity.prototype, {
    onInit: function(game) {

    },

    onUpdate: function() {

    },

    moveLeft: function() {
        this.move(-1);
    },

    moveRight: function() {
        this.move(1);
    },

    move: function(dir) {
        this.posX += this.step * dir;

        var xMax = 400 - this.width - 1;
        if (this.posX < 0) this.posX = 0;
        if (this.posX > xMax) this.posX = xMax;
    },

    onDraw: function(renderer) {
        var ctx = renderer.ctx;
        ctx.fillStyle = 'hsla(100,61%,56%,0.5)';
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
});