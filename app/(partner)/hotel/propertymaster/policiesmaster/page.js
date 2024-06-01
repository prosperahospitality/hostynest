'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

// Define the ImageDetection component
function ImageDetection() {
  const [predictions, setPredictions] = useState([]);
  const imgRef = useRef(null);

  useEffect(() => {
    const loadModelAndDetect = async () => {
      // Set up TensorFlow.js backend
      await tf.setBackend('webgl');

      // Load the model
      const model = await cocoSsd.load();

      // Make predictions on the image
      if (imgRef.current) {
        const image = imgRef.current;
        const detections = await model.detect(image, 6);
        setPredictions(detections);
      }
    };

    loadModelAndDetect();
  }, []);

  return (
    <div>
      <img
        ref={imgRef}
        src="/img/TajHotel-64103436/Property Main-PM00001/16.jpg"
        alt="Detecting objects"
        onLoad={() => console.log('Image loaded')} // Optional: Do something when image is loaded
      />
      <div>
        <h2>Predictions:</h2>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>
              {prediction.class}: {Math.round(prediction.score * 100)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Export the ImageDetection component
export default ImageDetection;
