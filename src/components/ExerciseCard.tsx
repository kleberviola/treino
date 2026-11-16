import React, { useState } from 'react';
import { Play, ChevronDown, ChevronUp, Lightbulb, Timer, Repeat, Video } from 'lucide-react';
import { Exercise } from '../types/workout';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  onOpenVideo: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  onOpenVideo,
}) => {
  const [expanded, setExpanded] = useState(false);

  // YouTube high quality thumbnail
  const thumbUrl = exercise.youtubeId
    ? `https://img.youtube.com/vi/${exercise.youtubeId}/hqdefault.jpg`
    : null;

  return (
    <div className="bg-[#15171e] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all shadow-md group">
      {/* Thumbnail with Play Overlay */}
      {thumbUrl && (
        <div 
          className="relative w-full h-40 bg-black cursor-pointer overflow-hidden"
          onClick={() => onOpenVideo(exercise)}
        >
          <img
            src={thumbUrl}
            alt={exercise.name}
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-black/30" />
          
          {/* Play Badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#d2fd39]/90 text-black flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-110 transition">
              <Play className="w-5 h-5 fill-black ml-0.5" />
            </div>
          </div>

          {/* Exercise Index Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d2fd39]" />
            Exercício {index + 1}
          </div>

          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] text-gray-300 font-semibold flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-[#d2fd39]" />
            <span>Assistir Vídeo</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{exercise.name}</span>
            </h3>
            {exercise.alias && (
              <span className="text-xs text-gray-400 block mt-0.5">
                {exercise.alias}
              </span>
            )}
          </div>

          {/* Sets & Reps Pill */}
          <div className="text-right shrink-0">
            <span className="px-2.5 py-1 rounded-xl bg-[#d2fd39]/15 border border-[#d2fd39]/30 text-xs font-extrabold text-[#d2fd39] flex items-center gap-1 justify-end">
              <Repeat className="w-3 h-3" />
              <span>{exercise.defaultSets} × {exercise.repsOrDuration}</span>
            </span>
            <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 justify-end">
              <Timer className="w-3 h-3" />
              <span>Descanso: {exercise.restSeconds}s</span>
            </span>
          </div>
        </div>

        {/* Target Muscles Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {exercise.targetMuscles.map((muscle) => (
            <span
              key={muscle}
              className="px-2 py-0.5 rounded-lg bg-[#1b1e27] border border-white/5 text-[10px] font-semibold text-gray-300 uppercase tracking-wider"
            >
              {muscle === 'chest' && 'Peito'}
              {muscle === 'triceps' && 'Tríceps'}
              {muscle === 'shoulders' && 'Ombros'}
              {muscle === 'core' && 'Core / Abdômen'}
              {muscle === 'legs' && 'Pernas / Quadríceps'}
              {muscle === 'glutes' && 'Glúteos'}
              {muscle === 'back' && 'Costas'}
              {muscle === 'biceps' && 'Bíceps'}
              {muscle === 'cardio' && 'Cardio'}
            </span>
          ))}
        </div>

        {/* Expand Instructions Button */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => onOpenVideo(exercise)}
            className="text-xs font-semibold text-[#d2fd39] hover:text-[#b6e026] flex items-center gap-1.5 transition"
          >
            <Play className="w-3.5 h-3.5 fill-[#d2fd39]" />
            <span>Vídeo & Execução</span>
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition"
          >
            <span>{expanded ? 'Menos detalhes' : 'Como fazer'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Instructions */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/5 space-y-2 animate-fadeIn text-xs text-gray-300">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
              Instruções de Execução:
            </h4>
            <ul className="space-y-1.5 pl-1">
              {exercise.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#d2fd39] font-bold mt-0.5">•</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>

            {exercise.executionTips && exercise.executionTips.length > 0 && (
              <div className="mt-2.5 p-3 rounded-2xl bg-[#1b1e27] border border-white/5 text-[11px] text-gray-300 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-[#d2fd39] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#d2fd39] block mb-0.5">
                    Dica do Treinador:
                  </span>
                  <span>{exercise.executionTips[0]}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
