export default movementSystem;

function movementSystem(thing){
  
  thing.movement.speed -= thing.movement.damping * thing.movement.speed
  

  thing.position.x = thing.position.x + Math.cos(thing.rotation.heading) * thing.movement.speed ;
  thing.position.y = thing.position.y + Math.sin(thing.rotation.heading) * thing.movement.speed;


}
