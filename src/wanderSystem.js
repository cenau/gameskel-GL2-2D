export default wanderSystem;

function wanderSystem(thing,time) {
  if (thing.wander.lastHeadingChange + 4000< time) {
   console.log("!") 
    thing.wander.targetHeading += Math.random() 
    thing.wander.lastHeadingChange = time;
  }

  thing.rotation.heading = thing.wander.targetHeading
    thing.movement.thrusting = 1;

}
