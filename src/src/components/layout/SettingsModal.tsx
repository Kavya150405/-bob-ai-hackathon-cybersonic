import React, { useState } from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Sliders, X, Check, Globe, RefreshCw, Database } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    selectedTerminal,
    setSelectedTerminal,
    apiEndpoint,
    updateApiEndpoint,
    showToast,
    resetSimulation,
  } = usePortOperations();

  const [inputUrl, setInputUrl] = useState(apiEndpoint);
  const [refreshInterval, setRefreshInterval] = useState('30s');
  const [unitMode, setUnitMode] = useState<'TEU' | 'FEU'>('TEU');

  if (!isSettingsModalOpen) return null;

  const handleSaveApi = () => {
    updateApiEndpoint(inputUrl.trim());
  };

  const handleResetDemo = () => {
    resetSimulation();
    showToast('Terminal state and simulations reset to baseline defaults', 'info');
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSettingsModalOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: '540px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={20} color="#38BDF8" />
            <h2 style={{ fontSize: '16px', fontWeight: '700' }}>Terminal & System Settings</h2>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Backend API Integration */}
          <div>
            <label
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              <Globe size={14} color="#38BDF8" />
              <span>Backend API Server Endpoint</span>
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. http://localhost:8000 (leave blank for local mock/simulation)"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button onClick={handleSaveApi} className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                <Check size={14} /> Connect
              </button>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
              When empty, the application uses its built-in high-fidelity TOS mock and mathematical congestion engine.
            </p>
          </div>

          {/* Active Terminal Selection */}
          <div>
            <label
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Active Terminal Complex
            </label>
            <select
              className="form-select"
              value={selectedTerminal}
              onChange={(e) => setSelectedTerminal(e.target.value)}
            >
              <option value="Terminal 4 - North Basin">Terminal 4 - North Basin (Super-Post-Panamax)</option>
              <option value="Terminal 2 - South Container Pier">Terminal 2 - South Container Pier</option>
              <option value="Terminal 1 - Deepwater Gateway">Terminal 1 - Deepwater Gateway</option>
            </select>
          </div>

          {/* Units & Preferences */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Container Metric Unit
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setUnitMode('TEU')}
                  className={`btn btn-sm ${unitMode === 'TEU' ? 'btn-cyan' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                >
                  TEU (20-ft)
                </button>
                <button
                  onClick={() => setUnitMode('FEU')}
                  className={`btn btn-sm ${unitMode === 'FEU' ? 'btn-cyan' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                >
                  FEU (40-ft)
                </button>
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Telemetry Auto-Sync Cadence
              </label>
              <select
                className="form-select"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
              >
                <option value="manual">Manual Refresh Only</option>
                <option value="15s">Every 15 Seconds</option>
                <option value="30s">Every 30 Seconds</option>
                <option value="60s">Every 60 Seconds</option>
              </select>
            </div>
          </div>

          {/* Demo Reset */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-deep)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>Reset State to Hackathon Baseline</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Restores initial 72/100 congestion metrics, vessels, and berths.
              </div>
            </div>
            <button onClick={handleResetDemo} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
              <RefreshCw size={13} /> Reset Baseline
            </button>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button onClick={() => setIsSettingsModalOpen(false)} className="btn btn-primary btn-sm">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
