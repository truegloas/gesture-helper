import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1085Description = new fp.GestureDescription('н');

letter1085Description.addCurl(fp.Finger.Ring, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1085Description, fp.Finger.Ring, 'Up');

letter1085Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1085Description, fp.Finger.Ring);

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Pinky]) {
    letter1085Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1085Description, finger, 'Up');
}

export default letter1085Description;