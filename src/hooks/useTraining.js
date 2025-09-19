import { useState, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

// Generate training data based on model type
const generateTrainingData = (modelType, size = 100) => {
  let inputs = [];
  let outputs = [];
  
  switch(modelType) {
    case 'XOR':
      // XOR problem: inputs are [0,0], [0,1], [1,0], [1,1]
      // outputs are 0, 1, 1, 0
      for (let i = 0; i < size; i++) {
        const a = Math.round(Math.random());
        const b = Math.round(Math.random());
        inputs.push([a, b]);
        outputs.push([a ^ b]); // XOR operation
      }
      break;
      
    case 'Linear':
      // Linear regression: y = 2x + 1 + noise
      for (let i = 0; i < size; i++) {
        const x = Math.random() * 2 - 1; // -1 to 1
        const y = 2 * x + 1 + (Math.random() * 0.2 - 0.1); // with some noise
        inputs.push([x]);
        outputs.push([y]);
      }
      break;
      
    case 'Circle':
      // Circle classification: points inside/outside a circle
      for (let i = 0; i < size; i++) {
        const x = Math.random() * 2 - 1; // -1 to 1
        const y = Math.random() * 2 - 1; // -1 to 1
        inputs.push([x, y]);
        // 1 if inside circle of radius 0.7, else 0
        outputs.push([x*x + y*y < 0.7*0.7 ? 1 : 0]);
      }
      break;
      
    default:
      break;
  }
  
  return {
    inputs: tf.tensor2d(inputs),
    outputs: tf.tensor2d(outputs)
  };
};

export const useTraining = (model, networkConfig) => {
  const [training, setTraining] = useState(false);
  const [stats, setStats] = useState({
    epoch: 0,
    loss: 0,
    accuracy: 0,
    learningRate: 0,
    status: 'Not started',
    trainingData: []
  });
  
  const trainingRef = useRef(false);
  const animationFrameId = useRef(null);

  const startTraining = useCallback(async () => {
    if (!model || trainingRef.current) return;
    
    setTraining(true);
    trainingRef.current = true;
    
    // Compile the model
    model.compile({
      optimizer: tf.train.sgd(networkConfig.learningRate),
      loss: networkConfig.outputSize === 1 ? 'meanSquaredError' : 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
    
    // Generate training data
    const { inputs, outputs } = generateTrainingData('XOR', 100);
    
    let epoch = 0;
    const maxEpochs = 1000;
    const trainingData = [];
    
    const trainLoop = async () => {
      if (!trainingRef.current || epoch >= maxEpochs) {
        stopTraining();
        return;
      }
      
      // Train for one epoch
      const history = await model.fit(inputs, outputs, {
        epochs: 1,
        shuffle: true,
        verbose: 0
      });
      
      // Calculate accuracy (for demonstration)
      const predictions = model.predict(inputs);
      let accuracy;
      if (networkConfig.outputSize === 1) {
        // For regression, use a threshold-based accuracy
        const predVals = predictions.dataSync();
        const actualVals = outputs.dataSync();
        let correct = 0;
        for (let i = 0; i < predVals.length; i++) {
          if (Math.abs(predVals[i] - actualVals[i]) < 0.5) correct++;
        }
        accuracy = correct / predVals.length;
      } else {
        // For classification, use argmax comparison
        accuracy = history.history.acc[0];
      }
      
      // Extract weights for visualization
      const currentWeights = [];
      model.layers.forEach(layer => {
        const layerWeights = layer.getWeights();
        if (layerWeights.length > 0) {
          const weightValues = Array.from(layerWeights[0].dataSync());
          currentWeights.push(weightValues);
        }
      });
      
      // Update stats
      setStats({
        epoch: epoch + 1,
        loss: history.history.loss[0],
        accuracy: accuracy,
        learningRate: networkConfig.learningRate,
        status: 'Training',
        trainingData: [...trainingData, { epoch: epoch + 1, loss: history.history.loss[0] }]
      });
      
      epoch++;
      
      // Continue training on next animation frame
      animationFrameId.current = requestAnimationFrame(trainLoop);
    };
    
    // Start training loop
    animationFrameId.current = requestAnimationFrame(trainLoop);
  }, [model, networkConfig]);
  
  const stopTraining = useCallback(() => {
    trainingRef.current = false;
    setTraining(false);
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    
    setStats(prev => ({
      ...prev,
      status: 'Stopped'
    }));
  }, []);
  
  return {
    training,
    startTraining,
    stopTraining,
    stats
  };
};