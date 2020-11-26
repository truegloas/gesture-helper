import * as fp from 'fingerpose';
import { addDirection } from "../utils";
import letter1096Description from "./letter1096";


const letter1099Description = new fp.GestureDescription('ы');

letter1099Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
addDirection(letter1099Description, fp.Finger.Thumb,'Up');

for(let finger of [fp.Finger.Middle, fp.Finger.Ring]) {
    letter1099Description.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    addDirection(letter1099Description, finger, 'Up');
}

for(let finger of [fp.Finger.Index, fp.Finger.Pinky]) {
    letter1099Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}

letter1096Description.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.5);
letter1096Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1096Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

addDirection(letter1096Description, fp.Finger.Pinky, 'Up');


export default letter1099Description;