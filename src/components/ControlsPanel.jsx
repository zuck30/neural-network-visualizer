import React from 'react';

const ControlsPanel = ({ networkConfig, onConfigChange, onStartTraining, onStopTraining, isTraining }) => {
  const handleInputChange = (field, value) => {
    const newConfig = { ...networkConfig };
    
    if (field === 'hiddenLayers') {
      // Convert string like "3,4,5" to array [3,4,5]
      newConfig[field] = value.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    } else if (field === 'inputSize' || field === 'outputSize') {
      newConfig[field] = parseInt(value);
    } else if (field === 'learningRate') {
      newConfig[field] = parseFloat(value);
    } else {
      newConfig[field] = value;
    }
    
    onConfigChange(newConfig);
  };

  return (
    <div className="control-panel">
      <h2>Network Controls</h2>
      
      <div className="control-group">
        <h3>Architecture</h3>
        
        <div className="control-item">
          <label htmlFor="inputSize">Input Size</label>
          <input
            id="inputSize"
            type="number"
            min="1"
            max="10"
            value={networkConfig.inputSize}
            onChange={(e) => handleInputChange('inputSize', e.target.value)}
            disabled={isTraining}
          />
        </div>
        
        <div className="control-item">
          <label htmlFor="hiddenLayers">Hidden Layers (comma separated)</label>
          <input
            id="hiddenLayers"
            type="text"
            value={networkConfig.hiddenLayers.join(',')}
            onChange={(e) => handleInputChange('hiddenLayers', e.target.value)}
            disabled={isTraining}
          />
        </div>
        
        <div className="control-item">
          <label htmlFor="outputSize">Output Size</label>
          <input
            id="outputSize"
            type="number"
            min="1"
            max="10"
            value={networkConfig.outputSize}
            onChange={(e) => handleInputChange('outputSize', e.target.value)}
            disabled={isTraining}
          />
        </div>
      </div>
      
      <div className="control-group">
        <h3>Training Parameters</h3>
        
        <div className="control-item">
          <label htmlFor="learningRate">Learning Rate</label>
          <input
            id="learningRate"
            type="number"
            min="0.001"
            max="1"
            step="0.001"
            value={networkConfig.learningRate}
            onChange={(e) => handleInputChange('learningRate', e.target.value)}
            disabled={isTraining}
          />
        </div>
        
        <div className="control-item">
          <label htmlFor="activation">Activation Function</label>
          <select
            id="activation"
            value={networkConfig.activation}
            onChange={(e) => handleInputChange('activation', e.target.value)}
            disabled={isTraining}
          >
            <option value="sigmoid">Sigmoid</option>
            <option value="relu">ReLU</option>
            <option value="tanh">Tanh</option>
          </select>
        </div>
      </div>
      
      <div className="button-group">
        <button 
          className="btn-primary" 
          onClick={onStartTraining}
          disabled={isTraining}
        >
          {isTraining ? 'Training...' : 'Start Training'}
        </button>
        
        <button 
          className="btn-secondary" 
          onClick={onStopTraining}
          disabled={!isTraining}
        >
          Stop Training
        </button>
      </div>
    </div>
  );
};

export default ControlsPanel;