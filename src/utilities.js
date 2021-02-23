export const fingerJoints = {
  thumbFinger: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinkyFinger: [0, 17, 18, 19, 20],
};

export const directions = {
  STATIC: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
  FORWARD: 5,
  BACK: 6
}

export const figures = {
  NONE: 0,
  SEMICIRCLE: 1,
  CIRCLE: 2,
}

const styleOfHandPoints = {
  color: 'gold',
  size: 6
}

export function clearArray(array) {
  while (array.length > 0) {
    array.pop();
  }
}

export class FigurePredictor {
  constructor(videoWidth, videoHeight) {
    this.handMovePoints = [];
    this.handDirections = {
      x: [],
      y: [],
      z: []
    };

    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;

    this.lastFigure = null;
  }

  clearHandDirections() {
    for (let direction of 'xyz') {
      clearArray(this.handDirections[direction]);
    }
  }

  predictDirection(landmarks) {
    this.handMovePoints.push(landmarks);

    if (this.handMovePoints.length > 50) {
      let i = this.handMovePoints.length / 2;
      while (i > 0) {
        this.handMovePoints.shift();
        --i;
      }
    }

    let handMoveDirectionX;
    let handMoveDirectionY;
    let handMoveDirectionZ;

    let alpha = 0.02;
    let shiftX = this.videoWidth * alpha;
    let shiftY = this.videoHeight * alpha;
    let inverseShiftX = -shiftX;
    let inverseShiftY = -shiftY;

    if (this.handMovePoints.length > 1) {
      if (this.handMovePoints[this.handMovePoints.length - 1][0] - this.handMovePoints[this.handMovePoints.length - 2][0] > shiftX) {
        handMoveDirectionX = directions.RIGHT;
      } else if (this.handMovePoints[this.handMovePoints.length - 1][0] - this.handMovePoints[this.handMovePoints.length - 2][0] < inverseShiftX) {
        handMoveDirectionX = directions.LEFT;
      } else {
        handMoveDirectionX = directions.STATIC;
      }
      if (this.handMovePoints[this.handMovePoints.length - 1][1] - this.handMovePoints[this.handMovePoints.length - 2][1] > shiftY) {
        handMoveDirectionY = directions.DOWN;
      } else if (this.handMovePoints[this.handMovePoints.length - 1][1] - this.handMovePoints[this.handMovePoints.length - 2][1] < inverseShiftY) {
        handMoveDirectionY = directions.UP;
      } else {
        handMoveDirectionY = directions.STATIC;
      }
      if (this.handMovePoints[this.handMovePoints.length - 1][2] - this.handMovePoints[this.handMovePoints.length - 2][2] > 0) {
        handMoveDirectionZ = directions.BACK;
      } else if (this.handMovePoints[this.handMovePoints.length - 1][2] - this.handMovePoints[this.handMovePoints.length - 2][2] < 0) {
        handMoveDirectionZ = directions.FORWARD;
      } else {
        handMoveDirectionZ = directions.STATIC;
      }

      if (this.handDirections.x.length > 0 && this.handDirections.y.length > 0) {
        if (this.handDirections.x[this.handDirections.x.length - 1] !== handMoveDirectionX) {
          this.handDirections.x.push(handMoveDirectionX);
          this.handDirections.y.push(handMoveDirectionY);
          this.handDirections.z.push(handMoveDirectionZ);
        }

        if (this.handDirections.y[this.handDirections.y.length - 1] !== handMoveDirectionY) {
          this.handDirections.x.push(handMoveDirectionX);
          this.handDirections.y.push(handMoveDirectionY);
          this.handDirections.z.push(handMoveDirectionZ);
        }
      } else {
        this.handDirections.x.push(handMoveDirectionX);
        this.handDirections.y.push(handMoveDirectionY);
        this.handDirections.z.push(handMoveDirectionZ);
      }
    }
  }

  predictFigure(landmarks) {
    this.predictDirection(landmarks);

    let figure = figures.NONE;

    if (this.handDirections.x.length > 1 && this.handDirections.y.length > 1 && this.lastFigure !== figures.CIRCLE) {
      if ((this.handDirections.y[this.handDirections.y.length - 1] !== this.handDirections.y[this.handDirections.y.length - 2] ||
          this.handDirections.x[this.handDirections.x.length - 1] !== this.handDirections.x[this.handDirections.x.length - 2]) &&
          this.handDirections.y[this.handDirections.y.length - 1] !== directions.STATIC &&
          this.handDirections.y[this.handDirections.y.length - 2] !== directions.STATIC &&
          this.handDirections.x[this.handDirections.x.length - 1] !== directions.STATIC) {
        figure = figures.SEMICIRCLE;
      }
    }

    if (this.handDirections.x.length >= 4 && this.handDirections.y.length >= 4) {
      let flag = true;

      for (let i = 1; i < 2; ++i) {
        if (this.handDirections.x[this.handDirections.x.length - i] ===
            this.handDirections.x[this.handDirections.x.length - (i + 2)] &&
            this.handDirections.y[this.handDirections.y.length - i] ===
            this.handDirections.y[this.handDirections.y.length - (i + 2)]) {
          flag = false;
        }
      }

      for (let i = 1; i < 5; ++i) {
        if (this.handDirections.x[this.handDirections.x.length - i] === directions.STATIC &&
            this.handDirections.y[this.handDirections.y.length - i] === directions.STATIC) {
          flag = false;
        }
      }

      if (flag) {
        figure = figures.CIRCLE;
      }
    }

    this.lastFigure = figure;

    return figure;
  }
}

export function findTheMostCommonLetter (predictedSymbols) {
  let commonLetters = {};
  let mostCommonLetter = null;

  while (predictedSymbols.length > 0) {
    let letter = predictedSymbols.shift();
    mostCommonLetter = mostCommonLetter === null ? letter : mostCommonLetter;

    if (letter in commonLetters) {
      commonLetters[letter] += 1;
    } else {
      commonLetters[letter] = 1;
    }
  }

  let max = 0;
  for (let key in commonLetters) {
    if (commonLetters[key] > max) {
      max = commonLetters[key];
      mostCommonLetter = key;
    }
  }

  return (max > 3) ? mostCommonLetter : null;
}

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;

      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          ctx.beginPath();
          ctx.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        ctx.beginPath();
        ctx.arc(x, y, styleOfHandPoints.size, 0, 3 * Math.PI);

        ctx.fillStyle = styleOfHandPoints.color;
        ctx.fill();
      }
    });
  }
}
