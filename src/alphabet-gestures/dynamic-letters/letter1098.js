import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1098Description = new fp.GestureDescription('ъ');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index]) {
    letter1098Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}

letter1098Description.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.5);

addDirection(letter1098Description, fp.Finger.Thumb);
addDirection(letter1098Description, fp.Finger.Index, 'Down');

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1098Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1098Description, finger);
    addDirection(letter1098Description, finger, 'Down');
}

export default letter1098Description;