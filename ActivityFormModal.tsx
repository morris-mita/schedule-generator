// src/components/modals/ActivityFormModal.tsx

import React, { useState } from 'react';
import { Activity, ActivityType, Priority, EnergyLevel } from '../../types';

interface ActivityFormModalProps {
  activity: Activity | null;
  onSave: (activity: any) => void;
  onClose: () => void;
}

export const ActivityFormModal: React.FC<ActivityFormModalProps> = ({
  activity,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState<Partial<Activity>>(
    activity || {
      title: '',
      type: 'work',
      duration: 60,
      priority: 3,
      isFlexible: true,
      isRecurring: false,
      energyLevel: 'medium'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#252525]">
          <h2 className="text-xl font-semibold">
            {activity ? 'Edit Activity' : 'Add New Activity'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={e =>
                  setFormData({ ...formData, type: e.target.value as ActivityType })
                }
                className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              >
                <option value="meeting">Meeting</option>
                <option value="class">Class</option>
                <option value="hobby">Hobby</option>
                <option value="meal">Meal</option>
                <option value="relax">Relax</option>
                <option value="work">Work</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
                className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                min="15"
                step="15"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={e =>
                  setFormData({ ...formData, priority: Number(e.target.value) as Priority })
                }
                className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              >
                <option value="1">1 - Lowest</option>
                <option value="2">2 - Low</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High</option>
                <option value="5">5 - Highest</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Energy Level</label>
              <select
                value={formData.energyLevel}
                onChange={e =>
                  setFormData({ ...formData, energyLevel: e.target.value as EnergyLevel })
                }
                className="w-full px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              >
                <option value="low">Low
