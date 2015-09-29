var langeroids = require('langeroids');
var THREE = require('three');

var defaults = {
    width: 6,
    height: 2,
    posX: 0,
    posY: -20,
    step: 0.7
};

var proto = {
    onInit: function() {
        this.mainLogic = this.getComponent('main-logic');
        this.scene = this.mainLogic.scene;

        var geometry = new THREE.PlaneGeometry(this.width, this.height);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.plane = new THREE.Mesh(geometry, material);

        this.scene.add(this.plane);
    },

    onUpdate: function() {
        this.plane.position.x = this.posX;
        this.plane.position.y = this.posY;
    },

    onMoveLeft: function() {
        this.move(-1);
    },

    onMoveRight: function() {
        this.move(1);
    },

    move: function(dir) {
        this.posX += this.step * dir;

        var xMin = -this.mainLogic.width + this.width / 2;
        var xMax = this.mainLogic.width - this.width / 2;
        if (this.posX < xMin) this.posX = xMin;
        if (this.posX > xMax) this.posX = xMax;
    }
};

module.exports = langeroids.createComponent(defaults, proto);