'use strict';

var PIXI = require('pixi.js');

var GroundEntity = require('./ground-entity');
var BulletEntity = require('./bullet-entity');

var defaults = {
    BULLET_SPAWN_INTERVAL: 1800,
    BULLET_COLOR_CHANGE_INTERVAL: 8000,
    BULLET_COLORS: [ '0x1e90ff', '0x3cb371', '0xdaa520', '0x8a2be2', '0xcd0000' ],
    BULLET_MIN_FORCE_X: 120,
    BULLET_MAX_FORCE_X: 320,
    BULLET_MIN_FORCE_Y: -240,
    BULLET_MAX_FORCE_Y: -400,

    currentBulletColor: 0
};

var MainLogic = function(settings) {
    Object.assign(this, defaults, settings);
};

Object.assign(MainLogic.prototype, {
    onInit: function() {
        this.renderer = new PIXI.WebGLRenderer(300, 100);
        document.body.appendChild(this.renderer.view);
        this.graphics = new PIXI.Graphics();

        this.em = this.getComponent('entity-manager');
        this.em.add(new GroundEntity());

        var animationLoop = this.getComponent('animation-loop');

        // timers for generated entities
        this.bulletColorChangeTimer = animationLoop.getTimer(this.BULLET_COLOR_CHANGE_INTERVAL);
        this.bulletTimer = animationLoop.getTimer(this.BULLET_SPAWN_INTERVAL);
        this.bulletTimer2 = animationLoop.getTimer(this.BULLET_SPAWN_INTERVAL + 120);

        this.currentBulletColor = getRandomInt(4, this.BULLET_COLORS.length - 1);
    },

    onUpdate: function() {
        // change bullet color
        if (this.bulletColorChangeTimer.done(true)) {
            this.currentBulletColor = getRandomInt(0, this.BULLET_COLORS.length - 1);
        }

        // throw bullets
        if (this.bulletTimer.done(true)) {
            this.em.add(new BulletEntity({
                posX: -5,
                posY: 50,
                forceX: getRandomInt(this.BULLET_MIN_FORCE_X, this.BULLET_MAX_FORCE_X),
                forceY: getRandomInt(this.BULLET_MIN_FORCE_Y, this.BULLET_MAX_FORCE_Y),
                color: this.BULLET_COLORS[this.currentBulletColor]
            }));
        }
        if (this.bulletTimer2.done(true)) {
            this.em.add(new BulletEntity({
                posX: 305,
                posY: 70,
                forceX: getRandomInt(-this.BULLET_MIN_FORCE_X, -this.BULLET_MAX_FORCE_X),
                forceY: getRandomInt(this.BULLET_MIN_FORCE_Y, this.BULLET_MAX_FORCE_Y),
                color: this.BULLET_COLORS[this.currentBulletColor]
            }));
        }

        this.graphics.clear();
        this.emit('draw', this.graphics);
        this.renderer.render(this.graphics);
    }
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = MainLogic;
