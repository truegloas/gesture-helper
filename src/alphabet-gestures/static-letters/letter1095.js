import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1095Description = new fp.GestureDescription('ч');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index]) {
    letter1095Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1095Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
    letter1095Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
    letter1095Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
}

letter1095Description.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 1.0);
letter1095Description.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1095Description, fp.Finger.Middle);
letter1095Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 0.5);
letter1095Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 0.5);

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1095Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1095Description, finger, 'Up');
}

export default letter1095Description;