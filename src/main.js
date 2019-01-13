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
import SweepRotate from './SweepRotate'
import CameraTarget from './CameraTarget'
import WASD from './WASD'
import Collidable from './Collidable'
import Weapon from './Weapon'
import Deathclock from './Deathclock'
import Exploding from './Exploding'
import Damaging from './Damaging'
import Sprite from './Sprite'
import Beacon from './Beacon'
import Scanner from './Scanner'
import Waymarker from './Waymarker'
import Exhaust from './Exhaust'
import StickToTarget from './StickToTarget'
import FollowTargetHeading from './FollowTargetHeading'


// systems
import movementSystem from './movementSystem'
import rotationSystem from './rotationSystem'
import wasdSystem from './wasdSystem'
import wanderSystem from './wanderSystem'
import sweepRotateSystem from './sweepRotateSystem'
import cameraTargetSystem from './cameraTargetSystem'
import collidableSystem from './collidableSystem'
import weaponSystem from './weaponSystem'
import deathclockSystem from './deathclockSystem'
import beaconSystem from './beaconSystem'
import waymarkerSystem from './waymarkerSystem'
import exhaustSystem from './exhaustSystem'
import scannerSystem from './scannerSystem'
import stickToTargetSystem from './stickToTargetSystem'
import followTargetHeadingSystem from './followTargetHeadingSystem'

//setup renderer

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
fit(canvas);
const gl = canvas.getContext("webgl2", {alpha: false});
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
player.addComponent(Exhaust);

player.position.xsize = 32;
player.position.ysize = 32;
player.sprite.texture = "ship"
player.rotation.accel = 0.005;


player.turrets = []
player.turrets.push(ents.createEntity())
player.turrets[0].addComponent(Position)
player.turrets[0].addComponent(Rotation)
player.turrets[0].addComponent(StickToTarget)
player.turrets[0].addComponent(FollowTargetHeading)
player.turrets[0].addComponent(Scanner)
player.turrets[0].stickToTarget.target = player
player.turrets[0].followTargetHeading.target = player
player.turrets[0].followTargetHeading.offset = 0.11;
player.turrets.push(ents.createEntity())
player.turrets[1].addComponent(Position)
player.turrets[1].addComponent(Rotation)
player.turrets[1].addComponent(StickToTarget)
player.turrets[1].addComponent(Scanner)
player.turrets[1].stickToTarget.target = player
player.turrets[1].addComponent(FollowTargetHeading)
player.turrets[1].followTargetHeading.target = player
player.turrets[1].followTargetHeading.offset = -0.11;

player.turrets.push(ents.createEntity())
player.turrets[2].addComponent(Position)
player.turrets[2].addComponent(Rotation)
player.turrets[2].addComponent(StickToTarget)
player.turrets[2].addComponent(Scanner)
player.turrets[2].stickToTarget.target = player
player.turrets[2].addComponent(FollowTargetHeading)
player.turrets[2].followTargetHeading.target = player

player.turrets[0].scanner.range = 128;
player.turrets[1].scanner.range = 128;
player.turrets[2].scanner.range = 128;
//lander/launcher

const pad = ents.createEntity()
pad.addComponent(Position);
pad.addComponent(Visible);
pad.addComponent(Sprite);
pad.addComponent(Beacon);
pad.position.xsize = 256;
pad.position.ysize = 256;
pad.position.z = -1;
pad.position.x = 0;
pad.position.y = 0;
pad.sprite.texture = "pad"
//some enemies
for (let i = 0; i < 10; i++) {
  let obj = ents.createEntity()
  obj.addComponent(Position)
  obj.addComponent(Rotation)
  obj.addComponent(Beacon)
  obj.addComponent(Exhaust)
  obj.exhaust.projectileColour = [0.9,0.5,0.3]
  obj.beacon.colour = [1,0,0]
  obj.position.x = -1500 + Math.random() * 3000
  obj.position.y = -6000 + Math.random() * 3000
  //obj.position.x = 1000 + i * 100;
  //obj.position.y = 1000 + i * 100;
  obj.rotation.heading = Math.random() * Math.PI  *4

  obj.addComponent(Visible)
  obj.addComponent(Movement);
  obj.addComponent(Collidable);
  obj.addComponent(Sprite);
  obj.addComponent(Wander);
  obj.sprite.texture = "enemy"
  obj.movement.accel = 0.05
 obj.position.xsize = 32;
 obj.position.ysize = 32;
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
    
   ents.queryComponents([Exhaust]).forEach((each) => {
      exhaustSystem(each,1,ents,time)
    });
  

  ents.queryComponents([Position, Rotation, Movement]).forEach((each) => {
      movementSystem(each)
      rotationSystem(each)
    });

    ents.queryComponents([Position, CameraTarget]).forEach((each) => {
      cameraTargetSystem(each,renderer)
    });

    ents.queryComponents([Wander]).forEach((each) => {
      wanderSystem(each,time)
    });
    ents.queryComponents([SweepRotate]).forEach((each) => {
      sweepRotateSystem(each)
    });
    
    
  ents.queryComponents([Deathclock]).forEach((each) => {
      deathclockSystem(each,dt)
    });

    ents.queryComponents([Beacon]).forEach((each) => {
      beaconSystem(each,ents)
    });

    ents.queryComponents([Waymarker]).forEach((each) => {
      waymarkerSystem(each, renderer)
    });
    
    ents.queryComponents([StickToTarget]).forEach((each) => {
      stickToTargetSystem(each)
    });
    ents.queryComponents([FollowTargetHeading]).forEach((each) => {
      followTargetHeadingSystem(each)
    });

    const thingsToCollide = ents.queryComponents([Position, Collidable])
    
    const thingsToRender = ents.queryComponents([Visible])

    
    ents.queryComponents([Scanner]).forEach((each) => {
      scannerSystem(each,ents,thingsToCollide)
    });

    thingsToRender.sort((a,b) => {return a.position.z - b.position.z; }) //draw stuff in the right order depending on how high it is (using instead of Depth testing as that leads to blending issues)
  
    thingsToCollide.forEach((each) => {each.collidable.hit =false})
    collidableSystem(thingsToCollide);
    thingsToCollide.forEach((each) => {if (each.collidable.hit){
      each.movement.velocity.x -=  each.collidable.overlapV.x; 
      each.movement.velocity.y -=  each.collidable.overlapV.y;
      
    
    }  })
    renderer.render(time,thingsToRender);

}).start()




