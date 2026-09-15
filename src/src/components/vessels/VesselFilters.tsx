import React from 'react';
import { Search, Filter, ArrowUpDown, RefreshCw } from 'lucide-react';

interface VesselFiltersProps {
  search: string;
  setSearch: (s: string) => void;
  priorityFilter: string;
  setPriorityFilter: (p: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  totalCount: number;
  filteredCount: number;
}

export const VesselFilters: React.FC<VesselFiltersProps> = ({
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onRefresh,
  isRefreshing,
  totalCount,
  filteredCount,
}) => {
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
      {/* Left: Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <Search
            size={16}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search vessel by name, IMO, ID, or line..."
            className="form-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Showing {filteredCount} of {totalCount}
        </span>
      </div>

      {/* Right: Dropdowns & Refresh */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Priority Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="all">All Statuses</option>
            <option value="on schedule">On Schedule</option>
            <option value="waiting">Waiting</option>
            <option value="delayed">Delayed</option>
            <option value="at risk">At Risk</option>
            <option value="in progress">In Progress</option>
          </select>
        </div>

        {/* Sort By */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowUpDown size={14} color="var(--text-muted)" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="eta">Sort by ETA</option>
            <option value="teu-desc">Containers (High to Low)</option>
            <option value="teu-asc">Containers (Low to High)</option>
            <option value="priority">Priority</option>
            <option value="handling">Handling Time</option>
          </select>
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="btn btn-secondary btn-sm"
          style={{ padding: '7px 12px', gap: '6px' }}
        >
          <RefreshCw size={14} color="#38BDF8" className={isRefreshing ? 'spin' : ''} />
          <span>Sync</span>
        </button>
      </div>
    </div>
  );
};
