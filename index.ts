// src/types/index.ts

export type ActivityType = 'meeting' | 'class' | 'hobby' | 'meal' | 'relax' | 'work' | 'custom';
export type Priority = 1 | 2 | 3 | 4 | 5;
export type EnergyLevel = 'high' | 'medium' | 'low';
export type Frequency = 'daily' | 'weekly' | 'monthly';

export interface RecurrencePattern {
  frequency: Frequency;
  interval: number;
  daysOfWeek?: number[];
  endDate?: string;
  count?: number;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  duration: number;
  priority: Priority;
  isFlexible: boolean;
  isRecurring: boolean;
  recurrence?: RecurrencePattern;
  preferredStartTime?: string;
  travelTimeBefore?: number;
  travelTimeAfter?: number;
  energyLevel?: EnergyLevel;
  location?: string;
  notes?: string;
  color?: string;
  isFixed?: boolean;
}

export interface ScheduledActivity extends Activity {
  scheduledStart: string;
  scheduledEnd: string;
  isAutoScheduled: boolean;
  conflictsWith?: string[];
}

export interface UserPreferences {
  workingHours: { start: string; end: string };
  sleepSchedule: { bedtime: string; wakeup: string };
  mealTimes: { breakfast?: string; lunch?: string; dinner?: string };
  minimumBreakBetweenActivities: number;
  bufferTime: number;
  preferredRelaxTime: number;
}

export interface ConflictResolution {
  type: 'overlap' | 'insufficient_break' | 'energy_mismatch';
  activities: string[];
  description: string;
}
