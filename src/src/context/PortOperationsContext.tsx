import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  ActiveView,
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
  portApi,
  getApiBaseUrl,
  setApiBaseUrl,
} from '../services/portApi';
import {
  INITIAL_SIMULATION_PARAMS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface PortOperationsContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  congestionStatus: CongestionStatus | null;
  vessels: Vessel[];
  berths: Berth[];
  cranes: Crane[];
  routes: RouteRecommendation[];
  recommendations: ResourceRecommendation[];
  schedule: ScheduleItem[];
  alerts: OperationalAlertItem[];
  isLoading: boolean;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;

  // Selection modals & drawers
  selectedVessel: Vessel | null;
  setSelectedVessel: (vessel: Vessel | null) => void;
  selectedBerth: Berth | null;
  setSelectedBerth: (berth: Berth | null) => void;
  selectedCrane: Crane | null;
  setSelectedCrane: (crane: Crane | null) => void;

  // Search & Global state
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTerminal: string;
  setSelectedTerminal: (terminal: string) => void;
  apiEndpoint: string;
  updateApiEndpoint: (url: string) => void;

  // Notification / Alerts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
  dismissAlert: (id: string) => void;

  // Actions
  applyRecommendation: (id: string) => void;

  // What-If Simulator
  simulationParams: SimulationParameters;
  setSimulationParams: React.Dispatch<React.SetStateAction<SimulationParameters>>;
  simulationResult: SimulationResult | null;
  isSimulating: boolean;
  runSimulation: () => Promise<void>;
  resetSimulation: () => void;
  loadPreset: (presetName: 'typhoon' | 'surge' | 'mobilization' | 'baseline') => void;
}

const PortOperationsContext = createContext<PortOperationsContextType | undefined>(undefined);

