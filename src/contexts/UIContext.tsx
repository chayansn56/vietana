import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "planner" | "builder" | "magicMode" | "experiences" | "map" | "contact" | "about" | "flightSearch";

interface UIContextType {
  modals: Record<ModalType, boolean>;
  setModalOpen: (modal: ModalType, isOpen: boolean) => void;
  hasOpenModal: boolean;

  // Specific data payloads
  plannerInitialData: { destination?: string; prompt?: string } | null;
  setPlannerInitialData: (data: { destination?: string; prompt?: string } | null) => void;

  builderDestinations: string[];
  setBuilderDestinations: React.Dispatch<React.SetStateAction<string[]>>;
  builderSights: string[];
  setBuilderSights: React.Dispatch<React.SetStateAction<string[]>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

import { useDebounce } from '../hooks/useDebounce';

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<Record<ModalType, boolean>>({
    planner: false,
    builder: false,
    magicMode: false,
    experiences: false,
    map: false,
    contact: false,
    about: false,
    flightSearch: false,
  });
  const [plannerInitialData, setPlannerInitialData] = useState<{ destination?: string; prompt?: string } | null>(null);

  const [builderDestinations, setBuilderDestinations] = useState<string[]>(() => {
    const cached = localStorage.getItem('vietana_trip_cities');
    return cached ? JSON.parse(cached) : [];
  });

  const [builderSights, setBuilderSights] = useState<string[]>(() => {
    const cached = localStorage.getItem('vietana_trip_sights');
    return cached ? JSON.parse(cached) : [];
  });

  const debouncedDestinations = useDebounce(builderDestinations, 500);
  const debouncedSights = useDebounce(builderSights, 500);

  React.useEffect(() => {
    localStorage.setItem('vietana_trip_cities', JSON.stringify(debouncedDestinations));
  }, [debouncedDestinations]);

  React.useEffect(() => {
    localStorage.setItem('vietana_trip_sights', JSON.stringify(debouncedSights));
  }, [debouncedSights]);

  const setModalOpen = (modal: ModalType, isOpen: boolean) => {
    setModals(prev => ({ ...prev, [modal]: isOpen }));
  };

  const hasOpenModal = Object.values(modals).some(isOpen => isOpen);

  return (
    <UIContext.Provider value={{
      modals, setModalOpen, hasOpenModal,
      plannerInitialData, setPlannerInitialData,
      builderDestinations, setBuilderDestinations,
      builderSights, setBuilderSights
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIStore = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIStore must be used within a UIProvider");
  }
  return context;
};
