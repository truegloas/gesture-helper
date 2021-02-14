import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1100Description = new fp.GestureDescription('ь');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index]) {
    letter1100Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}

letter1100Description.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.5);

addDirection(letter1100Description, fp.Finger.Thumb);
addDirection(letter1100Description, fp.Finger.Index, 'Up');

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1100Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1100Description, finger);
    addDirection(letter1100Description, finger, 'Up');
}


export default letter1100Description;