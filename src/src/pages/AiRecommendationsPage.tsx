import React from 'react';
import { CongestionPredictor } from '../components/ai/CongestionPredictor';
import { RouteRecommendation } from '../components/ai/RouteRecommendation';
import { BerthCraneRecommendation } from '../components/ai/BerthCraneRecommendation';

export const AiRecommendationsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Section 1: Congestion Prediction (82/100 HIGH) */}
      <CongestionPredictor />

      {/* Section 2: Fairway Route Recommendation (Route B Recommended vs A & C) */}
      <RouteRecommendation />

      {/* Section 3: Berth & Crane Allocation Optimization */}
      <BerthCraneRecommendation />
    </div>
  );
};
