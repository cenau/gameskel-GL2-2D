import Visible from './Visible'
import Position from './Position'
import Rotation from './Rotation'
import Waymarker from './Waymarker'
import Colour from './Colour'

export default beaconSystem

function beaconSystem(thing,ents){
  if (!thing.beacon.waymarker) {
    thing.beacon.waymarker = ents.createEntity(); 
    thing.beacon.waymarker.addComponent(Visible);
    thing.beacon.waymarker.addComponent(Position);
    thing.beacon.waymarker.addComponent(Rotation);
    thing.beacon.waymarker.addComponent(Colour);
    thing.beacon.waymarker.addComponent(Waymarker);
    thing.beacon.waymarker.waymarker.target = thing;
    thing.beacon.waymarker.colour.rgb = thing.beacon.colour;
  }
}
