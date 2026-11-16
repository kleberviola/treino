import React, { useState } from 'react';
import { Check, Activity, Shield, Dumbbell, Footprints } from 'lucide-react';
import { MuscleGroup } from '../types/workout';

interface MuscleMapProps {
  activeMuscles: MuscleGroup[];
  interactive?: boolean;
  onToggleMuscle?: (muscle: MuscleGroup) => void;
  className?: string;
  showLabels?: boolean;
}

export const MuscleMap: React.FC<MuscleMapProps> = ({
  activeMuscles,
  interactive = false,
  onToggleMuscle,
  className = '',
  showLabels = true,
}) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const isActive = (muscle: MuscleGroup) => activeMuscles.includes(muscle);

  const getMuscleColor = (muscle: MuscleGroup) => {
    return isActive(muscle) ? '#d2fd39' : '#2b303c';
  };

  const getGlowFilter = (muscle: MuscleGroup) => {
    return isActive(muscle) ? 'drop-shadow(0px 0px 6px rgba(210,253,57,0.7))' : 'none';
  };

  const muscleList: { id: MuscleGroup; label: string; side: 'both' | 'front' | 'back'; icon: React.ElementType }[] = [
    { id: 'chest', label: 'Peitoral', side: 'front', icon: Dumbbell },
    { id: 'shoulders', label: 'Ombros (Deltoides)', side: 'both', icon: Activity },
    { id: 'triceps', label: 'Tríceps', side: 'both', icon: Dumbbell },
    { id: 'biceps', label: 'Bíceps', side: 'front', icon: Dumbbell },
    { id: 'core', label: 'Core / Abdômen', side: 'front', icon: Shield },
    { id: 'legs', label: 'Pernas / Quadríceps', side: 'both', icon: Footprints },
    { id: 'glutes', label: 'Glúteos / Posterior', side: 'back', icon: Footprints },
    { id: 'back', label: 'Costas / Dorsal', side: 'back', icon: Activity },
  ];

  return (
    <div className={`flex flex-col items-center bg-[#15171e] border border-white/10 rounded-2xl p-5 ${className}`}>
      {/* Front / Back Toggle Buttons */}
      <div className="flex items-center gap-2 mb-4 bg-[#1f232d] p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setView('front')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            view === 'front'
              ? 'bg-[#d2fd39] text-black shadow-md shadow-[#d2fd39]/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Frente (Anterior)
        </button>
        <button
          type="button"
          onClick={() => setView('back')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            view === 'back'
              ? 'bg-[#d2fd39] text-black shadow-md shadow-[#d2fd39]/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Costas (Posterior)
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6">
        {/* Anatomical Silhouette SVG */}
        <div className="relative w-44 h-72 flex items-center justify-center">
          <svg
            viewBox="0 0 200 340"
            className="w-full h-full filter drop-shadow-lg transition-all duration-300"
          >
            <defs>
              <linearGradient id="bodyBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e222a" />
                <stop offset="100%" stopColor="#14171d" />
              </linearGradient>
            </defs>

            {/* Base Body Silhouette Lines */}
            <g stroke="#3a404f" strokeWidth="1.5" fill="none" opacity="0.6">
              <circle cx="100" cy="30" r="18" fill="#1b1e26" />
              <path d="M92 48 L92 58 M108 48 L108 58" />
            </g>

            {view === 'front' ? (
              <g className="transition-all duration-300">
                <path d="M94 48 L106 48 L104 60 L96 60 Z" fill="#2b303c" />

                {/* Shoulders */}
                <path
                  d="M62 65 C55 68 50 82 56 94 C62 90 68 85 72 75 Z"
                  fill={getMuscleColor('shoulders')}
                  style={{ filter: getGlowFilter('shoulders') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('shoulders')}
                />
                <path
                  d="M138 65 C145 68 150 82 144 94 C138 90 132 85 128 75 Z"
                  fill={getMuscleColor('shoulders')}
                  style={{ filter: getGlowFilter('shoulders') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('shoulders')}
                />

                {/* Chest */}
                <path
                  d="M74 65 L98 67 L98 94 C88 94 72 88 70 76 Z"
                  fill={getMuscleColor('chest')}
                  style={{ filter: getGlowFilter('chest') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('chest')}
                />
                <path
                  d="M126 65 L102 67 L102 94 C112 94 128 88 130 76 Z"
                  fill={getMuscleColor('chest')}
                  style={{ filter: getGlowFilter('chest') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('chest')}
                />

                {/* Biceps */}
                <path
                  d="M54 96 C48 108 50 120 56 128 C60 122 62 110 60 98 Z"
                  fill={getMuscleColor('biceps')}
                  style={{ filter: getGlowFilter('biceps') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('biceps')}
                />
                <path
                  d="M146 96 C152 108 150 120 144 128 C140 122 138 110 140 98 Z"
                  fill={getMuscleColor('biceps')}
                  style={{ filter: getGlowFilter('biceps') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('biceps')}
                />

                {/* Forearms */}
                <path d="M52 132 L44 165 L52 165 L60 132 Z" fill="#2b303c" />
                <path d="M148 132 L156 165 L148 165 L140 132 Z" fill="#2b303c" />

                {/* Core / Abdômen */}
                <g
                  className="cursor-pointer transition-colors duration-300"
                  onClick={() => interactive && onToggleMuscle?.('core')}
                >
                  <rect
                    x="86"
                    y="100"
                    width="12"
                    height="12"
                    rx="3"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                  <rect
                    x="102"
                    y="100"
                    width="12"
                    height="12"
                    rx="3"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                  <rect
                    x="86"
                    y="116"
                    width="12"
                    height="12"
                    rx="3"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                  <rect
                    x="102"
                    y="116"
                    width="12"
                    height="12"
                    rx="3"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                  <rect
                    x="86"
                    y="132"
                    width="12"
                    height="14"
                    rx="3"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                  <rect
                    x="102"
                    y="132"
                    width="12"
                    height="14"
                    rx="3"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                  <path
                    d="M72 102 C74 125 78 142 84 148 L84 100 Z"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                  <path
                    d="M128 102 C126 125 122 142 116 148 L116 100 Z"
                    fill={getMuscleColor('core')}
                    style={{ filter: getGlowFilter('core') }}
                  />
                </g>

                <polygon points="84,152 116,152 100,172" fill="#20242e" />

                {/* Quadríceps (Legs) */}
                <path
                  d="M76 170 C72 195 72 230 78 245 C86 245 92 225 94 175 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('legs')}
                />
                <path
                  d="M124 170 C128 195 128 230 122 245 C114 245 108 225 106 175 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('legs')}
                />

                <circle cx="82" cy="254" r="5" fill="#20242e" />
                <circle cx="118" cy="254" r="5" fill="#20242e" />

                <path
                  d="M78 262 C74 280 76 305 80 320 L86 320 C88 305 88 280 86 262 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                />
                <path
                  d="M122 262 C126 280 124 305 120 320 L114 320 C112 305 112 280 114 262 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                />
              </g>
            ) : (
              <g className="transition-all duration-300">
                {/* Upper Back */}
                <path
                  d="M80 60 L100 70 L120 60 L110 88 L90 88 Z"
                  fill={getMuscleColor('back')}
                  style={{ filter: getGlowFilter('back') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('back')}
                />

                {/* Rear Deltoids */}
                <path
                  d="M62 65 C55 68 50 82 56 94 C62 90 68 85 72 75 Z"
                  fill={getMuscleColor('shoulders')}
                  style={{ filter: getGlowFilter('shoulders') }}
                  className="transition-colors duration-300"
                />
                <path
                  d="M138 65 C145 68 150 82 144 94 C138 90 132 85 128 75 Z"
                  fill={getMuscleColor('shoulders')}
                  style={{ filter: getGlowFilter('shoulders') }}
                  className="transition-colors duration-300"
                />

                {/* Triceps */}
                <path
                  d="M54 96 C48 108 50 120 56 128 C60 122 62 110 60 98 Z"
                  fill={getMuscleColor('triceps')}
                  style={{ filter: getGlowFilter('triceps') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('triceps')}
                />
                <path
                  d="M146 96 C152 108 150 120 144 128 C140 122 138 110 140 98 Z"
                  fill={getMuscleColor('triceps')}
                  style={{ filter: getGlowFilter('triceps') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('triceps')}
                />

                {/* Dorsal Back */}
                <path
                  d="M72 85 C75 110 80 135 88 145 L88 88 Z"
                  fill={getMuscleColor('back')}
                  style={{ filter: getGlowFilter('back') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('back')}
                />
                <path
                  d="M128 85 C125 110 120 135 112 145 L112 88 Z"
                  fill={getMuscleColor('back')}
                  style={{ filter: getGlowFilter('back') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('back')}
                />

                <rect x="92" y="125" width="16" height="24" rx="2" fill="#252a36" />

                {/* Glúteos */}
                <path
                  d="M76 154 C72 170 74 195 90 195 C98 195 98 175 98 154 Z"
                  fill={getMuscleColor('glutes')}
                  style={{ filter: getGlowFilter('glutes') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('glutes')}
                />
                <path
                  d="M124 154 C128 170 126 195 110 195 C102 195 102 175 102 154 Z"
                  fill={getMuscleColor('glutes')}
                  style={{ filter: getGlowFilter('glutes') }}
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => interactive && onToggleMuscle?.('glutes')}
                />

                {/* Posterior */}
                <path
                  d="M76 200 C72 215 74 240 80 248 C88 248 94 235 96 200 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                  className="transition-colors duration-300"
                />
                <path
                  d="M124 200 C128 215 126 240 120 248 C112 248 106 235 104 200 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                  className="transition-colors duration-300"
                />

                {/* Calves */}
                <path
                  d="M76 260 C70 280 74 305 80 320 L86 320 C90 305 92 280 88 260 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                />
                <path
                  d="M124 260 C130 280 126 305 120 320 L114 320 C110 305 108 280 112 260 Z"
                  fill={getMuscleColor('legs')}
                  style={{ filter: getGlowFilter('legs') }}
                />
              </g>
            )}
          </svg>
        </div>

        {/* Muscle Checklist with Lucide Icons */}
        {showLabels && (
          <div className="flex-1 w-full flex flex-col gap-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Músculos Trabalhados</span>
              <span className="text-[#d2fd39] text-xs font-bold">
                {activeMuscles.length} ativados
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {muscleList.map((m) => {
                const active = isActive(m.id);
                const ItemIcon = m.icon;
                return (
                  <div
                    key={m.id}
                    onClick={() => interactive && onToggleMuscle?.(m.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                      active
                        ? 'border-[#d2fd39] bg-[#d2fd39]/10 text-[#d2fd39] shadow-sm shadow-[#d2fd39]/10'
                        : 'border-white/5 bg-[#1b1e27] text-gray-400'
                    } ${interactive ? 'cursor-pointer hover:border-white/30' : ''}`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        active ? 'bg-[#d2fd39] text-black' : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {active ? (
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      ) : (
                        <ItemIcon className="w-2.5 h-2.5 opacity-60" />
                      )}
                    </span>
                    <span className="truncate">{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
