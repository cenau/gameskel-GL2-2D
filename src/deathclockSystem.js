export default deathclockSystem;

function deathclockSystem(thing,dt) {
  thing.deathclock.TTL -= dt ;
  if (thing.deathclock.TTL <=0){
   thing.remove()
  }
}
