var langeroids = require('langeroids');
var Game = require('langeroids/lib/game');
var Box2dPhysics = require('langeroids/lib/box-2d-physics');
var Canvas2dRenderer = require('langeroids/lib/canvas-2d-renderer');
var EntityManager = require('langeroids/lib/entity-manager');
var MainLogic = require('../lib/main-logic');

var game = new Game();

game.addComponent(new Box2dPhysics());

game.addComponent(new Canvas2dRenderer({
    canvas: 'canvas',
    width: 300,
    height: 100,
    scale: 3
}));

game.addComponent(new MainLogic());

game.addComponent(new EntityManager());

game.start();