import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1090Description = new fp.GestureDescription('т');

letter1090Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letter1090Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.5);
addDirection(letter1090Description, fp.Finger.Thumb, 'Down');

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1090Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1090Description, finger, 'Down');
}

letter1090Description.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
addDirection(letter1090Description, fp.Finger.Pinky, 'Down');

export default letter1090Description;