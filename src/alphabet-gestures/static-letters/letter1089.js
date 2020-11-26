import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1089Description = new fp.GestureDescription('с');

letter1089Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1089Description, fp.Finger.Thumb);

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1089Description.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
    addDirection(letter1089Description, finger);
}

export default letter1089Description;