import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Flame, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  PlusCircle,
  HelpCircle,
  Check,
  Moon,
  Lightbulb,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { WorkoutSessionLog, WorkoutProgram } from '../types/workout';
import { calculateStreak, saveLog } from '../utils/storage';

interface CalendarViewProps {
  logs: WorkoutSessionLog[];
  currentProgram: WorkoutProgram;
  onStartTodayWorkout: () => void;
  onRefreshLogs: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  logs,
  currentProgram,
  onStartTodayWorkout,
  onRefreshLogs,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const streak = calculateStreak(logs);
  const totalMinutes = logs.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const totalWorkouts = logs.length;

  const todayStr = new Date().toISOString().split('T')[0];
  const trainedToday = logs.some((l) => l.date === todayStr);

  // Manual mark day
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [isMarkingModalOpen, setIsMarkingModalOpen] = useState(false);

  const handleManualLog = () => {
    saveLog({
      id: 'manual_' + Date.now(),
      date: selectedDate,
      timestamp: new Date(selectedDate).getTime(),
      workoutId: currentProgram.id,
      workoutTitle: currentProgram.title,
      durationMinutes: currentProgram.estimatedTimeMinutes,
      completedExercisesCount: currentProgram.exercises.length,
      totalExercisesCount: currentProgram.exercises.length,
      notes: 'Marcado manualmente',
    });
    setIsMarkingModalOpen(false);
    onRefreshLogs();
  };

  // Generate 28 Days for the 4-week cycle
  const cycleDays = Array.from({ length: 28 }, (_, i) => i + 1);

