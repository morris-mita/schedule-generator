// src/components/schedule/TimelineView.tsx

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ScheduledActivity, UserPreferences } from '../../types';
import { timeToMinutes, minutesToTime } from '../../lib/utils/timeUtils';
import { getActivityColor } from '../../lib/utils/activityUtils';

interface TimelineViewProps {
  schedule: ScheduledActivity[];
  preferences: UserPreferences;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ schedule, preferences }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-0">
      {hours.map(hour => (
        <div key={hour} className="relative flex border-b border-[#252525] last:border-b-0">
          <div className="w-20 py-4 text-sm text-[#a0a0a0] font-medium">
            {minutesToTime(hour * 60)}
          </div>
          <div className="flex-1 relative min-h-[60px]">
            {schedule
              .filter(activity => {
                const activityHour = Math.floor(timeToMinutes(activity.scheduledStart) / 60);
                return activityHour === hour;
              })
              .map(activity => {
                const startMinutes = timeToMinutes(activity.scheduledStart);
                const topOffset = startMinutes % 60;
                const height = activity.duration;

                return (
                  <div
                    key={activity.id}
                    className="absolute left-0 right-0 mx-2 rounded-lg p-3 shadow-lg overflow-hidden"
                    style={{
                      top: `${topOffset}px`,
                      height: `${height}px`,
                      backgroundColor: activity.color || getActivityColor(activity.type),
                      opacity: activity.conflictsWith?.length ? 0.7 : 1
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-white truncate">
                          {activity.title}
                        </div>
                        <div className="text-xs text-white/80 mt-1">
                          {activity.scheduledStart} - {activity.scheduledEnd}
                        </div>
                      </div>
                      {activity.conflictsWith?.length && (
                        <AlertCircle size={16} className="text-white flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};
