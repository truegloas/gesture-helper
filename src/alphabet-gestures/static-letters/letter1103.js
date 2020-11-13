import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1103Description = new fp.GestureDescription('я');

letter1103Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letter1103Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1103Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
letter1103Description.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.25);

letter1103Description.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1103Description, fp.Finger.Middle, 'Up');

for(let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1103Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1103Description, fp.Finger.Middle, 'Up');
}

export default letter1103Description;