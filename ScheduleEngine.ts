// src/lib/scheduling/ScheduleEngine.ts

import { Activity, ScheduledActivity, UserPreferences, ConflictResolution } from '../../types';
import { timeToMinutes, minutesToTime, addMinutes, hasTimeOverlap } from '../utils/timeUtils';

export class ScheduleEngine {
  private activities: Activity[];
  private preferences: UserPreferences;
  private date: string;

  constructor(activities: Activity[], preferences: UserPreferences, date: string) {
    this.activities = activities;
    this.preferences = preferences;
    this.date = date;
  }

  generateSchedule(): { schedule: ScheduledActivity[]; conflicts: ConflictResolution[] } {
    const schedule: ScheduledActivity[] = [];
    
    // Sort by priority (highest first) and flexibility (fixed first)
    const sorted = [...this.activities].sort((a, b) => {
      if (a.isFixed !== b.isFixed) return a.isFixed ? -1 : 1;
      return b.priority - a.priority;
    });

    // Place each activity
    for (const activity of sorted) {
      const scheduled = this.scheduleActivity(activity, schedule);
      if (scheduled) {
        schedule.push(scheduled);
      }
    }

    // Detect conflicts
    const conflicts = this.detectConflicts(schedule);

    return { schedule, conflicts };
  }

  private scheduleActivity(
    activity: Activity,
    currentSchedule: ScheduledActivity[]
  ): ScheduledActivity | null {
    if (activity.preferredStartTime) {
      // Try preferred time first
      const start = activity.preferredStartTime;
      const end = addMinutes(start, activity.duration);
      
      if (!this.hasConflict(start, end, currentSchedule)) {
        return {
          ...activity,
          scheduledStart: start,
          scheduledEnd: end,
          isAutoScheduled: !activity.isFixed
        };
      }
    }

    // Find best available slot
    const slot = this.findBestTimeSlot(activity, currentSchedule);
    if (slot) {
      return {
        ...activity,
        scheduledStart: slot.start,
        scheduledEnd: slot.end,
        isAutoScheduled: true
      };
    }

    return null;
  }

  private findBestTimeSlot(
    activity: Activity,
    schedule: ScheduledActivity[]
  ): { start: string; end: string } | null {
    const startMinutes = timeToMinutes(this.preferences.workingHours.start);
    const endMinutes = timeToMinutes(this.preferences.workingHours.end);
    
    let bestSlot: { start: string; end: string } | null = null;
    let bestScore = -Infinity;

    // Try every 15-minute slot
    for (let minutes = startMinutes; minutes <= endMinutes - activity.duration; minutes += 15) {
      const start = minutesToTime(minutes);
      const end = addMinutes(start, activity.duration);
      
      if (!this.hasConflict(start, end, schedule)) {
        const score = this.calculateSlotScore(activity, start, schedule);
        if (score > bestScore) {
          bestScore = score;
          bestSlot = { start, end };
        }
      }
    }

    return bestSlot;
  }

  private calculateSlotScore(
    activity: Activity,
    start: string,
    schedule: ScheduledActivity[]
  ): number {
    let score = 0;
    const startMinutes = timeToMinutes(start);

    // Prefer morning for high energy tasks
    if (activity.energyLevel === 'high' && startMinutes >= 480 && startMinutes <= 660) {
      score += 30;
    }

    // Prefer afternoon for medium energy
    if (activity.energyLevel === 'medium' && startMinutes >= 720 && startMinutes <= 960) {
      score += 20;
    }

    // Avoid late night
    if (startMinutes > 1260) {
      score -= 20;
    }

    // Prefer clustering similar activities
    const nearbyActivity = schedule.find(s => {
      const diff = Math.abs(timeToMinutes(s.scheduledEnd) - startMinutes);
      return diff <= 30 && s.type === activity.type;
    });
    if (nearbyActivity) {
      score += 15;
    }

    return score;
  }

  private hasConflict(start: string, end: string, schedule: ScheduledActivity[]): boolean {
    return schedule.some(s => hasTimeOverlap(start, end, s.scheduledStart, s.scheduledEnd));
  }

  private detectConflicts(schedule: ScheduledActivity[]): ConflictResolution[] {
    const conflicts: ConflictResolution[] = [];

    for (let i = 0; i < schedule.length; i++) {
      for (let j = i + 1; j < schedule.length; j++) {
        const a = schedule[i];
        const b = schedule[j];

        if (hasTimeOverlap(a.scheduledStart, a.scheduledEnd, b.scheduledStart, b.scheduledEnd)) {
          conflicts.push({
            type: 'overlap',
            activities: [a.id, b.id],
            description: `"${a.title}" overlaps with "${b.title}"`
          });
        }
      }
    }

    return conflicts;
  }
}
