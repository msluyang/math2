import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Sparkles, Shield, Flame, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

interface PowerLabProps {
  onEarnCoins: (amount: number) => void;
}

export const PowerLab: React.FC<PowerLabProps> = ({ onEarnCoins }) => {
  const [base, setBase] = useState<number>(-2);
  const [exponent, setExponent] = useState<number>(4);

  // Cycle explorer
  const [cycleBase, setCycleBase] = useState<number>(3);
  const [customExp, setCustomExp] = useState<number>(2025);

  const handleBaseChange = (newBase: number) => {
    sound.playClick();
    setBase(newBase);
  };

  const handleExponentChange = (newExp: number) => {
    sound.playJump();
    setExponent(newExp);
    onEarnCoins(5);
  };

  // Calculations
  const withParenthesesVal = Math.pow(base, exponent);
  const withoutParenthesesVal = -Math.pow(Math.abs(base), exponent);

  // Repetition expansion string
  const expansionList = Array.from({ length: exponent }).map(() =>
    base < 0 ? `(${base})` : `${base}`
  );

  // Tail digit cycles for 2, 3, 7, 8
  const CYCLE_MAP: Record<number, number[]> = {
    2: [2, 4, 8, 6],
    3: [3, 9, 7, 1],
    7: [7, 9, 3, 1],
    8: [8, 4, 2, 6],
  };

  const currentCycle = CYCLE_MAP[cycleBase] || [cycleBase];
  const cyclePeriod = currentCycle.length;
  const remainder = customExp % cyclePeriod;
  const tailDigit = remainder === 0 ? currentCycle[cyclePeriod - 1] : currentCycle[remainder - 1];

  return (
    <div className="bg-white rounded-3xl border-2 border-purple-300 p-6 shadow-md mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h3 className="text-lg font-bold text-slate-900">
              有理数乘方实验室：超级无敌星能量台
            </h3>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
              1.3 核心幂运算
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            探究底数与指数的几何倍增、真假括号辨析与初中中考压轴“尾数规律题”！
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1.5 rounded-xl border border-purple-200 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>aⁿ 乘方能量引擎</span>
        </div>
      </div>

      {/* Feature 1: Super Power Machine */}
      <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white shadow-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Controls */}
          <div className="w-full md:w-1/2 space-y-4">
            {/* Base Selector */}
            <div>
              <div className="text-xs text-purple-200 font-bold mb-2 flex items-center justify-between">
                <span>1. 选择底数 a：</span>
                <span className="font-mono text-amber-300 font-bold">
                  底数 a = {base < 0 ? `(${base})` : base}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[-3, -2, -1, 2, 3, 4].map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBaseChange(b)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-sm font-black border transition-all ${
                      base === b
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {b < 0 ? `(${b})` : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Exponent Selector */}
            <div>
              <div className="text-xs text-purple-200 font-bold mb-2 flex items-center justify-between">
                <span>2. 选择指数 n（相乘次数）：</span>
                <span className="font-mono text-amber-300 font-bold">
                  指数 n = {exponent}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => handleExponentChange(exp)}
                    className={`w-10 h-10 rounded-xl font-mono text-base font-black border transition-all ${
                      exponent === exp
                        ? 'bg-purple-500 text-white border-purple-300 shadow-md scale-110'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visualization Output Card */}
          <div className="w-full md:w-1/2 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center flex flex-col justify-between">
            <span className="text-[10px] text-purple-200 uppercase tracking-wider font-bold">
              乘方展开式与能量值
            </span>

            {/* Formula Expression */}
            <div className="my-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-amber-300">
                {base < 0 ? `(${base})` : base}
                <sup className="text-xl sm:text-2xl text-purple-300 ml-1">
                  {exponent}
                </sup>
              </span>
            </div>

            {/* Repeated product expansion */}
            <div className="font-mono text-xs text-slate-300 bg-black/40 px-3 py-2 rounded-xl mb-3 flex flex-wrap items-center justify-center gap-1">
              <span>=</span>
              {expansionList.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-amber-200">{item}</span>
                  {idx < expansionList.length - 1 && <span className="text-slate-400">×</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Result value */}
            <div className="p-2.5 rounded-xl bg-purple-600/40 border border-purple-400/30">
              <span className="text-xs text-purple-200 block">计算结果（幂）：</span>
              <span className="font-mono text-2xl font-black text-emerald-300">
                {withParenthesesVal > 0 ? `+${withParenthesesVal}` : withParenthesesVal}
              </span>
              <span className="text-[11px] text-purple-200 block mt-1">
                {base < 0
                  ? exponent % 2 === 0
                    ? '🛡️ 负数的偶次幂是正数！'
                    : '⚡ 负数的奇次幂是负数！'
                  : '✨ 正数的任何次幂都是正数！'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Feature 2: High frequency mistake: (-a)ⁿ vs -aⁿ */}
      <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h4 className="font-bold text-sm text-amber-950">
            名师易混对比：带有括号与不带括号的天壤之别
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card A: With Parentheses */}
          <div className="p-4 rounded-xl bg-white border-2 border-emerald-300 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-lg font-black text-emerald-700">
                (-{Math.abs(base)})<sup>{exponent}</sup>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                有括号（底数是 -{Math.abs(base)}）
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
              表示 <strong>{exponent}</strong> 个 <strong>(-{Math.abs(base)})</strong> 相乘。
            </p>
            <div className="font-mono text-sm font-bold text-emerald-800 bg-emerald-50/70 p-2 rounded-lg">
              结果 = {withParenthesesVal > 0 ? `+${withParenthesesVal}` : withParenthesesVal}
            </div>
          </div>

          {/* Card B: Without Parentheses */}
          <div className="p-4 rounded-xl bg-white border-2 border-red-300 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-lg font-black text-red-600">
                -{Math.abs(base)}<sup>{exponent}</sup>
              </span>
              <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
                无括号（底数仅是 {Math.abs(base)}）
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
              表示 {Math.abs(base)}<sup>{exponent}</sup> 的相反数，负号在乘方运算外面！
            </p>
            <div className="font-mono text-sm font-bold text-red-700 bg-red-50/70 p-2 rounded-lg">
              结果 = {withoutParenthesesVal}
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3: Tail Digit Cycle Explorer (课本第15页经典中考母题) */}
      <div className="mt-6 pt-6 border-t border-purple-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>探寻末位数字循环规律（中考满分思维题）</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              同一个数字乘方的末位数字具有周期性循环规律！算出余数，即可破解任意大次幂！
            </p>
          </div>

          {/* Cycle base switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-bold">底数：</span>
            {[2, 3, 7, 8].map((num) => (
              <button
                key={num}
                onClick={() => {
                  sound.playClick();
                  setCycleBase(num);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                  cycleBase === num
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* The Cycle Wheel & Calculation */}
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Wheel / Steps */}
          <div>
            <span className="text-xs font-bold text-purple-900 block mb-2">
              🔄 底数 {cycleBase} 的幂次个位循环链（周期 T = 4）：
            </span>
            <div className="flex items-center gap-2">
              {currentCycle.map((digit, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div
                    className={`w-10 h-10 rounded-xl font-mono text-base font-black flex flex-col items-center justify-center border-2 ${
                      (remainder === idx + 1) || (idx === 3 && remainder === 0)
                        ? 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-300 scale-105'
                        : 'bg-white text-purple-900 border-purple-200'
                    }`}
                  >
                    <span>{digit}</span>
                    <span className="text-[8px] opacity-70">
                      {idx === 3 ? '除尽' : `余${idx + 1}`}
                    </span>
                  </div>
                  {idx < currentCycle.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Exponent Prophesy */}
          <div className="bg-white p-3.5 rounded-xl border border-purple-200 shadow-xs text-center min-w-[200px]">
            <span className="text-[10px] text-slate-500 font-bold block mb-1">
              测试大指数（例如中考年号）：
            </span>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[2009, 2025, 2026].map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    sound.playJump();
                    setCustomExp(year);
                  }}
                  className={`px-2 py-1 rounded-md text-xs font-mono font-bold ${
                    customExp === year
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-700 font-mono">
              {customExp} ÷ 4 = {Math.floor(customExp / 4)} ... <strong className="text-red-600">余 {remainder}</strong>
            </div>
            <div className="mt-1 font-bold text-xs text-purple-900">
              ➔ {cycleBase}<sup>{customExp}</sup> 的个位数字是：
              <span className="text-lg font-mono font-black text-red-600 ml-1">
                {tailDigit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
