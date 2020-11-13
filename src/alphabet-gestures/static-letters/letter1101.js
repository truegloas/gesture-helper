import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1101Description = new fp.GestureDescription('э');

letter1101Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1101Description, fp.Finger.Thumb);


letter1101Description.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
addDirection(letter1101Description, fp.Finger.Index, 'Up');

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    letter1101Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1101Description, finger, 'Up');
}

export default letter1101Description;