var langeroids = require('langeroids');
var THREE = require('three');

var PedalEntity = require('./pedal-entity');
var BallEntity = require('./ball-entity');

var defaults = {
    id: 'main-logic',

    width: 20,
    height: 20
};

var proto = {
    onInit: function() {
        this.pedalEntity = new PedalEntity();
        this.ballEntity = new BallEntity();

        this.initThree();

        this.em = this.getComponent('entity-manager');
        this.em.add(this.pedalEntity);
        this.em.add(this.ballEntity);

        this.leftKeyPressed = false;
        this.rightKeyPressed = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
        document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    },

    initThree: function() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-this.width, this.width, this.height, -this.height, 1, 1000);

        var renderer = this.renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        this.camera.position.z = 5;
    },

    handleKeyDown: function(e) {
        if (e.which === 37) this.leftKeyPressed = true;
        else if (e.which === 39) this.rightKeyPressed = true;
    },

    handleKeyUp: function(e) {
        if (e.which === 37) this.leftKeyPressed = false;
        else if (e.which === 39) this.rightKeyPressed = false;
    },

    onUpdate: function() {
        if (this.leftKeyPressed) this.emit('moveLeft');
        if (this.rightKeyPressed) this.emit('moveRight');

        this.renderer.render(this.scene, this.camera);
    }
};

module.exports = langeroids.createComponent(defaults, proto);