import * as tf from '@tensorflow/tfjs';

// Utility functions for neural network operations
export const generateWeights = (layerSizes) => {
  const weights = [];
  
  for (let i = 0; i < layerSizes.length - 1; i++) {
    const layerWeights = [];
    const numWeights = layerSizes[i] * layerSizes[i + 1];
    
    // Generate random weights between -1 and 1
    for (let j = 0; j < numWeights; j++) {
      layerWeights.push(Math.random() * 2 - 1);
    }
    
    weights.push(layerWeights);
  }
  
  return weights;
};

export const getLayerActivations = (model, input) => {
  // This function would get the activations for each layer
  // For now, we'll return random values for visualization
  const activations = [];
  
  if (model && model.layers) {
    for (let i = 0; i < model.layers.length; i++) {
      const layerSize = model.layers[i].units;
      const layerActivations = [];
      
      for (let j = 0; j < layerSize; j++) {
        layerActivations.push(Math.random());
      }
      
      activations.push(layerActivations);
    }
  }
  
  return activations;
};