import React from 'react';
import type { CongestionFactor } from '../../types/port';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface FactorBreakdownProps {
  factors: CongestionFactor[];
}

export const FactorBreakdown: React.FC<FactorBreakdownProps> = ({ factors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {factors.map((factor, index) => {
        const getBarColor = (percent: number) => {
          if (percent >= 25) return '#EF4444'; // Heavy contributor
          if (percent >= 18) return '#F59E0B'; // Moderate contributor
          return '#38BDF8'; // Lower contributor
        };

        const barColor = getBarColor(factor.impactPercent);

        return (
          <div
            key={index}
            style={{
              background: 'var(--bg-card-hover)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              transition: 'border-color 0.2s ease',
            }}
          >
            {/* Header: Factor Name, Value, and Trend */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                  }}
                >
                  {factor.name}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: '#38BDF8',
                    background: 'rgba(56, 189, 248, 0.1)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                  }}
                >
                  {factor.value}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: barColor,
                  }}
                >
                  {factor.impactPercent}% Weight
                </span>
                {factor.trend === 'increasing' && (
                  <span title="Increasing impact" style={{ display: 'inline-flex' }}>
                    <TrendingUp size={14} color="#EF4444" />
                  </span>
                )}
                {factor.trend === 'decreasing' && (
                  <span title="Decreasing impact" style={{ display: 'inline-flex' }}>
                    <TrendingDown size={14} color="#10B981" />
                  </span>
                )}
                {factor.trend === 'stable' && (
                  <span title="Stable impact" style={{ display: 'inline-flex' }}>
                    <Minus size={14} color="#94A3B8" />
                  </span>
                )}
              </div>
            </div>

            {/* Progress Impact Bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'var(--bg-deep)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                marginBottom: '6px',
              }}
            >
              <div
                style={{
                  width: `${factor.impactPercent * 2.5}%`,
                  maxWidth: '100%',
                  height: '100%',
                  backgroundColor: barColor,
                  borderRadius: 'var(--radius-full)',
                  boxShadow: `0 0 8px ${barColor}60`,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>

            {/* Description Subtext */}
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-secondary)',
                lineHeight: '1.4',
              }}
            >
              {factor.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};
