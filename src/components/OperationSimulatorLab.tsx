import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { MARIO_IMAGES } from '../data/chapterOneData';
import { Play, Sparkles, RefreshCw, Zap, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface OperationSimulatorLabProps {
  onEarnCoins: (amount: number) => void;
}

export const OperationSimulatorLab: React.FC<OperationSimulatorLabProps> = ({ onEarnCoins }) => {
  const [numA, setNumA] = useState<number>(-5);
  const [numB, setNumB] = useState<number>(3);
  const [operator, setOperator] = useState<'+' | '-' | '×' | '÷'>('+');
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  // Radar factors for "奇负偶正"
  const [radarFactors, setRadarFactors] = useState<number[]>([-2, 3, -4, -5]);

  const handleCompute = () => {
    sound.playPowerup();
    setShowAnimation(true);
    onEarnCoins(5);
  };

  // Calculate result
  let resultNum: number = 0;
  let ruleName: string = '';
  let ruleExplanation: string = '';

  if (operator === '+') {
    resultNum = numA + numB;
    if (numA === 0) {
      ruleName = '一个数同0相加，仍得这个数';
      ruleExplanation = `0 与任何数相加保持原样：0 + (${numB}) = ${resultNum}`;
    } else if (numB === 0) {
      ruleName = '一个数同0相加，仍得这个数';
      ruleExplanation = `(${numA}) + 0 = ${resultNum}`;
    } else if (numA + numB === 0) {
      ruleName = '互为相反数的两个数相加得0';
      ruleExplanation = `${numA} 与 ${numB} 互为相反数，正负能量刚好抵消为 0！`;
    } else if ((numA > 0 && numB > 0) || (numA < 0 && numB < 0)) {
      ruleName = '同号两数相加法则';
      ruleExplanation = `同号相加：取相同的符号(${numA > 0 ? '+' : '-'})，并把绝对值相加（|${numA}| + |${numB}| = ${Math.abs(numA) + Math.abs(numB)}）➔ ${resultNum}`;
    } else {
      ruleName = '异号两数相加法则';
      const absA = Math.abs(numA);
      const absB = Math.abs(numB);
      const dominant = absA > absB ? numA : numB;
      ruleExplanation = `绝对值不等的异号相加：取绝对值较大的数(${dominant})的符号，并用较大的绝对值减去较小的绝对值（|${dominant}| - |${dominant === numA ? numB : numA}| = ${Math.abs(dominant) - Math.abs(dominant === numA ? numB : numA)}）➔ ${resultNum}`;
    }
  } else if (operator === '-') {
    resultNum = numA - numB;
    ruleName = '减法法则：减变加，两变一不变';
    ruleExplanation = `把“减去一个数”转化为“加上这个数的相反数”：${numA} - (${numB}) ➔ ${numA} + (${-numB}) = ${resultNum}！`;
  } else if (operator === '×') {
    resultNum = numA * numB;
    if (numA === 0 || numB === 0) {
      ruleName = '与0相乘法则';
      ruleExplanation = '任何数与 0 相乘，积都等于 0！';
    } else if ((numA > 0 && numB > 0) || (numA < 0 && numB < 0)) {
      ruleName = '乘法法则：同号得正';
      ruleExplanation = `两数同号相乘，符号得正(+)，绝对值相乘：|${numA}| × |${numB}| = ${resultNum}！`;
    } else {
      ruleName = '乘法法则：异号得负';
      ruleExplanation = `两数异号相乘，符号得负(-)，绝对值相乘：-(|${numA}| × |${numB}|) = ${resultNum}！`;
    }
  } else if (operator === '÷') {
    if (numB === 0) {
      ruleName = '除法禁忌：0不能作除数';
      ruleExplanation = '注意！在数学世界中，0 作为除数是没有意义的！';
    } else {
      resultNum = parseFloat((numA / numB).toFixed(2));
      ruleName = '除法法则：除以一个数等于乘它的倒数';
      ruleExplanation = `两数相除，同号得正，异号得负，并把绝对值相除：${numA} ÷ (${numB}) = ${numA} × (1/${numB}) = ${resultNum}。`;
    }
  }

  // Radar calculation
  const negativeCount = radarFactors.filter((f) => f < 0).length;
  const isOdd = negativeCount % 2 !== 0;
  const radarProduct = radarFactors.reduce((acc, curr) => acc * curr, 1);

  const toggleFactorSign = (idx: number) => {
    sound.playClick();
    setRadarFactors((prev) => {
      const copy = [...prev];
      copy[idx] = -copy[idx];
      return copy;
    });
  };

  const addRadarFactor = (val: number) => {
    sound.playCoin();
    if (radarFactors.length < 6) {
      setRadarFactors((prev) => [...prev, val]);
    }
  };

  const resetRadar = () => {
    sound.playClick();
    setRadarFactors([-2, 3, -4, -5]);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 shadow-md mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <h3 className="text-lg font-bold text-slate-900">
              有理数四则运算撞击机与符号雷达
            </h3>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              1.2 核心算法
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            减变加魔法变身 · 异号相加争锋 · 负因数“奇负偶正”探照雷达！
          </p>
        </div>

        {/* Feature badge */}
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-xl border border-red-200 text-xs font-bold">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>加减乘除连击实操</span>
        </div>
      </div>

      {/* Main Interactive Clash Area */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Equation Builder */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                <span>🕹️ 撞击算式发生器</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                调节数值观察运算法则
              </span>
            </div>

            {/* Operator Buttons */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {(['+', '-', '×', '÷'] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => {
                    sound.playClick();
                    setOperator(op);
                  }}
                  className={`w-12 h-12 rounded-2xl text-xl font-black font-mono transition-all ${
                    operator === op
                      ? 'bg-amber-500 text-white shadow-md scale-110 border-2 border-amber-600'
                      : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Numbers Selector Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-amber-200 shadow-xs mb-4">
              {/* Number A */}
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-bold block mb-1">第一个数 a</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setNumA((n) => Math.max(-10, n - 1));
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className={`w-14 text-center font-mono text-xl font-black ${numA < 0 ? 'text-blue-600' : 'text-emerald-600'}`}>
                    {numA > 0 ? `+${numA}` : numA}
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setNumA((n) => Math.min(10, n + 1));
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Operator */}
              <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-mono text-base font-black shrink-0">
                {operator}
              </div>

              {/* Number B */}
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-bold block mb-1">第二个数 b</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setNumB((n) => Math.max(-10, n - 1));
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className={`w-14 text-center font-mono text-xl font-black ${numB < 0 ? 'text-blue-600' : 'text-emerald-600'}`}>
                    {numB > 0 ? `+${numB}` : numB}
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setNumB((n) => Math.min(10, n + 1));
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets based on textbook examples */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              <span className="text-[11px] text-slate-500 font-medium">经典例题切换:</span>
              <button
                onClick={() => {
                  sound.playClick();
                  setNumA(6);
                  setNumB(-8);
                  setOperator('+');
                }}
                className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-[11px] font-mono text-slate-700 border border-amber-200"
              >
                (+6)+(-8)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setNumA(-3);
                  setNumB(-7);
                  setOperator('-');
                }}
                className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-[11px] font-mono text-slate-700 border border-amber-200"
              >
                (-3)-(-7)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setNumA(-12);
                  setNumB(-3);
                  setOperator('÷');
                }}
                className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-[11px] font-mono text-slate-700 border border-amber-200"
              >
                (-12)÷(-3)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setNumA(-5);
                  setNumB(-4);
                  setOperator('×');
                }}
                className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-[11px] font-mono text-slate-700 border border-amber-200"
              >
                (-5)×(-4)
              </button>
            </div>
          </div>

          {/* Trigger button */}
          <button
            onClick={handleCompute}
            className="w-full py-3 rounded-xl bg-linear-to-r from-red-500 to-amber-500 text-white font-extrabold text-sm shadow-md hover:from-red-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>发射能量撞击！查看运算解析</span>
          </button>
        </div>

        {/* Right Column: Visual Result & Teacher Notebook Note */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border-2 border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>运算结果与名师手账解析</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                5·3 批注式讲解
              </span>
            </div>

            {/* Equation visual output */}
            <div className="my-5 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="text-xs text-slate-400 mb-1">算式与计算结果：</div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-amber-300">
                ({numA > 0 ? `+${numA}` : numA}) {operator} ({numB > 0 ? `+${numB}` : numB}) ={' '}
                <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/40">
                  {numB === 0 && operator === '÷' ? '无意义' : resultNum}
                </span>
              </div>
            </div>

            {/* Step-by-step Rule breakdown */}
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-xs">
                <span className="text-amber-400 font-bold block mb-1">
                  📖 对应法则：{ruleName}
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {ruleExplanation}
                </p>
              </div>

              {/* Special subtraction morph display */}
              {operator === '-' && (
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/60 text-xs">
                  <span className="text-purple-300 font-bold flex items-center gap-1 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>减法变身魔法：“两变一不变”</span>
                  </span>
                  <div className="font-mono text-amber-200 mt-1 flex items-center justify-center gap-2">
                    <span>{numA}</span>
                    <span className="text-red-400">-</span>
                    <span>({numB})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-emerald-400">{numA}</span>
                    <span className="text-emerald-400 font-black">+</span>
                    <span className="text-emerald-400 font-bold">({-numB})</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>💡 提示：先定符号，再算绝对值！</span>
            <span className="text-amber-400 font-mono">+5 金币到账</span>
          </div>
        </div>

      </div>

      {/* Feature 2: Negative Factor Radar ("奇负偶正" 探照灯) */}
      <div className="mt-8 pt-6 border-t border-amber-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <span>多因数乘法“奇负偶正”探照雷达</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              点击下方因数切换正负符号，雷达将自动统计负因数个数，决定积的最终正负号！
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addRadarFactor(-2)}
              disabled={radarFactors.length >= 6}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 disabled:opacity-40"
            >
              + 加负因数(-2)
            </button>
            <button
              onClick={() => addRadarFactor(3)}
              disabled={radarFactors.length >= 6}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40"
            >
              + 加正因数(+3)
            </button>
            <button
              onClick={resetRadar}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              重置
            </button>
          </div>
        </div>

        {/* Factors list */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Factor pills */}
          <div className="flex flex-wrap items-center gap-2">
            {radarFactors.map((f, idx) => (
              <button
                key={idx}
                onClick={() => toggleFactorSign(idx)}
                title="点击反转正负符号"
                className={`px-3 py-2 rounded-xl font-mono text-base font-extrabold border-2 transition-transform hover:scale-105 flex items-center gap-1 ${
                  f < 0
                    ? 'bg-blue-950 border-blue-400 text-blue-300'
                    : 'bg-emerald-950 border-emerald-400 text-emerald-300'
                }`}
              >
                <span>{f > 0 ? `+${f}` : f}</span>
                <span className="text-[10px] text-slate-400 font-sans">
                  {f < 0 ? '💣负' : '🪙正'}
                </span>
              </button>
            ))}
          </div>

          {/* Radar indicator summary */}
          <div className="flex items-center gap-4 bg-slate-800 px-4 py-3 rounded-xl border border-slate-700 shrink-0">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block">负因数个数</span>
              <span className="font-mono text-xl font-extrabold text-amber-400">
                {negativeCount} 个
              </span>
            </div>

            <div className="w-px h-8 bg-slate-700" />

            <div className="text-center">
              <span className="text-[10px] text-slate-400 block">符号定论</span>
              <span
                className={`text-sm font-extrabold px-2 py-0.5 rounded-md ${
                  isOdd ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {isOdd ? '奇数个 ➔ 积为负(-)' : '偶数个 ➔ 积为正(+)'}
              </span>
            </div>

            <div className="w-px h-8 bg-slate-700" />

            <div className="text-center">
              <span className="text-[10px] text-slate-400 block">最终乘积</span>
              <span className="font-mono text-xl font-black text-white">
                {radarProduct > 0 ? `+${radarProduct}` : radarProduct}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
