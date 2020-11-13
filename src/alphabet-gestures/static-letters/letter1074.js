import * as fp from 'fingerpose';


const letter1074Description = new fp.GestureDescription('в');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1074Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    letter1074Description.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

export default letter1074Description;