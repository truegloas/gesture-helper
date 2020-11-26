import * as fp from 'fingerpose';
import { addDirection } from "../utils";
import letter1083Description from "./letter1083";


const letter1096Description = new fp.GestureDescription('ш');

letter1096Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
letter1096Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
letter1096Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
letter1096Description.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    letter1096Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1096Description, finger, 'Up');
}

letter1096Description.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
addDirection(letter1096Description, fp.Finger.Pinky, 'Up');


export default letter1096Description;