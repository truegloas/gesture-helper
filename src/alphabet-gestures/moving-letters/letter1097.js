// TODO
// Add recognition in time

import * as fp from 'fingerpose';
import { addDirection } from "../utils";


const letter1097Description = new fp.GestureDescription('щ');

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1097Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1097Description, finger, 'Up');
}

for(let finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
    letter1097Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1097Description, finger, 'Up');
}

export default letter1097Description;