// src/components/layout/Sidebar.tsx

import React from 'react';
import { Plus, Clock, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Activity, ConflictResolution } from '../../types';
import { getActivityColor } from '../../lib/utils/activityUtils';

interface SidebarProps {
  isOpen: boolean;
  activities: Activity[];
  conflicts: ConflictResolution[];
  onAddActivity: () => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activities,
  conflicts,
  onAddActivity,
  onEditActivity,
  onDeleteActivity
}) => {
  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static z-20 w-80 bg-[#1a1a1a] border-r border-[#252525] overflow-y-auto transition-transform duration-300`}
    >
      <div className="p-6">
        <button
          onClick={onAddActivity}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#6366f1] hover:bg-[#5558e3] rounded-lg transition-colors font-medium"
        >
          <Plus size={20} />
          Add Activity
        </button>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-[#a0a0a0] uppercase tracking-wider mb-3">
            Activities ({activities.length})
          </h3>
          <div className="space-y-2">
            {activities.map(activity => (
              <div
                key={activity.id}
                className="p-3 bg-[#252525] rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: activity.color || getActivityColor(activity.type)
                        }}
                      />
                      <span className="font-medium text-sm">{activity.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#a0a0a0]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {activity.duration}m
                      </span>
                      <span className="capitalize">{activity.type}</span>
                      <span className="flex items-center">{'⭐'.repeat(activity.priority)}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditActivity(activity)}
                      className="p-1 hover:bg-[#1a1a1a] rounded"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteActivity(activity.id)}
                      className="p-1 hover:bg-[#1a1a1a] rounded text-[#ef4444]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {conflicts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#f59e0b] uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertCircle size={16} />
              Conflicts ({conflicts.length})
            </h3>
            <div className="space-y-2">
              {conflicts.map((conflict, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg text-sm"
                >
                  {conflict.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
