import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1090Description = new fp.GestureDescription('т');

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1090Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1090Description, finger, 'Down');
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
    letter1090Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1090Description, finger, 'Down');
}

export default letter1090Description;