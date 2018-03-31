export default wanderSystem;

function wanderSystem(thing) {
  thing.rotation.heading += ((0.41 - Math.random() )* 0.5) * 0.3
  thing.movement.thrusting = 1;

}
