import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { SimulationResult } from '../../types/port';
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileSpreadsheet,
  Send,
  ShieldCheck,
} from 'lucide-react';

interface ImpactAnalysisProps {
  result: SimulationResult;
}

export const ImpactAnalysis: React.FC<ImpactAnalysisProps> = ({ result }) => {
  const { setActiveView, showToast } = usePortOperations();

  const isSevere = result.after.congestionScore >= 71;

  const handleExportReport = () => {
    showToast('Simulation executive summary exported to PDF & CSV', 'success');
  };

  const handleDispatchStrategies = () => {
    showToast('Simulated parameters transferred to AI Recommendations scheduler', 'success');
    setActiveView('ai');
  };

  return (
    <div
      className="port-card"
      style={{
        border: isSevere
          ? '1px solid rgba(239, 68, 68, 0.4)'
          : '1px solid rgba(16, 185, 129, 0.4)',
        backgroundColor: isSevere ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
      }}
    >
      <div className="port-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isSevere ? (
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
              }}
            >
              <AlertTriangle size={20} />
            </div>
          ) : (
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
              }}
            >
              <ShieldCheck size={20} />
            </div>
          )}

          <div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: isSevere ? '#EF4444' : '#10B981',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{isSevere ? 'Impact Detected' : 'Optimal Capacity Retained'}</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '11px',
                  backgroundColor: isSevere ? '#EF4444' : '#10B981',
                  color: '#070B14',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontWeight: '800',
                }}
              >
                {isSevere ? 'BOTTLENECK WARNING' : 'STABLE SYSTEM'}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Strategic decision-support diagnostic and corrective actions
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleExportReport} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            <FileSpreadsheet size={13} />
            <span>Export Report</span>
          </button>
          <button onClick={handleDispatchStrategies} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
            <Sparkles size={13} />
            <span>Apply AI Recommendations</span>
          </button>
        </div>
      </div>

      {/* Narrative Explanation Block */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '16px',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
          "{result.impactSummary}"
        </p>
      </div>

      {/* Recommended Operational Mitigations */}
      <div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '10px',
          }}
        >
          Prescriptive Corrective Actions Before Committing Schedule
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '10px',
          }}
        >
          {result.recommendedActions.map((action, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13px',
                color: 'var(--text-primary)',
              }}
            >
              <CheckCircle2
                size={16}
                color={isSevere ? '#EF4444' : '#10B981'}
                style={{ marginTop: '2px', flexShrink: 0 }}
              />
              <span style={{ lineHeight: '1.4' }}>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
