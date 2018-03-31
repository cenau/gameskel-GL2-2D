export default rotationSystem;

function rotationSystem(thing){
  
  thing.rotation.speed -= thing.rotation.damping * thing.rotation.speed
  
  thing.rotation.heading += thing.rotation.speed;
  
}
