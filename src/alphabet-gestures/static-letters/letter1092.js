import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1092Description = new fp.GestureDescription('ф');

letter1092Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1092Description, fp.Finger.Thumb, 'Up');

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1092Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1092Description, finger);
}

export default letter1092Description;