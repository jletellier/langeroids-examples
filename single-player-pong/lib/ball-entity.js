var langeroids = require('langeroids');
var _ = langeroids._;
var Timer = require('langeroids/lib/timer');

var defaults = {
    radius: 8,
    posX: 196,
    posY: 0
};

var PedalEntity = module.exports = function(settings) {
    _.extend(this, defaults, settings);
};

_.extend(PedalEntity.prototype, {
    onInit: function(game) {
        this.posX = Math.random() * (400 - this.radius * 2) + this.radius;
    },

    onUpdate: function() {
        this.posY += 1;
    },

    onDraw: function(renderer) {
        var ctx = renderer.ctx;
        ctx.fillStyle = 'rgba(154,50,15,0.8)';
        ctx.beginPath();
        ctx.arc(this.posX + this.radius, this.posY + this.radius, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
});