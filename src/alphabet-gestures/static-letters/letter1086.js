import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1086Description = new fp.GestureDescription('о');

letter1086Description.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
addDirection(letter1086Description, fp.Finger.Ring, 'Up');

letter1086Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1086Description, fp.Finger.Ring, 'Up');

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1086Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1086Description, finger, 'Up');
}

export default letter1086Description;