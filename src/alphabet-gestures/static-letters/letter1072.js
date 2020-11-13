import * as fp from 'fingerpose';


const letter1072Description = new fp.GestureDescription('а');

letter1072Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letter1072Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
letter1072Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.25);
letter1072Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.25);

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1072Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    letter1072Description.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    letter1072Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.25);
    letter1072Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.25);
}

export default letter1072Description;