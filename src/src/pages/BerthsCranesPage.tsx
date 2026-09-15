import React from 'react';
import { BerthSection } from '../components/berths/BerthSection';
import { CraneSection } from '../components/berths/CraneSection';

export const BerthsCranesPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Berths Management Section */}
      <BerthSection />

      {/* 2. Cranes Management Section */}
      <CraneSection />
    </div>
  );
};
