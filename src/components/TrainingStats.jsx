import React from 'react';

const TrainingStats = ({ stats }) => {
  return (
    <div className="training-stats">
      <h3>Training Statistics</h3>
      
      <div className="stat-item">
        <span>Epoch:</span>
        <span className="stat-value">{stats.epoch}</span>
      </div>
      
      <div className="stat-item">
        <span>Loss:</span>
        <span className="stat-value">{stats.loss.toFixed(6)}</span>
      </div>
      
      <div className="stat-item">
        <span>Accuracy:</span>
        <span className="stat-value">{(stats.accuracy * 100).toFixed(2)}%</span>
      </div>
      
      <div className="stat-item">
        <span>Learning Rate:</span>
        <span className="stat-value">{stats.learningRate}</span>
      </div>
      
      <div className="stat-item">
        <span>Status:</span>
        <span className="stat-value">{stats.status}</span>
      </div>
    </div>
  );
};

export default TrainingStats;