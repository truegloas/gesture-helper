import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1096Description = new fp.GestureDescription('ш');

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1096Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1096Description, finger, 'Up');
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
    letter1096Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1096Description, finger, 'Up');
}

export default letter1096Description;