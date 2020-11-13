import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1083Description = new fp.GestureDescription('л');

for(let finger of [fp.Finger.Index, fp.Finger.Middle]) {
    letter1083Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1083Description.addDirection(finger, fp.FingerDirection.DiagonalDownLeft, 1.0);
    letter1083Description.addDirection(finger, fp.FingerDirection.DiagonalDownRight, 1.0);
    letter1083Description.addDirection(finger, fp.FingerDirection.VerticalDown, 0.25);
}
for(let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1083Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1083Description, finger, 'Down');
}

export default letter1083Description;