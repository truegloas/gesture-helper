import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1084Description = new fp.GestureDescription('м');

letter1084Description.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
letter1084Description.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalDown, 1.0);

for(let finger of [fp.Finger.Index, fp.Finger.Ring]) {
    letter1084Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1084Description.addDirection(finger, fp.FingerDirection.DiagonalDownLeft, 1.0);
    letter1084Description.addDirection(finger, fp.FingerDirection.DiagonalDownRight, 1.0);
    letter1084Description.addDirection(finger, fp.FingerDirection.VerticalDown, 0.25);
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
    letter1084Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1084Description, finger, 'Down');
}

export default letter1084Description;