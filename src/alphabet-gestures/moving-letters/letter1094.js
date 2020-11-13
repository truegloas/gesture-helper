// TODO
// Add recognition in time

import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1094Description = new fp.GestureDescription('ц');

for(let finger of [fp.Finger.Index, fp.Finger.Middle]) {
    letter1094Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1094Description, finger, 'Up');
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1094Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1094Description, finger, 'Up');
}

export default letter1094Description;