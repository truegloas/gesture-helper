import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1087Description = new fp.GestureDescription('п');

for(let finger of [fp.Finger.Index, fp.Finger.Middle]) {
    letter1087Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1087Description, finger, 'Down');
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1087Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1087Description, finger, 'Down');
}

export default letter1087Description;