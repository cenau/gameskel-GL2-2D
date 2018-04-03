import Visible from './Visible'
import Position from './Position'
import Rotation from './Rotation'
import Movement from './Movement'
import Deathclock from './Deathclock'
import Colour from './Colour'


export default exhaustSystem;

function exhaustSystem(thing,trigger,ents,time) {
  if (trigger && time - thing.exhaust.lastfired >= thing.exhaust.cooldown ){
    thing.exhaust.lastfired = time;
    let particle = ents.createEntity();
    particle.addComponent(Position)
    particle.addComponent(Rotation)
    particle.addComponent(Visible)
    particle.addComponent(Movement)
    particle.addComponent(Deathclock)
    particle.addComponent(Colour)
  particle.position.x = thing.position.x + Math.cos(thing.rotation.heading - Math.PI/2) * thing.exhaust.position.x; 
  particle.position.y = thing.position.y + Math.sin(thing.rotation.heading - Math.PI/2) * thing.exhaust.position.y;  
  particle.rotation.heading = thing.rotation.heading + (0.5 - Math.random()) * thing.exhaust.spread; 
  
  particle.movement.velocity.x = thing.movement.velocity.x + Math.cos(particle.rotation.heading - Math.PI/2);  
  particle.movement.velocity.y = thing.movement.velocity.y + Math.sin(particle.rotation.heading - Math.PI/2);  
  particle.movement.damping = thing.exhaust.projectileDamping;
  particle.deathclock.TTL = thing.exhaust.projectileTTL;
  particle.colour.rgb = thing.exhaust.projectileColour;
  particle.position.xsize *= 0.25;
  particle.position.ysize *= 0.25;
  }
}
