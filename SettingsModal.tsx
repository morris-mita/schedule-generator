// src/components/modals/SettingsModal.tsx

import React, { useState } from 'react';
import { UserPreferences } from '../../types';

interface SettingsModalProps {
  preferences: UserPreferences;
  onSave: (prefs: UserPreferences) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  preferences,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState(preferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#252525]">
          <h2 className="text-xl font-semibold">Preferences</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Working Hours</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Start</label>
                <input
                  type="time"
                  value={formData.workingHours.start}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      workingHours: { ...formData.workingHours, start: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">End</label>
                <input
                  type="time"
                  value={formData.workingHours.end}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      workingHours: { ...formData.workingHours, end: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Sleep Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Bedtime</label>
                <input
                  type="time"
                  value={formData.sleepSchedule.bedtime}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      sleepSchedule: { ...formData.sleepSchedule, bedtime: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Wake Up</label>
                <input
                  type="time"
                  value={formData.sleepSchedule.wakeup}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      sleepSchedule: { ...formData.sleepSchedule, wakeup: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Meal Times</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Breakfast</label>
                <input
                  type="time"
                  value={formData.mealTimes.breakfast || ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      mealTimes: { ...formData.mealTimes, breakfast: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Lunch</label>
                <input
                  type="time"
                  value={formData.mealTimes.lunch || ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      mealTimes: { ...formData.mealTimes, lunch: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Dinner</label>
                <input
                  type="time"
                  value={formData.mealTimes.dinner || ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      mealTimes: { ...formData.mealTimes, dinner: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Other Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">
                  Minimum Break Between Activities (minutes)
                </label>
                <input
                  type="number"
                  value={formData.minimumBreakBetweenActivities}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minimumBreakBetweenActivities: Number(e.target.value)
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  min="0"
                  step="5"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">
                  Buffer Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.bufferTime}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      bufferTime: Number(e.target.value)
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  min="0"
                  step="5"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">
                  Preferred Relax Time Per Day (minutes)
                </label>
                <input
                  type="number"
                  value={formData.preferredRelaxTime}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      preferredRelaxTime: Number(e.target.value)
                    })
                  }
                  className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  min="0"
                  step="15"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#6366f1] hover:bg-[#5558e3] rounded-lg transition-colors font-medium"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#252525] hover:bg-[#2a2a2a] rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
