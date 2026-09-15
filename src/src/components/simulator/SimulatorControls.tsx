import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import {
  FlaskConical,
  Play,
  RotateCcw,
  CloudLightning,
  Ship,
  Sparkles,
  Zap,
} from 'lucide-react';

export const SimulatorControls: React.FC = () => {
  const {
    simulationParams,
    setSimulationParams,
    runSimulation,
    resetSimulation,
    loadPreset,
    isSimulating,
  } = usePortOperations();

  const handleChange = (field: keyof typeof simulationParams, val: number) => {
    setSimulationParams((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  return (
    <div className="port-card">
      <div className="port-card-header">
        <div>
          <div className="card-title">
            <FlaskConical size={18} color="#38BDF8" />
            <span>Simulation Parameters & Operational Levers</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Adjust terminal input variables to evaluate hydrodynamic, berth, and crane bottleneck risks
          </div>
        </div>

        {/* Quick Scenario Preset Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => loadPreset('typhoon')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px', fontSize: '11px' }}
          >
            <CloudLightning size={13} color="#EF4444" />
            <span>Typhoon Disruption</span>
          </button>

          <button
            onClick={() => loadPreset('surge')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px', fontSize: '11px' }}
          >
            <Ship size={13} color="#F59E0B" />
            <span>Mega-Carrier Surge</span>
          </button>

          <button
            onClick={() => loadPreset('mobilization')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px', fontSize: '11px' }}
          >
            <Zap size={13} color="#10B981" />
            <span>Max Mobilization</span>
          </button>

          <button
            onClick={resetSimulation}
            className="btn btn-ghost btn-sm"
            style={{ gap: '6px', fontSize: '11px' }}
            title="Reset to Baseline"
          >
            <RotateCcw size={13} />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* 5 Input Sliders Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          padding: '16px 0',
        }}
      >
        {/* Lever 1: Incoming Vessels */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Incoming Vessels
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current: 18</span>
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <span className="font-mono" style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8' }}>
                {simulationParams.incomingVessels}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="4"
            max="40"
            step="1"
            value={simulationParams.incomingVessels}
            onChange={(e) => handleChange('incomingVessels', parseInt(e.target.value))}
            className="custom-range"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>4 (Low)</span>
            <span>18 (Baseline)</span>
            <span>40 (Max Surge)</span>
          </div>
        </div>

        {/* Lever 2: Container Volume */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Container Volume (TEU)
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current: 12.4k</span>
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <span className="font-mono" style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8' }}>
                {simulationParams.containerVolume.toLocaleString()}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="4000"
            max="26000"
            step="250"
            value={simulationParams.containerVolume}
            onChange={(e) => handleChange('containerVolume', parseInt(e.target.value))}
            className="custom-range"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>4,000</span>
            <span>12,450 (Baseline)</span>
            <span>26,000 TEU</span>
          </div>
        </div>

        {/* Lever 3: Outer Queue */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Anchorage Queue (Vessels)
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current: 11</span>
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: simulationParams.queueVessels > 14 ? '#EF4444' : '#F59E0B',
                }}
              >
                {simulationParams.queueVessels}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={simulationParams.queueVessels}
            onChange={(e) => handleChange('queueVessels', parseInt(e.target.value))}
            className="custom-range"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>0</span>
            <span>11 (Baseline)</span>
            <span>30 (Severe Jam)</span>
          </div>
        </div>

        {/* Lever 4: Available Berths */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Available Berths
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current: 2</span>
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: simulationParams.availableBerths <= 1 ? '#EF4444' : '#10B981',
                }}
              >
                {simulationParams.availableBerths} of 12
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={simulationParams.availableBerths}
            onChange={(e) => handleChange('availableBerths', parseInt(e.target.value))}
            className="custom-range"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>0 (All Full)</span>
            <span>2 (Current)</span>
            <span>12 (All Clear)</span>
          </div>
        </div>

        {/* Lever 5: Available Cranes */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Available STS Cranes
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current: 6</span>
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: simulationParams.availableCranes <= 2 ? '#EF4444' : '#10B981',
                }}
              >
                {simulationParams.availableCranes} of 25
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            step="1"
            value={simulationParams.availableCranes}
            onChange={(e) => handleChange('availableCranes', parseInt(e.target.value))}
            className="custom-range"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>0</span>
            <span>6 (Current)</span>
            <span>25 (Full Fleet)</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Run Simulation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Simulation executes deterministic hydrodynamic and discrete-event queueing model.
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="btn btn-primary btn-lg"
          style={{
            gap: '10px',
            fontWeight: '700',
            minWidth: '200px',
            boxShadow: '0 4px 18px rgba(15, 98, 254, 0.45)',
          }}
        >
          <Play size={18} fill="#FFFFFF" />
          <span>{isSimulating ? 'Simulating Dynamic Model...' : 'Run Simulation'}</span>
        </button>
      </div>
    </div>
  );
};
