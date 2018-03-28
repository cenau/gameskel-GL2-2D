import kd from 'keydrown';
import ecs from 'tiny-ecs';
import rafloop from 'raf-loop'
import fit from 'canvas-fit'
import SAT from 'sat'
import renderer2D from './Renderer'

// components
import Visible from './Visible'
import Position from './Position'
import Rotation from './Rotation'
import Movement from './Movement'
import Wander from './Wander'
import CameraTarget from './CameraTarget'
import WASD from './WASD'
import Collidable from './Collidable'

// systems
import movementSystem from './movementSystem'
import wasdSystem from './wasdSystem'
import wanderSystem from './wanderSystem'
import cameraTargetSystem from './cameraTargetSystem'
import collidableSystem from './collidableSystem'

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
player.addComponent(Visible);
player.addComponent(Rotation);
player.addComponent(Movement);
player.addComponent(WASD);
player.addComponent(CameraTarget);
player.addComponent(Collidable);

for (let i = 0; i < 10; i++) {
  let obj = ents.createEntity()
  obj.addComponent(Position)
  obj.addComponent(Rotation)
  obj.position.x = -150 + Math.random() * 300
  obj.position.y = -150 + Math.random() * 300
  obj.rotation.heading = Math.random() * Math.PI  *4
  obj.addComponent(Visible)
  obj.addComponent(Movement);
  obj.addComponent(Collidable);
  obj.addComponent(Wander);
  obj.movement.accel = 0.05
}



const engine = rafloop(function(dt) {
    kd.tick();
    ents.queryComponents([Position, Rotation, WASD]).forEach((each) => {
      wasdSystem(each,[kd.W.isDown(), kd.A.isDown(),kd.S.isDown(),kd.D.isDown()])
    });
    ents.queryComponents([Position, Rotation, Movement]).forEach((each) => {
      movementSystem(each)
    });
    ents.queryComponents([Position, CameraTarget]).forEach((each) => {
      cameraTargetSystem(each,renderer)
    });
    ents.queryComponents([Wander]).forEach((each) => {
      wanderSystem(each)
    });


    const thingsToCollide = ents.queryComponents([Position, Collidable])
    
    const thingsToRender = ents.queryComponents([Visible])
  
    thingsToCollide.forEach((each) => {each.collidable.hit =false})
    collidableSystem(thingsToCollide);
    thingsToCollide.forEach((each) => {if (each.collidable.hit){
      each.position.x -=  each.collidable.overlapV.x; 
      each.position.y -=  each.collidable.overlapV.y; 
    
    }  })
    renderer.render(thingsToRender);

}).start()