export const PortOperationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [congestionStatus, setCongestionStatus] = useState<CongestionStatus | null>(null);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [berths, setBerths] = useState<Berth[]>([]);
  const [cranes, setCranes] = useState<Crane[]>([]);
  const [routes, setRoutes] = useState<RouteRecommendation[]>([]);
  const [recommendations, setRecommendations] = useState<ResourceRecommendation[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [alerts, setAlerts] = useState<OperationalAlertItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [selectedBerth, setSelectedBerth] = useState<Berth | null>(null);
  const [selectedCrane, setSelectedCrane] = useState<Crane | null>(null);

  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState('Terminal 4 - North Basin');
  const [apiEndpoint, setApiEndpointState] = useState(getApiBaseUrl());

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Simulation state
  const [simulationParams, setSimulationParams] = useState<SimulationParameters>(INITIAL_SIMULATION_PARAMS);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
    showToast('Alert acknowledged and logged in shift telemetry', 'info');
  }, [showToast]);

  const loadAllData = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsRefreshing(true);
    try {
      const [
        loadedCongestion,
        loadedVessels,
        loadedBerths,
        loadedCranes,
        loadedRoutes,
        loadedRecommendations,
        loadedSchedule,
        loadedAlerts,
      ] = await Promise.all([
        portApi.getCongestionStatus(),
        portApi.getVessels(),
        portApi.getBerths(),
        portApi.getCranes(),
        portApi.getRouteRecommendations(),
        portApi.getResourceRecommendations(),
        portApi.getScheduleItems(),
        portApi.getAlerts(),
      ]);

      setCongestionStatus(loadedCongestion);
      setVessels(loadedVessels);
      setBerths(loadedBerths);
      setCranes(loadedCranes);
      setRoutes(loadedRoutes);
      setRecommendations(loadedRecommendations);
      setSchedule(loadedSchedule);
      setAlerts(loadedAlerts);

      // Pre-run baseline simulation
      if (!simulationResult) {
        const initialSim = await portApi.runWhatIfSimulation(INITIAL_SIMULATION_PARAMS);
        setSimulationResult(initialSim);
      }
    } catch (err) {
      console.error('Failed to load port telemetry data', err);
      showToast('Error loading live terminal data. Using cached metrics.', 'warning');
    } finally {
      setIsLoading(false);
      if (showIndicator) setIsRefreshing(false);
    }
  }, [showToast, simulationResult]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const refreshData = async () => {
    await loadAllData(true);
    showToast('Terminal telemetry synced with VTS & TOS feeds', 'success');
  };

  const updateApiEndpoint = (url: string) => {
    setApiBaseUrl(url);
    setApiEndpointState(url);
    showToast(url ? `API target configured: ${url}` : 'Using local AI simulation engine', 'info');
    loadAllData(true);
  };

  const applyRecommendation = (recId: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === recId ? { ...rec, status: 'Applied' as const } : rec))
    );
    const target = recommendations.find((r) => r.id === recId);
    if (target) {
      showToast(`Optimized allocation applied for ${target.vesselName}: Berth ${target.recommendedBerthId} dispatch queued`, 'success');
    }
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await portApi.runWhatIfSimulation(simulationParams);
      setSimulationResult(res);
      showToast('What-If simulation completed with predictive impact analysis', 'success');
    } catch (err) {
      console.error(err);
      showToast('Simulation failed to complete.', 'warning');
    } finally {
      setIsSimulating(false);
    }
  };

  const resetSimulation = () => {
    setSimulationParams(INITIAL_SIMULATION_PARAMS);
    portApi.runWhatIfSimulation(INITIAL_SIMULATION_PARAMS).then((res) => {
      setSimulationResult(res);
      showToast('Simulator parameters reset to current live baseline', 'info');
    });
  };

  const loadPreset = (presetName: 'typhoon' | 'surge' | 'mobilization' | 'baseline') => {
    let newParams: SimulationParameters = INITIAL_SIMULATION_PARAMS;
    let label = '';
    switch (presetName) {
      case 'typhoon':
        newParams = {
          incomingVessels: 26,
          containerVolume: 16800,
          queueVessels: 22,
          availableBerths: 1,
          availableCranes: 3,
        };
        label = 'Typhoon / Fog Disruption scenario loaded';
        break;
      case 'surge':
        newParams = {
          incomingVessels: 32,
          containerVolume: 21500,
          queueVessels: 18,
          availableBerths: 2,
          availableCranes: 5,
        };
        label = 'Mega-Carrier Vessel Surge scenario loaded';
        break;
      case 'mobilization':
        newParams = {
          incomingVessels: 14,
          containerVolume: 9800,
          queueVessels: 4,
          availableBerths: 6,
          availableCranes: 16,
        };
        label = 'Rapid Resource Mobilization scenario loaded';
        break;
      case 'baseline':
      default:
        newParams = INITIAL_SIMULATION_PARAMS;
        label = 'Standard Operational Baseline scenario loaded';
        break;
    }
    setSimulationParams(newParams);
    portApi.runWhatIfSimulation(newParams).then((res) => {
      setSimulationResult(res);
      showToast(label, 'info');
    });
  };

  return (
    <PortOperationsContext.Provider
      value={{
        activeView,
        setActiveView,
        congestionStatus,
        vessels,
        berths,
        cranes,
        routes,
        recommendations,
        schedule,
        alerts,
        isLoading,
        isRefreshing,
        refreshData,
        selectedVessel,
        setSelectedVessel,
        selectedBerth,
        setSelectedBerth,
        selectedCrane,
        setSelectedCrane,
        globalSearchQuery,
        setGlobalSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        selectedTerminal,
        setSelectedTerminal,
        apiEndpoint,
        updateApiEndpoint,
        toasts,
        showToast,
        dismissToast,
        dismissAlert,
        applyRecommendation,
        simulationParams,
        setSimulationParams,
        simulationResult,
        isSimulating,
        runSimulation,
        resetSimulation,
        loadPreset,
      }}
    >
      {children}
    </PortOperationsContext.Provider>
  );
};

export const usePortOperations = () => {
  const context = useContext(PortOperationsContext);
  if (!context) {
    throw new Error('usePortOperations must be used within a PortOperationsProvider');
  }
  return context;
};
