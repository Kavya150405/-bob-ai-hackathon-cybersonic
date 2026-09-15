import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Compass, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const RouteRecommendation: React.FC = () => {
  const { routes, showToast } = usePortOperations();

  const handleSelectRoute = (routeName: string) => {
    showToast(`Navigation Advisory dispatched: Recommended approach via ${routeName} broadcast to incoming vessels`, 'success');
  };

  const recommendedRoute = routes.find((r) => r.recommendationStatus === 'Recommended') || routes[1];

  return (
    <div className="port-card">
      <div className="port-card-header">
        <div>
          <div className="card-title">
            <Compass size={18} color="#38BDF8" />
            <span>Fairway & Approach Route Recommendation</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Multi-criteria hydrodynamic and traffic optimization for inbound maritime lanes
          </div>
        </div>

        <span
          className="font-mono"
          style={{
            fontSize: '11px',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38BDF8',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '700',
          }}
        >
          LIVE VTS ROUTING MATRIX
        </span>
      </div>

      {/* Featured Primary Recommendation Banner: Route B */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
          border: '2px solid #0284C7',
          boxShadow: '0 0 24px rgba(2, 132, 199, 0.15)',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#38BDF8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  RECOMMENDED APPROACH ROUTE
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    backgroundColor: '#10B981',
                    color: '#070B14',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontWeight: '800',
                  }}
                >
                  BEST TRADE-OFF
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#F8FAFC', marginTop: '2px' }}>
                {recommendedRoute?.routeId}: {recommendedRoute?.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => handleSelectRoute(recommendedRoute?.routeId || 'Route B')}
            className="btn btn-cyan"
            style={{ padding: '8px 18px', fontWeight: '700' }}
          >
            <span>Broadcast Advisory to Fleet</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Route Key Performance Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            backgroundColor: 'var(--bg-card)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Estimated Waiting Time</div>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>
              {recommendedRoute?.waitingTime} <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>(5h savings)</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Estimated Cost</div>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '800', color: '#F8FAFC', marginTop: '2px' }}>
              {recommendedRoute?.costRating} <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>({recommendedRoute?.costValue})</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Congestion Level</div>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '800', color: '#F59E0B', marginTop: '2px' }}>
              {recommendedRoute?.congestionLevel}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Overall Suitability</div>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '800', color: '#38BDF8', marginTop: '2px' }}>
              {recommendedRoute?.suitabilityScore} / 100
            </div>
          </div>
        </div>

        {/* Why this route? Rationale Box */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px',
            }}
          >
            <HelpCircle size={14} />
            <span>Why this route?</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5', fontStyle: 'italic' }}>
            "Lower expected waiting time and congestion offset the slightly higher cost."
          </p>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {recommendedRoute?.notes}
          </div>
        </div>
      </div>

      {/* Alternative Routes Comparison Table */}
      <div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '10px',
          }}
        >
          Comparative Routing Decision Matrix
        </div>

        <div className="port-table-wrapper">
          <table className="port-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Route Name / Fairway</th>
                <th style={{ textAlign: 'center' }}>Cost</th>
                <th style={{ textAlign: 'center' }}>Waiting Time</th>
                <th style={{ textAlign: 'center' }}>Congestion</th>
                <th style={{ textAlign: 'center' }}>Suitability</th>
                <th>Recommendation</th>
                <th style={{ textAlign: 'right' }}>Select</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => {
                const isRec = route.recommendationStatus === 'Recommended';
                const isAvoid = route.recommendationStatus === 'Avoid';

                return (
                  <tr
                    key={route.routeId}
                    style={{
                      backgroundColor: isRec ? 'rgba(56, 189, 248, 0.08)' : undefined,
                    }}
                  >
                    <td>
                      <span
                        className="font-mono"
                        style={{
                          fontWeight: '800',
                          fontSize: '13px',
                          color: isRec ? '#38BDF8' : isAvoid ? '#EF4444' : 'var(--text-primary)',
                        }}
                      >
                        {route.routeId}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: '600' }}>{route.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Draft: {route.channelDepth} • Speed: {route.speedLimit}
                      </div>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <span className="font-mono" style={{ fontWeight: '700', fontSize: '13px' }}>
                        {route.costRating}
                      </span>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {route.costValue}
                      </div>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontWeight: '800',
                          fontSize: '14px',
                          color: parseInt(route.waitingTime) <= 3 ? '#10B981' : '#EF4444',
                        }}
                      >
                        {route.waitingTime}
                      </span>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          fontWeight: '700',
                          color:
                            route.congestionLevel === 'HIGH'
                              ? '#EF4444'
                              : route.congestionLevel === 'MEDIUM'
                              ? '#F59E0B'
                              : '#10B981',
                        }}
                      >
                        {route.congestionLevel}
                      </span>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <span className="font-mono" style={{ fontWeight: '700', fontSize: '13px' }}>
                        {route.suitabilityScore}%
                      </span>
                    </td>

                    <td>
                      <span
                        className="font-mono"
                        style={{
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '11px',
                          fontWeight: '800',
                          backgroundColor: isRec
                            ? 'rgba(16, 185, 129, 0.15)'
                            : isAvoid
                            ? 'rgba(239, 68, 68, 0.15)'
                            : 'rgba(56, 189, 248, 0.15)',
                          color: isRec ? '#10B981' : isAvoid ? '#EF4444' : '#38BDF8',
                          border: `1px solid ${
                            isRec
                              ? 'rgba(16, 185, 129, 0.4)'
                              : isAvoid
                              ? 'rgba(239, 68, 68, 0.4)'
                              : 'rgba(56, 189, 248, 0.4)'
                          }`,
                        }}
                      >
                        {route.recommendationStatus}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleSelectRoute(route.routeId)}
                        className={`btn btn-sm ${isRec ? 'btn-cyan' : 'btn-secondary'}`}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        {isRec ? 'Active Choice' : 'Select Route'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
