import React from 'react';
import { Filter, CalendarClock, AlertTriangle } from 'lucide-react';

interface ScheduleFiltersProps {
  filterPriority: string;
  setFilterPriority: (p: string) => void;
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  filterBerth: string;
  setFilterBerth: (b: string) => void;
  totalOperations: number;
  shownOperations: number;
}

export const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  filterBerth,
  setFilterBerth,
  totalOperations,
  shownOperations,
}) => {
  const berthsList = ['All', 'B-01', 'B-02', 'B-03', 'B-04', 'B-05', 'B-06', 'B-07', 'B-08'];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '16px 20px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '16px',
      }}
    >
      {/* Left: Indicator & Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CalendarClock size={18} color="#38BDF8" />
        <div>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            72-Hour Quay Gantt Schedule
          </span>
          <span
            className="font-mono"
            style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}
          >
            Displaying {shownOperations} of {totalOperations} Operations
          </span>
        </div>
      </div>

      {/* Right: Interactive Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Priority Quick Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Priority:</span>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Status Quick Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="in progress">In Progress</option>
            <option value="waiting">Waiting</option>
            <option value="delayed">Delayed</option>
            <option value="at risk">At Risk</option>
          </select>
        </div>

        {/* Berth Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Berth:</span>
          <select
            value={filterBerth}
            onChange={(e) => setFilterBerth(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
          >
            {berthsList.map((b) => (
              <option key={b} value={b.toLowerCase()}>
                {b === 'All' ? 'All Berths' : `Berth ${b}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
