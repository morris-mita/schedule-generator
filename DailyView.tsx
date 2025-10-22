// src/components/schedule/DailyView.tsx

import React from 'react';
import { ScheduledActivity, UserPreferences } from '../../types';
import { TimelineView } from './TimelineView';

interface DailyViewProps {
  schedule: ScheduledActivity[];
  preferences: UserPreferences;
  selectedDate: string;
}

export const DailyView: React.FC<DailyViewProps> = ({
  schedule,
  preferences,
  selectedDate
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Daily Schedule -{' '}
          {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </h2>
        <p className="text-[#a0a0a0] text-sm">{schedule.length} activities scheduled</p>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <TimelineView schedule={schedule} preferences={preferences} />
      </div>
    </div>
  );
};
