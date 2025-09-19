import * as THREE from 'three';

// Utility functions for Three.js operations
export const createNetworkGeometry = (layers) => {
  // This function would create a custom geometry for the neural network
  // For now, we'll return a simple group
  return new THREE.Group();
};

export const updateNeuronActivation = (neuronMesh, activation) => {
  if (neuronMesh) {
    // Scale based on activation
    const scale = 0.3 + activation * 0.2;
    neuronMesh.scale.set(scale, scale, scale);
    
    // Color based on activation
    const color = new THREE.Color();
    color.setHSL(0.6, 1, 0.3 + activation * 0.4);
    neuronMesh.material.color = color;
  }
};

export const updateConnectionWeight = (connectionLine, weight) => {
  if (connectionLine) {
    // Adjust line width based on weight
    connectionLine.material.linewidth = Math.abs(weight) * 3 + 0.5;
    
    // Color based on weight
    const color = weight > 0 
      ? new THREE.Color(0.2, 0.8, 0.2) 
      : new THREE.Color(0.8, 0.2, 0.2);
    connectionLine.material.color = color;
  }
};