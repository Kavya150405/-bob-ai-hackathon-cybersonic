import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const OperationalAlert: React.FC = () => {
  const { setActiveView } = usePortOperations();

  const recommendedActions = [
    'Review berth assignments (reallocate non-deep draft vessels)',
    'Consider alternate routing (divert inbound convoy to Route B Bypass)',
    'Prioritize critical vessels with demurrage SLA exposure',
    'Monitor crane availability and stage backup STS gangs',
  ];

  return (
    <div
      className="operational-alert-banner"
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow accent band */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '100%',
          backgroundColor: '#EF4444',
        }}
      />

      {/* Header and CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(239, 68, 68, 0.4)',
            }}
          >
            <ShieldAlert size={22} color="#EF4444" />
          </div>
          <div>
            <div
              style={{
                fontSize: '17px',
                fontWeight: '800',
                color: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '-0.01em',
              }}
            >
              <span>High congestion detected</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '11px',
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontWeight: '700',
                }}
              >
                CRITICAL THRESHOLD
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Outer fairway queue exceeds nominal safety spacing. Berth clearance turnaround time has lengthened to 7.4 hours.
            </p>
          </div>
        </div>

        {/* Primary Action Button: Navigates to AI Recommendations page */}
        <button
          onClick={() => setActiveView('ai')}
          className="btn btn-primary"
          style={{
            backgroundColor: '#EF4444',
            borderColor: '#F87171',
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: '700',
          }}
        >
          <span>View AI Recommendations</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Recommended Operational Actions Grid */}
      <div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '10px',
          }}
        >
          Immediate Mitigation Protocol
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '10px',
          }}
        >
          {recommendedActions.map((action, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              <CheckCircle2 size={15} color="#EF4444" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span style={{ lineHeight: '1.4' }}>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
