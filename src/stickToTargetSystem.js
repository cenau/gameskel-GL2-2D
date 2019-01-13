export default stickToTargetSystem;

function stickToTargetSystem(thing) {
  if (!Object.is(undefined,thing.stickToTarget.target)){
    thing.position.x = thing.stickToTarget.target.position.x
    thing.position.y = thing.stickToTarget.target.position.y
  }
}
