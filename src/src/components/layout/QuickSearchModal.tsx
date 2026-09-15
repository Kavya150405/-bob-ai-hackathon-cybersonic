import React, { useState, useEffect } from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { Search, Ship, Anchor, X, ArrowRight } from 'lucide-react';

export const QuickSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    vessels,
    berths,
    setSelectedVessel,
    setSelectedBerth,
    setActiveView,
  } = usePortOperations();

  const [search, setSearch] = useState('');

  // Keyboard shortcut listener (Ctrl+K or Cmd+K, Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredVessels = search.trim()
    ? vessels.filter(
        (v) =>
          v.name.toLowerCase().includes(search.toLowerCase()) ||
          v.id.toLowerCase().includes(search.toLowerCase()) ||
          v.imo.toLowerCase().includes(search.toLowerCase()) ||
          v.shippingLine.toLowerCase().includes(search.toLowerCase())
      )
    : vessels.slice(0, 5);

  const filteredBerths = search.trim()
    ? berths.filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.id.toLowerCase().includes(search.toLowerCase())
      )
    : berths.slice(0, 4);

  return (
    <div className="modal-overlay" onClick={() => setIsSearchModalOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: '580px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Search size={18} color="#38BDF8" />
          <input
            autoFocus
            type="text"
            placeholder="Search vessels, berths, cranes, or alerts (e.g. 'MSC Aurora', 'B-04', 'IMO')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Vessels Section */}
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Ship size={13} color="#38BDF8" />
              <span>Vessels ({filteredVessels.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredVessels.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVessel(v);
                    setIsSearchModalOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#38BDF8' }}>
                      {v.id}
                    </span>
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{v.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {v.shippingLine}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', color: 'var(--text-secondary)' }}
                    >
                      {v.teu.toLocaleString()} TEU
                    </span>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Berths Section */}
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Anchor size={13} color="#10B981" />
              <span>Berths ({filteredBerths.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredBerths.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBerth(b);
                    setActiveView('berths');
                    setIsSearchModalOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#10B981' }}>
                      {b.id}
                    </span>
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{b.name}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      color: b.status === 'Available' ? '#10B981' : '#F59E0B',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--bg-deep)',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Tip: Click any vessel to open deep telemetry & cargo specs</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
