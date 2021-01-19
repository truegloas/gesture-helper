// TODO
// 0. Install fingerpose npm install fingerpose
// 1. Add Use State
// 2. Import symbols and finger pose import * as fp from "fingerpose";
// 3. Setup hook and symbol object
// 4. Update detect function for gesture handling
// 5. Add symbol display to the screen DONE
// 6. Add textarea for write any recognited objects DONE
// 7. Solve continuous problem with endless recognizing
// 8. Add first symbol to recognize
// 9. Add btns for start|end recognize and for clear textarea

import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import * as ag from "./alphabet-gestures/export";


let text = '';
let symbol = '';
let predictionText = '';

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);
  const textareaPredictionRef = useRef(null);
  const buttonRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const directions = {
    STATIC: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
  }

  const figures = {
    NONE: 0,
    SEMICIRCLE: 1,
    CIRCLE: 2,
  }

  let handMovePoints = [];
  let handDirections = {
    x: [],
    y: []
  };
  let lastFigure;

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      let letters = [];
      for (let i = 1072; i < 1104; ++i) {
        letters.push(ag["letter" + i]);
      }
      letters.push(ag.letter1105);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(letters);
        const gesture = await GE.estimate(hand[0].landmarks, 4);

        console.log('----------describe----------');

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          symbol = gesture.gestures[maxConfidence].name;

          if (symbol === null) {
            textareaPredictionRef.current.placeholder = 'Ничего не распознано';
          } else {
            textareaPredictionRef.current.placeholder = symbol;
          }

          handMovePoints.push(hand[0].landmarks[0]);

          if (handMovePoints.length > 50) {
            let i = handMovePoints.length / 2;
            while (i > 0) {
              handMovePoints.shift();
              --i;
            }
          }

          let handMoveDirectionX;
          let handMoveDirectionY;

          let shiftX = videoWidth * 0.01;
          let shiftY = videoHeight * 0.01;
          let inverseShiftX = -shiftX;
          let inverseShiftY = -shiftY;

          if (handMovePoints.length > 1) {
            if (handMovePoints[handMovePoints.length - 1][0] - handMovePoints[handMovePoints.length - 2][0] > shiftX) {
              handMoveDirectionX = directions.RIGHT;
            }
            else if (handMovePoints[handMovePoints.length - 1][0] - handMovePoints[handMovePoints.length - 2][0] < inverseShiftX) {
              handMoveDirectionX = directions.LEFT;
            }
            else {
              handMoveDirectionX = directions.STATIC;
            }
            if (handMovePoints[handMovePoints.length - 1][1] - handMovePoints[handMovePoints.length - 2][1] > shiftY) {
              handMoveDirectionY = directions.DOWN;
            }
            else if (handMovePoints[handMovePoints.length - 1][1] - handMovePoints[handMovePoints.length - 2][1] < inverseShiftY) {
              handMoveDirectionY = directions.UP;
            }
            else {
              handMoveDirectionY = directions.STATIC;
            }

            if (handDirections.x.length > 0 && handDirections.y.length > 0) {
              if (handDirections.x[handDirections.x.length - 1] !== handMoveDirectionX) {
                handDirections.x.push(handMoveDirectionX);
                handDirections.y.push(handMoveDirectionY);
              }

              if (handDirections.y[handDirections.y.length - 1] !== handMoveDirectionY) {
                handDirections.x.push(handMoveDirectionX);
                handDirections.y.push(handMoveDirectionY);
              }
            }
            else {
              handDirections.x.push(handMoveDirectionX);
              handDirections.y.push(handMoveDirectionY);
            }

            let figure = figures.NONE;

            if (handDirections.x.length > 1 && handDirections.y.length > 1 && lastFigure !== figures.CIRCLE) {
              if ((handDirections.y[handDirections.y.length - 1] !== handDirections.y[handDirections.y.length - 2] ||
                  handDirections.x[handDirections.x.length - 1] !== handDirections.x[handDirections.x.length - 2]) &&
                  handDirections.y[handDirections.y.length - 1] !== directions.STATIC &&
                  handDirections.y[handDirections.y.length - 2] !== directions.STATIC &&
                  handDirections.x[handDirections.x.length - 1] !== directions.STATIC) {
                figure = figures.SEMICIRCLE;
              }
            }

            if (handDirections.x.length > 4 && handDirections.y.length > 4) {
              let flag = true;

              for (let i = 1; i < 2; ++i) {
                if (handDirections.x[handDirections.x.length - i] ===
                    handDirections.x[handDirections.x.length - (i + 2)] &&
                    handDirections.y[handDirections.y.length - i] ===
                    handDirections.y[handDirections.y.length - (i + 2)]) {
                  flag = false;
                }
              }

              for (let i = 1; i < 5; ++i) {
                if (handDirections.x[handDirections.x.length - i] === directions.STATIC &&
                    handDirections.y[handDirections.y.length - i] === directions.STATIC) {
                  flag = false;
                }
              }

              if (flag) {
                figure = figures.CIRCLE;
              }
            }

            lastFigure = figure;

            console.log(figure);

            if (handDirections.x.length > 50 && handDirections.y.length > 50) {
              for (let i = (handDirections.x.length + handDirections.y.length) / 4; i > 0; --i) {
                handDirections.x.shift();
                handDirections.y.shift();
              }
            }
          }
        }
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    } else {
      textareaRef.current.placeholder = 'Необходимо подключить камеру';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas className='App-header_canvas'
          ref={canvasRef}
        />
        <textarea className='App-header_textarea'
              ref={textareaRef}
              readOnly={true}
        />
        <div className='App-header_prediction-box'>
          <p className='App-header_prediction-box-text'>Распознанный символ:</p>
          <textarea className='App-header_prediction-box-textarea'
            ref={textareaPredictionRef}
            readOnly={true}
          />
        </div>
        <div className='App-header_button-container'>
          <button className='App-header_button'
            ref={buttonRef}
            onClick={runHandpose}
          >Начать распознавание</button>
          <button className='App-header_button'
            ref={buttonRef}
            onClick={() => {
              text += symbol
              textareaRef.current.placeholder = text;
            }}
          >Вставить распознанный символ</button>
          <button className='App-header_button'
            ref={buttonRef}
            onClick={() => {
              text += ' ';
              textareaRef.current.placeholder = text;
            }}
          >Вставить пробел</button>
          <button className='App-header_button App-header_button--last'
            ref={buttonRef}
            onClick={() => {
              text = '';
              textareaRef.current.placeholder = text;
            }}
            >Очистить поле с текстом</button>
        </div>
      </header>

    </div>
  );
}

export default App;
