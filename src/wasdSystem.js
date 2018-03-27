export default wasdSystem;

function wasdSystem(thing,wasd) {

  thing.rotation.heading = thing.rotation.heading + wasd[3] * thing.rotation.speed - wasd[1] * thing.rotation.speed
  thing.thrust.speed = thing.thrust.speed + wasd[0] * thing.thrust.accel - wasd[2] * thing.thrust.accel
  thing.thrust.speed -= thing.thrust.damping * thing.thrust.speed
  

  thing.position.x = thing.position.x + Math.cos(thing.rotation.heading) * thing.thrust.speed ;
  thing.position.y = thing.position.y + Math.sin(thing.rotation.heading) * thing.thrust.speed;
}
