export default followTargetHeadingSystem;

function followTargetHeadingSystem(thing) {
  if (!Object.is(undefined,thing.followTargetHeading.target)){
    console.log(thing.followTargetHeading.target.rotation.heading)
    thing.rotation.heading = thing.followTargetHeading.target.rotation.heading + thing.followTargetHeading.offset
  }
}


