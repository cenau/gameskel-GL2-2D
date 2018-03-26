import kd from 'keydrown';
import ecs from 'tiny-ecs';
import rafloop from 'raf-loop'
// systems
import Position from './Position'

// components

const glslify = require('glslify');
// needed for bug https://github.com/stackgl/glslify/issues/49 - if you try using fixes like glslify babel plugin, then shaders wont live reload!!

// setup ecs
const ents = new ecs.EntityManager(); // ents, because, i keep misspelling entities

// the player
const player = ents.createEntity();

player.addComponent(Position);

player.position.y = 8;




const engine = rafloop(function(dt) {
    kd.tick();
    ents.queryComponents([Position]).forEach((each) => {
      console.log(each);
    });

}).start()




