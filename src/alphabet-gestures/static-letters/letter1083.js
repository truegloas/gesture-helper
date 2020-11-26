import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1083Description = new fp.GestureDescription('л');

letter1083Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letter1083Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.5);
letter1083Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 0.15);
letter1083Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 1.0);
letter1083Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 1.0);

letter1083Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1083Description, fp.Finger.Index, 'Down');

letter1083Description.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
letter1083Description.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalDown, 0.15);
letter1083Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalDownLeft, 1.0);
letter1083Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalDownRight, 1.0);

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1083Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1083Description, finger, 'Down');
}

export default letter1083Description;