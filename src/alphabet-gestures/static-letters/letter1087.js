import * as fp from 'fingerpose';
import {addDirection} from "../utils";


const letter1087Description = new fp.GestureDescription('п');

letter1087Description.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.5);

for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle]) {
    letter1087Description.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    addDirection(letter1087Description, finger, 'Down');
}

letter1087Description.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
addDirection(letter1087Description, fp.Finger.Ring, 'Down');

letter1087Description.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
letter1087Description.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 0.5);
letter1087Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 1.0);
letter1087Description.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 1.0);


export default letter1087Description;