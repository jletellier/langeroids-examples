var ComponentManager = require('langeroids/lib/component-manager');
var AnimationLoop = require('langeroids/lib/animation-loop');
var Canvas2dRenderer = require('langeroids/lib/canvas-2d-renderer');

var cm = new ComponentManager();

cm.add(new AnimationLoop());

cm.add(new Canvas2dRenderer({
    canvas: 'canvas'
}));

cm.add({
    onceDraw: function(renderer) {
        renderer.clear();
        renderer.drawText(10, 15, 'Hello, World!');
    }
});

cm.init();