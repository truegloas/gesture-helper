import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1078Description = new fp.GestureDescription('ж');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1078Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1078Description, finger);
}

export default letter1078Description;