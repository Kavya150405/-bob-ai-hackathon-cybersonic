import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  pulse = false,
}) => {
  const normalized = status.toLowerCase().replace(/\s+/g, '-');

  let badgeClass = 'status-badge';
  let dotPulse = pulse;

  if (['low', 'on-schedule', 'available', 'completed'].includes(normalized)) {
    badgeClass += ' low';
  } else if (['medium', 'waiting', 'assigned', 'moderate'].includes(normalized)) {
    badgeClass += ' medium';
  } else if (['high', 'delayed', 'at-risk', 'critical', 'occupied'].includes(normalized)) {
    badgeClass += ' high';
    dotPulse = true;
  } else if (['in-progress', 'recommended', 'reserved'].includes(normalized)) {
    badgeClass += ' in-progress';
  } else {
    badgeClass += ' maintenance';
  }

  return (
    <span
      className={badgeClass}
      style={{
        padding: size === 'sm' ? '2px 7px' : '3px 10px',
        fontSize: size === 'sm' ? '11px' : '12px',
      }}
    >
      <span className={`status-dot ${dotPulse ? 'pulse' : ''}`} />
      <span>{status}</span>
    </span>
  );
};
