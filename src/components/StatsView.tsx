import React from 'react';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WorkoutSessionLog, WorkoutProgram } from '../types/workout';
import { calculateStreak } from '../utils/storage';

interface StatsViewProps {
  logs: WorkoutSessionLog[];
  currentProgram: WorkoutProgram;
  onSwitchProgram: (programId: string) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  logs,
  currentProgram,
  onSwitchProgram,
}) => {
  const streak = calculateStreak(logs);
  const totalMinutes = logs.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const totalWorkouts = logs.length;

  // Level progression calculation
  const getLevel = (count: number) => {
    if (count < 4) return { title: 'Fase de Adaptação (Semana 1)', badge: 'Bronze', color: '#cd7f32', progress: (count / 4) * 100 };
    if (count < 8) return { title: 'Consolidação Neural (Semana 2)', badge: 'Prata', color: '#c0c0c0', progress: ((count - 4) / 4) * 100 };
    if (count < 12) return { title: 'Hipertrofia Funcional (Semana 3)', badge: 'Ouro', color: '#ffd700', progress: ((count - 8) / 4) * 100 };
    return { title: 'Pronto para Fase 2 (Mestre)', badge: 'Diamante', color: '#d2fd39', progress: 100 };
  };

  const levelInfo = getLevel(totalWorkouts);

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Header Level Card (Inspirado na Imagem 4) */}
      <div className="bg-gradient-to-br from-[#1a1e28] to-[#12141a] border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Seu Nível Atual
          </span>
          <span 
            className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm"
            style={{ 
              borderColor: levelInfo.color, 
              color: levelInfo.color,
              backgroundColor: `${levelInfo.color}15`
            }}
          >
            {levelInfo.badge}
          </span>
        </div>

        <h2 className="text-xl font-black text-white mt-1">
          {levelInfo.title}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {totalWorkouts} de 12 a 16 treinos recomendados no ciclo de 28 dias.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-[#d2fd39] transition-all duration-500 rounded-full shadow-[0_0_10px_#d2fd39]"
            style={{ width: `${Math.min(100, Math.max(8, (totalWorkouts / 12) * 100))}%` }}
          />
        </div>
      </div>

      {/* Stats Metric Cards (Inspirado nas Imagens 1 e 4) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
            <Trophy className="w-4 h-4 text-[#d2fd39]" />
            <span>Treinos Feitos</span>
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {totalWorkouts}
          </div>
          <span className="text-[10px] text-gray-400">sessões finalizadas</span>
        </div>

        <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Tempo Ativo</span>
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {totalMinutes}
          </div>
          <span className="text-[10px] text-gray-400">minutos de exercício</span>
        </div>

        <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>Sequência Atual</span>
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {streak} <span className="text-sm font-normal text-gray-400">dias</span>
          </div>
          <span className="text-[10px] text-gray-400">foco mantido</span>
        </div>

        <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Adaptação</span>
          </div>
          <div className="text-2xl font-black text-[#d2fd39] mt-2">
            {Math.min(100, Math.round((totalWorkouts / 12) * 100))}%
          </div>
          <span className="text-[10px] text-gray-400">do ciclo completo</span>
        </div>
      </div>

      {/* Guia de Evolução após 4 Semanas */}
      <div className="bg-[#15171e] border border-white/10 rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d2fd39]" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            O que fazer após os 28 dias?
          </h3>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          Ao atingir de 12 a 16 treinos neste primeiro mês, seu sistema neuromuscular terá desenvolvido a força-base e a estabilidade necessária. Você poderá:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-2xl bg-[#1b1e27] border border-white/5 flex items-start gap-2.5">
            <span className="text-[#d2fd39] font-bold mt-0.5">1.</span>
            <div>
              <strong className="text-white block">Evoluir para Flexão no Chão:</strong>
              <span className="text-gray-400">Conforme a flexão inclinada ficar leve (conseguir 12 reps com facilidade), diminua a inclinação até o chão.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#1b1e27] border border-white/5 flex items-start gap-2.5">
            <span className="text-[#d2fd39] font-bold mt-0.5">2.</span>
            <div>
              <strong className="text-white block">Avançar na Canoinha (Hollow):</strong>
              <span className="text-gray-400">Estenda uma perna de cada vez mantendo a lombar colada no chão, aumentando o tempo sob tensão para 30 a 40 segundos.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#1b1e27] border border-white/5 flex items-start gap-2.5">
            <span className="text-[#d2fd39] font-bold mt-0.5">3.</span>
            <div>
              <strong className="text-white block">Desbloquear Programa Fase 2:</strong>
              <span className="text-gray-400">Acessar treinos com maior volume, repetições e variações no app.</span>
            </div>
          </div>
        </div>

        {totalWorkouts >= 12 && (
          <button
            onClick={() => onSwitchProgram('calistenia-fase-2')}
            className="w-full mt-2 py-3 rounded-xl bg-[#d2fd39] text-black font-bold text-xs hover:bg-[#b6e026] flex items-center justify-center gap-2"
          >
            <span>Desbloquear Fase 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
