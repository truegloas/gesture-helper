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
        const gesture = await GE.estimate(hand[0].landmarks, 7);
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

          console.log("current symbol: " + symbol);
        }
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
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
