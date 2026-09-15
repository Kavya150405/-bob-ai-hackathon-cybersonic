import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { CongestionGauge } from '../common/CongestionGauge';
import { FactorBreakdown } from '../common/FactorBreakdown';
import { Activity, Layers, Info } from 'lucide-react';

export const CongestionSection: React.FC = () => {
  const { congestionStatus } = usePortOperations();

  if (!congestionStatus) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 420px) 1fr',
        gap: '24px',
        alignItems: 'stretch',
      }}
      className="congestion-section-grid"
    >
      {/* Left Card: Dominant Congestion Score & Gauge */}
      <div
        className="port-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '28px 24px',
          background: 'linear-gradient(180deg, rgba(15, 26, 46, 0.95), rgba(7, 11, 20, 0.95))',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(239, 68, 68, 0.05)',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Activity size={15} color="#EF4444" />
            <span>Port Congestion Status</span>
          </div>

          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
            }}
          >
            Updated: {congestionStatus.lastUpdated}
          </span>
        </div>

        <CongestionGauge
          score={congestionStatus.score}
          level={congestionStatus.level}
          explanation={congestionStatus.explanation}
          trend={congestionStatus.trend}
        />
      </div>

      {/* Right Card: Congestion Analysis & Contributing Factors Breakdown */}
      <div className="port-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="port-card-header">
          <div>
            <div className="card-title">
              <Layers size={16} color="#38BDF8" />
              <span>Congestion Analysis & Contributing Factors</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Why congestion is increasing: Weighted influence of terminal bottlenecks
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Info size={13} color="#38BDF8" />
            <span>5 Core Telemetry Vectors</span>
          </div>
        </div>

        {/* Contributing Factors Breakdown with Progress and Badges */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <FactorBreakdown factors={congestionStatus.factors} />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .congestion-section-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
