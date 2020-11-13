import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1095Description = new fp.GestureDescription('ч');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle]) {
    letter1095Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1095Description, finger);
}

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1095Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1095Description, finger);
}

export default letter1095Description;