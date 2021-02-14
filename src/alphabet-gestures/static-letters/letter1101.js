import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1101Description = new fp.GestureDescription('э');

letter1101Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1101Description, fp.Finger.Thumb);

letter1101Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letter1101Description.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.5);

for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1101Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1101Description.addDirection(finger, fp.FingerDirection.VerticalUp, 0.5);
    letter1101Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
    letter1101Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
}


export default letter1101Description;