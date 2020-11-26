import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1088Description = new fp.GestureDescription('р');

letter1088Description.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
addDirection(letter1088Description, fp.Finger.Ring, 'Up');

letter1088Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1088Description, fp.Finger.Ring, 'Up');

letter1088Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letter1088Description.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.5);
letter1088Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1088Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1088Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1088Description, finger, 'Up');
}

export default letter1088Description;