import React, { useState } from 'react';
import { X, Plus, Trash2, Dumbbell, Link, Check, Sparkles } from 'lucide-react';
import { WorkoutProgram, Exercise, MuscleGroup } from '../types/workout';

interface CreateWorkoutModalProps {
  onClose: () => void;
  onSave: (program: WorkoutProgram) => void;
}

export const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Calistenia');
  const [level, setLevel] = useState<'Iniciante' | 'Intermediário' | 'Avançado'>('Iniciante');
  const [estimatedMinutes, setEstimatedMinutes] = useState(20);
  const [description, setDescription] = useState('');

  const [exercises, setExercises] = useState<Array<Partial<Exercise>>>([
    {
      id: 'ex_1',
      name: '',
      alias: '',
      repsOrDuration: '10 a 12 reps',
      defaultSets: 3,
      restSeconds: 45,
      type: 'reps',
      targetMuscles: ['core'],
      videoUrl: '',
      instructions: ['Executar de forma controlada com boa postura.'],
    },
  ]);

  const addExerciseRow = () => {
    setExercises((prev) => [
      ...prev,
      {
        id: 'ex_' + (prev.length + 1) + '_' + Date.now(),
        name: '',
        alias: '',
        repsOrDuration: '10 a 12 reps',
        defaultSets: 3,
        restSeconds: 45,
        type: 'reps',
        targetMuscles: ['legs'],
        videoUrl: '',
        instructions: ['Executar com técnica limpa e respiração ritmada.'],
      },
    ]);
  };

  const updateExercise = (index: number, patch: Partial<Exercise>) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...patch };
      return copy;
    });
  };

  const removeExerciseRow = (index: number) => {
    if (exercises.length <= 1) return;
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedExercises: Exercise[] = exercises.map((ex, i) => {
      let youtubeId = '';
      if (ex.videoUrl) {
        if (ex.videoUrl.includes('v=')) {
          youtubeId = ex.videoUrl.split('v=')[1]?.split('&')[0] || '';
        } else if (ex.videoUrl.includes('youtu.be/')) {
          youtubeId = ex.videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
        }
      }

      return {
        id: ex.id || `ex_${i}`,
        name: ex.name || `Exercício ${i + 1}`,
        alias: ex.alias || '',
        targetMuscles: (ex.targetMuscles as MuscleGroup[]) || ['core'],
        videoUrl: ex.videoUrl || '',
        youtubeId: youtubeId,
        instructions: ex.instructions || ['Mantenha a postura e execute no ritmo correto.'],
        executionTips: ['Concentre-se na contração muscular controlada.'],
        defaultSets: ex.defaultSets || 3,
        repsOrDuration: ex.repsOrDuration || '10 reps',
        type: ex.type || 'reps',
        durationSeconds: 30,
        restSeconds: ex.restSeconds || 45,
      };
    });

    const newProgram: WorkoutProgram = {
      id: 'custom_' + Date.now(),
      title,
      category,
      level,
      durationDays: 28,
      recommendedFrequency: '3x a 4x por semana',
      frequencyPerWeek: 3,
      estimatedTimeMinutes: estimatedMinutes,
      badge: 'Personalizado',
      description: description || 'Treino personalizado criado por você.',
      exercises: formattedExercises,
    };

    onSave(newProgram);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#15171e] border border-white/10 rounded-3xl p-6 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d2fd39]/10 text-[#d2fd39] flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Criar Novo Treino</h3>
              <p className="text-xs text-gray-400">Adicione outros tipos de treino (Musculação, HIIT, Funcional)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Nome do Treino:
            </label>
            <input
              type="text"
              required
              placeholder="ex: Treino Superior + Core, HIIT 15 min..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1b1e27] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d2fd39]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Categoria:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1b1e27] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#d2fd39]"
              >
                <option value="Calistenia">Calistenia</option>
                <option value="Musculação">Musculação</option>
                <option value="HIIT / Cardio">HIIT / Cardio</option>
                <option value="Funcional">Funcional</option>
                <option value="Mobilidade">Mobilidade</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Nível:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full bg-[#1b1e27] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#d2fd39]"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Duração Est.:</label>
              <input
                type="number"
                min="5"
                max="90"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full bg-[#1b1e27] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#d2fd39]"
              />
            </div>
          </div>

          {/* Exercises Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#d2fd39] uppercase tracking-wider">
                Exercícios do Treino ({exercises.length})
              </span>
              <button
                type="button"
                onClick={addExerciseRow}
                className="text-xs text-[#d2fd39] hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar exercício
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {exercises.map((ex, i) => (
                <div
                  key={ex.id || i}
                  className="bg-[#1b1e27] border border-white/5 rounded-2xl p-3.5 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">
                      Exercício #{i + 1}
                    </span>
                    {exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExerciseRow(i)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Nome do exercício"
                      value={ex.name || ''}
                      onChange={(e) => updateExercise(i, { name: e.target.value })}
                      className="bg-[#15171e] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="ex: 3 séries × 12 reps"
                      value={ex.repsOrDuration || ''}
                      onChange={(e) => updateExercise(i, { repsOrDuration: e.target.value })}
                      className="bg-[#15171e] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1">
                      <Link className="w-3 h-3 text-[#d2fd39]" />
                      <span>Link do Vídeo no YouTube (opcional):</span>
                    </div>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={ex.videoUrl || ''}
                      onChange={(e) => updateExercise(i, { videoUrl: e.target.value })}
                      className="w-full bg-[#15171e] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold hover:bg-white/10"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#d2fd39] text-black text-xs font-extrabold hover:bg-[#b6e026] shadow-md shadow-[#d2fd39]/20"
            >
              Salvar Treino
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
