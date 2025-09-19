import React from 'react';

const ModelSelector = ({ selectedModel, onModelChange }) => {
  const models = [
    { id: 'XOR', name: 'XOR Problem' },
    { id: 'Linear', name: 'Linear Regression' },
    { id: 'Circle', name: 'Circle Classification' }
  ];

  return (
    <div className="model-selector">
      <h3>Select Model</h3>
      
      <div className="model-buttons">
        {models.map(model => (
          <button
            key={model.id}
            className={`model-btn ${selectedModel === model.id ? 'active' : ''}`}
            onClick={() => onModelChange(model.id)}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;