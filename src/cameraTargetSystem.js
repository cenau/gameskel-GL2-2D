export default cameraTargetSystem;


function cameraTargetSystem(thing,renderer){
  renderer.cameraPosition.x = thing.position.x;  
  renderer.cameraPosition.y = thing.position.y;
  renderer.cameraRotation = thing.rotation.heading;
}
