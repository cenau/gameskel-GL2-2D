import SAT from 'sat'
import Exploding from './Exploding' 
import Deathclock from './Deathclock'
export default collidableSystem;

function collidableSystem(collidables) {

  if (collidables.length < 1) {
    return;
  }
  var [ head, ...tail ] = collidables;
  
  var V = SAT.Vector;
  var C = SAT.Circle;

  var circle1 = new C(new V(head.position.x,head.position.y), head.collidable.circle);
  tail.forEach(each => {
    var circle2 = new C(new V(each.position.x,each.position.y), each.collidable.circle);
    var response = new SAT.Response();
    var collided = SAT.testCircleCircle(circle1, circle2, response);
    if (collided == true){
     head.collidable.hit = true;
     each.collidable.hit = true;
     head.collidable.overlapV = response.overlapV
     each.collidable.overlapV.x = -response.overlapV.x
     each.collidable.overlapV.y = -response.overlapV.y

     if (head.damaging || each.damaging){
       if (!head.damaging){ 
         head.addComponent(Deathclock) 
         head.addComponent(Exploding)
         head.deathclock.TTL = 200;
       }
       if (!each.damaging){
       
         each.addComponent(Deathclock) 
         each.addComponent(Exploding) 
         each.deathclock.TTL = 200;
       }
     }
    }
  }
  
  )
  collidableSystem(tail)

}
