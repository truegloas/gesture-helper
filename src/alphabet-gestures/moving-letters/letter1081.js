import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1080Description = new fp.GestureDescription('й');

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1080Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1080Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
    letter1080Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
    letter1080Description.addDirection(finger, fp.FingerDirection.VerticalUp, 0.75);
}
for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle]) {
    letter1080Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1080Description, finger, 'Up');
}

export default letter1080Description;