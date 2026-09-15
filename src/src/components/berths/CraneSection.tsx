import React, { useState } from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Crane } from '../../types/port';
import { StatusBadge } from '../common/StatusBadge';
import { Construction, Activity, Wrench, CheckCircle2, Zap } from 'lucide-react';

export const CraneSection: React.FC = () => {
  const { cranes, setSelectedCrane } = usePortOperations();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCranes = cranes.filter((c) =>
    filterStatus === 'all' ? true : c.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const assignedCount = cranes.filter((c) => c.status === 'Assigned').length;
  const availableCount = cranes.filter((c) => c.status === 'Available').length;
  const maintenanceCount = cranes.filter((c) => c.status === 'Maintenance').length;

  const totalMovesToday = cranes.reduce((acc, c) => acc + c.movesToday, 0);
  const avgMovesPerHour = Math.round(
    cranes.reduce((acc, c) => acc + c.capacityMovesPerHour, 0) / (cranes.length || 1)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
      {/* Section Header & KPI Summary Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Construction size={18} color="#F59E0B" />
            <span>STS Super-Post-Panamax Gantry Fleet</span>
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            25 high-capacity ship-to-shore gantry cranes with twin-lift container handling.
          </p>
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setFilterStatus('all')}
            className={`btn btn-sm ${filterStatus === 'all' ? 'btn-cyan' : 'btn-secondary'}`}
          >
            All Gantries ({cranes.length})
          </button>
          <button
            onClick={() => setFilterStatus('assigned')}
            className={`btn btn-sm ${filterStatus === 'assigned' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: filterStatus === 'assigned' ? '#FFFFFF' : '#F59E0B' }}
          >
            Assigned ({assignedCount})
          </button>
          <button
            onClick={() => setFilterStatus('available')}
            className={`btn btn-sm ${filterStatus === 'available' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: filterStatus === 'available' ? '#FFFFFF' : '#10B981' }}
          >
            Available ({availableCount})
          </button>
          <button
            onClick={() => setFilterStatus('maintenance')}
            className={`btn btn-sm ${filterStatus === 'maintenance' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: filterStatus === 'maintenance' ? '#FFFFFF' : '#94A3B8' }}
          >
            Maintenance ({maintenanceCount})
          </button>
        </div>
      </div>

      {/* Crane Fleet Productivity Bar */}
      <div
        className="port-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Terminal Moves Today
            </div>
            <div className="font-mono" style={{ fontSize: '20px', fontWeight: '800', color: '#38BDF8' }}>
              {totalMovesToday.toLocaleString()} <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>boxes</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Mean Hourly Productivity
            </div>
            <div className="font-mono" style={{ fontSize: '20px', fontWeight: '800', color: '#F8FAFC' }}>
              {avgMovesPerHour} <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>moves/hr</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Active Fleet Utilization
            </div>
            <div className="font-mono" style={{ fontSize: '20px', fontWeight: '800', color: '#F59E0B' }}>
              {Math.round((assignedCount / (cranes.length || 1)) * 100)}%
            </div>
          </div>
        </div>

        {/* Visual Gantry Grid status strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {cranes.map((crane) => {
            const color =
              crane.status === 'Assigned'
                ? '#F59E0B'
                : crane.status === 'Available'
                ? '#10B981'
                : '#64748B';
            return (
              <div
                key={crane.id}
                title={`${crane.id}: ${crane.status} (${crane.currentVesselName || 'No vessel'})`}
                style={{
                  width: '10px',
                  height: '24px',
                  borderRadius: '2px',
                  backgroundColor: color,
                  cursor: 'pointer',
                  opacity: 0.85,
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scaleY(1.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scaleY(1)')}
              />
            );
          })}
        </div>
      </div>

      {/* Grid of Crane Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px',
        }}
      >
        {filteredCranes.map((crane: Crane) => (
          <div
            key={crane.id}
            className="port-card"
            onClick={() => setSelectedCrane(crane)}
            style={{
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              borderLeft: `4px solid ${
                crane.status === 'Assigned'
                  ? '#F59E0B'
                  : crane.status === 'Available'
                  ? '#10B981'
                  : '#64748B'
              }`,
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '14px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                  }}
                >
                  {crane.id}
                </span>

                <StatusBadge status={crane.status} size="sm" />
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {crane.name}
              </div>

              {/* Technical Ratings */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginBottom: '10px',
                  padding: '6px 8px',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <span>Cap: {crane.capacityMovesPerHour} moves/hr</span>
                <span>SWL: {crane.safeWorkingLoadTons}t</span>
              </div>

              {/* Assigned vessel info */}
              <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                {crane.currentVesselName ? (
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Assigned to: </span>
                    <span style={{ fontWeight: '600', color: '#38BDF8' }}>
                      {crane.currentVesselName}
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Quay Berth: <strong style={{ color: '#F8FAFC' }}>{crane.assignedBerthId}</strong>
                    </div>
                  </div>
                ) : crane.status === 'Maintenance' ? (
                  <div style={{ color: '#F87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Wrench size={13} />
                    <span>Scheduled Hydraulic Recalibration</span>
                  </div>
                ) : (
                  <div style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} />
                    <span>Unassigned • Ready for Staging</span>
                  </div>
                )}
              </div>
            </div>

            {/* Health & Operating Hours */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}
            >
              <span>Health: {crane.healthScore}%</span>
              <span>Today: {crane.movesToday} moves</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
