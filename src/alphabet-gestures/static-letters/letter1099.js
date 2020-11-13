import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1099Description = new fp.GestureDescription('ы');

for(let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1099Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1099Description, finger, 'Up');
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
    letter1099Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1099Description, finger, 'Up');
}

export default letter1099Description;