import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand, FigurePredictor, fingerJoints, findTheMostCommonLetter, clearArray } from "./utilities";
import * as fp from "fingerpose";
import * as ag from "./alphabet-gestures/export";


let text = '';
let symbol = '';
let processingSymbol = '';

let previousCheckTime = null;

let predictedSymbols = [];

let letters = [];
for (let i = 1072; i < 1104; ++i) {
  letters.push(ag["letter" + i]);
}
letters.push(ag.letter1105);

const LIMITPREDICTEDSYMBOLS = 20;

const lettersUsingForDynamicArray = ['д', 'е', 'и', 'к', 'х', 'ц', 'ш', 'ъ', 'ь', 'э'];


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);
  const textareaPredictionRef = useRef(null);
  const buttonRef = useRef(null);

  const runHandpose = async () => {

    const net = await handpose.load();
    console.log("Handpose model loaded.");

    const video = webcamRef.current.video;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    let figurePredictor = new FigurePredictor(videoWidth, videoHeight);

    setInterval(() => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        detect(net, video, figurePredictor);
      } else {
        textareaRef.current.placeholder = 'Необходимо подключить камеру';
      }
    }, 100);
  };

  const detect = async (net, video, figurePredictor) => {
    const hand = await net.estimateHands(video);

    if (hand.length > 0) {
      const GE = new fp.GestureEstimator(letters);
      const gesture = await GE.estimate(hand[0].landmarks, 4);

      console.log('----------describe----------');

      // console.log('Gestures data');
      //
      // for (let i = 0; i < gesture.poseData.length; ++i) {
      //   console.log(gesture.poseData[i]);
      // }
      //
      // for (let i = 0; i < gesture.gestures.length; ++i) {
      //   console.log(gesture.gestures[i]);
      // }

      if (gesture.gestures.length > 0) {
        const confidence = gesture.gestures.map(
          (prediction) => prediction.confidence
        );
        const maxConfidence = confidence.indexOf(
          Math.max.apply(null, confidence)
        );

        symbol = gesture.gestures[maxConfidence].name;

        if (symbol !== ('д' || 'ц' || 'ь' || 'ъ' || 'к') ||
            processingSymbol !== (('д' || 'ц' || 'ь' || 'ъ' || 'к'))) {

          predictedSymbols.push(symbol);
        }

        console.log('Current symbol: ' + symbol);

        if (lettersUsingForDynamicArray.includes(symbol) || processingSymbol !== '') {
          if (processingSymbol === '') {
            processingSymbol = symbol;
          }

          console.log('Processing symbol: ' + processingSymbol);

          let predictedDirection;
          let predictedFigure;

          function processDirections(fingerDot, resultSymbol, directionToRecognize) {
            let checkTime = new Date();

            figurePredictor.predictDirection(hand[0].landmarks[fingerDot]);
            if (directionToRecognize === FigurePredictor.directions.LEFT ||
                directionToRecognize === FigurePredictor.directions.RIGHT) {
              predictedDirection = figurePredictor.handDirections.x[figurePredictor.handDirections.x.length - 1];
            } else {
              predictedDirection = figurePredictor.handDirections.y[figurePredictor.handDirections.y.length - 1];
            }

            if (previousCheckTime === null) {
              previousCheckTime = checkTime;
            }

            if (predictedDirection === directionToRecognize) {

              previousCheckTime = null;
              processingSymbol = '';

              clearArray(predictedSymbols);
              figurePredictor.clearHandDirections();

              return resultSymbol;

            } else if (
                (predictedDirection !== directionToRecognize && (
                figurePredictor.handDirections.x >= 1 ||
                figurePredictor.handDirections.y >= 1)
                ) ||
                checkTime.getSeconds() - previousCheckTime.getSeconds() > 1
            ) {

              previousCheckTime = null;
              processingSymbol = '';

              clearArray(predictedSymbols);
              figurePredictor.clearHandDirections();
            }

            return '';
          }

          const CHECKTIMELIMIT = 1;

          let checkTime;
          let predictedDirectionYForIndexFinger;
          let predictedDirectionXForThumbFinger;
          let differenceOfTime;

          switch (processingSymbol) {
            case 'д':
              predictedFigure = figurePredictor.predictFigure(hand[0].landmarks[fingerJoints.indexFinger[1]]);
              predictedDirectionYForIndexFinger = figurePredictor.handDirections.y[figurePredictor.handDirections.y.length - 1];

              checkTime = new Date();

              if (previousCheckTime === null) {
                previousCheckTime = checkTime;
              }

              differenceOfTime = checkTime.getSeconds() - previousCheckTime.getSeconds();

              if (predictedFigure === FigurePredictor.figures.CIRCLE) {
                text += processingSymbol;

                processingSymbol = '';

                clearArray(predictedSymbols);
                figurePredictor.clearHandDirections();

              } else if (differenceOfTime > CHECKTIMELIMIT) {

                if (predictedDirectionYForIndexFinger === FigurePredictor.directions.DOWN) {

                  processingSymbol = 'к';

                } else if (predictedFigure !== FigurePredictor.figures.CIRCLE &&
                    figurePredictor.handDirections.x >= 3 &&
                    figurePredictor.handDirections.y >= 3) {

                  processingSymbol = '';
                }

                clearArray(predictedSymbols);
                figurePredictor.clearHandDirections();
              }
              break;
            case 'е':
              text += processDirections(fingerJoints.pinkyFinger[1], 'ё', FigurePredictor.directions.LEFT);
              break;
            case 'и':
              text += processDirections(fingerJoints.pinkyFinger[1], 'й', FigurePredictor.directions.LEFT);
              break;
            case 'к':
              let result = processDirections(fingerJoints.middleFinger[0], processingSymbol, FigurePredictor.directions.DOWN);
              if (result === '') {
                text += 'к';
              } else {
                processingSymbol = 'ц';
              }
              break;
            case 'х':
              predictedFigure = figurePredictor.predictFigure(hand[0].landmarks[fingerJoints.indexFinger[1]]);

              checkTime = new Date();

              if (previousCheckTime === null) {
                previousCheckTime = checkTime;
              }

              if (predictedFigure === FigurePredictor.figures.SEMICIRCLE &&
                  figurePredictor.handDirections.x >= 3) {
                text += 'з';

                processingSymbol = '';

                clearArray(predictedSymbols);
                figurePredictor.clearHandDirections();

              } else if ((predictedFigure !== FigurePredictor.figures.SEMICIRCLE &&
                  figurePredictor.handDirections.x >= 3) ||
                  checkTime.getSeconds() - previousCheckTime.getSeconds() > 3) {

                processingSymbol = '';

                clearArray(predictedSymbols);
                figurePredictor.clearHandDirections();
              }
              break;
            case 'ц':
              text += processDirections(fingerJoints.middleFinger[0], processingSymbol, FigurePredictor.directions.DOWN);
              break;
            case 'ш':
              text += processDirections(fingerJoints.middleFinger[1], 'щ', FigurePredictor.directions.DOWN);
              break;
            case 'э':
              predictedFigure = figurePredictor.predictFigure(hand[0].landmarks[fingerJoints.thumbFinger[1]]);
              predictedDirectionXForThumbFinger = figurePredictor.handDirections.x[figurePredictor.handDirections.x.length - 1];

              checkTime = new Date();

              if (previousCheckTime === null) {
                previousCheckTime = checkTime;
              }

              differenceOfTime = checkTime.getSeconds() - previousCheckTime.getSeconds();

              console.log('Predicted Figure: ' + predictedFigure);
              console.log('Predicted Direction: ' + predictedDirectionXForThumbFinger);

                if (predictedFigure === FigurePredictor.figures.SEMICIRCLE) {
                  console.log('I\'m here2');
                  if (predictedDirectionXForThumbFinger === FigurePredictor.directions.RIGHT) {
                    text += 'ь';
                  } else if (predictedDirectionXForThumbFinger === FigurePredictor.directions.LEFT) {
                    text += 'ъ';
                  }

                  processingSymbol = '';

                  clearArray(predictedSymbols);
                  figurePredictor.clearHandDirections();

                } else if (figurePredictor.handDirections.x >=3) {
                  if (predictedDirectionXForThumbFinger === FigurePredictor.directions.LEFT ||
                      predictedDirectionXForThumbFinger === FigurePredictor.directions.RIGHT) {

                    text += processingSymbol;
                    clearArray(predictedSymbols);
                    figurePredictor.clearHandDirections();

                  } else if ((predictedFigure !== FigurePredictor.figures.SEMICIRCLE &&
                      figurePredictor.handDirections.x >= 3 ||
                      figurePredictor.handDirections.y >= 3) ||
                      differenceOfTime > CHECKTIMELIMIT) {

                    processingSymbol = '';
                    clearArray(predictedSymbols);
                    figurePredictor.clearHandDirections();
                  }
                }
              break;
            default:
              processingSymbol = '';
          }
          textareaRef.current.placeholder = text;
        }

        let specifySymbol = '';
        if (predictedSymbols.length < LIMITPREDICTEDSYMBOLS) {

          textareaPredictionRef.current.placeholder = 'Подготовка';
        } else {
          if (processingSymbol !== '') {

            specifySymbol = findTheMostCommonLetter(predictedSymbols)
            if (specifySymbol) {
              processingSymbol = '';
            }
          } else {
            specifySymbol = findTheMostCommonLetter(predictedSymbols);
            textareaPredictionRef.current.placeholder = specifySymbol === null ? 'Ничего не распознано' : specifySymbol;

            setTimeout(() => {
              console.log('Hello, after 1 sec');
            }, 1000);
          }
        }

        text += specifySymbol;
        textareaRef.current.placeholder = text;
      }
    } else {
      clearArray(predictedSymbols);
    }
    const ctx = canvasRef.current.getContext("2d");
    drawHand(hand, ctx);
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
              text += ' ';
              textareaRef.current.placeholder = text;
            }}
          >Вставить пробел</button>
          <button className='App-header_button'
            ref={buttonRef}
            onClick={() => {
              text = '';
              textareaRef.current.placeholder = text;
            }}
            >Очистить поле с текстом</button>
          <button className='App-header_button'
                  ref={buttonRef}
                  onClick={() => {
                    text = text.replace(text[text.length - 1], '');
                    textareaRef.current.placeholder = text;
                  }}
          >Удалить последний символ</button>
        </div>
      </header>

    </div>
  );
}

export default App;
