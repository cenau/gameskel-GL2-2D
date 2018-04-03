export default Exhaust

function Exhaust() {
  this.position = {x:-32,y:-32}
  this.cooldown = 70;  // in ms
  this.lastfired = 0;
  this.spread = 2.99;
  this.barrelSpeed = 1;
  this.projectileDamping = 0.1;
  this.projectileTTL = 200 //in ms;
  this.projectileColour = [0.3,0.5,0.9]
  
}
