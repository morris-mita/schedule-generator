// src/hooks/useSchedule.ts

import { useMemo } from 'react';
import { Activity, UserPreferences, ScheduledActivity, ConflictResolution } from '../types';
import { ScheduleEngine } from '../lib/scheduling/ScheduleEngine';

export const useSchedule = (
  activities: Activity[],
  preferences: UserPreferences,
  selectedDate: string
): { schedule: ScheduledActivity[]; conflicts: ConflictResolution[] } => {
  return useMemo(() => {
    const engine = new ScheduleEngine(activities, preferences, selectedDate);
    return engine.generateSchedule();
  }, [activities, preferences, selectedDate]);
};
