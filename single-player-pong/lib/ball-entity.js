var langeroids = require('langeroids');
var THREE = require('three');

var defaults = {
    radius: 0.5,
    posX: 0,
    posY: 9,
    speed: 0.09,
    velX: 0,
    velY: 0
};

var proto = {
    onInit: function() {
        this.mainLogic = this.getComponent('main-logic');
        this.scene = this.mainLogic.scene;

        var geometry = new THREE.CircleGeometry(this.radius, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.circle = new THREE.Mesh(geometry, material);

        this.scene.add(this.circle);

        var dir = Math.PI + (Math.random() * Math.PI);
        this.velX = Math.cos(dir) * this.speed;
        this.velY = Math.sin(dir) * this.speed;
    },

    onUpdate: function() {
        this.move();

        this.circle.position.x = this.posX;
        this.circle.position.y = this.posY;
    },

    move: function() {
        this.posX += this.velX;
        this.posY += this.velY;

        var xMin = -this.mainLogic.width + this.radius;
        var xMax = this.mainLogic.width - this.radius;
        var yMin = -this.mainLogic.height + this.radius;
        var yMax = this.mainLogic.height - this.radius;

        if (this.posX < xMin || this.posX > xMax) this.velX = -this.velX;
        if (this.posY < yMin || this.posY > yMax) this.velY = -this.velY;

        if (this.posX < xMin) {
            this.posX = xMin;
        }
        else if (this.posX > xMax) {
            this.posX = xMax;
        }

        if (this.posY < yMin) {
            this.posY = yMin;
        }
        else if (this.posY > yMax) {
            this.posY = yMax;
        }
    }
};

module.exports = langeroids.createComponent(defaults, proto);