import React from 'react';
import { SimulationResult } from '../../types/port';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ComparisonGridProps {
  result: SimulationResult;
}

export const ComparisonGrid: React.FC<ComparisonGridProps> = ({ result }) => {
  const { before, after } = result;

  const getLevelBadgeColor = (lvl: string) => {
    switch (lvl) {
      case 'HIGH':
        return '#EF4444';
      case 'MEDIUM':
        return '#F59E0B';
      case 'LOW':
      default:
        return '#10B981';
    }
  };

  const metrics = [
    {
      label: 'Congestion Score',
      before: `${before.congestionScore} / 100`,
      after: `${after.congestionScore} / 100`,
      diff: after.congestionScore - before.congestionScore,
      unit: 'pts',
      isWorse: after.congestionScore > before.congestionScore,
    },
    {
      label: 'Congestion Level',
      before: before.congestionLevel,
      after: after.congestionLevel,
      diff: null,
      isLevelChange: before.congestionLevel !== after.congestionLevel,
      isWorse:
        (before.congestionLevel === 'LOW' && after.congestionLevel !== 'LOW') ||
        (before.congestionLevel === 'MEDIUM' && after.congestionLevel === 'HIGH'),
    },
    {
      label: 'Anchorage Queue',
      before: `${before.queue} vessels`,
      after: `${after.queue} vessels`,
      diff: after.queue - before.queue,
      unit: 'vsl',
      isWorse: after.queue > before.queue,
    },
    {
      label: 'Berth Utilization',
      before: `${before.berthUtilization}%`,
      after: `${after.berthUtilization}%`,
      diff: after.berthUtilization - before.berthUtilization,
      unit: '%',
      isWorse: after.berthUtilization > 85,
    },
    {
      label: 'Crane Utilization',
      before: `${before.craneUtilization}%`,
      after: `${after.craneUtilization}%`,
      diff: after.craneUtilization - before.craneUtilization,
      unit: '%',
      isWorse: after.craneUtilization > 90,
    },
    {
      label: 'Avg Expected Wait',
      before: `${before.avgWaitHours}h`,
      after: `${after.avgWaitHours}h`,
      diff: +(after.avgWaitHours - before.avgWaitHours).toFixed(1),
      unit: 'hrs',
      isWorse: after.avgWaitHours > before.avgWaitHours,
    },
  ];

  return (
    <div className="port-card">
      <div className="port-card-header">
        <div>
          <div className="card-title">
            <span>Simulation Results: BEFORE → AFTER Comparison</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Direct variance analysis evaluating impact of hypothetical parameters against live operations
          </div>
        </div>

        {/* Global Summary Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            borderRadius: '999px',
            backgroundColor:
              after.congestionScore >= 71
                ? 'rgba(239, 68, 68, 0.15)'
                : after.congestionScore >= 41
                ? 'rgba(245, 158, 11, 0.15)'
                : 'rgba(16, 185, 129, 0.15)',
            border: `1px solid ${getLevelBadgeColor(after.congestionLevel)}50`,
            color: getLevelBadgeColor(after.congestionLevel),
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: '800',
          }}
        >
          <span>SIMULATED: {after.congestionScore}/100 ({after.congestionLevel})</span>
        </div>
      </div>

      {/* Side-by-side comparison cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '14px',
        }}
      >
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                {m.label}
              </span>

              {m.diff !== null && m.diff !== 0 && (
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: m.isWorse ? '#EF4444' : '#10B981',
                    backgroundColor: m.isWorse ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {m.diff > 0 ? `+${m.diff}` : m.diff} {m.unit}
                </span>
              )}

              {m.isLevelChange && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: m.isWorse ? '#EF4444' : '#10B981',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  LEVEL SHIFT
                </span>
              )}
            </div>

            {/* Before -> After visual block */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* BEFORE */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Current (Before)
                </span>
                <span className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                  {m.before}
                </span>
              </div>

              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: m.isWorse ? '#EF4444' : '#38BDF8',
                }}
              >
                <ArrowRight size={16} />
              </div>

              {/* AFTER */}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Simulated (After)
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: m.isWorse ? '#EF4444' : '#10B981',
                  }}
                >
                  {m.after}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
