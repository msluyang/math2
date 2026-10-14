import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Telescope, Rocket, Sparkles, MoveRight, HelpCircle, Check } from 'lucide-react';

interface ScientificNotationLabProps {
  onEarnCoins: (amount: number) => void;
}

interface CosmicExample {
  title: string;
  rawValue: number;
  unit: string;
  note: string;
}

const COSMIC_PRESETS: CosmicExample[] = [
  { title: '课本例1(1)：太阳光年巨额数据', rawValue: 60800000000, unit: '米', note: '整数位数是 11 位，n = 11 - 1 = 10' },
  { title: '地球至太阳距离', rawValue: 149600000, unit: '千米', note: '整数位数是 9 位，n = 9 - 1 = 8' },
  { title: '我国陆地总面积', rawValue: 9600000, unit: '平方千米', note: '整数位数是 7 位，n = 7 - 1 = 6' },
  { title: '负数科学记数法（课本例1(2)）', rawValue: -365000, unit: '米', note: '负号直接保留在前面，小数点移动 5 位' }
];

export const ScientificNotationLab: React.FC<ScientificNotationLabProps> = ({ onEarnCoins }) => {
  const [selectedPreset, setSelectedPreset] = useState<CosmicExample>(COSMIC_PRESETS[0]);
  const [precisionExample, setPrecisionExample] = useState<string>('1.20');

  // Convert raw value to scientific notation
  const formatScientific = (val: number) => {
    const isNegative = val < 0;
    const absVal = Math.abs(val);
    const str = absVal.toString();
    const intDigits = str.split('.')[0].length;
    const n = intDigits - 1;
    const a = absVal / Math.pow(10, n);
    return {
      a: isNegative ? -a : a,
      n,
      intDigits
    };
  };

  const sci = formatScientific(selectedPreset.rawValue);

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-300 p-6 shadow-md mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔭</span>
            <h3 className="text-lg font-bold text-slate-900">
              科学记数法与微观标尺天文台
            </h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
              1.4 巨数与精微
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            把庞大如天体的数字浓缩为 a × 10ⁿ，掌握“舍小不舍大”的精确度取值范围！
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-bold">
          <Telescope className="w-4 h-4 text-blue-600" />
          <span>a × 10ⁿ 宇宙记数器</span>
        </div>
      </div>

      {/* Preset selector */}
      <div className="mt-6 mb-4">
        <span className="text-xs font-bold text-slate-700 block mb-2">
          🚀 选择宏大宇宙数据进行科学记数法转换：
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {COSMIC_PRESETS.map((item, idx) => {
            const isSelected = selectedPreset.title === item.title;
            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playJump();
                  setSelectedPreset(item);
                  onEarnCoins(5);
                }}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-sm ring-2 ring-blue-300'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 mb-1">
                  {item.title}
                </div>
                <div className="font-mono text-xs font-extrabold text-blue-700 truncate">
                  {item.rawValue.toLocaleString()} {item.unit}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scientific Converter Stage */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white shadow-inner mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Left: Original Number */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
            <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider block mb-1">
              原始大数（整数位数：{sci.intDigits} 位）
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-amber-300 break-all">
              {selectedPreset.rawValue.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-300 mt-2">
              💡 {selectedPreset.note}
            </div>
          </div>

          {/* Right: Scientific Notation Result */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center">
            <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider block mb-1">
              科学记数法表示 a × 10ⁿ
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-black text-emerald-300 my-2">
              {sci.a} × 10
              <sup className="text-2xl text-amber-300 ml-0.5">{sci.n}</sup>
            </div>
            <div className="text-xs text-blue-200 flex items-center justify-center gap-2">
              <span>基数 1 ≤ |a| &lt; 10</span>
              <span>·</span>
              <span>指数 n = {sci.intDigits} - 1 = {sci.n}</span>
            </div>
          </div>

        </div>

        {/* Rule callout banner */}
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-blue-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            📌 课本口诀：原数有几位整数，10的指数 n 就少 1（n = 整数位数 - 1）！
          </span>
          <span className="text-amber-300 font-mono font-bold shrink-0">
            1 ≤ |{sci.a}| &lt; 10 完全符合！
          </span>
        </div>
      </div>

      {/* Feature 2: Precision & Rounding (舍小不舍大) */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-sm text-slate-900">
              近似数精确度与取值范围“舍小不舍大”
            </h4>
          </div>
          <span className="text-xs bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded-full">
            课本第17页例4中考母题
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Example 1: 1.20 */}
          <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="font-mono text-base font-black text-amber-900 mb-1">
              近似数 1.20
            </div>
            <p className="text-xs text-slate-600 mb-2">
              精确到：<strong>百分位（0.01）</strong><br />
              末尾的 0 绝对不能去掉！
            </p>
            <div className="text-xs bg-amber-50 p-2 rounded-lg border border-amber-100 font-mono text-slate-800">
              原数 a 的取值范围：<br />
              <strong className="text-red-600">1.195 ≤ a &lt; 1.205</strong>
            </div>
          </div>

          {/* Example 2: 6.30万 */}
          <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="font-mono text-base font-black text-amber-900 mb-1">
              近似数 6.30万
            </div>
            <p className="text-xs text-slate-600 mb-2">
              还原原数：6.30万 = <strong>63 000</strong><br />
              末位 0 在<strong>百位</strong>上！
            </p>
            <div className="text-xs bg-amber-50 p-2 rounded-lg border border-amber-100 font-mono text-slate-800">
              精确度评定：<br />
              <strong className="text-blue-600">精确到百位</strong>
            </div>
          </div>

          {/* Example 3: 舍小不舍大原则 */}
          <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="font-mono text-base font-black text-emerald-800 mb-1">
              口诀：“舍小不舍大”
            </div>
            <p className="text-xs text-slate-600 mb-2">
              由四舍五入确定原数取值范围时，最后一位之后加减 5。
            </p>
            <div className="text-xs bg-emerald-50 p-2 rounded-lg border border-emerald-100 font-sans text-slate-800">
              ⚠️ 左边有等号，右边无等号！<br />
              <strong className="text-emerald-700">含左界，不含右界！</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
