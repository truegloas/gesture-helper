import * as fp from 'fingerpose';


const letter1076Description = new fp.GestureDescription('д');

for(let finger of [fp.Finger.Index, fp.Finger.Middle]) {
    letter1076Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1076Description.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    letter1076Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.25);
    letter1076Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.25);
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1076Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    letter1076Description.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    letter1076Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.25);
    letter1076Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.25);
}

export default letter1076Description;