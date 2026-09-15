import {
  Vessel,
  Berth,
  Crane,
  CongestionStatus,
  RouteRecommendation,
  ResourceRecommendation,
  ScheduleItem,
  SimulationParameters,
  SimulationResult,
  OperationalAlertItem,
} from '../types/port';
import {
  INITIAL_CONGESTION_STATUS,
  INITIAL_VESSELS,
  INITIAL_BERTHS,
  INITIAL_CRANES,
  INITIAL_ROUTE_RECOMMENDATIONS,
  INITIAL_RESOURCE_RECOMMENDATIONS,
  INITIAL_SCHEDULE_ITEMS,
  INITIAL_ALERTS,
} from '../data/mockData';

// Configurable API root endpoint (can be overridden in settings modal)
let apiBaseUrl = localStorage.getItem('portintel_api_url') || '';

export const setApiBaseUrl = (url: string) => {
  apiBaseUrl = url;
  if (url) {
    localStorage.setItem('portintel_api_url', url);
  } else {
    localStorage.removeItem('portintel_api_url');
  }
};

export const getApiBaseUrl = () => apiBaseUrl;

// Helper to simulate realistic network delay for async loading states
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const portApi = {
  async getCongestionStatus(): Promise<CongestionStatus> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/congestion`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return { ...INITIAL_CONGESTION_STATUS };
  },

  async getVessels(): Promise<Vessel[]> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/vessels`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return [...INITIAL_VESSELS];
  },

  async getBerths(): Promise<Berth[]> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/berths`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return [...INITIAL_BERTHS];
  },

  async getCranes(): Promise<Crane[]> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/cranes`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return [...INITIAL_CRANES];
  },

  async getRouteRecommendations(): Promise<RouteRecommendation[]> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/routes`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return [...INITIAL_ROUTE_RECOMMENDATIONS];
  },

  async getResourceRecommendations(): Promise<ResourceRecommendation[]> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/ai/recommendations`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return [...INITIAL_RESOURCE_RECOMMENDATIONS];
  },

  async getScheduleItems(): Promise<ScheduleItem[]> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/schedule`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return [...INITIAL_SCHEDULE_ITEMS];
  },

  async getAlerts(): Promise<OperationalAlertItem[]> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/alerts`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, falling back to local simulation data', err);
      }
    }
    await delay();
    return [...INITIAL_ALERTS];
  },

  async runWhatIfSimulation(params: SimulationParameters): Promise<SimulationResult> {
    if (apiBaseUrl) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/simulate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error in simulation, using client-side calculation engine', err);
      }
    }
    await delay(350); // simulate realistic AI model computation

    // Mathematical formula for dynamic port congestion simulation
    // Weights: Incoming vessels (0.3), Container volume normalized (0.25), Queue (0.25), Available berths inverse (0.1), Available cranes inverse (0.1)
    const baseCongestion = 62;
    const vesselDelta = (params.incomingVessels - 18) * 1.5;
    const volumeDelta = ((params.containerVolume - 12450) / 1000) * 1.8;
    const queueDelta = (params.queueVessels - 8) * 1.6;
    const berthDelta = (2 - params.availableBerths) * 3.2;
    const craneDelta = (6 - params.availableCranes) * 1.4;

    const simulatedScore = Math.min(
      99,
      Math.max(12, Math.round(baseCongestion + vesselDelta + volumeDelta + queueDelta + berthDelta + craneDelta))
    );

    const simulatedLevel =
      simulatedScore <= 40 ? 'LOW' : simulatedScore <= 70 ? 'MEDIUM' : 'HIGH';

    const simulatedBerthUtil = Math.min(
      100,
      Math.max(25, Math.round(((12 - params.availableBerths) / 12) * 100))
    );

    const simulatedCraneUtil = Math.min(
      100,
      Math.max(20, Math.round(((25 - params.availableCranes) / 25) * 100))
    );

    const simulatedWaitHours = +(
      2.5 +
      (params.queueVessels * 0.45) +
      (params.incomingVessels * 0.15) -
      (params.availableBerths * 0.4)
    ).toFixed(1);

    const simulatedEfficiency = Math.max(
      35,
      Math.min(98, Math.round(100 - (simulatedScore * 0.4) - (params.queueVessels * 1.5)))
    );

    let impactSummary = 'Moderate operational impact with normal vessel flow.';
    if (simulatedScore >= 75) {
      impactSummary =
        'Impact Detected: Additional vessel arrivals and queue pressure push the port into critical high congestion, exceeding sustainable quayside capacity.';
    } else if (simulatedScore >= 50) {
      impactSummary =
        'Elevated congestion observed: Turnaround times begin to slip as berth occupancy approaches maximum buffer thresholds.';
    } else {
      impactSummary =
        'Optimal conditions: High resource availability provides smooth throughput and minimal dwell times.';
    }

    const recommendedActions = [];
    if (simulatedScore > 65) {
      recommendedActions.push('Consider alternate route (Route B bypass)');
      recommendedActions.push('Rebalance berth assignments to avoid high-draft clashing');
      recommendedActions.push('Prioritize high-priority vessels with demurrage exposure');
      recommendedActions.push('Review crane allocation and activate stand-by gangs');
    } else {
      recommendedActions.push('Maintain standard scheduling window');
      recommendedActions.push('Conduct preventative crane inspections during low tide');
      recommendedActions.push('Pre-stage export container stacks for inbound carriers');
    }

    return {
      before: {
        congestionScore: 62,
        congestionLevel: 'MEDIUM',
        queue: 8,
        berthUtilization: 84,
        craneUtilization: 76,
        avgWaitHours: 4.2,
        turnaroundEfficiency: 82,
      },
      after: {
        congestionScore: simulatedScore,
        congestionLevel: simulatedLevel,
        queue: params.queueVessels,
        berthUtilization: simulatedBerthUtil,
        craneUtilization: simulatedCraneUtil,
        avgWaitHours: Math.max(0.8, simulatedWaitHours),
        turnaroundEfficiency: simulatedEfficiency,
      },
      impactSummary,
      recommendedActions,
    };
  },
};
