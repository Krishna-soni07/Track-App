import { useState } from 'react';
import { format } from 'date-fns';
import { Navbar } from './components/Navbar';
import { SidebarMenu } from './components/SidebarMenu';
import { HomeView } from './views/HomeView';
import { EditTasksView } from './views/EditTasksView';
import { CalendarView } from './views/CalendarView';
import { MonthlySummaryView } from './views/MonthlySummaryView';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const [tasks, setTasks] = useLocalStorage('trackapp_tasks', [
    { id: 1, name: "Gym" },
    { id: 2, name: "Read" },
    { id: 3, name: "Coding Practice" },
    { id: 4, name: "Study" },
    { id: 5, name: "Meditation" }
  ]);

  const [dailyRecords, setDailyRecords] = useLocalStorage('trackapp_dailyRecords', {});
  const [currentDate, setCurrentDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));

  const currentRecord = dailyRecords[currentDate] || { completedTasks: [], notes: '' };

  const updateDailyRecord = (date, updates) => {
    setDailyRecords(prev => {
      const existing = prev[date] || { completedTasks: [], notes: '' };
      return {
        ...prev,
        [date]: { ...existing, ...updates }
      };
    });
  };

  const handleAddTemporaryTask = (dateStr, taskName) => {
    setDailyRecords(prev => {
      const existing = prev[dateStr] || { completedTasks: [], notes: '' };
      const tempTasks = existing.temporaryTasks || [];
      const newTask = { id: `temp-${Date.now()}`, name: taskName, isTemp: true };
      return {
        ...prev,
        [dateStr]: { ...existing, temporaryTasks: [...tempTasks, newTask] }
      };
    });
  };

  const handleSelectDate = (dateStr) => {
    setCurrentDate(dateStr);
    setCurrentView('home');
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'home': return 'Daily Tracker';
      case 'editTasks': return 'Edit Tasks';
      case 'calendar': return 'Calendar';
      case 'monthlySummary': return 'Monthly Summary';
      default: return 'Track App';
    }
  };

  return (
    <div className="min-h-screen font-sans text-text-main flex flex-col items-center selection:bg-primary/20">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl min-h-screen shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] relative overflow-x-hidden flex flex-col">
        <Navbar
          title={getViewTitle()}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <SidebarMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        <main className="flex-1 overflow-y-auto">
          {currentView === 'home' && (
            <HomeView
              date={currentDate}
              tasks={tasks}
              record={currentRecord}
              onUpdateRecord={(updates) => updateDailyRecord(currentDate, updates)}
              onAddTemporaryTask={(taskName, targetDate) => handleAddTemporaryTask(targetDate || currentDate, taskName)}
            />
          )}
          {currentView === 'editTasks' && (
            <EditTasksView tasks={tasks} setTasks={setTasks} />
          )}
          {currentView === 'calendar' && (
            <CalendarView
              dailyRecords={dailyRecords}
              tasks={tasks}
              currentDate={currentDate}
              onSelectDate={handleSelectDate}
            />
          )}
          {currentView === 'monthlySummary' && (
            <MonthlySummaryView
              currentDate={currentDate}
              dailyRecords={dailyRecords}
              tasks={tasks}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
