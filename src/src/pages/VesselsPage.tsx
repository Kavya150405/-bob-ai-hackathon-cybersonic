import React, { useState, useMemo } from 'react';
import { usePortOperations } from '../context/PortOperationsContext';
import { VesselFilters } from '../components/vessels/VesselFilters';
import { VesselTable } from '../components/vessels/VesselTable';
import { Vessel } from '../types/port';

export const VesselsPage: React.FC = () => {
  const { vessels, setSelectedVessel, refreshData, isRefreshing, isLoading } = usePortOperations();

  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('eta');

  // Filter and sort logic
  const filteredVessels = useMemo(() => {
    return vessels
      .filter((vessel) => {
        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          const match =
            vessel.name.toLowerCase().includes(q) ||
            vessel.id.toLowerCase().includes(q) ||
            vessel.imo.toLowerCase().includes(q) ||
            vessel.shippingLine.toLowerCase().includes(q) ||
            (vessel.berthId && vessel.berthId.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Priority
        if (priorityFilter !== 'all' && vessel.priority.toLowerCase() !== priorityFilter) {
          return false;
        }

        // Status
        if (statusFilter !== 'all' && vessel.status.toLowerCase() !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'teu-desc') return b.teu - a.teu;
        if (sortBy === 'teu-asc') return a.teu - b.teu;
        if (sortBy === 'priority') {
          const score = (p: string) => (p === 'High' ? 3 : p === 'Medium' ? 2 : 1);
          return score(b.priority) - score(a.priority);
        }
        if (sortBy === 'handling') return b.handlingTimeHours - a.handlingTimeHours;
        // default eta: preserve natural schedule
        return 0;
      });
  }, [vessels, search, priorityFilter, statusFilter, sortBy]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Filtering and Sort Bar */}
      <VesselFilters
        search={search}
        setSearch={setSearch}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onRefresh={refreshData}
        isRefreshing={isRefreshing}
        totalCount={vessels.length}
        filteredCount={filteredVessels.length}
      />

      {/* Main Tabular Grid */}
      <VesselTable
        vessels={filteredVessels}
        onSelectVessel={setSelectedVessel}
        isLoading={isLoading}
      />
    </div>
  );
};
