// src/App.tsx

import React, { useState, useCallback } from 'react';
import { Activity, UserPreferences } from './types';
import { generateId } from './lib/utils/timeUtils';
import { useSchedule } from './hooks/useSchedule';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DailyView } from './components/schedule/DailyView';
import { ActivityFormModal } from './components/modals/ActivityFormModal';
import { SettingsModal } from './components/modals/SettingsModal';

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Morning Meeting',
      type: 'meeting',
      duration: 60,
      priority: 4,
      isFlexible: false,
      isRecurring: false,
      preferredStartTime: '09:00',
      energyLevel: 'high',
      isFixed: true
    },
    {
      id: '2',
      title: 'Lunch',
      type: 'meal',
      duration: 60,
      priority: 5,
      isFlexible: true,
      isRecurring: true,
      preferredStartTime: '12:00',
      energyLevel: 'low'
    },
    {
      id: '3',
      title: 'Focus Work',
      type: 'work',
      duration: 120,
      priority: 4,
      isFlexible: true,
      isRecurring: false,
      energyLevel: 'high'
    },
    {
      id: '4',
      title: 'Gym',
      type: 'hobby',
      duration: 90,
      priority: 3,
      isFlexible: true,
      isRecurring: false,
      energyLevel: 'high'
    },
    {
      id: '5',
      title: 'Dinner',
      type: 'meal',
      duration: 45,
      priority: 5,
      isFlexible: true,
      isRecurring: true,
      preferredStartTime: '18:00',
      energyLevel: 'low'
    }
  ]);

  const [preferences, setPreferences] = useState<UserPreferences>({
    workingHours: { start: '08:00', end: '22:00' },
    sleepSchedule: { bedtime: '23:00', wakeup: '07:00' },
    mealTimes: { breakfast: '08:00', lunch: '12:00', dinner: '18:00' },
    minimumBreakBetweenActivities: 15,
    bufferTime: 10,
    preferredRelaxTime: 120
  });

  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Generate schedule using custom hook
  const { schedule, conflicts } = useSchedule(activities, preferences, selectedDate);

  const handleAddActivity = useCallback((activity: Omit<Activity, 'id'>) => {
    setActivities(prev => [...prev, { ...activity, id: generateId() }]);
    setShowActivityForm(false);
  }, []);

  const handleUpdateActivity = useCallback((id: string, updates: Partial<Activity>) => {
    setActivities(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
    setEditingActivity(null);
  }, []);

  const handleDeleteActivity = useCallback((id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  }, []);

  const regenerateSchedule = useCallback(() => {
    // Force re-render by creating new array reference
    setActivities(prev => [...prev]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e5e5] flex flex-col">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onRegenerateSchedule={regenerateSchedule}
        onToggleSettings={() => setShowSettings(!showSettings)}
        showSettings={showSettings}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          activities={activities}
          conflicts={conflicts}
          onAddActivity={() => setShowActivityForm(true)}
          onEditActivity={setEditingActivity}
          onDeleteActivity={handleDeleteActivity}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <DailyView
            schedule={schedule}
            preferences={preferences}
            selectedDate={selectedDate}
          />
        </main>
      </div>

      {(showActivityForm || editingActivity) && (
        <ActivityFormModal
          activity={editingActivity}
          onSave={
            editingActivity
              ? updates => handleUpdateActivity(editingActivity.id, updates)
              : handleAddActivity
          }
          onClose={() => {
            setShowActivityForm(false);
            setEditingActivity(null);
          }}
        />
      )}

      {showSettings && (
        <SettingsModal
          preferences={preferences}
          onSave={setPreferences}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
