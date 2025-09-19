import { useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

export const useNeuralNetwork = () => {
  const [model, setModel] = useState(null);
  const [weights, setWeights] = useState([]);

  const createModel = useCallback((config) => {
    const { inputSize, hiddenLayers, outputSize, activation } = config;
    
    // Create a sequential model
    const newModel = tf.sequential();
    
    // Add input layer
    newModel.add(tf.layers.dense({
      units: hiddenLayers[0],
      inputShape: [inputSize],
      activation: activation
    }));
    
    // Add hidden layers
    for (let i = 1; i < hiddenLayers.length; i++) {
      newModel.add(tf.layers.dense({
        units: hiddenLayers[i],
        activation: activation
      }));
    }
    
    // Add output layer
    newModel.add(tf.layers.dense({
      units: outputSize,
      activation: outputSize === 1 ? 'sigmoid' : 'softmax'
    }));
    
    // Extract initial weights for visualization
    const initialWeights = [];
    newModel.layers.forEach(layer => {
      const layerWeights = layer.getWeights();
      if (layerWeights.length > 0) {
        // Convert weight tensor to regular array for visualization
        const weightValues = Array.from(layerWeights[0].dataSync());
        initialWeights.push(weightValues);
      }
    });
    
    setWeights(initialWeights);
    setModel(newModel);
    
    return newModel;
  }, []);

  const updateModel = useCallback((config) => {
    if (model) {
      // For simplicity, we'll create a new model when config changes
      // In a more advanced implementation, i would modify the existing model
      createModel(config);
    }
  }, [model, createModel]);

  return {
    model,
    weights,
    createModel,
    updateModel
  };
};