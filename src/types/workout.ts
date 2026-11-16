export type MuscleGroup = 
  | 'chest' 
  | 'triceps' 
  | 'biceps' 
  | 'shoulders' 
  | 'core' 
  | 'legs' 
  | 'glutes' 
  | 'back'
  | 'cardio';

export interface Exercise {
  id: string;
  name: string;
  alias: string;
  targetMuscles: MuscleGroup[];
  videoUrl: string;
  youtubeId: string;
  instructions: string[];
  executionTips: string[];
  defaultSets: number;
  repsOrDuration: string; // e.g. "8-12 reps", "16-20 toques", "20-30 seg"
  type: 'reps' | 'isometric';
  durationSeconds?: number; // for timer
  restSeconds: number;
}

export interface WorkoutProgram {
  id: string;
  title: string;
  category: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  durationDays: number; // e.g. 28 days (4 weeks)
  recommendedFrequency: string; // "3x a 4x na semana"
  frequencyPerWeek: number; // e.g. 3 or 4
  estimatedTimeMinutes: number;
  description: string;
  scientificContext?: string;
  badge?: string;
  exercises: Exercise[];
}

export interface WorkoutSessionLog {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  workoutId: string;
  workoutTitle: string;
  durationMinutes: number;
  completedExercisesCount: number;
  totalExercisesCount: number;
  notes?: string;
  dayNumber?: number; // 1 to 28
}

export interface UserProgress {
  currentProgramId: string;
  completedWorkouts: WorkoutSessionLog[];
  streakDays: number;
  lastWorkoutDate: string | null;
  targetWeight?: number;
  currentWeight?: number;
}
