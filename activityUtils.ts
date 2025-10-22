// src/lib/utils/activityUtils.ts

import { ActivityType } from '../../types';

export const getActivityColor = (type: ActivityType): string => {
  const colors: Record<ActivityType, string> = {
    meeting: '#3b82f6',
    class: '#8b5cf6',
    hobby: '#ec4899',
    meal: '#f59e0b',
    relax: '#10b981',
    work: '#6366f1',
    custom: '#6b7280'
  };
  return colors[type];
};
