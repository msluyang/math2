import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { MARIO_IMAGES } from '../data/chapterOneData';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Check, HelpCircle } from 'lucide-react';

interface NumberLineLabProps {
  onEarnCoins: (amount: number) => void;
}

export const NumberLineLab: React.FC<NumberLineLabProps> = ({ onEarnCoins }) => {
  const [position, setPosition] = useState<number>(2);
  const [activeChallenge, setActiveChallenge] = useState<number>(0);
  const [challengeSolved, setChallengeSolved] = useState<Record<number, boolean>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  const minVal = -8;
  const maxVal = 8;
  const range = maxVal - minVal;

  const handleJump = (newPos: number) => {
    if (newPos >= minVal && newPos <= maxVal) {
      sound.playJump();
      setPosition(newPos);
      checkChallenge(newPos, activeChallenge);
    }
  };

  const checkChallenge = (pos: number, challengeIdx: number) => {
    if (challengeIdx === 1) {
      // Challenge 1: Start at -2, move right 5 units => must reach 3
      if (pos === 3) {
        if (!challengeSolved[1]) {
          sound.playPowerup();
          onEarnCoins(20);
          setChallengeSolved((prev) => ({ ...prev, 1: true }));
        }
        setFeedbackMsg('🎉 太棒了！-2 向右跳 5 格到达 +3！(-2 + 5 = 3)');
      }
    } else if (challengeIdx === 2) {
      // Challenge 2: Find positions where absolute value is 4 (+4 or -4)
      if (Math.abs(pos) === 4) {
        if (!challengeSolved[2]) {
          sound.playCoin();
          onEarnCoins(15);
          setChallengeSolved((prev) => ({ ...prev, 2: true }));
        }
        setFeedbackMsg(`⭐ 正确！点 ${pos} 到原点 0 的距离恰好是 4！即 |${pos}| = 4！`);
      }
    } else if (challengeIdx === 3) {
      // Challenge 3: Move to a number smaller than -5
      if (pos < -5) {
        if (!challengeSolved[3]) {
          sound.playPowerup();
          onEarnCoins(20);
          setChallengeSolved((prev) => ({ ...prev, 3: true }));
        }
        setFeedbackMsg(`🏆 成功进入严寒深渊！点 ${pos} 在 -5 的左边，绝对值更大但数值更小（${pos} < -5）！`);
      }
    }
  };

  // Convert coordinate to percentage for SVG positioning
  const getPercent = (val: number) => ((val - minVal) / range) * 100;

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 shadow-md mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <h3 className="text-lg font-bold text-slate-900">
              互动数轴实验室：马里奥跳跃探索
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              1.1 核心图解
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            通过动态数轴，直观领悟“原点·正方向·单位长度”与相反数、绝对值的几何本质！
          </p>
        </div>

        {/* Math readout display */}
        <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200 self-start sm:self-auto">
          <div className="text-center">
            <div className="text-[10px] text-slate-500 font-semibold">当前坐标 x</div>
            <div className={`font-mono text-base font-extrabold ${position > 0 ? 'text-emerald-600' : position < 0 ? 'text-blue-600' : 'text-amber-600'}`}>
              {position > 0 ? `+${position}` : position}
            </div>
          </div>
          <div className="w-px h-6 bg-amber-200" />
          <div className="text-center">
            <div className="text-[10px] text-slate-500 font-semibold">相反数 -x</div>
            <div className="font-mono text-base font-extrabold text-purple-600">
              {-position > 0 ? `+${-position}` : -position}
            </div>
          </div>
          <div className="w-px h-6 bg-amber-200" />
          <div className="text-center">
            <div className="text-[10px] text-slate-500 font-semibold">绝对值 |x|</div>
            <div className="font-mono text-base font-extrabold text-red-600">
              {Math.abs(position)}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Guide from Book */}
      <div className="mt-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative rounded-2xl overflow-hidden border border-amber-200 shadow-xs h-32 md:h-auto">
          <img
            src={MARIO_IMAGES.numberLine}
            alt="数轴之桥"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-white text-xs font-bold flex items-center gap-1">
              <span>🌉 数轴之桥：原点0为界</span>
            </span>
          </div>
        </div>

        {/* 3 Core Elements Box */}
        <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
              <span>📌 数轴三要素（缺一不可）</span>
            </h4>
            <ul className="space-y-1 text-slate-700">
              <li>1. <strong className="text-emerald-700">原点</strong>：基准点 0，正负数界限。</li>
              <li>2. <strong className="text-emerald-700">正方向</strong>：通常向右用箭头表示。</li>
              <li>3. <strong className="text-emerald-700">单位长度</strong>：刻度间距必须完全统一。</li>
            </ul>
          </div>
          <div className="text-[11px] text-emerald-800 font-medium bg-white/80 p-1.5 rounded-lg border border-emerald-100 mt-2">
            💡 规则：数轴上右边的数总比左边的数大！
          </div>
        </div>

        {/* Absolute Value & Opposite Number Box */}
        <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200 text-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
              <span>⚖️ 相反数与绝对值几何意义</span>
            </h4>
            <p className="text-slate-700 leading-relaxed mb-1.5">
              <strong>相反数</strong>：在原点两侧且到原点距离相等（a + (-a) = 0）。
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>绝对值 |a|</strong>：表示点到原点 0 的距离，恒有 <code className="bg-white px-1 py-0.5 rounded font-mono font-bold text-red-600">|a| ≥ 0</code>。
            </p>
          </div>
          <div className="text-[11px] text-blue-800 font-medium bg-white/80 p-1.5 rounded-lg border border-blue-100 mt-2">
            负数比较大小：绝对值大的反而更小（离0越远越靠左）！
          </div>
        </div>
      </div>

      {/* Interactive Number Line Canvas Stage */}
      <div className="relative bg-slate-900 rounded-2xl p-6 sm:p-8 text-white overflow-hidden shadow-inner">
        {/* Sky / Atmosphere backdrop */}
        <div className="absolute inset-0 bg-linear-to-b from-sky-950 via-slate-900 to-slate-950 pointer-events-none" />

        {/* Distance beam highlight for Absolute Value */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-10 bg-amber-400/20 rounded-full border border-amber-400/50 transition-all duration-300 pointer-events-none flex items-center justify-center"
          style={{
            left: `${Math.min(getPercent(0), getPercent(position))}%`,
            width: `${Math.abs(getPercent(position) - getPercent(0))}%`,
          }}
        >
          {Math.abs(position) > 0 && (
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-slate-900/80 px-2 py-0.5 rounded-full border border-amber-400/30 whitespace-nowrap">
              距离 |{position}| = {Math.abs(position)} 格
            </span>
          )}
        </div>

        {/* Number line main track */}
        <div className="relative z-10 my-12">
          {/* Main Axis Line */}
          <div className="h-2 bg-slate-600 rounded-full w-full relative">
            {/* Origin marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full ring-4 ring-amber-400/30 z-10"
              style={{ left: `calc(${getPercent(0)}% - 8px)` }}
            />

            {/* Right arrow for positive direction */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-emerald-400 font-bold text-lg">
              ▶
            </div>
          </div>

          {/* Ticks and Labels */}
          <div className="relative w-full h-8 mt-2">
            {Array.from({ length: range + 1 }).map((_, idx) => {
              const val = minVal + idx;
              const isOrigin = val === 0;
              const isPositive = val > 0;
              const pct = getPercent(val);

              return (
                <div
                  key={val}
                  onClick={() => handleJump(val)}
                  className="absolute -top-3 -translate-x-1/2 cursor-pointer flex flex-col items-center group"
                  style={{ left: `${pct}%` }}
                >
                  <div
                    className={`w-0.5 transition-all ${
                      isOrigin
                        ? 'h-6 bg-amber-400 w-1'
                        : 'h-4 bg-slate-500 group-hover:bg-amber-300 group-hover:h-5'
                    }`}
                  />
                  <span
                    className={`mt-1 font-mono text-xs font-bold transition-colors ${
                      val === position
                        ? 'text-red-400 scale-125'
                        : isOrigin
                        ? 'text-amber-400'
                        : isPositive
                        ? 'text-emerald-400 group-hover:text-emerald-200'
                        : 'text-blue-400 group-hover:text-blue-200'
                    }`}
                  >
                    {val > 0 ? `+${val}` : val}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mario Avatar at Position */}
          <div
            className="absolute -top-12 -translate-x-1/2 transition-all duration-300 z-20 flex flex-col items-center pointer-events-none"
            style={{ left: `${getPercent(position)}%` }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-lg animate-mario-bounce">
                🍄
              </div>
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-md whitespace-nowrap shadow-xs">
                马里奥
              </span>
            </div>
            <div className="w-1.5 h-3 bg-red-400/80 rounded-full mt-0.5" />
          </div>

          {/* Luigi Avatar at Opposite Position (-position) */}
          {position !== 0 && (
            <div
              className="absolute -top-12 -translate-x-1/2 transition-all duration-300 z-20 flex flex-col items-center pointer-events-none opacity-85"
              style={{ left: `${getPercent(-position)}%` }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-sm">
                  ⭐
                </div>
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md whitespace-nowrap">
                  相反数({-position > 0 ? `+${-position}` : -position})
                </span>
              </div>
              <div className="w-1 h-3 bg-emerald-400/80 rounded-full mt-0.5" />
            </div>
          )}
        </div>

        {/* Mario Jump Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleJump(position - 1)}
              disabled={position <= minVal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white transition-all border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>向左 -1</span>
            </button>
            <button
              onClick={() => handleJump(position + 1)}
              disabled={position >= maxVal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white transition-all border border-slate-700"
            >
              <span>向右 +1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleJump(0)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-amber-300 transition-all border border-amber-500/40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>回原点 0</span>
            </button>
          </div>

          {/* Quick coordinate jump buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] text-slate-400 whitespace-nowrap">快捷跃迁:</span>
            {[-6, -4, -2, 0, 2, 4, 6].map((num) => (
              <button
                key={num}
                onClick={() => handleJump(num)}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  position === num
                    ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {num > 0 ? `+${num}` : num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mini-Challenge Missions based on Textbook Examples */}
      <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-sm text-slate-900">
              课本实战闯关训练（完成可得金币）
            </h4>
          </div>
          {feedbackMsg && (
            <span className="text-xs font-bold text-emerald-700 animate-pulse">
              {feedbackMsg}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Mission 1 */}
          <button
            onClick={() => {
              setActiveChallenge(1);
              setPosition(-2);
              sound.playClick();
              setFeedbackMsg('👉 请点击【向右+1】按钮5次，或者直接在数轴点击目标位置！');
            }}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              activeChallenge === 1
                ? 'bg-white border-amber-500 shadow-sm'
                : 'bg-white/70 border-amber-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-amber-800">
                任务 1：平移应用题（课本例2）
              </span>
              {challengeSolved[1] && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-[11px] text-slate-600">
              点 A 在数轴上表示 <strong>-2</strong>，将点 A 向右移动 5 个单位，马里奥应该落在哪个数？
            </p>
          </button>

          {/* Mission 2 */}
          <button
            onClick={() => {
              setActiveChallenge(2);
              setPosition(0);
              sound.playClick();
              setFeedbackMsg('👉 请在数轴上找到到原点距离为 4 的位置（有两个哦）！');
            }}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              activeChallenge === 2
                ? 'bg-white border-amber-500 shadow-sm'
                : 'bg-white/70 border-amber-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-amber-800">
                任务 2：寻找绝对值（课本例5）
              </span>
              {challengeSolved[2] && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-[11px] text-slate-600">
              若一个数的绝对值等于 4（即 |x| = 4），请把马里奥移动到这个位置！
            </p>
          </button>

          {/* Mission 3 */}
          <button
            onClick={() => {
              setActiveChallenge(3);
              setPosition(-5);
              sound.playClick();
              setFeedbackMsg('👉 两个负数比大小：绝对值大的反而小！向左走比 -5 更小！');
            }}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              activeChallenge === 3
                ? 'bg-white border-amber-500 shadow-sm'
                : 'bg-white/70 border-amber-200 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-amber-800">
                任务 3：负数比大小法则
              </span>
              {challengeSolved[3] && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-[11px] text-slate-600">
              寻找比 <strong>-5</strong> 还要小的数！把马里奥移动到符合条件的位置。
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
