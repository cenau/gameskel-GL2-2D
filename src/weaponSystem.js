import Visible from './Visible'
import Position from './Position'
import Rotation from './Rotation'
import Movement from './Movement'
import Collidable from './Collidable'
import Deathclock from './Deathclock'
import Damaging from './Damaging'



export default weaponSystem;

function weaponSystem(thing,trigger,ents,time) {
  if (trigger && time - thing.weapon.lastfired >= thing.weapon.cooldown ){
    thing.weapon.lastfired = time;
    let bullet = ents.createEntity();
    bullet.addComponent(Position)
    bullet.addComponent(Rotation)
    bullet.addComponent(Visible)
    bullet.addComponent(Movement)
    bullet.addComponent(Collidable)
    bullet.addComponent(Deathclock)
    bullet.addComponent(Damaging)
  bullet.position.x = thing.position.x + Math.cos(thing.rotation.heading - Math.PI/2); 
  bullet.position.y = thing.position.y + Math.sin(thing.rotation.heading - Math.PI/2);  
  bullet.rotation.heading = thing.rotation.heading + (0.5 - Math.random()) * thing.weapon.spread; 
  
  bullet.movement.velocity.x = thing.movement.velocity.x + Math.cos(bullet.rotation.heading - Math.PI/2) * 40;  
  bullet.movement.velocity.y = thing.movement.velocity.y + Math.sin(bullet.rotation.heading - Math.PI/2) * 40;  
  bullet.movement.damping = thing.weapon.projectileDamping;
  bullet.deathclock.TTL = thing.weapon.projectileTTL;
  bullet.position.xsize *= 0.25;
  }
}
