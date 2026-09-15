import React from 'react';
import { Timeline72h } from '../components/schedule/Timeline72h';

export const Plan72hPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Timeline72h />
    </div>
  );
};
