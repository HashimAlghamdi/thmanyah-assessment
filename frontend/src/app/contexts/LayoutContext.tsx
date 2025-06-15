"use client";

import React, { createContext, useContext, useState } from 'react';

type LayoutType = 'grid' | 'scroll';
type EpisodeLayoutType = 'grid' | 'scroll' | 'compact';

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  episodeLayout: EpisodeLayoutType;
  setEpisodeLayout: (layout: EpisodeLayoutType) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState<LayoutType>('scroll');
  const [episodeLayout, setEpisodeLayout] = useState<EpisodeLayoutType>('scroll');

  return (
    <LayoutContext.Provider value={{ 
      layout, 
      setLayout, 
      episodeLayout, 
      setEpisodeLayout 
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
} 