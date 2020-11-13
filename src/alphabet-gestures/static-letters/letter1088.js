import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1088Description = new fp.GestureDescription('о');

letter1088Description.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1088Description, fp.Finger.Ring, 'Up');

letter1088Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1088Description, fp.Finger.Ring);

for(let finger of [fp.Finger.Index, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1088Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1088Description, finger, 'Up');
}

export default letter1088Description;