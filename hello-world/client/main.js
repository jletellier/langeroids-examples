var langeroids = require('langeroids');
var Game = require('langeroids/lib/game');
var Canvas2dRenderer = require('langeroids/lib/canvas-2d-renderer');

var game = new Game();

game.addComponent(new Canvas2dRenderer({
    canvas: 'canvas'
}));

game.addComponent({
    onceDraw: function(renderer) {
        renderer.clear();
        renderer.drawText(10, 15, 'Hello, World!');
    }
});

game.start();