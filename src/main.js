import kd from 'keydrown';
import ecs from 'tiny-ecs';
import rafloop from 'raf-loop'
import fit from 'canvas-fit'
import renderer2D from './Renderer'

// components
import Position from './Position'
import WASD from './WASD'


// systems
import wasdSystem from './wasdSystem'


//setup renderer

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
fit(canvas);
const gl = canvas.getContext("webgl2");
const renderer = new renderer2D(gl); 

// setup ecs
const ents = new ecs.EntityManager(); // ents, because, i keep misspelling entities

// the player
const player = ents.createEntity();

player.addComponent(Position);
player.addComponent(WASD);

player.position.y = 8;




const engine = rafloop(function(dt) {
    kd.tick();
    ents.queryComponents([Position, WASD]).forEach((each) => {
      wasdSystem(each,[kd.W.isDown(), kd.A.isDown(),kd.S.isDown(),kd.D.isDown()])
    });

    renderer.render();

}).start()




