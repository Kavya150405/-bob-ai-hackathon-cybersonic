import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Anchor, Construction, Clock, Sparkles, Check, CheckCircle2, ArrowRight } from 'lucide-react';

export const BerthCraneRecommendation: React.FC = () => {
  const { recommendations, applyRecommendation, setSelectedVessel, vessels } = usePortOperations();

  return (
    <div className="port-card">
      <div className="port-card-header">
        <div>
          <div className="card-title">
            <Sparkles size={18} color="#38BDF8" />
            <span>AI Resource Optimization: Berth & Crane Assignments</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Heuristic matching algorithms minimizing total ship turnaround dwell time and crane idle shifts
          </div>
        </div>

        <span
          className="font-mono"
          style={{
            fontSize: '11px',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38BDF8',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '700',
          }}
        >
          GENETIC SCHEDULER ACTIVE
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '16px',
        }}
      >
        {recommendations.map((rec) => {
          const isApplied = rec.status === 'Applied';
          const matchedVessel = vessels.find((v) => v.id === rec.vesselId);

          return (
            <div
              key={rec.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: isApplied
                  ? '1px solid rgba(16, 185, 129, 0.5)'
                  : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div>
                {/* Header: Vessel Name & Applied Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target Vessel</span>
                    <h4
                      style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                      }}
                      onClick={() => matchedVessel && setSelectedVessel(matchedVessel)}
                    >
                      {rec.vesselName}
                    </h4>
                  </div>

                  {isApplied ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        color: '#10B981',
                        fontSize: '11px',
                        fontWeight: '700',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <CheckCircle2 size={12} />
                      ASSIGNED
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        color: '#38BDF8',
                        fontSize: '11px',
                        fontWeight: '700',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      OPTIMIZED
                    </span>
                  )}
                </div>

                {/* Resource Badges Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '8px',
                    marginBottom: '12px',
                    padding: '10px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Berth
                    </div>
                    <div
                      className="font-mono"
                      style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8', marginTop: '2px' }}
                    >
                      {rec.recommendedBerthId}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Cranes
                    </div>
                    <div
                      className="font-mono"
                      style={{ fontSize: '13px', fontWeight: '700', color: '#F59E0B', marginTop: '2px' }}
                    >
                      {rec.recommendedCraneIds.join(', ')}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Handling
                    </div>
                    <div
                      className="font-mono"
                      style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', marginTop: '2px' }}
                    >
                      {rec.estimatedHandlingTime}
                    </div>
                  </div>
                </div>

                {/* Reason Explanation */}
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <strong style={{ color: '#F8FAFC' }}>Reason: </strong>
                  "{rec.reason}"
                </div>
              </div>

              {/* Time savings & Action */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '11px', color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                  ✓ {rec.expectedTimeSavings}
                </div>

                <button
                  onClick={() => applyRecommendation(rec.id)}
                  disabled={isApplied}
                  className={`btn btn-sm ${isApplied ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ padding: '6px 14px', fontSize: '12px', gap: '6px' }}
                >
                  {isApplied ? (
                    <>
                      <Check size={14} /> Applied
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} /> Approve & Dispatch
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
