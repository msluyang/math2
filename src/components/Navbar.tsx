import React from 'react';
import { Volume2, VolumeX, BookOpen, Map, Sparkles, Trophy, Heart } from 'lucide-react';
import { StageId } from '../types/math';
import { STAGES } from '../data/chapterOneData';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentStage: StageId;
  onSelectStage: (id: StageId) => void;
  coins: number;
  stars: number;
  hp: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRoadmap: () => void;
  onOpenKnowledge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  onSelectStage,
  coins,
  stars,
  hp,
  soundEnabled,
  onToggleSound,
  onOpenRoadmap,
  onOpenKnowledge,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md border-2 border-red-600">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-game font-bold text-lg sm:text-xl text-red-600 tracking-wide">
                马里奥数学大冒险
              </span>
              <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full border border-red-200 hidden sm:inline-block">
                第一章 · 有理数
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              初中知识清单 · 互动式闯关学习系统
            </p>
          </div>
        </div>

        {/* Stages Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-amber-50/80 p-1 rounded-xl border border-amber-200">
          {STAGES.map((s) => {
            const isActive = currentStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick();
                  onSelectStage(s.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-500 text-white shadow-sm scale-105'
                    : 'text-slate-700 hover:bg-amber-100'
                }`}
              >
                {s.id === 'boss' ? '🏰 酷霸王城堡' : s.id}
              </button>
            );
          })}
        </nav>

        {/* Game Stats & Tools */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* HP Hearts */}
          <div className="flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${
                  i < hp ? 'text-red-500 fill-red-500' : 'text-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Coins Counter */}
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-lg border border-amber-300 shadow-xs">
            <span className="w-5 h-5 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-[10px] font-black text-amber-900 animate-coin-spin">
              🪙
            </span>
            <span className="font-mono text-sm font-bold text-amber-800 tabular-nums">
              {coins}
            </span>
          </div>

          {/* Stars Counter */}
          <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg border border-yellow-300 hidden sm:flex">
            <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span className="font-mono text-sm font-bold text-yellow-800 tabular-nums">
              {stars}
            </span>
          </div>

          {/* Knowledge Cheatsheet Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenKnowledge();
            }}
            title="查看本章手账式知识清单"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">知识清单</span>
          </button>

          {/* Book Roadmap */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenRoadmap();
            }}
            title="整本图书30章全景蓝图"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-300 text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden md:inline">全书蓝图</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? '静音' : '开启音效'}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
