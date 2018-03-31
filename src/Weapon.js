export default Weapon

function Weapon() {
  this.cooldown = 70;  // in ms
  this.lastfired = 0;
  this.spread = 0.2;
  this.barrelSpeed = 20;
  this.projectileDamping = 0.005;
  this.projectileTTL = 1000 //in ms;
}
