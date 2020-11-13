import * as fp from "fingerpose";


export function addDirection(gesture, finger, direction = 'Horizontal') {
    if (direction !== 'Horizontal') {
        gesture.addDirection(finger, fp.FingerDirection.nameMapping['Vertical ' + direction], 1.0);
        gesture.addDirection(finger, fp.FingerDirection.nameMapping['Diagonal ' + direction + ' Left'], 0.25);
        gesture.addDirection(finger, fp.FingerDirection.nameMapping['Diagonal ' + direction + ' Right'], 0.25);
    } else {
        gesture.addDirection(finger, fp.FingerDirection.nameMapping[direction + ' Left'], 1.0);
        gesture.addDirection(finger, fp.FingerDirection.nameMapping[direction + ' Right'], 1.0);
    }
}