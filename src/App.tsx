import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Plus, 
  Flame, 
  Clock, 
  Zap,
  Dumbbell,
  HeartPulse,
  Activity,
  Award,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { WorkoutProgram, Exercise, WorkoutSessionLog } from './types/workout';
import { DEFAULT_PROGRAMS } from './data/defaultWorkouts';
import { getPrograms, getLogs, addProgram, calculateStreak } from './utils/storage';
import { ExerciseCard } from './components/ExerciseCard';
import { VideoModal } from './components/VideoModal';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { MuscleMap } from './components/MuscleMap';
import { CalendarView } from './components/CalendarView';
import { StatsView } from './components/StatsView';
import { CreateWorkoutModal } from './components/CreateWorkoutModal';
import { BottomNav, TabType } from './components/BottomNav';

export const App: React.FC = () => {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('calistenia-fase-1');
  const [logs, setLogs] = useState<WorkoutSessionLog[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('treinos');
  const [showLumbarGuide, setShowLumbarGuide] = useState(false);

  // Modals & Active Workout
  const [activeVideoExercise, setActiveVideoExercise] = useState<Exercise | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const loadedPrograms = getPrograms();
    setPrograms(loadedPrograms);
    const loadedLogs = getLogs();
    setLogs(loadedLogs);
  }, []);

  const refreshLogs = () => {
    setLogs(getLogs());
  };

  const currentProgram = programs.find((p) => p.id === selectedProgramId) || programs[0] || DEFAULT_PROGRAMS[0];

  const allCurrentMuscles = Array.from(
    new Set(currentProgram?.exercises.flatMap((e) => e.targetMuscles) || [])
  );

  const streak = calculateStreak(logs);

  const handleCreateProgram = (newProg: WorkoutProgram) => {
    const updated = addProgram(newProg);
    setPrograms(updated);
    setSelectedProgramId(newProg.id);
  };

  const getProgramIcon = (category: string) => {
    if (category.toLowerCase().includes('lombar') || category.toLowerCase().includes('postura')) return ShieldCheck;
    if (category.toLowerCase().includes('calistenia')) return Dumbbell;
    if (category.toLowerCase().includes('recuperação') || category.toLowerCase().includes('mobilidade')) return HeartPulse;
    if (category.toLowerCase().includes('hiit')) return Flame;
    return Activity;
  };

  if (isWorkoutActive && currentProgram) {
    return (
      <WorkoutPlayer
        program={currentProgram}
        onExit={() => setIsWorkoutActive(false)}
        onFinish={() => {
          setIsWorkoutActive(false);
          refreshLogs();
          setActiveTab('calendario');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white flex flex-col justify-between">
      <main className="w-full max-w-md mx-auto px-4 pt-5 pb-24 relative">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#d2fd39] fill-[#d2fd39]" />
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                CALISTHENICS & POSTURA PRO
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight mt-0.5 flex items-center gap-2">
              <span>Olá, Atleta!</span>
              <Zap className="w-5 h-5 text-[#d2fd39] fill-[#d2fd39]" />
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#1b1e27] border border-white/10 shadow-sm">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-xs font-black text-white">{streak}</span>
              <span className="text-[10px] text-gray-400 uppercase font-bold">dias</span>
            </div>

            {/* Add Workout Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-9 h-9 rounded-2xl bg-[#1b1e27] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#d2fd39]/50 transition"
              title="Criar novo treino"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Workout Selector Tabs / Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {programs.map((prog) => {
            const isSelected = prog.id === currentProgram?.id;
            const ProgIcon = getProgramIcon(prog.category);
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgramId(prog.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                  isSelected
                    ? 'bg-[#d2fd39] text-black border-[#d2fd39] shadow-md shadow-[#d2fd39]/20'
                    : 'bg-[#15171e] text-gray-400 border-white/5 hover:border-white/20'
                }`}
              >
                <ProgIcon className="w-3.5 h-3.5" />
                <span>{prog.title.split(':')[0]}</span>
              </button>
            );
          })}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-white/5 border border-dashed border-white/20 text-gray-400 hover:text-[#d2fd39] hover:border-[#d2fd39]/40 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Treino</span>
          </button>
        </div>

        {/* TAB 1: TREINO */}
        {activeTab === 'treinos' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Main Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1f14] via-[#15171e] to-[#0e1014] border border-[#d2fd39]/30 p-5 shadow-2xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#d2fd39]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-[#d2fd39]/15 border border-[#d2fd39]/30 text-[11px] font-bold text-[#d2fd39] uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>{currentProgram.level} • {currentProgram.category}</span>
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#d2fd39]" />
                  ~{currentProgram.estimatedTimeMinutes} min
                </span>
              </div>

              <h2 className="text-xl font-black text-white leading-tight">
                {currentProgram.title}
              </h2>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {currentProgram.description}
              </p>

              {/* Frequency Decision Highlight */}
              <div className="mt-4 p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">
                    Frequência & Duração Recomendada
                  </span>
                  <span className="text-xs font-bold text-white">
                    4 Semanas (28 dias) • 3x a 4x na semana
                  </span>
                </div>
                <span className="text-xs font-black text-[#d2fd39] bg-[#d2fd39]/10 px-2.5 py-1 rounded-lg border border-[#d2fd39]/20">
                  {logs.length}/28 dias
                </span>
              </div>

              {/* Start Workout Button - Cleanly Centered, No Right Arrow, Balanced Padding */}
              <button
                onClick={() => setIsWorkoutActive(true)}
                className="w-full mt-4 py-4 px-6 rounded-2xl bg-[#d2fd39] text-black font-black text-sm tracking-wide hover:bg-[#b6e026] shadow-lg shadow-[#d2fd39]/25 transition active:scale-95 flex items-center justify-center gap-2.5"
              >
                <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                <span>INICIAR TREINO AGORA</span>
              </button>
            </div>

            {/* Special Lumbar & Sitting Posture Accordion */}
            <div className="bg-[#15171e] border border-white/10 rounded-3xl p-4">
              <button
                onClick={() => setShowLumbarGuide(!showLumbarGuide)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Proteção Lombar para quem trabalha sentado
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Entenda por que a dor ocorre e as regras de segurança
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#d2fd39]">
                  {showLumbarGuide ? 'Ocultar' : 'Ver Guia'}
                </span>
              </button>

              {showLumbarGuide && (
                <div className="mt-3 pt-3 border-t border-white/5 space-y-3 text-xs text-gray-300 animate-fadeIn">
                  <p className="leading-relaxed">
                    💡 <strong>A Causa Oculta:</strong> Para quem passa muitas horas sentado, a dor na lombar geralmente não vem de fraqueza isolada nas costas, mas de <strong className="text-white">glúteos "adormecidos"</strong> e falta de estabilidade no abdômen profundo — o que faz a lombar trabalhar dobrado para sustentar o tronco.
                  </p>

                  <div className="p-3 rounded-2xl bg-[#1b1e27] border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-bold text-[#d2fd39] uppercase tracking-wider block">
                      📅 Cronograma de Evolução Recomendado:
                    </span>
                    <ul className="space-y-1 text-[11px] text-gray-300">
                      <li>• <strong>Primeiros 10 a 15 dias:</strong> Período de alívio inicial e ativação correta de glúteos e abdômen. Menos rigidez ao levantar da cadeira.</li>
                      <li>• <strong>1 mês (4 semanas):</strong> Tempo mínimo recomendado para consolidar a estabilidade articular e desenvolver resistência estrutural real.</li>
                      <li>• <strong>Depois de 1 mês:</strong> Manutenção permanente ou pausa ativa de 5 minutos diários no meio da tarde.</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-300 text-[11px]">Regra de Ouro da Segurança:</strong>
                      O exercício deve gerar sensação de trabalho muscular nos glúteos e abdômen, nunca pontada aguda ou formigamento na coluna. Se sentir dor aguda durante ou logo após, interrompa.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Exercises List Header */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[11px] font-bold text-[#d2fd39] uppercase tracking-wider">
                  Exercícios do Protocolo
                </span>
                <h3 className="text-base font-bold text-white">
                  {currentProgram.exercises.length} Exercícios Guiados
                </h3>
              </div>
              <span className="text-xs text-gray-400">
                Toque no vídeo para assistir
              </span>
            </div>

            {/* Exercise Cards */}
            <div className="space-y-3.5">
              {currentProgram.exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  onOpenVideo={(ex) => setActiveVideoExercise(ex)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: FREQUÊNCIA & CALENDÁRIO */}
        {activeTab === 'calendario' && (
          <CalendarView
            logs={logs}
            currentProgram={currentProgram}
            onStartTodayWorkout={() => setIsWorkoutActive(true)}
            onRefreshLogs={refreshLogs}
          />
        )}

        {/* TAB 3: MÚSCULOS & ANATOMIA */}
        {activeTab === 'musculos' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <span className="text-[11px] font-bold text-[#d2fd39] uppercase tracking-wider">
                Biomecânica & Anatomia
              </span>
              <h2 className="text-xl font-bold text-white">
                Músculos Trabalhados no Treino
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Visualização interativa das regiões corporais solicitadas pelos exercícios de calistenia e proteção lombar.
              </p>
            </div>

            {/* Interactive Anatomical SVG Diagram */}
            <MuscleMap activeMuscles={allCurrentMuscles as any} showLabels={true} />

            {/* Exercise to Muscle Breakdown */}
            <div className="bg-[#15171e] border border-white/10 rounded-3xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Recrutamento por Exercício:
              </h3>
              <div className="space-y-2 text-xs">
                {currentProgram.exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3 rounded-2xl bg-[#1b1e27] border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-white block">{ex.name}</span>
                      <span className="text-[11px] text-gray-400">
                        {ex.instructions[0].slice(0, 50)}...
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-[#d2fd39]">
                      {ex.targetMuscles.join(' + ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EVOLUÇÃO & ESTATÍSTICAS */}
        {activeTab === 'estatisticas' && (
          <StatsView
            logs={logs}
            currentProgram={currentProgram}
            onSwitchProgram={(id) => setSelectedProgramId(id)}
          />
        )}
      </main>

      {/* Video Modal */}
      <VideoModal
        exercise={activeVideoExercise}
        onClose={() => setActiveVideoExercise(null)}
      />

      {/* Create New Workout Modal */}
      {isCreateModalOpen && (
        <CreateWorkoutModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateProgram}
        />
      )}

      {/* Bottom Floating Navigation */}
      <BottomNav currentTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
};

export default App;
