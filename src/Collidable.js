export default Collidable;

function Collidable(){
  this.hit = false;
  this.overlapV = {};
  this.overlapV.x = 0;
  this.overlapV.y = 0;
  this.circle = 20;
}
