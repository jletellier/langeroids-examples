var langeroids = require('langeroids');
var ComponentManager = require('langeroids/lib/component-manager');
var AnimationLoop = require('langeroids/lib/animation-loop');
var Box2dPhysics = require('langeroids/lib/box-2d-physics');
var EntityManager = require('langeroids/lib/entity-manager');
var MainLogic = require('../lib/main-logic');

var cm = new ComponentManager();

cm.add(new AnimationLoop());

cm.add(new Box2dPhysics());

cm.add(new MainLogic());

cm.add(new EntityManager());

cm.init();
