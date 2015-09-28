'use strict';

var ComponentManager = require('langeroids/lib/component-manager');
var AnimationLoop = require('langeroids/lib/animation-loop');

var cm = new ComponentManager();

cm.add(new AnimationLoop());

cm.add({
    onceUpdate: function() {
        console.log('Hello, Langeroids!');
    },

    // TODO: Fixme, this will never get called!
    onUpdate: function() {
        console.log('Call me, please!');
    }
});

cm.init();
