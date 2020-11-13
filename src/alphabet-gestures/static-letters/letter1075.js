import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1075Description = new fp.GestureDescription('г');

letter1075Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1075Description, fp.Finger.Thumb);

letter1075Description.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1075Description, fp.Finger.Index, 'Down');

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1075Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1075Description, finger, 'Down');
}

export default letter1075Description;