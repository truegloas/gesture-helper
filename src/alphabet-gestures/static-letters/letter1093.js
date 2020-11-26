import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1093Description = new fp.GestureDescription('х');

letter1093Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

letter1093Description.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1093Description, fp.Finger.Index, 'Up');

letter1093Description.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1093Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1093Description, finger, 'Up');
}

export default letter1093Description;