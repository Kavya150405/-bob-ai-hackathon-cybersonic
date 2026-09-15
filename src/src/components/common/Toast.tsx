import React from 'react';
import { usePortOperations } from '../../context/PortOperationsContext';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = usePortOperations();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = Info;
        if (toast.type === 'success') Icon = CheckCircle;
        if (toast.type === 'warning') Icon = AlertTriangle;

        return (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <Icon
              size={18}
              color={
                toast.type === 'success'
                  ? '#10B981'
                  : toast.type === 'warning'
                  ? '#F59E0B'
                  : '#38BDF8'
              }
              style={{ flexShrink: 0 }}
            />
            <span style={{ flex: 1, lineHeight: '1.4' }}>{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
