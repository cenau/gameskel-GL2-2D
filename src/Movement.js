export default Movement;

function Movement() {
  this.accel = 0.4;
  this.velocity = {x:0,y:0};
  this.damping = 0.01;
  this.thrusting =0;
}
