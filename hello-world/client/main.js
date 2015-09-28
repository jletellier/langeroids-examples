var langeroids = require('langeroids');
var ComponentManager = require('langeroids/lib/component-manager');
var AnimationLoop = require('langeroids/lib/animation-loop');

var cm = new ComponentManager();

cm.add(new AnimationLoop());

cm.add({
    onceUpdate: function() {
        console.log('Hello, Langeroids!');
    },

    onUpdate: function() {
        
    }
});

cm.init();
