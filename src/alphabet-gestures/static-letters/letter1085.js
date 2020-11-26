import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1085Description = new fp.GestureDescription('н');

letter1085Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.5);
letter1085Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

letter1085Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letter1085Description.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.5);
letter1085Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1085Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);

letter1085Description.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
addDirection(letter1085Description, fp.Finger.Ring, 'Up');

for(let finger of [fp.Finger.Middle, fp.Finger.Pinky]) {
    letter1085Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1085Description, finger, 'Up');
}

export default letter1085Description;