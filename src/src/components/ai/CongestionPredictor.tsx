import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Sparkles, Brain, AlertTriangle, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

export const CongestionPredictor: React.FC = () => {
  const { showToast } = usePortOperations();

  const handleApplyPredictiveProtocol = () => {
    showToast(
      'Predictive mitigation protocol dispatched: Speed reductions sent to outer fairway pilots',
      'success'
    );
  };

  return (
    <div className="port-card" style={{ border: '1px solid rgba(239, 68, 68, 0.35)' }}>
      <div className="port-card-header">
        <div className="card-title">
          <Brain size={18} color="#EF4444" />
          <span>Congestion Prediction & 12-Hour Horizon Forecast</span>
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: '11px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#EF4444',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '700',
          }}
        >
          PREDICTIVE AI MODEL v4.2
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '24px',
          alignItems: 'center',
        }}
        className="prediction-grid"
      >
        {/* Left: Prominent Projected Score 82 / 100 HIGH */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Projected Peak Congestion
          </span>

          <div
            className="font-mono"
            style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#EF4444',
              lineHeight: '1.1',
              margin: '8px 0 4px',
              textShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
            }}
          >
            82<span style={{ fontSize: '20px', color: 'var(--text-muted)' }}>/100</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#EF4444',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '0.08em',
            }}
          >
            <AlertTriangle size={13} />
            <span>HIGH CONGESTION</span>
          </div>

          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              marginTop: '10px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Confidence Interval: 94.2%
          </div>
        </div>

        {/* Right: Explanation, Contributing Factors, and Recommended Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Model Diagnosis
            </div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginTop: '4px',
                lineHeight: '1.4',
              }}
            >
              "Berth occupancy and vessel queue are the primary contributors to congestion."
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
              Without active intervention, average outer anchorage dwell time will rise from 4.2h to <strong>7.8 hours</strong> by 22:00, creating an estimated <strong>$46,000</strong> in demurrage carrier penalties.
            </p>
          </div>

          {/* Key Drivers Pill Strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Berth Occupancy: 84% (+6% vs normal)
            </span>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#F59E0B',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Vessel Queue: 11 Anchored (Critical)
            </span>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38BDF8',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Fairway Channel Inbound Surge: +3 Carriers
            </span>
          </div>

          {/* Action and impact */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <TrendingUp size={16} color="#10B981" />
              <span>
                Projected Impact of Intervention:{' '}
                <strong style={{ color: '#10B981' }}>-18 pts Congestion Reduction</strong> (drops to 64 / Medium)
              </span>
            </div>

            <button
              onClick={handleApplyPredictiveProtocol}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px' }}
            >
              <Sparkles size={14} />
              <span>Deploy AI Mitigation Plan</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .prediction-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
