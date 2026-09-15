export type CongestionLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type VesselPriority = 'High' | 'Medium' | 'Low';

export type VesselStatus =
  | 'Scheduled'
  | 'On Schedule'
  | 'Waiting'
  | 'Delayed'
  | 'At Risk'
  | 'In Progress'
  | 'Completed';

export type VesselRisk = 'Critical' | 'High' | 'Moderate' | 'Low';

export interface Vessel {
  id: string;
  name: string;
  imo: string;
  shippingLine: string;
  flag: string;
  flagCode: string;
  loa: number; // Length overall in meters
  draft: number; // Draft in meters
  beam: number; // Width in meters
  teu: number; // Total containers
  inboundTeu: number;
  outboundTeu: number;
  reeferUnits: number;
  hazmatUnits: number;
  eta: string;
  scheduledArrival: string;
  etd: string;
  priority: VesselPriority;
  status: VesselStatus;
  berthId: string | null;
  craneIds: string[];
  handlingTimeHours: number;
  risk: VesselRisk;
  demurrageRiskCost: number; // USD per day/hour
  anchorageWaitHours: number;
  congestionImpactScore: number; // 0 - 100 impact index
  operationalRecommendation: string;
  progressPercent?: number;
}

export type BerthStatus = 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';

export interface Berth {
  id: string;
  name: string;
  terminal: string;
  status: BerthStatus;
  occupancyPercent: number;
  capacityTeu: number;
  maxLoa: number;
  maxDraft: number;
  currentVesselId: string | null;
  currentVesselName: string | null;
  progressPercent: number;
  timeToClearHours: number;
  nextVesselId: string | null;
  nextVesselName: string | null;
  nextVesselEta: string | null;
  assignedCraneIds: string[];
}

export type CraneStatus = 'Available' | 'Assigned' | 'Maintenance';

export interface Crane {
  id: string;
  name: string;
  status: CraneStatus;
  capacityMovesPerHour: number;
  safeWorkingLoadTons: number;
  currentVesselId: string | null;
  currentVesselName: string | null;
  assignedBerthId: string | null;
  operatingHours: number;
  healthScore: number;
  movesToday: number;
}

export interface CongestionFactor {
  name: string;
  value: string;
  impactPercent: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  description: string;
}

export interface CongestionStatus {
  score: number;
  level: CongestionLevel;
  explanation: string;
  trend: string;
  factors: CongestionFactor[];
  lastUpdated: string;
}

export interface RouteRecommendation {
  routeId: string;
  name: string;
  costRating: '$' | '$$' | '$$$';
  costValue: string;
  waitingTime: string;
  congestionLevel: CongestionLevel;
  recommendationStatus: 'Recommended' | 'Alternative' | 'Avoid';
  suitabilityScore: number;
  channelDepth: string;
  speedLimit: string;
  notes: string;
}

export interface ResourceRecommendation {
  id: string;
  vesselId: string;
  vesselName: string;
  recommendedBerthId: string;
  recommendedCraneIds: string[];
  estimatedHandlingTime: string;
  reason: string;
  expectedTimeSavings: string;
  status: 'Pending' | 'Applied';
}

export interface ScheduleItem {
  id: string;
  vesselId: string;
  vesselName: string;
  berthId: string;
  craneIds: string[];
  startHour: number; // 0 to 72
  durationHours: number;
  priority: VesselPriority;
  status: VesselStatus;
  containers: number;
  arrivalString: string;
}

export interface SimulationParameters {
  incomingVessels: number;
  containerVolume: number;
  queueVessels: number;
  availableBerths: number;
  availableCranes: number;
}

export interface SimulationSituationMetrics {
  congestionScore: number;
  congestionLevel: CongestionLevel;
  queue: number;
  berthUtilization: number;
  craneUtilization: number;
  avgWaitHours: number;
  turnaroundEfficiency: number;
}

export interface SimulationResult {
  before: SimulationSituationMetrics;
  after: SimulationSituationMetrics;
  impactSummary: string;
  recommendedActions: string[];
}

export interface OperationalAlertItem {
  id: string;
  level: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  actionLabel?: string;
  actionTargetView?: string;
  acknowledged?: boolean;
}

export type ActiveView =
  | 'dashboard'
  | 'vessels'
  | 'berths'
  | 'ai'
  | 'schedule'
  | 'simulator';
