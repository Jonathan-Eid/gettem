import React, { createContext, useContext, useState } from 'react';

const INTERVALS = [
  { label: 'Off', value: 0 },
  { label: '10s', value: 10_000 },
  { label: '30s', value: 30_000 },
  { label: '1m', value: 60_000 },
  { label: '5m', value: 300_000 },
];

interface RefreshContextType {
  intervalMs: number;
  setIntervalMs: (ms: number) => void;
  intervals: typeof INTERVALS;
}

const RefreshContext = createContext<RefreshContextType>({
  intervalMs: 30_000,
  setIntervalMs: () => {},
  intervals: INTERVALS,
});

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [intervalMs, setIntervalMs] = useState(30_000);
  return (
    <RefreshContext.Provider value={{ intervalMs, setIntervalMs, intervals: INTERVALS }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefreshInterval = () => useContext(RefreshContext);
