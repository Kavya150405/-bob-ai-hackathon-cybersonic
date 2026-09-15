import React, { useState } from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Berth } from '../../types/port';
import { StatusBadge } from '../common/StatusBadge';
import { Anchor, Ship, Clock, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

export const BerthSection: React.FC = () => {
  const { berths, setSelectedVessel, vessels, setSelectedBerth } = usePortOperations();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBerths = berths.filter((b) =>
    filterStatus === 'all' ? true : b.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const availableCount = berths.filter((b) => b.status === 'Available').length;
  const occupiedCount = berths.filter((b) => b.status === 'Occupied').length;
  const reservedCount = berths.filter((b) => b.status === 'Reserved').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Section Header & Filters */}
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
            <Anchor size={18} color="#38BDF8" />
            <span>Quayside Berth Allocations</span>
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Real-time berthing positions, draft restrictions, and discharge progress.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setFilterStatus('all')}
            className={`btn btn-sm ${filterStatus === 'all' ? 'btn-cyan' : 'btn-secondary'}`}
          >
            All Berths ({berths.length})
          </button>
          <button
            onClick={() => setFilterStatus('occupied')}
            className={`btn btn-sm ${filterStatus === 'occupied' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: filterStatus === 'occupied' ? '#FFFFFF' : '#EF4444' }}
          >
            Occupied ({occupiedCount})
          </button>
          <button
            onClick={() => setFilterStatus('available')}
            className={`btn btn-sm ${filterStatus === 'available' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: filterStatus === 'available' ? '#FFFFFF' : '#10B981' }}
          >
            Available ({availableCount})
          </button>
          <button
            onClick={() => setFilterStatus('reserved')}
            className={`btn btn-sm ${filterStatus === 'reserved' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: filterStatus === 'reserved' ? '#FFFFFF' : '#38BDF8' }}
          >
            Reserved ({reservedCount})
          </button>
        </div>
      </div>

      {/* Grid of Berth Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredBerths.map((berth: Berth) => {
          const matchedVessel = berth.currentVesselId
            ? vessels.find((v) => v.id === berth.currentVesselId)
            : null;

          return (
            <div
              key={berth.id}
              className="port-card"
              onClick={() => setSelectedBerth(berth)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px 18px',
                cursor: 'pointer',
                borderColor:
                  berth.status === 'Available'
                    ? 'rgba(16, 185, 129, 0.35)'
                    : berth.status === 'Occupied'
                    ? 'rgba(239, 68, 68, 0.3)'
                    : 'var(--border-subtle)',
              }}
            >
              {/* Header: Berth ID, Terminal, and Status */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '15px',
                        fontWeight: '800',
                        color: '#38BDF8',
                        backgroundColor: 'rgba(56, 189, 248, 0.1)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                      }}
                    >
                      {berth.id}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {berth.terminal}
                    </span>
                  </div>

                  <StatusBadge status={berth.status} size="sm" />
                </div>

                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {berth.name}
                </div>

                {/* Berth Technical Limits */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    marginBottom: '14px',
                  }}
                >
                  <span>Max LOA: {berth.maxLoa}m</span>
                  <span>•</span>
                  <span>Depth: {berth.maxDraft}m</span>
                  <span>•</span>
                  <span>Cap: {berth.capacityTeu.toLocaleString()} TEU</span>
                </div>

                {/* Current Vessel or Availability Block */}
                {berth.currentVesselName ? (
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Docked Vessel:
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (matchedVessel) setSelectedVessel(matchedVessel);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#38BDF8',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        Inspect <ArrowRight size={11} />
                      </button>
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {berth.currentVesselName}
                    </div>

                    {/* Cargo progress bar */}
                    <div style={{ marginTop: '8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                          marginBottom: '3px',
                        }}
                      >
                        <span>Operations Progress</span>
                        <span style={{ color: '#38BDF8', fontWeight: '700' }}>
                          {berth.progressPercent}%
                        </span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '5px',
                          backgroundColor: 'var(--bg-deep)',
                          borderRadius: 'var(--radius-full)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${berth.progressPercent}%`,
                            height: '100%',
                            backgroundColor: '#38BDF8',
                            borderRadius: 'var(--radius-full)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '12px',
                    }}
                  >
                    <CheckCircle size={18} color="#10B981" />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: '#10B981' }}>
                        Berth Ready for Direct Mooring
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Deepwater approaches cleared, tugs on standby.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Row: Next Scheduled Vessel & Crane Allocation */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <div>
                  {berth.timeToClearHours > 0 ? (
                    <span style={{ color: '#F59E0B' }}>
                      Clears in ~{berth.timeToClearHours}h
                    </span>
                  ) : (
                    <span style={{ color: '#10B981' }}>Immediate Slot</span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cranes:</span>
                  <span className="font-mono" style={{ color: '#F8FAFC', fontWeight: '600' }}>
                    {berth.assignedCraneIds.length > 0 ? berth.assignedCraneIds.join(', ') : 'None'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
