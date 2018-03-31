export default wasdSystem;

function wasdSystem(thing,wasd) {

  thing.rotation.speed = thing.rotation.speed + wasd[3] * thing.rotation.accel - wasd[1] * thing.rotation.accel
  thing.movement.thrusting = wasd[0] - wasd[2];
}
