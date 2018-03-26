export default wasdSystem;

function wasdSystem(thing,wasd) {
  thing.position.y = thing.position.y - wasd[0] + wasd[2] ;
  thing.position.x = thing.position.x - wasd[1] + wasd[3];
}
