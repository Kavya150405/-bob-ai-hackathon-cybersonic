import React, { useState } from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { ScheduleItem } from '../../types/port';
import { ScheduleFilters } from './ScheduleFilters';
import { StatusBadge } from '../common/StatusBadge';
import { Clock, Ship, Calendar, AlertCircle } from 'lucide-react';

export const Timeline72h: React.FC = () => {
  const { schedule, vessels, setSelectedVessel } = usePortOperations();

  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBerth, setFilterBerth] = useState('all');

  // Filtered items
  const filteredSchedule = schedule.filter((item) => {
    if (filterPriority !== 'all' && item.priority.toLowerCase() !== filterPriority) {
      return false;
    }
    if (filterStatus !== 'all' && item.status.toLowerCase() !== filterStatus) {
      return false;
    }
    if (filterBerth !== 'all' && item.berthId.toLowerCase() !== filterBerth) {
      return false;
    }
    return true;
  });

  const berths = ['B-01', 'B-02', 'B-03', 'B-04', 'B-05', 'B-06', 'B-07', 'B-08'];

  // Time marks across 72 hours (every 6 hours)
  const timeMarks = [
    { hour: 0, label: 'Now 00:00', day: 'Day 1' },
    { hour: 6, label: '06:00', day: 'Day 1' },
    { hour: 12, label: '12:00', day: 'Day 1' },
    { hour: 18, label: '18:00', day: 'Day 1' },
    { hour: 24, label: '+24h 00:00', day: 'Day 2' },
    { hour: 30, label: '06:00', day: 'Day 2' },
    { hour: 36, label: '12:00', day: 'Day 2' },
    { hour: 42, label: '18:00', day: 'Day 2' },
    { hour: 48, label: '+48h 00:00', day: 'Day 3' },
    { hour: 54, label: '06:00', day: 'Day 3' },
    { hour: 60, label: '12:00', day: 'Day 3' },
    { hour: 66, label: '18:00', day: 'Day 3' },
    { hour: 72, label: '+72h', day: 'Day 3' },
  ];

  const getStatusColor = (status: ScheduleItem['status']) => {
    switch (status) {
      case 'In Progress':
        return {
          bg: 'rgba(56, 189, 248, 0.25)',
          border: '#38BDF8',
          text: '#38BDF8',
        };
      case 'At Risk':
        return {
          bg: 'rgba(239, 68, 68, 0.25)',
          border: '#EF4444',
          text: '#EF4444',
        };
      case 'Delayed':
        return {
          bg: 'rgba(245, 158, 11, 0.25)',
          border: '#F59E0B',
          text: '#F59E0B',
        };
      case 'Waiting':
        return {
          bg: 'rgba(217, 119, 6, 0.2)',
          border: '#D97706',
          text: '#FBBF24',
        };
      case 'Scheduled':
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.2)',
          border: '#10B981',
          text: '#10B981',
        };
    }
  };

  const handleVesselClick = (vesselId: string) => {
    const vessel = vessels.find((v) => v.id === vesselId);
    if (vessel) {
      setSelectedVessel(vessel);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Controls and Filters */}
      <ScheduleFilters
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterBerth={filterBerth}
        setFilterBerth={setFilterBerth}
        totalOperations={schedule.length}
        shownOperations={filteredSchedule.length}
      />

      {/* Legend Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '10px 18px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          fontSize: '12px',
        }}
      >
        <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Status Key:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#38BDF8' }} />
            <span>In Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10B981' }} />
            <span>Scheduled</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#FBBF24' }} />
            <span>Waiting</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#F59E0B' }} />
            <span>Delayed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#EF4444' }} />
            <span>At Risk</span>
          </div>
        </div>

        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Click any operation bar to open vessel manifest & AI suggestions
        </span>
      </div>

      {/* Gantt / Timeline Container */}
      <div
        className="port-card"
        style={{
          padding: '0',
          overflowX: 'auto',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ minWidth: '1100px', display: 'flex', flexDirection: 'column' }}>
          {/* Day Horizon Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 1fr 1fr',
              backgroundColor: 'var(--bg-deep)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ padding: '8px 14px', borderRight: '1px solid var(--border-subtle)' }}>
              QUAY BERTH
            </div>
            <div style={{ padding: '8px 14px', borderRight: '1px solid var(--border-subtle)', textAlign: 'center', color: '#38BDF8' }}>
              DAY 1 (0h → +24h)
            </div>
            <div style={{ padding: '8px 14px', borderRight: '1px solid var(--border-subtle)', textAlign: 'center', color: '#818CF8' }}>
              DAY 2 (+24h → +48h)
            </div>
            <div style={{ padding: '8px 14px', textAlign: 'center', color: '#34D399' }}>
              DAY 3 (+48h → +72h)
            </div>
          </div>

          {/* Time Marks Bar (0h, 6h, 12h, ..., 72h) */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-subtle)',
              height: '32px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '120px',
                flexShrink: 0,
                borderRight: '1px solid var(--border-subtle)',
                paddingLeft: '14px',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}
            >
              Timeline
            </div>
            <div style={{ flex: 1, display: 'flex', position: 'relative', height: '100%' }}>
              {timeMarks.map((tm, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: `${(tm.hour / 72) * 100}%`,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '4px',
                    borderLeft: '1px solid rgba(39, 62, 102, 0.4)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: tm.hour === 0 ? '#38BDF8' : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tm.label}
                </div>
              ))}
            </div>
          </div>

          {/* Berth Rows */}
          {berths.map((berthId) => {
            const berthItems = filteredSchedule.filter((item) => item.berthId === berthId);

            return (
              <div
                key={berthId}
                style={{
                  display: 'flex',
                  minHeight: '64px',
                  borderBottom: '1px solid rgba(28, 45, 74, 0.5)',
                  backgroundColor: 'var(--bg-card)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {/* Left Berth Label */}
                <div
                  style={{
                    width: '120px',
                    flexShrink: 0,
                    padding: '12px 14px',
                    borderRight: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ fontSize: '13px', fontWeight: '800', color: '#38BDF8' }}
                  >
                    {berthId}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {berthItems.length} vessel{berthItems.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Timeline Canvas Track */}
                <div
                  style={{
                    flex: 1,
                    position: 'relative',
                    height: '100%',
                    minHeight: '64px',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  {/* Vertical Guide Lines */}
                  {timeMarks.map((tm, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: `${(tm.hour / 72) * 100}%`,
                        top: 0,
                        bottom: 0,
                        width: '1px',
                        backgroundColor: 'rgba(30, 47, 77, 0.4)',
                        pointerEvents: 'none',
                      }}
                    />
                  ))}

                  {/* Scheduled Vessel Blocks */}
                  {berthItems.map((item) => {
                    const leftPercent = (item.startHour / 72) * 100;
                    const widthPercent = (item.durationHours / 72) * 100;
                    const colors = getStatusColor(item.status);

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleVesselClick(item.vesselId)}
                        title={`${item.vesselName} | Berth: ${item.berthId} | Start: +${item.startHour}h, Duration: ${item.durationHours}h | Cranes: ${item.craneIds.join(', ')}`}
                        style={{
                          position: 'absolute',
                          left: `${leftPercent}%`,
                          width: `calc(${widthPercent}% - 4px)`,
                          top: '8px',
                          bottom: '8px',
                          backgroundColor: colors.bg,
                          border: `1.5px solid ${colors.border}`,
                          borderRadius: 'var(--radius-sm)',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                          zIndex: 10,
                          overflow: 'hidden',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.zIndex = '25';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.zIndex = '10';
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '4px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: '700',
                              color: '#F8FAFC',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.vesselName}
                          </span>
                          <span
                            className="font-mono"
                            style={{
                              fontSize: '10px',
                              fontWeight: '700',
                              color: colors.text,
                            }}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <span>
                            Cranes: {item.craneIds.join(', ') || 'Auto'}
                          </span>
                          <span>
                            {item.durationHours}h ({item.containers.toLocaleString()} TEU)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
