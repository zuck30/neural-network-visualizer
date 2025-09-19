import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { createNetworkGeometry } from '../utils/threejsUtils';

const Neuron = ({ position, layerIndex, neuronIndex, activation }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Pulsating effect based on activation
      const scale = 0.3 + (activation || 0) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Color based on activation
      const color = new THREE.Color();
      color.setHSL(0.6, 1, 0.3 + (activation || 0) * 0.4);
      meshRef.current.material.color = color;
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshPhongMaterial emissive={new THREE.Color(0x64ffda)} emissiveIntensity={0.1} />
    </mesh>
  );
};

const Connection = ({ from, to, weight }) => {
  const lineRef = useRef();
  
  useFrame(() => {
    if (lineRef.current) {
      // Adjust line width based on weight
      const material = lineRef.current.material;
      material.linewidth = Math.abs(weight) * 3 + 0.5;
      
      // Color based on weight
      const color = weight > 0 
        ? new THREE.Color(0.2, 0.8, 0.2) 
        : new THREE.Color(0.8, 0.2, 0.2);
      material.color = color;
    }
  });

  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  
  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial />
    </line>
  );
};

const NetworkVisualization = ({ networkConfig, weights, trainingData }) => {
  const { inputSize, hiddenLayers, outputSize } = networkConfig;
  const layers = [inputSize, ...hiddenLayers, outputSize];
  const groupRef = useRef();
  
  // Calculate positions for all neurons
  const neuronPositions = [];
  const layerSpacing = 3;
  const neuronSpacing = 1;
  
  layers.forEach((neuronCount, layerIndex) => {
    const layerPositions = [];
    const yOffset = (neuronCount - 1) * neuronSpacing / 2;
    
    for (let i = 0; i < neuronCount; i++) {
      const x = layerIndex * layerSpacing;
      const y = i * neuronSpacing - yOffset;
      layerPositions.push([x, y, 0]);
    }
    
    neuronPositions.push(layerPositions);
  });
  
  // Create connections based on weights
  const connections = [];
  if (weights && weights.length > 0) {
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerSize = layers[layerIndex];
      const nextLayerSize = layers[layerIndex + 1];
      
      for (let i = 0; i < currentLayerSize; i++) {
        for (let j = 0; j < nextLayerSize; j++) {
          const weightIndex = i * nextLayerSize + j;
          if (weights[layerIndex] && weightIndex < weights[layerIndex].length) {
            const weight = weights[layerIndex][weightIndex];
            connections.push({
              from: neuronPositions[layerIndex][i],
              to: neuronPositions[layerIndex + 1][j],
              weight: weight
            });
          }
        }
      }
    }
  }
  
  return (
    <group ref={groupRef}>
      {/* Render layers label */}
      {layers.map((count, index) => (
        <Text
          key={`label-${index}`}
          position={[index * layerSpacing, (layers[index] * neuronSpacing / 2) + 1, 0]}
          fontSize={0.5}
          color="#64ffda"
          anchorX="center"
          anchorY="middle"
        >
          {index === 0 ? 'Input' : index === layers.length - 1 ? 'Output' : `Hidden ${index}`}
        </Text>
      ))}
      
      {/* Render connections */}
      {connections.map((conn, index) => (
        <Connection
          key={`conn-${index}`}
          from={conn.from}
          to={conn.to}
          weight={conn.weight}
        />
      ))}
      
      {/* Render neurons */}
      {neuronPositions.map((layer, layerIndex) =>
        layer.map((position, neuronIndex) => (
          <Neuron
            key={`neuron-${layerIndex}-${neuronIndex}`}
            position={position}
            layerIndex={layerIndex}
            neuronIndex={neuronIndex}
            activation={Math.random() * 0.8} // This would come from actual activations
          />
        ))
      )}
    </group>
  );
};

const NeuralNetwork3D = ({ networkConfig, trainingData, weights }) => {
  return (
    <Canvas
      camera={{ position: [10, 5, 10], fov: 50 }}
      style={{ background: '#1a1a1a' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <axesHelper args={[5]} />
      <gridHelper args={[20, 20, 0x444444, 0x222222]} />
      
      <NetworkVisualization 
        networkConfig={networkConfig} 
        weights={weights}
        trainingData={trainingData}
      />
    </Canvas>
  );
};

export default NeuralNetwork3D;