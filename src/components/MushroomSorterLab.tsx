import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Check, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

interface MushroomSorterLabProps {
  onEarnCoins: (amount: number) => void;
}

interface NumberItem {
  id: string;
  label: string;
  value: number | string;
  isInteger: boolean;
  isFraction: boolean;
  isPositive: boolean;
  isNegative: boolean;
  isZero: boolean;
  isRational: boolean;
  explanation: string;
}

const CANDIDATE_NUMBERS: NumberItem[] = [
  { id: '1', label: '+12', value: 12, isInteger: true, isFraction: false, isPositive: true, isNegative: false, isZero: false, isRational: true, explanation: '+12 是正整数、正有理数。' },
  { id: '2', label: '-7', value: -7, isInteger: true, isFraction: false, isPositive: false, isNegative: true, isZero: false, isRational: true, explanation: '-7 是负整数、负有理数。' },
  { id: '3', label: '0', value: 0, isInteger: true, isFraction: false, isPositive: false, isNegative: false, isZero: true, isRational: true, explanation: '0 既不是正数也不是负数，是整数，也是自然数！' },
  { id: '4', label: '3/4', value: 0.75, isInteger: false, isFraction: true, isPositive: true, isNegative: false, isZero: false, isRational: true, explanation: '3/4 是正分数、正有理数。' },
  { id: '5', label: '-0.5', value: -0.5, isInteger: false, isFraction: true, isPositive: false, isNegative: true, isZero: false, isRational: true, explanation: '-0.5 = -1/2，是有限小数，属于负分数、负有理数！' },
  { id: '6', label: '-15/3', value: -5, isInteger: true, isFraction: false, isPositive: false, isNegative: true, isZero: false, isRational: true, explanation: '注意陷阱！-15/3 = -5，化简后是负整数，不是分数！' },
  { id: '7', label: 'π', value: 'pi', isInteger: false, isFraction: false, isPositive: true, isNegative: false, isZero: false, isRational: false, explanation: '高频考点！π 是无限不循环小数，属于无理数，不是有理数！' },
  { id: '8', label: '100%', value: 1, isInteger: true, isFraction: false, isPositive: true, isNegative: false, isZero: false, isRational: true, explanation: '100% = 1，是正整数！' }
];

