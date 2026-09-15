import React from 'react';
import type { CongestionLevel } from '../../types/port';
import { AlertTriangle, TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';

interface CongestionGaugeProps {
  score: number;
  level: CongestionLevel;
  explanation: string;
  trend?: string;
  size?: 'normal' | 'compact';
}

export const CongestionGauge: React.FC<CongestionGaugeProps> = ({
  score,
  level,
  explanation,
  trend = '+6.4% vs last 4h',
  size = 'normal',
}) => {
  // Score range: 0 - 100
  // Arc angle from -120 deg to +120 deg (total 240 deg span)
  const clampedScore = Math.max(0, Math.min(100, score));
  const startAngle = -120;
  const totalAngle = 240;
  const currentAngle = startAngle + (clampedScore / 100) * totalAngle;

  const getLevelColor = (lvl: CongestionLevel) => {
    switch (lvl) {
      case 'LOW':
        return '#10B981'; // Emerald
      case 'MEDIUM':
        return '#F59E0B'; // Amber
      case 'HIGH':
      default:
        return '#EF4444'; // Red/Crimson
    }
  };

  const currentColor = getLevelColor(level);

  // SVG arc calculation helper
  const radius = 95;
  const strokeWidth = 14;
  const center = 120;

  // Polar to cartesian
  const polarToCartesian = (cx: number, cy: number, r: number, angleDegrees: number) => {
    const angleRadians = ((angleDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleRadians),
      y: cy + r * Math.sin(angleRadians),
    };
  };

  const describeArc = (x: number, y: number, r: number, startA: number, endA: number) => {
    const start = polarToCartesian(x, y, r, endA);
    const end = polarToCartesian(x, y, r, startA);
    const largeArcFlag = endA - startA <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  // Background full arc (-120 to +120)
  const bgArcPath = describeArc(center, center, radius, -120, 120);

  // Active progress arc (-120 to currentAngle)
  const activeArcPath =
    clampedScore > 0 ? describeArc(center, center, radius, -120, currentAngle) : '';

  // Needle tip coordinates
  const needleTip = polarToCartesian(center, center, radius - 20, currentAngle);

  return (
    <div
      className="congestion-gauge-container"
      style={{
        display: 'flex',
        flexDirection: size === 'compact' ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* Gauge SVG Graphic */}
      <div
        style={{
          position: 'relative',
          width: '240px',
          height: '190px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="240"
          height="220"
          viewBox="0 0 240 220"
          style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Track */}
          <path
            d={bgArcPath}
            fill="none"
            stroke="#192A48"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Segment Tick Indicators: 0, 40 (Low/Med), 70 (Med/High), 100 */}
          {/* Active Colored Arc */}
          {activeArcPath && (
            <path
              d={activeArcPath}
              fill="none"
              stroke={currentColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 8px ${currentColor})`,
                transition: 'stroke 0.4s ease, d 0.4s ease',
              }}
            />
          )}

          {/* Tick Marks for Thresholds */}
          {[-120, -24, 48, 120].map((deg, idx) => {
            const inner = polarToCartesian(center, center, radius - 16, deg);
            const outer = polarToCartesian(center, center, radius + 14, deg);
            return (
              <line
                key={idx}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="#334B73"
                strokeWidth="2"
              />
            );
          })}

          {/* Needle Indicator */}
          <line
            x1={center}
            y1={center}
            x2={needleTip.x}
            y2={needleTip.y}
            stroke="#F8FAFC"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />

          {/* Center Hub */}
          <circle cx={center} cy={center} r="10" fill="#0D1526" stroke="#38BDF8" strokeWidth="3" />
          <circle cx={center} cy={center} r="5" fill={currentColor} />

          {/* Zone Labels */}
          <text
            x="40"
            y="195"
            fill="#10B981"
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            0 LOW
          </text>
          <text
            x="105"
            y="64"
            fill="#F59E0B"
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            41 MED 70
          </text>
          <text
            x="200"
            y="195"
            fill="#EF4444"
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            textAnchor="end"
          >
            HIGH 100
          </text>
        </svg>

        {/* Big Central Score Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '44px',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              lineHeight: '1',
              color: currentColor,
              textShadow: `0 0 16px ${currentColor}50`,
              letterSpacing: '-0.03em',
            }}
          >
            {score}
            <span style={{ fontSize: '20px', color: 'var(--text-muted)', fontWeight: '500' }}>
              /100
            </span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: `${currentColor}18`,
              border: `1px solid ${currentColor}40`,
              color: currentColor,
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {level === 'HIGH' && <AlertTriangle size={13} />}
            {level === 'MEDIUM' && <AlertCircle size={13} />}
            {level === 'LOW' && <ShieldCheck size={13} />}
            <span>{level} CONGESTION</span>
          </div>
        </div>
      </div>

      {/* Narrative Explanation Block */}
      <div
        style={{
          maxWidth: '480px',
          textAlign: size === 'compact' ? 'left' : 'center',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-primary)',
            fontWeight: '500',
            lineHeight: '1.5',
          }}
        >
          "{explanation}"
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <TrendingUp size={14} color="#F59E0B" />
          <span>Telemetry Delta: {trend}</span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ color: '#38BDF8' }}>Outer Anchorage Delay: +4.2h</span>
        </div>
      </div>
    </div>
  );
};
