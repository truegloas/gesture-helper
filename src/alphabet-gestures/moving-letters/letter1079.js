import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1079Description = new fp.GestureDescription('з');

letter1079Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1079Description, fp.Finger.Index, 'Up');

for(let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1079Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1079Description, finger);
}

export default letter1079Description;