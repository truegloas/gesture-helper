import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1091Description = new fp.GestureDescription('у');

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1091Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1091Description, finger, 'Up');
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
    letter1091Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1091Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
    letter1091Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
    letter1091Description.addDirection(finger, fp.FingerDirection.VerticalUp, 0.25);
}

export default letter1091Description;