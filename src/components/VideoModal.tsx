import React from 'react';
import { X, ExternalLink, Play, CheckCircle2 } from 'lucide-react';
import { Exercise } from '../types/workout';
import { getYouTubeEmbedUrl } from '../utils/storage';

interface VideoModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  const embedUrl = getYouTubeEmbedUrl(exercise.youtubeId || exercise.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#15171e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1b1e27]">
          <div>
            <span className="text-xs font-semibold text-[#d2fd39] uppercase tracking-wider">
              Vídeo Demonstrativo
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Play className="w-4 h-4 fill-[#d2fd39] text-[#d2fd39]" />
              {exercise.name}
              {exercise.alias && (
                <span className="text-sm font-normal text-gray-400">({exercise.alias})</span>
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Embed */}
        <div className="relative w-full pt-[56.25%] bg-black">
          <iframe
            src={embedUrl}
            title={exercise.name}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Instructions & Tips */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Como fazer na prática:
            </h4>
            <ul className="space-y-2">
              {exercise.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-200">
                  <span className="w-5 h-5 rounded-full bg-[#d2fd39]/10 text-[#d2fd39] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {exercise.executionTips && exercise.executionTips.length > 0 && (
            <div className="bg-[#1b1e27] border border-white/5 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-[#d2fd39] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Segredos de Execução & Biomecânica:
              </h4>
              <ul className="space-y-1.5">
                {exercise.executionTips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-[#d2fd39] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <a
              href={exercise.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#d2fd39] transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir no YouTube original
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#d2fd39] text-black font-semibold text-xs hover:bg-[#b6e026] transition"
            >
              Entendi, fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
