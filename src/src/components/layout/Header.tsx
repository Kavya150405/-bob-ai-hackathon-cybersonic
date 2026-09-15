import React, { useState } from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import {
  Search,
  Bell,
  RefreshCw,
  ShieldCheck,
  User,
  SlidersHorizontal,
  ChevronDown,
  Check,
  AlertTriangle,
  Anchor,
} from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const {
    isRefreshing,
    refreshData,
    setIsSearchModalOpen,
    alerts,
    dismissAlert,
    setActiveView,
    selectedTerminal,
    setSelectedTerminal,
    setIsSettingsModalOpen,
  } = usePortOperations();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTerminalDropdownOpen, setIsTerminalDropdownOpen] = useState(false);

  const unreadAlerts = alerts.filter((a) => !a.acknowledged);

  const terminals = [
    'Terminal 4 - North Basin',
    'Terminal 2 - South Container Pier',
    'Terminal 1 - Deepwater Gateway',
  ];

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left: Title & Subtitle / Breadcrumbs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <h1 className="page-title" style={{ margin: 0 }}>
          {title}
        </h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>

      {/* Right Controls: Port Selector, Status, Search, Notifications, Refresh, User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Terminal Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsTerminalDropdownOpen(!isTerminalDropdownOpen)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              gap: '6px',
            }}
          >
            <Anchor size={14} color="#38BDF8" />
            <span>{selectedTerminal}</span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {isTerminalDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                width: '240px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '4px',
                zIndex: 200,
              }}
            >
              {terminals.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTerminal(t);
                    setIsTerminalDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: t === selectedTerminal ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    color: t === selectedTerminal ? '#38BDF8' : 'var(--text-primary)',
                    fontSize: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span>{t}</span>
                  {t === selectedTerminal && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live System Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#10B981',
          }}
        >
          <span className="status-dot pulse" style={{ backgroundColor: '#10B981' }} />
          <span>System Operational</span>
        </div>

        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{ gap: '8px', color: 'var(--text-secondary)' }}
          title="Search vessels, berths, cranes (Ctrl+K)"
        >
          <Search size={15} />
          <span style={{ fontSize: '12px' }}>Search...</span>
          <kbd
            style={{
              backgroundColor: 'var(--bg-deep)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '3px',
              padding: '1px 5px',
              fontSize: '10px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Refresh Live Feeds Button */}
        <button
          onClick={refreshData}
          disabled={isRefreshing}
          className="btn btn-secondary btn-sm"
          title="Sync Telemetry with TOS"
          style={{ padding: '7px 10px' }}
        >
          <RefreshCw
            size={15}
            color="#38BDF8"
            style={{
              animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
            }}
          />
        </button>

        {/* Notifications Icon & Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="btn btn-secondary btn-sm"
            style={{ padding: '7px 10px', position: 'relative' }}
            title="Operational Alerts"
          >
            <Bell size={15} color="var(--text-secondary)" />
            {unreadAlerts.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: '700',
                  borderRadius: '999px',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--bg-surface)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '360px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '16px',
                zIndex: 200,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: '700' }}>
                  Operational Alerts ({unreadAlerts.length} Active)
                </span>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  maxHeight: '340px',
                  overflowY: 'auto',
                }}
              >
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: alert.acknowledged
                        ? 'rgba(15, 23, 42, 0.4)'
                        : 'var(--bg-card-hover)',
                      border: `1px solid ${
                        alert.acknowledged
                          ? 'var(--border-subtle)'
                          : alert.level === 'critical'
                          ? 'rgba(239, 68, 68, 0.4)'
                          : 'rgba(245, 158, 11, 0.4)'
                      }`,
                      opacity: alert.acknowledged ? 0.6 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        marginBottom: '4px',
                      }}
                    >
                      <AlertTriangle
                        size={14}
                        color={alert.level === 'critical' ? '#EF4444' : '#F59E0B'}
                        style={{ marginTop: '2px', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {alert.title}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'var(--text-secondary)',
                            marginTop: '2px',
                            lineHeight: '1.4',
                          }}
                        >
                          {alert.message}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '8px',
                        paddingTop: '6px',
                        borderTop: '1px solid var(--border-subtle)',
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <span>{alert.timestamp}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {alert.actionLabel && alert.actionTargetView && (
                          <button
                            onClick={() => {
                              setActiveView(alert.actionTargetView as any);
                              setIsNotificationsOpen(false);
                            }}
                            className="btn btn-ghost btn-sm"
                            style={{
                              padding: '2px 6px',
                              fontSize: '10px',
                              color: '#38BDF8',
                            }}
                          >
                            {alert.actionLabel}
                          </button>
                        )}
                        {!alert.acknowledged && (
                          <button
                            onClick={() => dismissAlert(alert.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{ padding: '7px 10px' }}
          title="Terminal Settings & API configuration"
        >
          <SlidersHorizontal size={15} color="var(--text-secondary)" />
        </button>

        {/* User Profile Area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingLeft: '10px',
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0F62FE, #0284C7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '12px',
              border: '2px solid var(--border-medium)',
            }}
          >
            HM
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                lineHeight: '1.2',
              }}
            >
              Capt. V. Sterling
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Harbor Master • Shift Alpha
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};
