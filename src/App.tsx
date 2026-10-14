import React, { useState } from 'react';
import { StageId } from './types/math';
import { STAGES, MARIO_IMAGES } from './data/chapterOneData';
import { Navbar } from './components/Navbar';
import { WorldMap } from './components/WorldMap';
import { NumberLineLab } from './components/NumberLineLab';
import { MushroomSorterLab } from './components/MushroomSorterLab';
import { OperationSimulatorLab } from './components/OperationSimulatorLab';
import { PowerLab } from './components/PowerLab';
import { ScientificNotationLab } from './components/ScientificNotationLab';
import { BossCastleQuiz } from './components/BossCastleQuiz';
import { KnowledgeListModal } from './components/KnowledgeListModal';
import { BookRoadmapModal } from './components/BookRoadmapModal';
import { sound } from './utils/audio';
import { Sparkles, BookOpen, Trophy, ArrowRight, Shield, Star, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId>('1-1');
  const [coins, setCoins] = useState<number>(50);
  const [stars, setStars] = useState<number>(1);
  const [hp, setHp] = useState<number>(3);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedStages, setCompletedStages] = useState<Record<StageId, boolean>>({
    '1-1': false,
    '1-2': false,
    '1-3': false,
    '1-4': false,
    boss: false,
  });

  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState<boolean>(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);

  const handleEarnCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const handleEarnStars = (amount: number) => {
    setStars((prev) => prev + amount);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setMuted(!next);
    if (next) {
      sound.playCoin();
    }
  };

  const handleStageComplete = (stageId: StageId) => {
    setCompletedStages((prev) => ({ ...prev, [stageId]: true }));
  };

  const currentStageInfo = STAGES.find((s) => s.id === currentStage) || STAGES[0];

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentStage={currentStage}
        onSelectStage={setCurrentStage}
        coins={coins}
        stars={stars}
        hp={hp}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenKnowledge={() => setIsKnowledgeOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* World Map Section */}
        <WorldMap
          currentStage={currentStage}
          completedStages={completedStages}
          onSelectStage={setCurrentStage}
        />

        {/* Current Stage Hero Header */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl font-black shadow-md border-2 border-amber-500 shrink-0">
              {currentStage === 'boss' ? '🏰' : '⭐'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                  {currentStageInfo.marioWorldName}
                </span>
                <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                  {currentStageInfo.name}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStageInfo.subTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {currentStageInfo.description}
              </p>
            </div>
          </div>

          {/* Quick Stage Key Rules */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0 self-stretch md:self-auto justify-end">
            <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs flex items-center gap-2">
              <span className="text-amber-700 font-bold">核心法则：</span>
              <span className="font-mono font-bold text-slate-800">
                {currentStageInfo.keyFormulas[0]}
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsKnowledgeOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>翻开本节 5·3 手账讲义</span>
            </button>
          </div>
        </div>

        {/* Dynamic Stage Content */}
        {currentStage === '1-1' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lab 1: Interactive Number Line */}
            <NumberLineLab onEarnCoins={handleEarnCoins} />

            {/* Lab 2: Mushroom Categorization */}
            <MushroomSorterLab onEarnCoins={handleEarnCoins} />

            {/* Stage Completion Callout */}
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-emerald-950">
                  已掌握第 1.1 关：有理数的基本概念！
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  你已经领悟了正负数、数轴移动、相反数与绝对值的精髓，准备好挑战 1.2 四则运算了吗？
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playJump();
                  handleStageComplete('1-1');
                  setCurrentStage('1-2');
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>前往第 1.2 关</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStage === '1-2' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lab: Operations Simulator & Sign Radar */}
            <OperationSimulatorLab onEarnCoins={handleEarnCoins} />

            {/* Stage Completion Callout */}
            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-amber-950">
                  已掌握第 1.2 关：有理数的四则运算！
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  “减变加，两变一不变”与“奇负偶正”雷达已解锁！接下来让我们探寻 1.3 乘方的奥秘！
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playJump();
                  handleStageComplete('1-2');
                  setCurrentStage('1-3');
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>前往第 1.3 关</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStage === '1-3' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lab: Power & Exponent Laboratory */}
            <PowerLab onEarnCoins={handleEarnCoins} />

            {/* Stage Completion Callout */}
            <div className="p-5 rounded-2xl bg-purple-50 border-2 border-purple-300 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-purple-950">
                  已掌握第 1.3 关：有理数的乘方！
                </h4>
                <p className="text-xs text-purple-800 mt-0.5">
                  你已经看穿了 (-a)ⁿ 与 -aⁿ 的经典陷阱，并学会了周期规律预测法！
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playJump();
                  handleStageComplete('1-3');
                  setCurrentStage('1-4');
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>前往第 1.4 关</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStage === '1-4' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lab: Scientific Notation & Precision */}
            <ScientificNotationLab onEarnCoins={handleEarnCoins} />

            {/* Stage Completion Callout to Boss */}
            <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-300 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-blue-950">
                  全部四个关卡知识点已修炼完毕！
                </h4>
                <p className="text-xs text-blue-800 mt-0.5">
                  酷霸王城堡的大门正在震颤，快带上有理数的全部法宝，去进行最终大决战吧！
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playJump();
                  handleStageComplete('1-4');
                  setCurrentStage('boss');
                }}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all animate-bounce"
              >
                <span>挑战终极酷霸王城堡 🏰</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStage === 'boss' && (
          <div className="animate-fadeIn">
            <BossCastleQuiz
              onEarnCoins={handleEarnCoins}
              onEarnStars={handleEarnStars}
              onCompleteChapter={() => handleStageComplete('boss')}
            />
          </div>
        )}

        {/* Feature Spotlight: 为什么孩子喜欢这种模式？ */}
        <div className="mt-12 p-6 rounded-3xl bg-linear-to-r from-amber-100/60 via-orange-100/40 to-yellow-100/60 border-2 border-amber-300">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">
              教学设计理念：将严肃教辅转化为孩子喜爱的游戏化乐园
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="p-4 bg-white/80 rounded-2xl border border-amber-200">
              <strong className="block text-amber-900 font-bold mb-1">
                1. 具象化直观教学（数形结合）
              </strong>
              把抽象的“正负数、绝对值”化作马里奥在数轴之桥上的跳跃距离；把加减法变成能量方块碰撞，从根源上理解概念。
            </div>
            <div className="p-4 bg-white/80 rounded-2xl border border-amber-200">
              <strong className="block text-amber-900 font-bold mb-1">
                2. 传承《初中知识清单》名师批注特色
              </strong>
              每一题均附带“名师旁白”与“易错对比提醒”，手账式批注讲解，让孩子不仅知其然，更知其所以然。
            </div>
            <div className="p-4 bg-white/80 rounded-2xl border border-amber-200">
              <strong className="block text-amber-900 font-bold mb-1">
                3. 可扩展至整本书30章的标准化模块
              </strong>
              标准化的数据模型（知识清单、交互实验、闯关答题、成就奖励），后续可无缝接入第2章代数式、第3章方程直到第30章概率！
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-amber-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-game text-sm text-red-600 font-bold">马里奥数学大冒险</span>
            <span>·</span>
            <span>基于曲一线《初中知识清单·数学》第一章有理数</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsKnowledgeOpen(true)}
              className="hover:text-slate-800 transition-colors"
            >
              手账式讲义
            </button>
            <button
              onClick={() => setIsRoadmapOpen(true)}
              className="hover:text-slate-800 transition-colors"
            >
              全书30章规划
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <KnowledgeListModal
        isOpen={isKnowledgeOpen}
        onClose={() => setIsKnowledgeOpen(false)}
      />

      <BookRoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        onSelectChapterOne={() => setCurrentStage('1-1')}
      />
    </div>
  );
}
