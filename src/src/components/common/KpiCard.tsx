import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean; // depends on metric context
    direction: 'up' | 'down' | 'neutral';
  };
  progress?: {
    percent: number;
    color?: string;
  };
  variant?: 'default' | 'warning' | 'danger' | 'success';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  subtext,
  icon: Icon,
  trend,
  progress,
  variant = 'default',
}) => {
  const getBorderColor = () => {
    switch (variant) {
      case 'danger':
        return 'rgba(239, 68, 68, 0.4)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.4)';
      case 'success':
        return 'rgba(16, 185, 129, 0.4)';
      default:
        return 'var(--border-subtle)';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      case 'success':
        return '#10B981';
      default:
        return '#38BDF8';
    }
  };

  return (
    <div
      className="port-card kpi-card"
      style={{
        borderColor: getBorderColor(),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '138px',
        padding: '16px 18px',
      }}
    >
      {/* Top row: Title and Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {title}
        </span>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: `${getIconColor()}14`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${getIconColor()}30`,
          }}
        >
          <Icon size={16} color={getIconColor()} />
        </div>
      </div>

      {/* Middle row: Big Metric Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span
          className="font-mono"
          style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Optional Progress Bar */}
      {progress && (
        <div
          style={{
            width: '100%',
            height: '5px',
            backgroundColor: 'var(--bg-deep)',
            borderRadius: 'var(--radius-full)',
            marginTop: '10px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min(100, Math.max(0, progress.percent))}%`,
              height: '100%',
              backgroundColor: progress.color || getIconColor(),
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      )}

      {/* Bottom row: Subtext or Trend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '10px',
          fontSize: '11px',
          color: 'var(--text-muted)',
        }}
      >
        <span>{subtext}</span>
        {trend && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: '600',
              color: trend.isPositive ? '#10B981' : '#EF4444',
            }}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
