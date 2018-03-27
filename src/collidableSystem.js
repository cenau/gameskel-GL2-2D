import SAT from 'sat'
export default collidableSystem;

function collidableSystem(collidables) {

  if (collidables.length < 1) {
    return;
  }
  var [ head, ...tail ] = collidables;
  
  var V = SAT.Vector;
  var C = SAT.Circle;

  var circle1 = new C(new V(head.position.x,head.position.y), 10);
  tail.forEach(each => {
    var circle2 = new C(new V(each.position.x,each.position.y), 10);
    var response = new SAT.Response();
    var collided = SAT.testCircleCircle(circle1, circle2, response);
    if (collided == true){
     head.collidable.hit = true;
     each.collidable.hit = true;
     head.collidable.overlapV = response.overlapV
     each.collidable.overlapV.x = -response.overlapV.x
     each.collidable.overlapV.y = -response.overlapV.y
    }
  }
  
  )
  collidableSystem(tail)

}
