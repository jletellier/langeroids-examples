var langeroids = require('langeroids');
var THREE = require('three');

var PedalEntity = require('./pedal-entity');
var BallEntity = require('./ball-entity');

var defaults = {
    id: 'main-logic',

    width: 10,
    height: 10
};

var proto = {
    onInit: function() {
        this.pedalEntity = new PedalEntity();
        this.ballEntity = new BallEntity();

        this.initThree();

        this.em = this.getComponent('entity-manager');
        this.em.add(this.pedalEntity);
        this.em.add(this.ballEntity);
    },

    initThree: function() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-this.width, this.width, this.height, -this.height, 1, 1000);

        var renderer = this.renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        this.camera.position.z = 5;
    },

    onUpdate: function() {
        this.renderer.render(this.scene, this.camera);
    }
};

module.exports = langeroids.createComponent(defaults, proto);