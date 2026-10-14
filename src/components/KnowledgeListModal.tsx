import React, { useState } from 'react';
import { X, BookOpen, Star, Sparkles, Check, HelpCircle } from 'lucide-react';
import { CHAPTER_ONE_KNOWLEDGE } from '../data/chapterOneData';
import { sound } from '../utils/audio';

interface KnowledgeListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeListModal: React.FC<KnowledgeListModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'1-1' | '1-2' | '1-3' | '1-4'>('1-1');

  if (!isOpen) return null;

  const currentKnowledge = CHAPTER_ONE_KNOWLEDGE[activeTab] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-amber-50/90 rounded-3xl border-4 border-amber-400 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-white border-b-2 border-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  初中知识清单 · 手账式全彩笔记
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  七三主辅分栏
                </span>
              </div>
              <p className="text-xs text-slate-500">
                知识清楚 · 方法简单 · 手账图解 · 教师旁白醍醐灌顶
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="p-3 bg-amber-100/70 border-b border-amber-200 flex items-center gap-2 overflow-x-auto">
          {[
            { id: '1-1', label: '1.1 有理数概念' },
            { id: '1-2', label: '1.2 四则运算' },
            { id: '1-3', label: '1.3 有理数乘方' },
            { id: '1-4', label: '1.4 科学记数法' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as '1-1' | '1-2' | '1-3' | '1-4');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content: Dual-Column Signature Layout */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {currentKnowledge.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border-2 border-amber-200 shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 py-3 bg-linear-to-r from-amber-100/70 to-emerald-50/70 border-b border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    知
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.title}
                  </h4>
                </div>

                {/* Stars Rating from textbook */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 3 }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className={`w-3.5 h-3.5 ${
                        sIdx < item.stars
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dual-Column Layout: Main Column (70%) vs Side Column (30%) */}
              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-amber-100">
                
                {/* Left: 主栏精析 (70%) */}
                <div className="md:col-span-8 p-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      【核心定义与法则】
                    </span>
                    <p className="text-sm text-slate-800 leading-relaxed font-sans">
                      {item.coreConcept}
                    </p>
                  </div>

                  {/* Textbook Example Box */}
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-xs">
                    <span className="font-bold text-amber-900 block mb-1.5 flex items-center gap-1">
                      <span>📘 课本典例精析：</span>
                    </span>
                    <div className="font-medium text-slate-800 mb-1.5">
                      {item.example.question}
                    </div>
                    <div className="text-emerald-800 font-mono font-bold mb-1">
                      答案：{item.example.answer}
                    </div>
                    <div className="text-slate-600 leading-relaxed font-sans">
                      解析：{item.example.analysis}
                    </div>
                  </div>
                </div>

                {/* Right: 辅栏助记 (30%) - 批注式讲解 + 马里奥贴士 */}
                <div className="md:col-span-4 p-5 bg-amber-50/30 space-y-3 text-xs">
                  {/* Handwritten note / teacher sidebar */}
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900">
                    <span className="font-bold block mb-1 text-blue-950">
                      ✍️ 教师旁白醍醐灌顶：
                    </span>
                    <p className="leading-relaxed text-[11px]">
                      {item.handwrittenNote}
                    </p>
                  </div>

                  {/* Common mistake alert */}
                  <div className="p-3 rounded-xl bg-red-50/80 border border-red-200 text-red-900">
                    <span className="font-bold block mb-1 text-red-950">
                      ⚠️ 易混对比与温馨提示：
                    </span>
                    <p className="leading-relaxed text-[11px]">
                      {item.commonMistake}
                    </p>
                  </div>

                  {/* Mario tip */}
                  <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-950">
                    <span className="font-bold block mb-1 text-amber-900 flex items-center gap-1">
                      <span>🍄 马里奥记忆秘技：</span>
                    </span>
                    <p className="leading-relaxed text-[11px]">
                      {item.marioTip}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-amber-200 flex items-center justify-between text-xs text-slate-500">
          <span>内容源自曲一线《初中知识清单·数学》第一章有理数</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            返回闯关
          </button>
        </div>

      </div>
    </div>
  );
};
