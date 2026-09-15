import React from 'react';
import { usePortOperations } from '../context/PortOperationsContext';
import { CongestionSection } from '../components/dashboard/CongestionSection';
import { OperationalAlert } from '../components/dashboard/OperationalAlert';
import { VesselActivityTable } from '../components/dashboard/VesselActivityTable';
import { ResourceSummary } from '../components/dashboard/ResourceSummary';
import { KpiCard } from '../components/common/KpiCard';
import {
  Ship,
  Boxes,
  Anchor,
  Construction,
  Users,
  AlertTriangle,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { vessels, berths, cranes } = usePortOperations();

  // Dynamic values or defaults matching prompt
  const incomingCount = 18;
  const containerVolume = 12450;
  const berthUtilization = 84;
  const craneUtilization = 76;
  const queueCount = 11;
  const atRiskCount = 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Large Visual Congestion Status & Analysis Section */}
      <CongestionSection />

      {/* 2. KPI Cards Row (6 Cards as requested) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {/* KPI 1: Incoming Vessels */}
        <KpiCard
          title="Incoming Vessels"
          value={incomingCount}
          unit="vessels"
          subtext="+3 carriers entering fairway"
          icon={Ship}
          trend={{ value: '+16.6%', isPositive: false, direction: 'up' }}
          variant="warning"
        />

        {/* KPI 2: Container Volume */}
        <KpiCard
          title="Container Volume"
          value={containerVolume.toLocaleString()}
          unit="TEU"
          subtext="88% of daily yard capacity"
          icon={Boxes}
          trend={{ value: '+8.4%', isPositive: false, direction: 'up' }}
          progress={{ percent: 88, color: '#38BDF8' }}
        />

        {/* KPI 3: Berth Utilization */}
        <KpiCard
          title="Berth Utilization"
          value={`${berthUtilization}%`}
          subtext="10 of 12 berths occupied"
          icon={Anchor}
          trend={{ value: 'Critical >80%', isPositive: false, direction: 'up' }}
          progress={{ percent: berthUtilization, color: '#EF4444' }}
          variant="danger"
        />

        {/* KPI 4: Crane Utilization */}
        <KpiCard
          title="Crane Utilization"
          value={`${craneUtilization}%`}
          subtext="19 of 25 STS active"
          icon={Construction}
          trend={{ value: 'High Load', isPositive: false, direction: 'up' }}
          progress={{ percent: craneUtilization, color: '#F59E0B' }}
          variant="warning"
        />

        {/* KPI 5: Queue */}
        <KpiCard
          title="Outer Queue"
          value={`${queueCount} vessels`}
          subtext="Avg outer wait: 5.4 hrs"
          icon={Users}
          trend={{ value: '+3 in queue', isPositive: false, direction: 'up' }}
          variant="danger"
        />

        {/* KPI 6: Vessels At Risk */}
        <KpiCard
          title="Vessels At Risk"
          value={atRiskCount}
          unit="vessels"
          subtext="Demurrage SLA breach danger"
          icon={AlertTriangle}
          trend={{ value: 'Action needed', isPositive: false, direction: 'up' }}
          variant="danger"
        />
      </div>

      {/* 3. Operational Alert Section */}
      <OperationalAlert />

      {/* 4. Vessel Activity Table Section */}
      <VesselActivityTable />

      {/* 5. Resource Utilization Section */}
      <ResourceSummary />
    </div>
  );
};
