import * as fp from 'fingerpose';


const letter1093Description = new fp.GestureDescription('х');

letter1093Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1093Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

letter1093Description.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
letter1093Description.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1093Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    letter1093Description.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

export default letter1093Description;