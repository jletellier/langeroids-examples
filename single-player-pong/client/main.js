var ComponentManager = require('langeroids/lib/component-manager');
var AnimationLoop = require('langeroids/lib/animation-loop');
var EntityManager = require('langeroids/lib/entity-manager');
var KeyboardInput = require('langeroids/lib/keyboard-input');

var MainLogic = require('../lib/main-logic');

var cm = new ComponentManager();

cm.add(new AnimationLoop());
cm.add(new MainLogic());
cm.add(new EntityManager());
cm.add(new KeyboardInput());

cm.init();