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
import Weapon from './Weapon'
import Deathclock from './Deathclock'
import Exploding from './Exploding'
import Damaging from './Damaging'
import Sprite from './Sprite'


// systems
import movementSystem from './movementSystem'
import rotationSystem from './rotationSystem'
import wasdSystem from './wasdSystem'
import wanderSystem from './wanderSystem'
import cameraTargetSystem from './cameraTargetSystem'
import collidableSystem from './collidableSystem'
import weaponSystem from './weaponSystem'
import deathclockSystem from './deathclockSystem'

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
player.addComponent(Weapon);
player.addComponent(Sprite);

player.position.xsize = 32;
player.position.ysize = 32;
player.sprite.texture = "ship"

for (let i = 0; i < 100; i++) {
  let obj = ents.createEntity()
  obj.addComponent(Position)
  obj.addComponent(Rotation)
  obj.position.x = -1500 + Math.random() * 3000
  obj.position.y = -1500 + Math.random() * 3000
  obj.rotation.heading = Math.random() * Math.PI  *4
  obj.addComponent(Visible)
  obj.addComponent(Movement);
  obj.addComponent(Collidable);
  obj.addComponent(Sprite);
  obj.addComponent(Wander);
  obj.sprite.texture = "enemy"
  obj.movement.accel = 0.1
 obj.position.xsize = 24;
 obj.position.ysize = 24;
}


let time = 0; 

const engine = rafloop(function(dt) {
   time += dt; 
   kd.tick();
    
  //these ones interface with keyboard
    ents.queryComponents([Position, Rotation, WASD]).forEach((each) => {
      wasdSystem(each,[kd.W.isDown(), kd.A.isDown(),kd.S.isDown(),kd.D.isDown()])
    });
  
    ents.queryComponents([Weapon]).forEach((each) => {
      weaponSystem(each,kd.SHIFT.isDown(),ents,time)
    });
  

  ents.queryComponents([Position, Rotation, Movement]).forEach((each) => {
      movementSystem(each)
      rotationSystem(each)
    });

    ents.queryComponents([Position, CameraTarget]).forEach((each) => {
      cameraTargetSystem(each,renderer)
    });

    ents.queryComponents([Wander]).forEach((each) => {
      wanderSystem(each)
    });
    
    
  ents.queryComponents([Deathclock]).forEach((each) => {
      deathclockSystem(each,dt)
    });


    const thingsToCollide = ents.queryComponents([Position, Collidable])
    
    const thingsToRender = ents.queryComponents([Visible])
  
    thingsToCollide.forEach((each) => {each.collidable.hit =false})
    collidableSystem(thingsToCollide);
    thingsToCollide.forEach((each) => {if (each.collidable.hit){
      each.movement.velocity.x -=  each.collidable.overlapV.x; 
      each.movement.velocity.y -=  each.collidable.overlapV.y;
      
    
    }  })
    renderer.render(time,thingsToRender);

}).start()




