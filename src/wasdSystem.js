export default wasdSystem;

function wasdSystem(thing,wasd) {

  thing.rotation.heading = thing.rotation.heading + wasd[3] * thing.rotation.speed - wasd[1] * thing.rotation.speed
  thing.movement.speed = thing.movement.speed + wasd[0] * thing.movement.accel - wasd[2] * thing.movement.accel
}
