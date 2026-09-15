import React from 'react';
import { usePortOperations } from '../context/PortOperationsContext';
import { SimulatorControls } from '../components/simulator/SimulatorControls';
import { ComparisonGrid } from '../components/simulator/ComparisonGrid';
import { ImpactAnalysis } from '../components/simulator/ImpactAnalysis';

export const WhatIfSimulatorPage: React.FC = () => {
  const { simulationResult, isSimulating } = usePortOperations();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Control Panel with interactive sliders & presets */}
      <SimulatorControls />

      {/* 2. Simulation Results (BEFORE -> AFTER) */}
      {simulationResult && (
        <>
          <ComparisonGrid result={simulationResult} />
          <ImpactAnalysis result={simulationResult} />
        </>
      )}
    </div>
  );
};
