import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Anchor, Construction, ArrowRight } from 'lucide-react';

export const ResourceSummary: React.FC = () => {
  const { berths, cranes, setActiveView } = usePortOperations();

  // Berth metrics
  const totalBerths = berths.length || 12;
  const occupiedBerths = berths.filter((b) => b.status === 'Occupied').length || 10;
  const availableBerths = berths.filter((b) => b.status === 'Available' || b.status === 'Reserved').length || 2;
  const berthUtilizationPercent = Math.round((occupiedBerths / totalBerths) * 100);

  // Crane metrics
  const totalCranes = cranes.length || 25;
  const assignedCranes = cranes.filter((c) => c.status === 'Assigned').length || 19;
  const availableCranes = cranes.filter((c) => c.status === 'Available').length || 4;
  const maintenanceCranes = cranes.filter((c) => c.status === 'Maintenance').length || 2;
  const craneUtilizationPercent = Math.round((assignedCranes / totalCranes) * 100);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
      }}
      className="resource-summary-grid"
    >
      {/* Berth Utilization Card */}
      <div className="port-card">
        <div className="port-card-header">
          <div className="card-title">
            <Anchor size={16} color="#38BDF8" />
            <span>Berth Utilization</span>
          </div>
          <button
            onClick={() => setActiveView('berths')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '11px', padding: '2px 8px' }}
          >
            Quay Plan <ArrowRight size={12} />
          </button>
        </div>

        {/* Big percentage & status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '36px',
                fontWeight: '800',
                color: berthUtilizationPercent >= 80 ? '#EF4444' : '#10B981',
              }}
            >
              {berthUtilizationPercent}%
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '6px' }}>
              Capacity In Use
            </span>
          </div>

          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              fontWeight: '700',
            }}
          >
            HIGH DEMAND ({'>'}80%)
          </span>
        </div>

        {/* Multi-segment visual bar */}
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: 'var(--bg-deep)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '14px',
          }}
        >
          <div
            title={`Occupied: ${occupiedBerths}`}
            style={{
              width: `${(occupiedBerths / totalBerths) * 100}%`,
              backgroundColor: '#EF4444',
            }}
          />
          <div
            title={`Available: ${availableBerths}`}
            style={{
              width: `${(availableBerths / totalBerths) * 100}%`,
              backgroundColor: '#10B981',
            }}
          />
        </div>

        {/* Breakdown counters */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Berths</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700' }}>
              {totalBerths}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#EF4444' }}>Occupied</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700', color: '#EF4444' }}>
              {occupiedBerths}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#10B981' }}>Available</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700', color: '#10B981' }}>
              {availableBerths}
            </div>
          </div>
        </div>
      </div>

      {/* Crane Utilization Card */}
      <div className="port-card">
        <div className="port-card-header">
          <div className="card-title">
            <Construction size={16} color="#F59E0B" />
            <span>Crane Utilization</span>
          </div>
          <button
            onClick={() => setActiveView('berths')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '11px', padding: '2px 8px' }}
          >
            Crane Fleet <ArrowRight size={12} />
          </button>
        </div>

        {/* Big percentage & status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '36px',
                fontWeight: '800',
                color: craneUtilizationPercent >= 75 ? '#F59E0B' : '#10B981',
              }}
            >
              {craneUtilizationPercent}%
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '6px' }}>
              Active Gangs
            </span>
          </div>

          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#F59E0B',
              fontWeight: '700',
            }}
          >
            19 / 25 ACTIVE
          </span>
        </div>

        {/* Multi-segment visual bar */}
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: 'var(--bg-deep)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '14px',
          }}
        >
          <div
            title={`Assigned: ${assignedCranes}`}
            style={{
              width: `${(assignedCranes / totalCranes) * 100}%`,
              backgroundColor: '#F59E0B',
            }}
          />
          <div
            title={`Available: ${availableCranes}`}
            style={{
              width: `${(availableCranes / totalCranes) * 100}%`,
              backgroundColor: '#10B981',
            }}
          />
          <div
            title={`Maintenance: ${maintenanceCranes}`}
            style={{
              width: `${(maintenanceCranes / totalCranes) * 100}%`,
              backgroundColor: '#64748B',
            }}
          />
        </div>

        {/* Breakdown counters */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '6px',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Cranes</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700' }}>
              {totalCranes}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#F59E0B' }}>Assigned</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700', color: '#F59E0B' }}>
              {assignedCranes}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#10B981' }}>Available</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700', color: '#10B981' }}>
              {availableCranes}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Maint.</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700', color: '#94A3B8' }}>
              {maintenanceCranes}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .resource-summary-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
