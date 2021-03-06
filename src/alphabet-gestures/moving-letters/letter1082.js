import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1082Description = new fp.GestureDescription('к');

for(let finger of [fp.Finger.Index, fp.Finger.Middle]) {
    letter1082Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1082Description, finger);
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1082Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1082Description, finger);
}

export default letter1082Description;