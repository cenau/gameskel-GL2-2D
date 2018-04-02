import Visible from './Visible'

export default waymarkerSystem

function waymarkerSystem(thing, renderer){
  if (Object.is(undefined, thing.waymarker.target.position)) {
    thing.remove();
    
  }
  else {
    const dx = renderer.cameraPosition.x - thing.waymarker.target.position.x;
    const dy = renderer.cameraPosition.y  - thing.waymarker.target.position.y;
    thing.waymarker.distance = Math.hypot(dx,dy)
    thing.position.xsize = Math.max(0.1 * thing.waymarker.target.position.xsize ,50 - thing.waymarker.distance * 0.01); 
    thing.position.ysize = thing.position.xsize;
    const slope = dy/dx;
    

     if (Math.abs(dx / renderer.gl.canvas.width) > Math.abs(dy / renderer.gl.canvas.height)){
    thing.position.x = renderer.cameraPosition.x - renderer.gl.canvas.width/2 * Math.sign(dx) + thing.waymarker.padding * Math.sign(dx); 
    thing.position.y = slope * thing.position.x + thing.waymarker.target.position.y;
     }
    else {
    thing.position.y = renderer.cameraPosition.y - renderer.gl.canvas.height/2 * Math.sign(dy) + Math.sign(dy) * thing.waymarker.padding; 
    thing.position.x = 0 -thing.position.y / slope  
     }
      


    if (Math.abs(renderer.cameraPosition.x - thing.waymarker.target.position.x) > renderer.gl.canvas.width/2 || Math.abs(renderer.cameraPosition.y - thing.waymarker.target.position.y)  > renderer.gl.canvas.height/2) {
     thing.waymarker.onscreen = false;
      if (!thing.hasComponent(Visible)) {

      thing.addComponent(Visible);
      }
     }

    else {
     thing.waymarker.onscreen = true;
      //thing.removeComponent(Visible);
      thing.position.x = thing.waymarker.target.position.x;
      thing.position.y = thing.waymarker.target.position.y;
      thing.position.xsize = thing.waymarker.target.position.xsize;
      thing.position.ysize = thing.waymarker.target.position.ysize;
    }
  } 
} 
