var langeroids = require('langeroids');
var Game = require('langeroids/lib/game');
var Canvas2dRenderer = require('langeroids/lib/canvas-2d-renderer');
var EntityManager = require('langeroids/lib/entity-manager');
var KeyboardInput = require('langeroids/lib/keyboard-input');
var MainLogic = require('../lib/main-logic');

var game = new Game();

game.addComponent(new Canvas2dRenderer({
    canvas: 'canvas',
    width: 400,
    height: 400,
    scale: 1
}));

game.addComponent(new MainLogic());

game.addComponent(new EntityManager());

game.addComponent(new KeyboardInput());

game.start();