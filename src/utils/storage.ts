import { DEFAULT_PROGRAMS } from '../data/defaultWorkouts';
import { WorkoutProgram, WorkoutSessionLog, UserProgress } from '../types/workout';

const STORAGE_KEY_PROGRAMS = 'agy_workout_programs_v2';
const STORAGE_KEY_LOGS = 'agy_workout_logs_v1';
const STORAGE_KEY_PROGRESS = 'agy_workout_progress_v1';

export function getPrograms(): WorkoutProgram[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRAMS);
    if (!raw) {
      // Also check if v1 has custom user programs to migrate
      const rawV1 = localStorage.getItem('agy_workout_programs_v1');
      if (rawV1) {
        try {
          const oldList: WorkoutProgram[] = JSON.parse(rawV1);
          const customOnly = oldList.filter(p => p.id.startsWith('custom_'));
          const combined = [...DEFAULT_PROGRAMS, ...customOnly];
          localStorage.setItem(STORAGE_KEY_PROGRAMS, JSON.stringify(combined));
          return combined;
        } catch {}
      }
      localStorage.setItem(STORAGE_KEY_PROGRAMS, JSON.stringify(DEFAULT_PROGRAMS));
      return DEFAULT_PROGRAMS;
    }
    const parsed: WorkoutProgram[] = JSON.parse(raw);
    
    // Ensure all latest default programs and their exercises exist
    const defaultIds = new Set(DEFAULT_PROGRAMS.map(p => p.id));
    const userCustoms = parsed.filter(p => !defaultIds.has(p.id));
    
    // Combine latest default programs with any user-created custom programs
    const synced = [...DEFAULT_PROGRAMS, ...userCustoms];
    localStorage.setItem(STORAGE_KEY_PROGRAMS, JSON.stringify(synced));
    return synced;
  } catch {
    return DEFAULT_PROGRAMS;
  }
}

export function savePrograms(programs: WorkoutProgram[]): void {
  localStorage.setItem(STORAGE_KEY_PROGRAMS, JSON.stringify(programs));
}

export function addProgram(newProgram: WorkoutProgram): WorkoutProgram[] {
  const current = getPrograms();
  const updated = [newProgram, ...current];
  savePrograms(updated);
  return updated;
}

export function getLogs(): WorkoutSessionLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLog(log: WorkoutSessionLog): WorkoutSessionLog[] {
  const current = getLogs();
  const updated = [log, ...current];
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updated));
  return updated;
}

export function getUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch {}

  const initial: UserProgress = {
    currentProgramId: 'calistenia-fase-1',
    completedWorkouts: getLogs(),
    streakDays: 0,
    lastWorkoutDate: null,
    targetWeight: 75,
    currentWeight: 77,
  };
  return initial;
}

export function saveUserProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
}

// Calculate streak in consecutive days
export function calculateStreak(logs: WorkoutSessionLog[]): number {
  if (!logs || logs.length === 0) return 0;
  
  const dates = Array.from(new Set(logs.map(l => l.date))).sort().reverse();
  if (dates.length === 0) return 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (dates[0] !== today && dates[0] !== yesterday) {
    return 0;
  }

  let streak = 1;
  let currentDate = new Date(dates[0]);

  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i]);
    const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}

export function getYouTubeEmbedUrl(urlOrId: string): string {
  if (!urlOrId) return '';
  let id = urlOrId.trim();
  
  if (id.includes('youtube.com/watch?v=')) {
    id = id.split('v=')[1]?.split('&')[0] || id;
  } else if (id.includes('youtu.be/')) {
    id = id.split('youtu.be/')[1]?.split('?')[0] || id;
  } else if (id.includes('youtube.com/embed/')) {
    id = id.split('embed/')[1]?.split('?')[0] || id;
  }
  
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`;
}
