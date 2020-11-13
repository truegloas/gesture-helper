// TODO
// Add recognition of 'Left to Right' move in time

import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1098Description = new fp.GestureDescription('ь');

for(let finger of [fp.Finger.Thumb, fp.Finger.Index]) {
    letter1098Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1098Description, finger);
}

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1098Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1098Description, finger);
}

export default letter1098Description;