# Intelligent Schedule Generator

A modern, AI-powered web application that automatically generates optimized daily schedules based on your activities, priorities, and preferences.

## Features

✅ **Smart Scheduling Algorithm** - Automatically generates optimized schedules based on:
- Activity priorities
- Energy levels and time of day
- Preferred time slots
- Travel time requirements
- User preferences

✅ **Activity Management**
- Add, edit, and delete activities
- Support for recurring events
- Flexible vs. fixed time slots
- Custom activity types (meetings, classes, hobbies, meals, relax, work)

✅ **Conflict Detection & Resolution**
- Real-time conflict detection
- Visual conflict indicators
- Automatic resolution suggestions

✅ **Modern Dark Mode UI**
- Sleek, modern design
- Responsive layout for all devices
- Smooth animations and transitions
- Color-coded activities

✅ **User Preferences**
- Customizable working hours
- Sleep schedule settings
- Meal time preferences
- Break time requirements

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Scheduling**: Custom constraint-satisfaction algorithm

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Top navigation bar
│   │   └── Sidebar.tsx             # Activity list sidebar
│   ├── modals/
│   │   ├── ActivityFormModal.tsx   # Add/Edit activity form
│   │   └── SettingsModal.tsx       # User preferences form
│   └── schedule/
│       ├── DailyView.tsx           # Main schedule container
│       └── TimelineView.tsx        # 24-hour timeline component
├── hooks/
│   └── useSchedule.ts              # Custom hook for schedule generation
├── lib/
│   ├── scheduling/
│   │   └── ScheduleEngine.ts       # Core scheduling algorithm
│   └── utils/
│       ├── activityUtils.ts        # Activity helper functions
│       └── timeUtils.ts            # Time manipulation utilities
├── types/
│   └── index.ts                    # TypeScript type definitions
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point
└── index.css                       # Global styles
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd schedule-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## Usage

### Adding an Activity

1. Click the "Add Activity" button in the sidebar
2. Fill in the activity details:
   - **Title**: Name of the activity
   - **Type**: Meeting, Class, Hobby, Meal, Relax, Work, or Custom
   - **Duration**: Length in minutes
   - **Priority**: 1 (lowest) to 5 (highest)
   - **Energy Level**: High, Medium, or Low
   - **Preferred Start Time**: (Optional) Specific time preference
   - **Flexible Time**: Whether the activity can be moved
   - **Recurring**: Whether it repeats
3. Click "Add Activity" to save

### Editing an Activity

1. Hover over an activity in the sidebar
2. Click the edit icon (pencil)
3. Modify the details
4. Click "Update Activity"

### Deleting an Activity

1. Hover over an activity in the sidebar
2. Click the delete icon (trash)
3. The activity will be removed and the schedule will regenerate

### Adjusting Preferences

1. Click the "Settings" button in the header
2. Adjust your preferences:
   - Working hours (when you're available)
   - Sleep schedule (bedtime and wake up time)
   - Meal times (breakfast, lunch, dinner)
   - Minimum break between activities
   - Buffer time for transitions
   - Preferred relax time per day
3. Click "Save Preferences"

### Regenerating the Schedule

Click the "Regenerate" button in the header to create a new optimized schedule based on current activities and preferences.

## Scheduling Algorithm

The app uses a sophisticated constraint-satisfaction algorithm:

1. **Priority Sorting**: Activities are sorted by priority and flexibility
2. **Fixed Placement**: Fixed-time activities (like meetings) are placed first
3. **Optimal Slot Finding**: Flexible activities are assigned to the best available time slots based on:
   - Energy level matching (high-energy tasks in the morning)
   - Time preferences
   - Activity clustering (similar activities together)
   - Avoiding late-night scheduling
4. **Conflict Detection**: The system checks for time overlaps and insufficient breaks
5. **Optimization**: The schedule is scored and optimized for the best fit

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Future Enhancements

- 🔄 Calendar integration (Google Calendar, Outlook)
- 📱 Mobile app version
- 🌐 Multi-day view (weekly/monthly)
- 💾 Cloud sync and user accounts
- 📊 Analytics dashboard
- 🎨 Custom themes
- 📤 Export to PDF/image
- 🔔 Browser notifications
- 🤖 Machine learning for pattern recognition
- 👥 Shared schedules and collaboration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and TailwindCSS
