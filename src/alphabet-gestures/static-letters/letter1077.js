import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1077Description = new fp.GestureDescription('е');

letter1077Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1077Description, fp.Finger.Thumb);

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1077Description.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
    addDirection(letter1077Description, finger, 'Up');
}

export default letter1077Description;