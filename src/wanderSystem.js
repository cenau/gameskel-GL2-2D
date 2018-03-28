export default wanderSystem;

function wanderSystem(thing) {
  thing.rotation.heading += (0.41 - Math.random() )* 0.5
  thing.movement.speed += thing.movement.accel;

}