export const MushroomSorterLab: React.FC<MushroomSorterLabProps> = ({ onEarnCoins }) => {
  const [classifyMode, setClassifyMode] = useState<'property' | 'definition'>('property');
  const [selectedNum, setSelectedNum] = useState<NumberItem | null>(null);
  const [sortedResults, setSortedResults] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' | 'info' }>({
    msg: '请先点击一个数字小方块，再点击对应的归类水管！',
    type: 'info'
  });

  const handleSelectNumber = (item: NumberItem) => {
    sound.playClick();
    setSelectedNum(item);
    setFeedback({
      msg: `已选中【${item.label}】，请点击下方正确的水管进行归类！`,
      type: 'info'
    });
  };

  const handlePipeDrop = (pipeCategory: string) => {
    if (!selectedNum) {
      setFeedback({ msg: '请先在上方点击选择一个数字方块！', type: 'error' });
      sound.playBump();
      return;
    }

    let isCorrect = false;

    if (classifyMode === 'property') {
      // 'positive' | 'zero' | 'negative' | 'irrational'
      if (pipeCategory === 'positive' && selectedNum.isPositive && selectedNum.isRational) isCorrect = true;
      if (pipeCategory === 'zero' && selectedNum.isZero) isCorrect = true;
      if (pipeCategory === 'negative' && selectedNum.isNegative && selectedNum.isRational) isCorrect = true;
      if (pipeCategory === 'irrational' && !selectedNum.isRational) isCorrect = true;
    } else {
      // 'integer' | 'fraction' | 'irrational'
      if (pipeCategory === 'integer' && selectedNum.isInteger && selectedNum.isRational) isCorrect = true;
      if (pipeCategory === 'fraction' && selectedNum.isFraction && selectedNum.isRational) isCorrect = true;
      if (pipeCategory === 'irrational' && !selectedNum.isRational) isCorrect = true;
    }

    if (isCorrect) {
      sound.playCoin();
      onEarnCoins(10);
      setSortedResults((prev) => ({ ...prev, [selectedNum.id]: pipeCategory }));
      setFeedback({
        msg: `🎉 成功归入！${selectedNum.explanation}`,
        type: 'success'
      });
      setSelectedNum(null);
    } else {
      sound.playBump();
      setFeedback({
        msg: `⚠️ 哎呀归类错了！提示：${selectedNum.explanation}`,
        type: 'error'
      });
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSortedResults({});
    setSelectedNum(null);
    setFeedback({ msg: '已重置！快来重新挑战有理数水管分类吧！', type: 'info' });
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 shadow-md mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍄</span>
            <h3 className="text-lg font-bold text-slate-900">
              有理数分类工坊：奇诺比奥的绿色水管
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              1.1 经典分类
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            课本手账核心：区分整数与分数、正数与负数，警惕 0 和圆周率 π 的分类陷阱！
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => {
              sound.playClick();
              setClassifyMode('property');
              setSortedResults({});
              setSelectedNum(null);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              classifyMode === 'property'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            按性质分类 (正/负/0)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setClassifyMode('definition');
              setSortedResults({});
              setSelectedNum(null);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              classifyMode === 'definition'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            按定义分类 (整数/分数)
          </button>
        </div>
      </div>

      {/* Feedback banner */}
      <div
        className={`my-4 p-3 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 transition-all ${
          feedback.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : feedback.type === 'error'
            ? 'bg-red-50 text-red-800 border border-red-200'
            : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}
      >
        <div className="flex items-center gap-2">
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : feedback.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>{feedback.msg}</span>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200 shrink-0"
        >
          <RefreshCw className="w-3 h-3" />
          <span>重置</span>
        </button>
      </div>

      {/* Candidate Numbers Pool */}
      <div className="mb-6">
        <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <span>🎯 待归类数字方块（点击选中）：</span>
          {Object.keys(sortedResults).length === CANDIDATE_NUMBERS.length && (
            <span className="text-emerald-600 font-extrabold animate-bounce">
              🌟 全部归类完成！获得分类大师勋章！
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
          {CANDIDATE_NUMBERS.map((item) => {
            const isSelected = selectedNum?.id === item.id;
            const isSorted = sortedResults[item.id] !== undefined;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectNumber(item)}
                className={`relative p-3 rounded-2xl border-2 font-mono text-base font-extrabold flex flex-col items-center justify-center transition-all ${
                  isSorted
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700 opacity-60'
                    : isSelected
                    ? 'bg-amber-100 border-amber-500 text-amber-900 shadow-md scale-105 ring-2 ring-amber-400'
                    : 'bg-white border-slate-200 hover:border-amber-400 text-slate-800 shadow-xs'
                }`}
              >
                <span>{item.label}</span>
                {isSorted && (
                  <span className="text-[10px] text-emerald-600 mt-1 font-sans font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> 已归入
                  </span>
                )}
                {isSelected && (
                  <span className="text-[9px] text-amber-700 mt-0.5 font-sans font-bold">
                    选中中...
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mario Warp Pipes Drop Target Area */}
      <div>
        <div className="text-xs font-bold text-slate-700 mb-2">
          {classifyMode === 'property'
            ? '🌊 选择性质水管（点击放入）：'
            : '📦 选择定义水管（点击放入）：'}
        </div>

        {classifyMode === 'property' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Positive Pipe */}
            <button
              onClick={() => handlePipeDrop('positive')}
              className="group p-4 rounded-2xl bg-gradient-to-b from-emerald-50 to-green-100 border-2 border-emerald-400 hover:border-emerald-600 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-16 h-12 rounded-t-xl bg-emerald-500 border-2 border-emerald-700 flex items-center justify-center text-white text-lg font-black shadow-inner">
                + 正
              </div>
              <div className="w-20 h-14 bg-emerald-600 border-2 border-emerald-800 rounded-b-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-md">
                <span>正有理数</span>
                <span className="text-[10px] text-emerald-200">&gt; 0 的数</span>
              </div>
            </button>

            {/* Zero Mystery Pipe */}
            <button
              onClick={() => handlePipeDrop('zero')}
              className="group p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-yellow-100 border-2 border-amber-400 hover:border-amber-600 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-16 h-12 rounded-t-xl bg-amber-500 border-2 border-amber-700 flex items-center justify-center text-white text-lg font-black shadow-inner">
                0 原点
              </div>
              <div className="w-20 h-14 bg-amber-600 border-2 border-amber-800 rounded-b-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-md">
                <span>0（中立界限）</span>
                <span className="text-[10px] text-amber-200">非正非负</span>
              </div>
            </button>

            {/* Negative Pipe */}
            <button
              onClick={() => handlePipeDrop('negative')}
              className="group p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-cyan-100 border-2 border-blue-400 hover:border-blue-600 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-16 h-12 rounded-t-xl bg-blue-500 border-2 border-blue-700 flex items-center justify-center text-white text-lg font-black shadow-inner">
                - 负
              </div>
              <div className="w-20 h-14 bg-blue-600 border-2 border-blue-800 rounded-b-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-md">
                <span>负有理数</span>
                <span className="text-[10px] text-blue-200">&lt; 0 的数</span>
              </div>
            </button>

            {/* Irrational Pipe */}
            <button
              onClick={() => handlePipeDrop('irrational')}
              className="group p-4 rounded-2xl bg-gradient-to-b from-purple-50 to-fuchsia-100 border-2 border-purple-400 hover:border-purple-600 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-16 h-12 rounded-t-xl bg-purple-500 border-2 border-purple-700 flex items-center justify-center text-white text-lg font-black shadow-inner">
                🚫 无理
              </div>
              <div className="w-20 h-14 bg-purple-600 border-2 border-purple-800 rounded-b-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-md">
                <span>无理数 (非有理数)</span>
                <span className="text-[10px] text-purple-200">无限不循环</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Integer Pipe */}
            <button
              onClick={() => handlePipeDrop('integer')}
              className="group p-4 rounded-2xl bg-gradient-to-b from-emerald-50 to-green-100 border-2 border-emerald-400 hover:border-emerald-600 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-20 h-12 rounded-t-xl bg-emerald-500 border-2 border-emerald-700 flex items-center justify-center text-white text-base font-black shadow-inner">
                整数管道
              </div>
              <div className="w-24 h-14 bg-emerald-600 border-2 border-emerald-800 rounded-b-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-md">
                <span>正整数 · 0 · 负整数</span>
                <span className="text-[10px] text-emerald-200">-15/3 化简为 -5 也在内</span>
              </div>
            </button>

            {/* Fraction Pipe */}
            <button
              onClick={() => handlePipeDrop('fraction')}
              className="group p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-100 border-2 border-amber-400 hover:border-amber-600 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-20 h-12 rounded-t-xl bg-amber-500 border-2 border-amber-700 flex items-center justify-center text-white text-base font-black shadow-inner">
                分数管道
              </div>
              <div className="w-24 h-14 bg-amber-600 border-2 border-amber-800 rounded-b-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-md">
                <span>正分数 · 负分数</span>
                <span className="text-[10px] text-amber-200">含所有有限/循环小数</span>
              </div>
            </button>

            {/* Irrational Pipe */}
            <button
              onClick={() => handlePipeDrop('irrational')}
              className="group p-4 rounded-2xl bg-gradient-to-b from-purple-50 to-fuchsia-100 border-2 border-purple-400 hover:border-purple-600 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-20 h-12 rounded-t-xl bg-purple-500 border-2 border-purple-700 flex items-center justify-center text-white text-base font-black shadow-inner">
                无理数管道
              </div>
              <div className="w-24 h-14 bg-purple-600 border-2 border-purple-800 rounded-b-md flex flex-col items-center justify-center text-white text-xs font-bold shadow-md">
                <span>无限不循环小数</span>
                <span className="text-[10px] text-purple-200">如 π 等</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
