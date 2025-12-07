"use client";

import { ReactNode } from "react";

interface GameLayoutProps {
  children: ReactNode;
  leftPanel?: ReactNode;
  rightPanel?: ReactNode;
  header?: ReactNode;
}

export default function GameLayout({
  children,
  leftPanel,
  rightPanel,
  header
}: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--retro-bg-dark)] p-4 font-pixel">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-4 h-[calc(100vh-2rem)]">
        {/* Left Panel - Player Stats */}
        {leftPanel && (
          <div className="col-span-3 flex flex-col space-y-4">
            {leftPanel}
          </div>
        )}

        {/* Center Panel - Main Game Area */}
        <div className="col-span-6 flex flex-col relative">
          {header && (
            <div className="mb-4">
              {header}
            </div>
          )}
          <div className="flex-1 relative">
            {children}
          </div>
        </div>

        {/* Right Panel - Mission Tracker */}
        {rightPanel && (
          <div className="col-span-3 flex flex-col space-y-4">
            {rightPanel}
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-[calc(100vh-2rem)] space-y-4">
        {/* Mobile Header - Compact Stats */}
        {header && (
          <div className="flex-shrink-0">
            {header}
          </div>
        )}

        {/* Mobile Main Game Area */}
        <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
          {children}
        </div>

        {/* Mobile Side Panels - Collapsible */}
        <div className="flex-shrink-0 space-y-4">
          {leftPanel && (
            <div className="max-h-48 overflow-y-auto">
              {leftPanel}
            </div>
          )}
          {rightPanel && (
            <div className="max-h-48 overflow-y-auto">
              {rightPanel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
