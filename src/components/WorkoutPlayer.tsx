import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Check, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Video, 
  Minimize2, 
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Zap,
  Timer,
  Plus,
  Minus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise, WorkoutProgram } from '../types/workout';
import { sounds } from '../utils/audio';
import { getYouTubeEmbedUrl, saveLog } from '../utils/storage';

interface WorkoutPlayerProps {
  program: WorkoutProgram;
  onFinish: () => void;
  onExit: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  program,
  onFinish,
  onExit,
}) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timers
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [totalWorkoutSeconds, setTotalWorkoutSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  const totalTimerRef = useRef<number | null>(null);

  const currentExercise: Exercise = program.exercises[exerciseIndex];
  const totalExercises = program.exercises.length;
  const totalSets = currentExercise.defaultSets;

  // Track overall session time
  useEffect(() => {
    totalTimerRef.current = window.setInterval(() => {
      setTotalWorkoutSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, []);

  // Initialize timer for current step
  useEffect(() => {
    if (isResting) {
      setTimerSeconds(currentExercise.restSeconds || 45);
    } else {
      if (currentExercise.type === 'isometric') {
        setTimerSeconds(currentExercise.durationSeconds || 25);
      } else {
        setTimerSeconds(0);
      }
    }
  }, [exerciseIndex, currentSet, isResting, currentExercise]);

  // Main countdown / countup timer loop
  useEffect(() => {
    if (isPaused || isCompleted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      if (isResting) {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            handleRestCompleted();
            return 0;
          }
          if (soundEnabled && prev <= 4 && prev > 1) {
            sounds.playBeep(700, 0.1);
          }
          return prev - 1;
        });
      } else {
        if (currentExercise.type === 'isometric') {
          setTimerSeconds((prev) => {
            if (prev <= 1) {
              handleSetCompleted();
              return 0;
            }
            if (soundEnabled && prev <= 4 && prev > 1) {
              sounds.playBeep(650, 0.1);
            }
            return prev - 1;
          });
        } else {
          setTimerSeconds((prev) => prev + 1);
        }
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isResting, isPaused, soundEnabled, currentExercise.type, isCompleted]);

  const handleSetCompleted = () => {
    if (soundEnabled) sounds.playStartChime();

    if (currentSet < totalSets) {
      setIsResting(true);
    } else {
      if (exerciseIndex + 1 < totalExercises) {
        setIsResting(true);
      } else {
        handleWorkoutFinished();
      }
    }
  };

  const handleRestCompleted = () => {
    if (soundEnabled) sounds.playStartChime();
    setIsResting(false);

    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
    } else {
      if (exerciseIndex + 1 < totalExercises) {
        setExerciseIndex((prev) => prev + 1);
        setCurrentSet(1);
      } else {
        handleWorkoutFinished();
      }
    }
  };

  const handleSkip = () => {
    if (isResting) {
      handleRestCompleted();
    } else {
      handleSetCompleted();
    }
  };

  const handleWorkoutFinished = () => {
    setIsCompleted(true);
    if (soundEnabled) sounds.playCompletionFanfare();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d2fd39', '#ffffff', '#22c55e']
      });
    } catch {}

    const today = new Date().toISOString().split('T')[0];
    saveLog({
      id: 'log_' + Date.now(),
      date: today,
      timestamp: Date.now(),
      workoutId: program.id,
      workoutTitle: program.title,
      durationMinutes: Math.max(1, Math.round(totalWorkoutSeconds / 60)),
      completedExercisesCount: totalExercises,
      totalExercisesCount: totalExercises,
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m > 0 ? m + ':' : ''}${s < 10 && m > 0 ? '0' : ''}${s}`;
  };

  const addRestTime = (seconds: number) => {
    setTimerSeconds((prev) => Math.max(5, prev + seconds));
  };

  // Completed Celebration Screen
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#0d0e12] flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-[#d2fd39]/10 border border-[#d2fd39] flex items-center justify-center mb-6 shadow-lg shadow-[#d2fd39]/20 animate-bounce">
          <Sparkles className="w-10 h-10 text-[#d2fd39]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#d2fd39] mb-2 flex items-center justify-center gap-1.5">
          <Zap className="w-4 h-4 fill-[#d2fd39]" />
          Treino Concluído com Sucesso!
        </span>
        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center justify-center gap-2">
          <span>Excelente Trabalho!</span>
          <Zap className="w-7 h-7 text-[#d2fd39] fill-[#d2fd39]" />
        </h1>
        <p className="text-gray-400 text-sm max-w-sm mb-8">
          Você completou todas as séries do treino de hoje e deu mais um passo importante no seu ciclo de adaptação de 4 semanas.
        </p>

        {/* Workout Summary Cards */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-8">
          <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4">
            <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <Timer className="w-3.5 h-3.5 text-blue-400" />
              Tempo Total
            </span>
            <div className="text-xl font-bold text-white mt-1">
              {Math.max(1, Math.round(totalWorkoutSeconds / 60))} min
            </div>
          </div>
          <div className="bg-[#15171e] border border-white/10 rounded-2xl p-4">
            <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#d2fd39] stroke-[3]" />
              Exercícios
            </span>
            <div className="text-xl font-bold text-[#d2fd39] mt-1">
              {totalExercises} / {totalExercises}
            </div>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full max-w-xs py-4 rounded-2xl bg-[#d2fd39] text-black font-extrabold text-base hover:bg-[#b6e026] shadow-lg shadow-[#d2fd39]/25 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Ver Calendário & Frequência</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white flex flex-col justify-between max-w-md mx-auto relative select-none">
      {/* Top Header & Progress Bars */}
      <div className="pt-4 px-5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onExit}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {isResting ? 'RECUPERAÇÃO / DESCANSO' : `EXERCÍCIO ${exerciseIndex + 1} DE ${totalExercises}`}
            </span>
            <span className="text-xs font-semibold text-[#d2fd39] flex items-center justify-center gap-1 mt-0.5">
              <Timer className="w-3.5 h-3.5" />
              Tempo: {formatTime(totalWorkoutSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
              title={soundEnabled ? 'Silenciar bipes' : 'Ativar bipes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#d2fd39]" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowVideo(!showVideo)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                showVideo ? 'bg-[#d2fd39] text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
              title="Alternar vídeo do YouTube"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar Indicators */}
        <div className="flex gap-1.5 mb-2">
          {program.exercises.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                i < exerciseIndex
                  ? 'bg-[#d2fd39]'
                  : i === exerciseIndex
                  ? isResting ? 'bg-[#d2fd39]/60 animate-pulse' : 'bg-[#d2fd39]'
                  : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area: Video or Poster Style Focus */}
      <div className="flex-1 flex flex-col justify-center px-5 py-2">
        {showVideo ? (
          <div className="w-full bg-[#15171e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-4">
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                src={getYouTubeEmbedUrl(currentExercise.youtubeId || currentExercise.videoUrl)}
                title={currentExercise.name}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-3 bg-[#1b1e27] flex items-center justify-between text-xs text-gray-300">
              <span className="font-semibold">{currentExercise.name}</span>
              <button
                onClick={() => setShowVideo(false)}
                className="text-[#d2fd39] font-medium flex items-center gap-1 hover:underline"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                Voltar ao Timer
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center my-auto">
            {isResting ? (
              <div className="flex flex-col items-center animate-fadeIn">
                <span className="px-3 py-1 rounded-full bg-[#d2fd39]/10 border border-[#d2fd39]/30 text-[#d2fd39] text-xs font-bold uppercase tracking-wider mb-3">
                  Respire & Descanse
                </span>
                <div className="text-8xl font-black text-[#d2fd39] tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(210,253,57,0.3)]">
                  {timerSeconds}
                </div>
                <span className="text-xs text-gray-400 mt-2 font-medium">segundos restantes</span>

                {/* Rest Adjusters */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addRestTime(-10)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/10 flex items-center gap-1"
                  >
                    <Minus className="w-3 h-3" />
                    <span>10s</span>
                  </button>
                  <button
                    onClick={() => addRestTime(15)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-[#d2fd39] hover:bg-white/10 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>15s</span>
                  </button>
                </div>

                {/* Next Up Preview */}
                <div className="mt-6 bg-[#15171e] border border-white/5 rounded-2xl p-3 w-72 text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    A seguir:
                  </span>
                  <div className="text-sm font-bold text-white flex items-center justify-between mt-0.5">
                    <span>{currentSet < totalSets ? `${currentExercise.name} (Série ${currentSet + 1})` : program.exercises[exerciseIndex + 1]?.name || 'Finalizar!'}</span>
                    <span className="text-xs text-[#d2fd39] font-medium">
                      {currentSet < totalSets ? currentExercise.repsOrDuration : ''}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-fadeIn w-full">
                {/* Set Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300">
                    Série {currentSet} de {totalSets}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#d2fd39]/15 border border-[#d2fd39]/40 text-[#d2fd39] text-xs font-bold">
                    {currentExercise.repsOrDuration}
                  </span>
                </div>

                {/* Big Number / Timer */}
                <div className="relative my-2">
                  <div className="text-8xl font-black text-white tracking-tighter tabular-nums drop-shadow-md">
                    {currentExercise.type === 'isometric' ? timerSeconds : timerSeconds}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block text-center font-bold">
                    {currentExercise.type === 'isometric' ? 'segundos de isometria' : 'tempo na série (seg)'}
                  </span>
                </div>

                {/* Exercise Title */}
                <h2 className="text-2xl font-black text-white mt-4 flex items-center justify-center gap-2 text-center">
                  {currentExercise.name}
                </h2>
                {currentExercise.alias && (
                  <span className="text-xs text-gray-400 font-medium">
                    {currentExercise.alias}
                  </span>
                )}

                {/* Direct Key Instruction Cue */}
                <div className="mt-4 bg-[#15171e] border border-white/10 rounded-2xl p-4 w-full text-left">
                  <div className="text-xs font-bold text-[#d2fd39] uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Foco de Execução:</span>
                    <button
                      onClick={() => setShowVideo(true)}
                      className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 underline"
                    >
                      Ver vídeo
                    </button>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {currentExercise.instructions[0]}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Floating Control Buttons */}
      <div className="p-5 pb-8 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12] to-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1 py-4 rounded-2xl bg-[#1b1e27] border border-white/10 text-white font-bold text-sm hover:bg-[#232733] transition flex items-center justify-center gap-2 active:scale-95"
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Continuar</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausar</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            className="flex-[2] py-4 rounded-2xl bg-[#d2fd39] text-black font-extrabold text-sm hover:bg-[#b6e026] shadow-lg shadow-[#d2fd39]/20 transition flex items-center justify-center gap-2 active:scale-95"
          >
            {isResting ? (
              <>
                <SkipForward className="w-4 h-4" />
                <span>Pular Descanso</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>
                  {currentSet === totalSets && exerciseIndex + 1 === totalExercises
                    ? 'Finalizar Treino'
                    : 'Concluir Série'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
