import SAT from 'sat'
import Visible from './Visible'
import Position from './Position'
import Rotation from './Rotation'
import Colour from './Colour'
import {m4} from 'twgl.js';

export default scannerSystem

function scannerSystem(thing,ents,collideables){
  if (!thing.scanner.wedge) {
    thing.scanner.wedge = ents.createEntity(); 
    thing.scanner.wedge.addComponent(Visible);
    thing.scanner.wedge.addComponent(Position);
    thing.scanner.wedge.addComponent(Rotation);
    thing.scanner.wedge.addComponent(Colour);
    thing.scanner.wedge.colour.rgb = thing.scanner.colour;
   // thing.scanner.test = ents.createEntity();
   // thing.scanner.test.addComponent(Visible);
   // thing.scanner.test.addComponent(Position);

  }
  
  let mtx = translateRotateAdjust(thing.position.x,thing.position.y,thing.rotation.heading,0,-(thing.scanner.range+thing.position.ysize))
  


  thing.scanner.wedge.position.x = mtx[12]
  thing.scanner.wedge.position.y = mtx[13]
  
  //thing.scanner.wedge.position.x = thing.position.x + Math.cos(thing.rotation.heading - Math.PI/2) * (thing.position.ysize + thing.scanner.range);
  //thing.scanner.wedge.position.y = thing.position.y + Math.sin(thing.rotation.heading - Math.PI/2) * (thing.position.ysize + thing.scanner.range) ;
    thing.scanner.wedge.position.xsize=thing.scanner.width;
    thing.scanner.wedge.position.ysize=thing.scanner.range;
    thing.scanner.wedge.rotation.heading = thing.rotation.heading;
    thing.scanner.wedge.colour.rgb = thing.scanner.colour;
    thing.scanner.wedge.scanwedge = true;

  const V = SAT.Vector;
  const C = SAT.Circle;
  const P = SAT.Polygon;

  
  let origin = translateRotateAdjust(0,0,thing.rotation.heading,0,-thing.position.ysize + thing.scanner.range)
  let p1 = translateRotateAdjust(0,0,thing.rotation.heading,thing.scanner.width,-thing.scanner.range - thing.position.ysize)
  let p2 = translateRotateAdjust(0,0,thing.rotation.heading,-thing.scanner.width,-thing.scanner.range - thing.position.ysize)
 
  const scanwedge = new P(new V(thing.scanner.wedge.position.x,thing.scanner.wedge.position.y), [
  new V(p1[12],p1[13]), new V(origin[12],origin[13]), new V(p2[12],p2[13])
]);
const scanResponses = collideables.map((target) => 
  {

    const target_circle = new C(new V(target.position.x,target.position.y), target.collidable.circle);
    let response = new SAT.Response();
    let collided = SAT.testPolygonCircle(scanwedge,target_circle,response)
    return [collided,response]
  });
    let scanned = scanResponses.filter( response => response[0] == true)
if (scanned.length > 0) {
    thing.scanner.wedge.colour.rgb = [1,0,0];
    scanned.forEach(( response ) => {response.distance = Math.hypot(thing.position.x-response[1].b.pos.x, thing.position.y -response[1].b.pos.y)})
    scanned.sort((a,b) => {return a.distance - b.distance; }) //draw stuff in the right order depending on how high it is (using instead of Depth testing as that leads to blending issues)
    //thing.scanner.test.position.x = scanned[0][1].b.pos.x
    //thing.scanner.test.position.y =  scanned[0][1].b.pos.y
    console.log(scanned[0].distance);
}


}
function translateRotateAdjust(x,y,rot,adjustx,adjusty) {
  let matrix = m4.identity();
  const translation = [x,y,0]
  const adjust_translation = [adjustx,adjusty,0]
  matrix = m4.translate(matrix,translation) 
  
 matrix = m4.rotateZ(matrix, rot);

  matrix = m4.translate(matrix,adjust_translation) 
  return matrix
}
