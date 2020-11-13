import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1093Description = new fp.GestureDescription('х');


letter1093Description.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1093Description, fp.Finger.Index, 'Up');


for(let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1093Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    letter1093Description.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    letter1093Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.25);
    letter1093Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.25);
}

export default letter1093Description;