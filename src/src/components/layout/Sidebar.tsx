import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import type { ActiveView } from '../../types/port';
import {
  LayoutDashboard,
  Ship,
  Anchor,
  Sparkles,
  CalendarClock,
  FlaskConical,
  Activity,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Radio,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsSettingsModalOpen,
  } = usePortOperations();

  const navItems: Array<{
    id: ActiveView;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }> = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'vessels', label: 'Vessels', icon: Ship, badge: '18' },
      { id: 'berths', label: 'Berths & Cranes', icon: Anchor, badge: '12/25' },
      { id: 'ai', label: 'AI Recommendations', icon: Sparkles, badge: '4 New' },
      { id: 'schedule', label: '72-Hour Plan', icon: CalendarClock },
      { id: 'simulator', label: 'What-If Simulator', icon: FlaskConical },
    ];

  return (
    <aside
      style={{
        width: isSidebarCollapsed
          ? 'var(--sidebar-width-collapsed)'
          : 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 110,
        flexShrink: 0,
      }}
    >
      {/* Top Branding Area */}
      <div>
        <div
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
            padding: isSidebarCollapsed ? '0' : '0 20px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {!isSidebarCollapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #0F62FE, #38BDF8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(56, 189, 248, 0.35)',
                }}
              >
                <Radio size={20} color="#FFFFFF" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2',
                  }}
                >
                  PortIntel<span style={{ color: '#38BDF8' }}>.ai</span>
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    color: '#94A3B8',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  IBM BoB HACKATHON
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #0F62FE, #38BDF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Radio size={20} color="#FFFFFF" />
            </div>
          )}

          {/* Collapse toggle button */}
          <button
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '6px',
              display: isSidebarCollapsed ? 'none' : 'flex',
              color: 'var(--text-muted)',
            }}
            title="Toggle Sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Collapsed expand button on hover/click */}
        {isSidebarCollapsed && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="btn btn-ghost btn-sm"
              style={{ padding: '6px' }}
              title="Expand Sidebar"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Navigation Item List */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: isSidebarCollapsed ? '16px 8px' : '16px 12px',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: isSidebarCollapsed ? '12px 0' : '10px 14px',
                  justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--border-focus)' : 'transparent',
                  backgroundColor: isActive
                    ? 'rgba(56, 189, 248, 0.12)'
                    : 'transparent',
                  color: isActive ? '#38BDF8' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  position: 'relative',
                  outline: 'none',
                }}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  size={18}
                  color={isActive ? '#38BDF8' : 'var(--text-secondary)'}
                  style={{ flexShrink: 0 }}
                />

                {!isSidebarCollapsed && (
                  <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                )}

                {!isSidebarCollapsed && item.badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isActive
                        ? '#38BDF8'
                        : 'var(--bg-elevated)',
                      color: isActive ? '#070B14' : 'var(--text-muted)',
                      fontWeight: '700',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: System Status & Settings */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: isSidebarCollapsed ? '12px 6px' : '16px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* Telemetry Status Indicator */}
        {!isSidebarCollapsed ? (
          <div
            style={{
              padding: '10px 12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Activity size={13} color="#10B981" />
                System Status
              </span>
              <span
                className="status-dot pulse"
                style={{ backgroundColor: '#10B981' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}
            >
              <span>VTS / TOS Feed</span>
              <span style={{ color: '#10B981', fontWeight: '600' }}>ONLINE (14ms)</span>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '6px',
            }}
            title="System Operational: All Telemetry Online"
          >
            <span
              className="status-dot pulse"
              style={{ backgroundColor: '#10B981', width: '8px', height: '8px' }}
            />
          </div>
        )}

        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: isSidebarCollapsed ? '10px 0' : '8px 12px',
            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          title="Terminal Settings"
        >
          <Sliders size={15} />
          {!isSidebarCollapsed && <span>Settings & Configuration</span>}
        </button>
      </div>
    </aside>
  );
};
