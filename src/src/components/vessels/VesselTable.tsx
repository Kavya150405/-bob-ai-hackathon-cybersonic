import React from 'react';
import { Vessel } from '../../types/port';
import { StatusBadge } from '../common/StatusBadge';
import { ChevronRight, Ship, AlertCircle } from 'lucide-react';

interface VesselTableProps {
  vessels: Vessel[];
  onSelectVessel: (vessel: Vessel) => void;
  isLoading?: boolean;
}

export const VesselTable: React.FC<VesselTableProps> = ({
  vessels,
  onSelectVessel,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div
        className="port-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          gap: '12px',
        }}
      >
        <Ship size={32} color="#38BDF8" className="pulse" />
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Loading vessel telemetry and berthing plans...
        </span>
      </div>
    );
  }

  if (vessels.length === 0) {
    return (
      <div
        className="port-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          gap: '12px',
          textAlign: 'center',
        }}
      >
        <AlertCircle size={32} color="var(--text-muted)" />
        <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
          No vessels match your filters
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '400px' }}>
          Try clearing the priority or status filters, or search for a different vessel name or IMO identifier.
        </p>
      </div>
    );
  }

  return (
    <div className="port-table-wrapper">
      <table className="port-table">
        <thead>
          <tr>
            <th>Vessel ID</th>
            <th>Vessel Name</th>
            <th>ETA / Arrival</th>
            <th>Containers</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned Berth</th>
            <th>Cranes</th>
            <th>Handling Time</th>
            <th style={{ textAlign: 'right' }}>Inspect</th>
          </tr>
        </thead>
        <tbody>
          {vessels.map((vessel) => (
            <tr key={vessel.id} onClick={() => onSelectVessel(vessel)}>
              {/* Vessel ID */}
              <td>
                <span
                  className="font-mono"
                  style={{
                    color: '#38BDF8',
                    fontWeight: '700',
                    fontSize: '12px',
                  }}
                >
                  {vessel.id}
                </span>
              </td>

              {/* Vessel Name + Flag */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#38BDF8',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {vessel.flagCode}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      {vessel.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {vessel.shippingLine} • {vessel.imo}
                    </div>
                  </div>
                </div>
              </td>

              {/* ETA */}
              <td>
                <span className="font-mono" style={{ fontSize: '12px' }}>
                  {vessel.eta}
                </span>
                {vessel.anchorageWaitHours > 2 && (
                  <div style={{ fontSize: '10px', color: '#F59E0B' }}>
                    +{vessel.anchorageWaitHours}h wait
                  </div>
                )}
              </td>

              {/* Containers */}
              <td>
                <span className="font-mono" style={{ fontWeight: '700' }}>
                  {vessel.teu.toLocaleString()}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                  TEU
                </span>
              </td>

              {/* Priority */}
              <td>
                <span
                  className="font-mono"
                  style={{
                    fontWeight: '700',
                    fontSize: '11px',
                    color:
                      vessel.priority === 'High'
                        ? '#EF4444'
                        : vessel.priority === 'Medium'
                        ? '#F59E0B'
                        : '#10B981',
                  }}
                >
                  {vessel.priority}
                </span>
              </td>

              {/* Status */}
              <td>
                <StatusBadge status={vessel.status} size="sm" />
              </td>

              {/* Assigned Berth */}
              <td>
                {vessel.berthId ? (
                  <span
                    className="font-mono"
                    style={{
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#38BDF8',
                      fontWeight: '700',
                      fontSize: '11px',
                    }}
                  >
                    {vessel.berthId}
                  </span>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Outer Anchorage
                  </span>
                )}
              </td>

              {/* Cranes */}
              <td>
                {vessel.craneIds.length > 0 ? (
                  <span className="font-mono" style={{ fontSize: '12px', color: '#F59E0B', fontWeight: '600' }}>
                    {vessel.craneIds.join(', ')}
                  </span>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>-</span>
                )}
              </td>

              {/* Handling Time */}
              <td>
                <span className="font-mono" style={{ fontSize: '12px' }}>
                  {vessel.handlingTimeHours}h
                </span>
              </td>

              {/* Inspect Button */}
              <td style={{ textAlign: 'right' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVessel(vessel);
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px', color: '#38BDF8' }}
                >
                  <span>Inspect</span>
                  <ChevronRight size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
