import React, { useState } from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Vessel } from '../../types/port';
import { StatusBadge } from '../common/StatusBadge';
import { Ship, ArrowRight, ExternalLink, Filter } from 'lucide-react';

export const VesselActivityTable: React.FC = () => {
  const { vessels, setSelectedVessel, setActiveView } = usePortOperations();
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filtered = vessels
    .filter((v) => (filterPriority === 'all' ? true : v.priority.toLowerCase() === filterPriority))
    .slice(0, 7); // Show top 7 in dashboard activity table

  return (
    <div className="port-card">
      <div className="port-card-header">
        <div>
          <div className="card-title">
            <Ship size={16} color="#38BDF8" />
            <span>Active Vessel Queue & Quayside Operations</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Real-time inbound arrivals, turnaround tracking and risk assessments
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Priority Quick Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={13} color="var(--text-muted)" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="form-select"
              style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <button
            onClick={() => setActiveView('vessels')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <span>View All ({vessels.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="port-table-wrapper">
        <table className="port-table">
          <thead>
            <tr>
              <th>Vessel</th>
              <th>ETA / Arrival</th>
              <th>Containers (TEU)</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Berth</th>
              <th>Risk Level</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((vessel: Vessel) => (
              <tr key={vessel.id} onClick={() => setSelectedVessel(vessel)}>
                {/* Vessel name and ID */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '11px',
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
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {vessel.id} • {vessel.shippingLine}
                      </div>
                    </div>
                  </div>
                </td>

                {/* ETA */}
                <td>
                  <span className="font-mono" style={{ fontSize: '12px' }}>
                    {vessel.eta}
                  </span>
                </td>

                {/* Containers */}
                <td>
                  <div>
                    <span className="font-mono" style={{ fontWeight: '600' }}>
                      {vessel.teu.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                      TEU
                    </span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    In: {vessel.inboundTeu} / Out: {vessel.outboundTeu}
                  </div>
                </td>

                {/* Priority */}
                <td>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
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

                {/* Status Badge */}
                <td>
                  <StatusBadge status={vessel.status} size="sm" />
                </td>

                {/* Berth */}
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
                        fontWeight: '600',
                        fontSize: '11px',
                      }}
                    >
                      {vessel.berthId}
                    </span>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Unassigned (Roadstead)
                    </span>
                  )}
                </td>

                {/* Risk */}
                <td>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color:
                        vessel.risk === 'Critical'
                          ? '#EF4444'
                          : vessel.risk === 'High'
                          ? '#F87171'
                          : vessel.risk === 'Moderate'
                          ? '#F59E0B'
                          : '#10B981',
                    }}
                  >
                    {vessel.risk} Risk
                  </span>
                  {vessel.demurrageRiskCost > 5000 && (
                    <div style={{ fontSize: '10px', color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                      ${vessel.demurrageRiskCost}/hr
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVessel(vessel);
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '4px 8px', color: '#38BDF8' }}
                  >
                    <span>Details</span>
                    <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
