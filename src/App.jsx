import React, { useState } from 'react';
import NeuralNetwork3D from './components/NeuralNetwork3D';
import ControlsPanel from './components/ControlsPanel';
import TrainingStats from './components/TrainingStats';
import ModelSelector from './components/ModelSelector';
import { useNeuralNetwork } from './hooks/useNeuralNetwork';
import { useTraining } from './hooks/useTraining';
import './styles/App.css';

function App() {
  const [selectedModel, setSelectedModel] = useState('XOR');
  const [networkConfig, setNetworkConfig] = useState({
    inputSize: 2,
    hiddenLayers: [3, 3],
    outputSize: 1,
    learningRate: 0.1,
    activation: 'sigmoid'
  });

  const { model, createModel, updateModel } = useNeuralNetwork();
  const { training, startTraining, stopTraining, stats } = useTraining(model, networkConfig);

  const handleConfigChange = (newConfig) => {
    setNetworkConfig(newConfig);
    updateModel(newConfig);
  };

  const handleModelChange = (modelType) => {
    setSelectedModel(modelType);
    let newConfig = { ...networkConfig };
    
    switch(modelType) {
      case 'XOR':
        newConfig = { inputSize: 2, hiddenLayers: [3, 3], outputSize: 1, learningRate: 0.1, activation: 'sigmoid' };
        break;
      case 'Linear':
        newConfig = { inputSize: 1, hiddenLayers: [4, 4], outputSize: 1, learningRate: 0.01, activation: 'relu' };
        break;
      case 'Circle':
        newConfig = { inputSize: 2, hiddenLayers: [6, 6], outputSize: 1, learningRate: 0.1, activation: 'sigmoid' };
        break;
      default:
        break;
    }
    
    setNetworkConfig(newConfig);
    createModel(newConfig);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Neural Network Visualizer</h1>
        <p>Interactive 3D visualization with TensorFlow.js and Three.js</p>
      </header>
      
      <div className="app-content">
        <div className="visualization-section">
          <NeuralNetwork3D 
            networkConfig={networkConfig} 
            trainingData={stats.trainingData}
            weights={model?.weights || []}
          />
        </div>
        
        <div className="control-section">
          <ModelSelector 
            selectedModel={selectedModel} 
            onModelChange={handleModelChange} 
          />
          
          <ControlsPanel 
            networkConfig={networkConfig}
            onConfigChange={handleConfigChange}
            onStartTraining={startTraining}
            onStopTraining={stopTraining}
            isTraining={training}
          />
          
          <TrainingStats stats={stats} />
        </div>
      </div>
    </div>
  );
}

export default App;