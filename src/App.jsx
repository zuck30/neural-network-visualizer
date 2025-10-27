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
      <div className="app-layout">
        {/* Top Header Bar */}
        <header className="header-bar">
          <div className="header-left">
            <span className="app-title">Neural Network Studio</span>
          </div>
          <div className="header-center">
            <div className="training-status">
              <div className={`status-indicator ${training ? 'training' : 'idle'}`}></div>
              <span>{training ? 'TRAINING' : 'READY'}</span>
            </div>
          </div>
          <div className="header-right">
            <span className="model-name">{selectedModel} Model</span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="main-content">
          {/* Left Sidebar - Controls */}
          <div className="sidebar left-sidebar">
            <div className="sidebar-section">
              <div className="section-header">
                <h3>MODEL PRESETS</h3>
              </div>
              <ModelSelector 
                selectedModel={selectedModel} 
                onModelChange={handleModelChange} 
              />
            </div>

            <div className="sidebar-section">
              <div className="section-header">
                <h3>NETWORK ARCHITECTURE</h3>
              </div>
              <ControlsPanel 
                networkConfig={networkConfig}
                onConfigChange={handleConfigChange}
                onStartTraining={startTraining}
                onStopTraining={stopTraining}
                isTraining={training}
              />
            </div>
          </div>

          {/* Center Viewport - 3D Visualization */}
          <div className="viewport">
            <div className="viewport-header">
              <span>3D NETWORK VISUALIZATION</span>
              <div className="viewport-controls">
                <button className="viewport-btn">Reset View</button>
                <button className="viewport-btn">Toggle Grid</button>
              </div>
            </div>
            <div className="visualization-container">
              <NeuralNetwork3D 
                networkConfig={networkConfig} 
                trainingData={stats.trainingData}
                weights={model?.weights || []}
              />
            </div>
          </div>

          {/* Right Sidebar - Stats & Info */}
          <div className="sidebar right-sidebar">
            <div className="sidebar-section">
              <div className="section-header">
                <h3>TRAINING STATISTICS</h3>
              </div>
              <TrainingStats stats={stats} />
            </div>

            <div className="sidebar-section">
              <div className="section-header">
                <h3>NETWORK INFO</h3>
              </div>
              <div className="network-info">
                <div className="info-row">
                  <span>Layers:</span>
                  <span>{[networkConfig.inputSize, ...networkConfig.hiddenLayers, networkConfig.outputSize].join(' → ')}</span>
                </div>
                <div className="info-row">
                  <span>Activation:</span>
                  <span>{networkConfig.activation}</span>
                </div>
                <div className="info-row">
                  <span>Learning Rate:</span>
                  <span>{networkConfig.learningRate}</span>
                </div>
                <div className="info-row">
                  <span>Total Parameters:</span>
                  <span>{(networkConfig.inputSize * networkConfig.hiddenLayers[0] + networkConfig.hiddenLayers.reduce((a, b, i, arr) => a + b * (arr[i + 1] || networkConfig.outputSize), 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="section-header">
                <h3>TRAINING CONTROLS</h3>
              </div>
              <div className="training-controls">
                <button 
                  className={`train-btn primary ${training ? 'active' : ''}`}
                  onClick={startTraining}
                  disabled={training}
                >
                  {training ? 'TRAINING...' : 'START TRAINING'}
                </button>
                <button 
                  className="train-btn secondary"
                  onClick={stopTraining}
                  disabled={!training}
                >
                  STOP TRAINING
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <footer className="status-bar">
          <div className="status-left">
            <span>Epoch: {stats.epoch}</span>
            <span>Loss: {stats.loss.toFixed(6)}</span>
            <span>Accuracy: {(stats.accuracy * 100).toFixed(2)}%</span>
          </div>
          <div className="status-right">
            <span>Ready</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;