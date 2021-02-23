import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand, FigurePredictor, fingerJoints, findTheMostCommonLetter, clearArray, directions, figures } from "./utilities";
import * as fp from "fingerpose";
import * as ag from "./alphabet-gestures/export";


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);
  const textareaPredictionRef = useRef(null);
  const buttonRef = useRef(null);

  const LIMITPREDICTEDSYMBOLS = 20;

  const lettersUsingForDynamicArray = ['д', 'е', 'и', 'к', 'х', 'ц', 'ш', 'ъ', 'ь', 'э'];

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
      let handLandmarks = hand[0].landmarks.map(
          (dotCoordinates) => dotCoordinates.map(
              (coordinate) => Math.round(coordinate)
          )
      );

      const gesture = await GE.estimate(handLandmarks, 4);

      console.log('----------describe----------');

      function getFingerDifferenceOnDimension(fingerDot1, fingerDot2, dimension) {
        if (dimension === 'x') {
          dimension = 0;
        } else if (dimension === 'y') {
          dimension = 1;
        } else if (dimension === 'z') {
          dimension = 2;
        }

        return handLandmarks[fingerDot1][dimension] < handLandmarks[fingerDot2][dimension];
      }

      let isRightHand = () => {
        let differenceOnX = getFingerDifferenceOnDimension(fingerJoints.pinkyFinger[1], fingerJoints.thumbFinger[1], 'x');
        let differenceOnZ = getFingerDifferenceOnDimension(fingerJoints.pinkyFinger[1], fingerJoints.pinkyFinger[0], 'z');

        return differenceOnX === differenceOnZ;
      }

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

            figurePredictor.predictDirection(handLandmarks[fingerDot]);

            if (((directionToRecognize === directions.LEFT || directions.RIGHT) && figurePredictor.handDirections.x.length > 3) ||
                figurePredictor.handDirections.y.length > 3) {
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

            } else if (checkTime.getSeconds() - previousCheckTime.getSeconds() > 1) {

              previousCheckTime = null;
              processingSymbol = '';

              clearArray(predictedSymbols);
              figurePredictor.clearHandDirections();
            }

            return '';
          }

          function processCircles (fingerDot, cooldownInSeconds, resultSymbol) {
            predictedFigure = figurePredictor.predictFigure(handLandmarks[fingerDot]);

            checkTime = new Date();

            if (previousCheckTime === null) {
              previousCheckTime = checkTime;
            }

            if (predictedFigure === figures.CIRCLE) {

              previousCheckTime = null;
              processingSymbol = '';

              clearArray(predictedSymbols);
              figurePredictor.clearHandDirections();

              return resultSymbol;

            } else if (checkTime.getSeconds() - previousCheckTime.getSeconds() > cooldownInSeconds) {

              previousCheckTime = null;
              processingSymbol = '';

              clearArray(predictedSymbols);
              figurePredictor.clearHandDirections();
            }

            return '';
          }

          let checkTime;

          switch (processingSymbol) {
            case 'д':
              if (getFingerDifferenceOnDimension(fingerJoints.pinkyFinger[4], fingerJoints.indexFinger[4], 'z')) {
                processingSymbol = 'к';
                break;
              }

              if (getFingerDifferenceOnDimension(fingerJoints.indexFinger[4], fingerJoints.pinkyFinger[4], 'z')) {
                processingSymbol = 'ц';
                break;
              }

              text += processCircles(fingerJoints.indexFinger[4], 2, processingSymbol);

              break;
            case 'е':
              text += processDirections(fingerJoints.pinkyFinger[2], 'ё', directions.LEFT);
              break;
            case 'и':
              text += processDirections(fingerJoints.pinkyFinger[4], 'й', directions.LEFT);
              break;
            case 'к':
              text += processDirections(fingerJoints.middleFinger[4], processingSymbol, directions.DOWN);
              break;
            case 'х':
              text += processCircles(fingerJoints.indexFinger[2], 3, 'з');
              break;
            case 'ц':
              text += processDirections(fingerJoints.middleFinger[1], processingSymbol, directions.DOWN);
              break;
            case 'ш':
              text += processDirections(fingerJoints.middleFinger[1], 'щ', directions.DOWN);
              break;
            case 'э':
              if (getFingerDifferenceOnDimension(fingerJoints.indexFinger[4], fingerJoints.pinkyFinger[1], 'z')) {
                if (getFingerDifferenceOnDimension(fingerJoints.indexFinger[4], fingerJoints.middleFinger[2], 'y')) {
                  processingSymbol = 'ъ';
                } else {
                  processingSymbol = 'ь';
                }
                break;
              }
              text += processDirections(fingerJoints.thumbFinger[1], processingSymbol, directions.RIGHT);
              text += processDirections(fingerJoints.thumbFinger[1], processingSymbol, directions.LEFT);
              break;
            case 'ъ':
              if (isRightHand()) {
                text += processDirections(fingerJoints.thumbFinger[4], processingSymbol, directions.LEFT);
              } else {
                text += processDirections(fingerJoints.thumbFinger[4], processingSymbol, directions.RIGHT);
              }
              break;
            case 'ь':
              if (isRightHand()) {
                text += processDirections(fingerJoints.thumbFinger[4], processingSymbol, directions.LEFT);
              } else {
                text += processDirections(fingerJoints.thumbFinger[4], processingSymbol, directions.RIGHT);
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
