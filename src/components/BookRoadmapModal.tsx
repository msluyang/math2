import React, { useState } from 'react';
import { X, Map, Lock, Sparkles, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import { BOOK_ROADMAP } from '../data/chapterOneData';
import { sound } from '../utils/audio';

interface BookRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapterOne: () => void;
}

export const BookRoadmapModal: React.FC<BookRoadmapModalProps> = ({
  isOpen,
  onClose,
  onSelectChapterOne,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', '代数入门', '代数精馏', '函数思想', '空间与图形', '统计与概率'];

  const filteredChapters =
    selectedCategory === 'all'
      ? BOOK_ROADMAP
      : BOOK_ROADMAP.filter((c) => c.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl border-4 border-blue-400 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Compass className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-game font-bold text-base sm:text-lg">
                  初中数学全书知识图谱与拓展蓝图
                </h3>
                <span className="text-[11px] bg-yellow-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                  全彩版 30 章体系
                </span>
              </div>
              <p className="text-xs text-blue-100">
                当前开发版本：第1章有理数 · 模块化架构可一键平滑扩展整本图书！
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scalability Blueprint Callout */}
        <div className="bg-amber-50 p-3.5 px-6 border-b border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🚀</span>
            <span>
              <strong>全书游戏化体系架构：</strong>
              统一以“马里奥探索世界”为底座，每章配备<strong>手账图解 + 动态实验室 + 城堡真题大测验</strong>！
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold bg-amber-200/80 px-2.5 py-1 rounded-lg shrink-0">
            已支持全书30章数据模型
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="p-3 px-6 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat === 'all' ? '全部 30 个章节' : cat}
            </button>
          ))}
        </div>

        {/* Chapters Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredChapters.map((ch) => {
            const isActive = ch.status === 'active';
            const isComing = ch.status === 'coming-soon';

            return (
              <div
                key={ch.chapterNumber}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-emerald-50/80 border-emerald-400 shadow-sm ring-2 ring-emerald-300'
                    : isComing
                    ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                    : 'bg-slate-50/50 border-slate-200 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {ch.pageRange}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-emerald-500 text-white'
                          : isComing
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isActive ? '当前畅玩中' : isComing ? '即将开启' : '后续章节'}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    {ch.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {ch.category}
                  </span>

                  {isActive ? (
                    <button
                      onClick={() => {
                        sound.playJump();
                        onSelectChapterOne();
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <span>进入学习</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>待解锁</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>模式验证成功后，整本图书所有30章将陆续加载上线！</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors"
          >
            关闭蓝图
          </button>
        </div>

      </div>
    </div>
  );
};
