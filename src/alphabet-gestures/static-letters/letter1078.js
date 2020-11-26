import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1078Description = new fp.GestureDescription('ж');

letter1078Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letter1078Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1078Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1078Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1078Description.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
    addDirection(letter1078Description, finger);

}

export default letter1078Description;