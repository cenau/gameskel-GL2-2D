export default movementSystem;

function movementSystem(thing){
  
  thing.movement.velocity.x -= thing.movement.damping * thing.movement.velocity.x;
  thing.movement.velocity.y -= thing.movement.damping * thing.movement.velocity.y;
  
  thing.movement.velocity.x = thing.movement.velocity.x + Math.cos(thing.rotation.heading - Math.PI/2) * thing.movement.thrusting * thing.movement.accel ;
  thing.movement.velocity.y = thing.movement.velocity.y + Math.sin(thing.rotation.heading - Math.PI/2) * thing.movement.thrusting * thing.movement.accel;
  
  thing.position.x += thing.movement.velocity.x;
  thing.position.y += thing.movement.velocity.y;



}
