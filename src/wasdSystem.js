export default wasdSystem;

function wasdSystem(thing,wasd) {
  thing.position.x = thing.position.x + wasd[0] - wasd[2] ;
  thing.position.y = thing.position.y + wasd[1] - wasd[3];
}
