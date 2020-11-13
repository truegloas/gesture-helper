import * as fp from 'fingerpose';


const letter1073Description = new fp.GestureDescription('б');

letter1073Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
letter1073Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
letter1073Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.25);
letter1073Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.25);

letter1073Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letter1073Description.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
letter1073Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.25);
letter1073Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.25);

letter1073Description.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 1.0);
letter1073Description.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
letter1073Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 0.25);
letter1073Description.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 0.25);

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1073Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    letter1073Description.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    letter1073Description.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.25);
    letter1073Description.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.25);
}

export default letter1073Description;