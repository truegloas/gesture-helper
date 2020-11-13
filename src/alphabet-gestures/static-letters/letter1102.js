import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1102Description = new fp.GestureDescription('ю');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1102Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1102Description, finger);
}

letter1102Description.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1102Description, fp.Finger.Pinky, 'Up');

export default letter1102Description;