  // Check which days in the 28-day cycle are training days (e.g. 3x/week = days 1, 3, 5, 8, 10, 12, etc.)
  const isPlannedWorkoutDay = (dayNum: number) => {
    const dayOfWeekInCycle = (dayNum - 1) % 7; // 0..6
    return dayOfWeekInCycle === 0 || dayOfWeekInCycle === 2 || dayOfWeekInCycle === 4;
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Period Recommendation Banner */}
      <div className="bg-gradient-to-br from-[#1b2210] to-[#15171e] border border-[#d2fd39]/30 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#d2fd39]/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#d2fd39] text-black font-extrabold text-xs flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-black" />
              RECOMENDAÇÃO
            </span>
            <span className="text-xs font-semibold text-gray-300">
              Ciclo de 4 Semanas (28 Dias)
            </span>
          </div>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-gray-400 hover:text-[#d2fd39] text-xs flex items-center gap-1 transition"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Por que 4 semanas?</span>
          </button>
        </div>

        <h2 className="text-lg font-bold text-white mt-3">
          Frequência Ideal: 3 a 4x na Semana
        </h2>
        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
          Para este treino de calistenia para iniciantes, o período ideal é de <strong className="text-white">4 semanas (1 mês)</strong>, 
          treinando em dias alternados (ex: <em>Segunda, Quarta e Sexta</em> ou <em>Terça, Quinta e Sábado</em>).
        </p>

        {showExplanation && (
          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400 space-y-2.5 animate-fadeIn">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Base Fisiológica:</strong>
                O corpo leva entre 21 a 30 dias para promover a <em>adaptação neuromuscular</em> inicial. Nesse tempo, o cérebro aprende a recrutar mais fibras musculares e os tendões e articulações se fortalecem com o peso corporal.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Descanso entre treinos:</strong>
                As 48h de intervalo entre as sessões de força são vitais para recuperar a musculatura, reparar microlesões e evitar sobrecarga na lombar e ombros.
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${trainedToday ? 'bg-[#d2fd39] animate-ping' : 'bg-orange-500'}`} />
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              {trainedToday ? (
                <>
                  <span>Treino de hoje concluído!</span>
                  <Zap className="w-3.5 h-3.5 text-[#d2fd39] fill-[#d2fd39]" />
                </>
              ) : (
                'Hoje é dia de treinar!'
              )}
            </span>
          </div>

          {!trainedToday && (
            <button
              onClick={onStartTodayWorkout}
              className="px-4 py-2 rounded-xl bg-[#d2fd39] text-black font-bold text-xs hover:bg-[#b6e026] shadow-md shadow-[#d2fd39]/20 transition active:scale-95 flex items-center gap-1"
            >
              <span>Iniciar Hoje</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-semibold uppercase">Sequência</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{streak}</div>
            <span className="text-[10px] text-gray-400">dias seguidos</span>
          </div>
        </div>

        <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-semibold uppercase">Treinos</span>
            <Trophy className="w-4 h-4 text-[#d2fd39]" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-[#d2fd39]">{totalWorkouts}</div>
            <span className="text-[10px] text-gray-400">concluídos</span>
          </div>
        </div>

        <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-semibold uppercase">Tempo</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{totalMinutes}</div>
            <span className="text-[10px] text-gray-400">minutos totais</span>
          </div>
        </div>
      </div>

      {/* 28-Day Cycle Roadmap */}
      <div className="bg-[#15171e] border border-white/10 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold text-[#d2fd39] uppercase tracking-wider">
              Programa de 4 Semanas
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              Progresso do Ciclo (1 a 28)
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
            {Math.min(totalWorkouts, 28)} de 28
          </span>
        </div>

        {/* 28 Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {cycleDays.map((day) => {
            const isCompleted = day <= totalWorkouts;
            const isNext = day === totalWorkouts + 1;
            const isRest = !isPlannedWorkoutDay(day);

            return (
              <div
                key={day}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all ${
                  isCompleted
                    ? 'bg-[#d2fd39]/15 border-[#d2fd39] text-[#d2fd39] shadow-sm shadow-[#d2fd39]/20'
                    : isNext
                    ? 'bg-white/10 border-white/40 text-white ring-2 ring-[#d2fd39]/40 animate-pulse'
                    : isRest
                    ? 'bg-[#1b1e27]/50 border-white/5 text-gray-500'
                    : 'bg-[#1b1e27] border-white/5 text-gray-400'
                }`}
              >
                <span className="text-[9px] uppercase font-bold tracking-tighter opacity-70">
                  D{day}
                </span>
                <span className="text-sm font-black mt-0.5 flex items-center justify-center h-5">
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isRest ? (
                    <Moon className="w-3.5 h-3.5 text-gray-500" />
                  ) : (
                    day
                  )}
                </span>
                <span className="text-[8px] opacity-60">
                  {isRest ? 'Recup.' : 'Força'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d2fd39]" />
            <span>Feito</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 ring-1 ring-[#d2fd39]" />
            <span>Próximo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span>Descanso</span>
          </div>
        </div>
      </div>

      {/* Histórico Recente de Treinos */}
      <div className="bg-[#15171e] border border-white/10 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#d2fd39]" />
            Histórico de Treinos
          </h3>
          <button
            onClick={() => setIsMarkingModalOpen(true)}
            className="text-xs text-[#d2fd39] hover:underline flex items-center gap-1 font-semibold"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Marcar data
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-xs">
            Nenhum treino registrado ainda. Inicie o treino de hoje para ver seu progresso aqui!
          </div>
        ) : (
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#1b1e27] border border-white/5"
              >
                <div>
                  <div className="text-xs font-bold text-white">{log.workoutTitle}</div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3 text-[#d2fd39]" />
                      {new Date(log.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      {log.durationMinutes} min
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#d2fd39] bg-[#d2fd39]/10 px-2.5 py-1 rounded-full border border-[#d2fd39]/20">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Concluído</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Mark Date Modal */}
      {isMarkingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#15171e] border border-white/10 rounded-3xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-base font-bold text-white">Marcar Treino Manualmente</h3>
            <p className="text-xs text-gray-400">
              Fez o treino sem o app? Escolha a data para salvar no seu histórico e não perder a sequência:
            </p>
            <div>
              <label className="text-xs text-gray-300 block mb-1">Data:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#1b1e27] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d2fd39]"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsMarkingModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold hover:bg-white/10"
              >
                Cancelar
              </button>
              <button
                onClick={handleManualLog}
                className="flex-1 py-2.5 rounded-xl bg-[#d2fd39] text-black text-xs font-bold hover:bg-[#b6e026]"
              >
                Salvar Treino
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
