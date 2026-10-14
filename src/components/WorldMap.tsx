import React from 'react';
import { StageId } from '../types/math';
import { STAGES, MARIO_IMAGES } from '../data/chapterOneData';
import { sound } from '../utils/audio';
import { CheckCircle2, ChevronRight, Sparkles, Trophy, Lock } from 'lucide-react';

interface WorldMapProps {
  currentStage: StageId;
  completedStages: Record<StageId, boolean>;
  onSelectStage: (id: StageId) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  currentStage,
  completedStages,
  onSelectStage,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-amber-900/10 border-4 border-amber-400 shadow-xl mb-8">
      {/* Background World Graphic */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-sky-200">
        <img
          src={MARIO_IMAGES.worldMap}
          alt="蘑菇王国数学地图"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
        />

        {/* Floating Title Banner */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border-2 border-amber-300">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍄</span>
            <div>
              <h2 className="font-game font-bold text-slate-800 text-sm sm:text-base leading-tight">
                第一章冒险地图：有理数奇遇
              </h2>
              <p className="text-[11px] text-amber-700 font-medium">
                点选关卡，跟随马里奥探索数学秘境！
              </p>
            </div>
          </div>
        </div>

        {/* Mario Avatar Pin over current stage */}
        <div className="absolute bottom-4 right-4 z-10 bg-red-500/90 text-white text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md">
          <span className="animate-mario-bounce">⭐</span>
          <span>当前位置：{STAGES.find((s) => s.id === currentStage)?.marioWorldName}</span>
        </div>
      </div>

      {/* Stage Node Selector Cards */}
      <div className="p-4 sm:p-6 bg-linear-to-b from-amber-50 to-orange-50/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {STAGES.map((s, index) => {
            const isActive = currentStage === s.id;
            const isCompleted = completedStages[s.id];
            const isBoss = s.id === 'boss';

            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playJump();
                  onSelectStage(s.id);
                }}
                className={`relative text-left p-3.5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? isBoss
                      ? 'bg-red-50 border-red-500 shadow-md ring-2 ring-red-400 scale-102'
                      : 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400 scale-102'
                    : 'bg-white/90 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70'
                }`}
              >
                {/* Header status */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-md ${
                      isBoss
                        ? 'bg-red-600 text-white'
                        : isActive
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isBoss ? '城堡 Boss' : `关卡 ${s.id}`}
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center text-emerald-600 text-xs font-bold gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>通关</span>
                    </span>
                  ) : isActive ? (
                    <span className="text-[11px] text-amber-600 font-bold animate-pulse">
                      冒险中 🏃
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">
                      待挑战
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                    {s.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {s.subTitle}
                  </p>
                </div>

                {/* Bottom formula teaser */}
                <div className="mt-3 pt-2 border-t border-amber-100 text-[10px] text-slate-600 flex items-center justify-between">
                  <span className="font-mono font-medium truncate max-w-[120px]">
                    {s.keyFormulas[0]}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-amber-600 font-bold' : 'text-slate-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
