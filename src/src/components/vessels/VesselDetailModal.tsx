import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Ship,
  X,
  Clock,
  Package,
  AlertTriangle,
  Anchor,
  Construction,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const VesselDetailModal: React.FC = () => {
  const { selectedVessel, setSelectedVessel, setActiveView, showToast, setSimulationParams, runSimulation } =
    usePortOperations();

  if (!selectedVessel) return null;

  const handleSimulateThisVessel = () => {
    // Populate simulator with this vessel's pressure
    setSimulationParams((prev) => ({
      ...prev,
      incomingVessels: prev.incomingVessels + 2,
      containerVolume: prev.containerVolume + selectedVessel.teu,
      queueVessels: prev.queueVessels + 1,
    }));
    setSelectedVessel(null);
    setActiveView('simulator');
    runSimulation();
    showToast(`Loaded ${selectedVessel.name} load parameters into What-If Simulator`, 'info');
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedVessel(null)}>
      <div
        className="modal-content"
        style={{ maxWidth: '720px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38BDF8',
              }}
            >
              <Ship size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {selectedVessel.name}
                </h2>
                <StatusBadge status={selectedVessel.status} size="sm" />
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '2px',
                }}
              >
                {selectedVessel.id} • {selectedVessel.imo} • {selectedVessel.shippingLine} • Flag: {selectedVessel.flag}
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedVessel(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Quick Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Container Volume
              </div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: '#38BDF8', marginTop: '4px' }}>
                {selectedVessel.teu.toLocaleString()} <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>TEU</span>
              </div>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Handling Window
              </div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '4px' }}>
                {selectedVessel.handlingTimeHours}h
              </div>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Demurrage Risk
              </div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: '#EF4444', marginTop: '4px' }}>
                ${selectedVessel.demurrageRiskCost.toLocaleString()}
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/hr</span>
              </div>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Congestion Index
              </div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: '#F59E0B', marginTop: '4px' }}>
                +{selectedVessel.congestionImpactScore} pts
              </div>
            </div>
          </div>

          {/* AI Operational Recommendation Banner */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <Sparkles size={20} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#38BDF8', marginBottom: '2px' }}>
                AI Terminal Operations Guidance
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {selectedVessel.operationalRecommendation}
              </p>
            </div>
          </div>

          {/* Two-Column Specification Detail */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Arrival & Schedule Specs */}
            <div
              style={{
                padding: '14px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Clock size={14} color="#38BDF8" />
                <span>Voyage & Arrival Timeline</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Arrival (ETA):</span>
                  <span className="font-mono" style={{ fontWeight: '600' }}>{selectedVessel.eta}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Scheduled Window:</span>
                  <span className="font-mono">{selectedVessel.scheduledArrival}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Departure (ETD):</span>
                  <span className="font-mono">{selectedVessel.etd}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Anchorage Dwell:</span>
                  <span className="font-mono" style={{ color: '#F59E0B', fontWeight: '600' }}>
                    {selectedVessel.anchorageWaitHours} hours queued
                  </span>
                </div>
              </div>
            </div>

            {/* Cargo & Naval Architecture */}
            <div
              style={{
                padding: '14px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Package size={14} color="#10B981" />
                <span>Vessel Dimensions & Cargo Split</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>LOA / Beam / Draft:</span>
                  <span className="font-mono">{selectedVessel.loa}m × {selectedVessel.beam}m • {selectedVessel.draft}m draft</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Discharge (Inbound):</span>
                  <span className="font-mono">{selectedVessel.inboundTeu.toLocaleString()} TEU</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Load (Outbound):</span>
                  <span className="font-mono">{selectedVessel.outboundTeu.toLocaleString()} TEU</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Reefer / Hazmat:</span>
                  <span className="font-mono" style={{ color: '#38BDF8' }}>
                    {selectedVessel.reeferUnits} Reefer • {selectedVessel.hazmatUnits} IMO Hazmat
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Resources Banner */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Anchor size={16} color="#38BDF8" />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assigned Berth:</span>
                <span className="font-mono" style={{ fontSize: '13px', fontWeight: '700', color: '#38BDF8' }}>
                  {selectedVessel.berthId || 'Unassigned'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Construction size={16} color="#F59E0B" />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assigned Cranes:</span>
                <span className="font-mono" style={{ fontSize: '13px', fontWeight: '700', color: '#F59E0B' }}>
                  {selectedVessel.craneIds.length > 0 ? selectedVessel.craneIds.join(', ') : 'None'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedVessel(null);
                setActiveView('berths');
              }}
              className="btn btn-secondary btn-sm"
            >
              Change Allocation
            </button>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button onClick={handleSimulateThisVessel} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            <TrendingUp size={14} color="#38BDF8" />
            <span>Simulate Vessel Arrival in What-If</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                showToast(`Shift notice generated for ${selectedVessel.name}`, 'info');
              }}
              className="btn btn-secondary btn-sm"
            >
              Export Manifest
            </button>
            <button onClick={() => setSelectedVessel(null)} className="btn btn-primary btn-sm">
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
