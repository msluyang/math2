import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types/math';
import { QUIZ_QUESTIONS, MARIO_IMAGES } from '../data/chapterOneData';
import { sound } from '../utils/audio';
import { Sparkles, Trophy, Heart, Flame, ShieldAlert, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface BossCastleQuizProps {
  onEarnCoins: (amount: number) => void;
  onEarnStars: (amount: number) => void;
  onCompleteChapter: () => void;
}

export const BossCastleQuiz: React.FC<BossCastleQuizProps> = ({
  onEarnCoins,
  onEarnStars,
  onCompleteChapter,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [bowserHp, setBowserHp] = useState<number>(100);
  const [playerHp, setPlayerHp] = useState<number>(3);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (key: string) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedAnswer(key);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    if (isCorrect) {
      sound.playPowerup();
      onEarnCoins(currentQ.coinsReward);
      setCorrectCount((prev) => prev + 1);
      setBowserHp((prev) => Math.max(0, prev - 10));

      // Fireworks
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      sound.playBump();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPlayerHp((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    sound.playJump();
    if (currentIdx + 1 < QUIZ_QUESTIONS.length && playerHp > 0) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished
      setIsFinished(true);
      if (playerHp > 0 && correctCount >= 7) {
        sound.playVictory();
        onEarnStars(3);
        onCompleteChapter();
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setBowserHp(100);
    setPlayerHp(3);
    setCorrectCount(0);
    setIsFinished(false);
  };

  // If Game Over or Victory Screen
  if (isFinished) {
    const isVictory = playerHp > 0 && correctCount >= 6;

    return (
      <div className="bg-white rounded-3xl border-4 border-amber-400 p-8 shadow-xl text-center mb-8">
        <div className="max-w-lg mx-auto">
          {isVictory ? (
            <>
              <div className="w-20 h-20 rounded-3xl bg-amber-400 text-amber-950 flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg animate-mario-bounce">
                👑
              </div>
              <h3 className="font-game text-2xl sm:text-3xl font-extrabold text-amber-900 mb-2">
                恭喜通关！第一章有理数大获全胜！
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                你成功答对了 <strong className="text-emerald-600 text-lg">{correctCount}</strong> / {QUIZ_QUESTIONS.length} 道挑战题！解开了酷霸王的全部封印，救出了碧姬公主！
              </p>

              {/* Reward Medal */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-300 shadow-sm mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
                  <span className="font-game text-xl font-black text-amber-900">
                    获得【初中数学·有理数大师勋章】
                  </span>
                  <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
                </div>
                <p className="text-xs text-amber-800">
                  掌握了正负数、数轴、相反数、绝对值、四则运算、乘方与科学记数法！
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-amber-500 text-white font-extrabold text-sm shadow-md hover:from-red-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>再次挑战酷霸王城堡</span>
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center text-4xl mx-auto mb-4 shadow-md">
                💔
              </div>
              <h3 className="font-game text-2xl font-extrabold text-slate-800 mb-2">
                城堡挑战失败，不要气馁！
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                酷霸王的数学魔法很狡猾。建议点击上方【手账式知识清单】复习错题，重整旗鼓再来闯关！
              </p>
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>恢复满血，重新挑战</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl border-4 border-red-500 shadow-xl overflow-hidden mb-8 transition-transform ${shake ? 'animate-bounce' : ''}`}>
      
      {/* Boss Arena Banner Header */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={MARIO_IMAGES.bossCastle}
          alt="酷霸王城堡"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <span className="bg-red-600/90 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md border border-red-400">
              🏰 第1章终极大决战 · 关卡 {currentIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>

            {/* Mario Hearts */}
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
              <span className="text-[11px] font-bold text-slate-300 mr-1">马里奥生命:</span>
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${
                    i < playerHp ? 'text-red-500 fill-red-500' : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bowser HP Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-extrabold mb-1">
              <span className="flex items-center gap-1.5 text-red-400">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>酷霸王魔法盾 HP:</span>
              </span>
              <span className="font-mono text-amber-300">{bowserHp} / 100</span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-red-500/50">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 transition-all duration-500"
                style={{ width: `${bowserHp}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Question Card */}
      <div className="p-6 sm:p-8">
        
        {/* Story context */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 mb-5 flex items-start gap-2.5">
          <span className="text-xl shrink-0">🐢</span>
          <div>
            <strong className="block font-bold mb-0.5 text-amber-900">
              【剧情挑战】{currentQ.title}
            </strong>
            <p className="text-slate-700 leading-relaxed font-sans">
              {currentQ.storyContext}
            </p>
          </div>
        </div>

        {/* Question Statement */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQ.mathQuestion}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswer === opt.key;
            const isCorrect = opt.key === currentQ.correctAnswer;

            let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-300';
              } else {
                optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'bg-amber-100 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-400';
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                disabled={isAnswerSubmitted}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-black text-sm text-slate-700 shrink-0">
                    {opt.key}
                  </span>
                  <span className="font-medium text-sm">
                    {opt.text}
                  </span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full py-3.5 rounded-2xl bg-linear-to-r from-red-500 to-amber-500 text-white font-extrabold text-sm shadow-md hover:from-red-600 hover:to-amber-600 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            <span>发射数学火球！提交答案</span>
            <Flame className="w-4 h-4 fill-white" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>下一道关卡</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* 5·3 Style Annotated Explanation Box (Revealed after submission) */}
        {isAnswerSubmitted && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white border-2 border-slate-700 shadow-md animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>初中知识清单 · 名师手账式批注解析</span>
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                正确答案：【{currentQ.correctAnswer}】
              </span>
            </div>

            {/* Step-by-step resolution */}
            <div className="space-y-2 mb-4 text-xs text-slate-300">
              {currentQ.explanation.steps.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono shrink-0">第{sIdx + 1}步：</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Teacher note & Mario tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
                <span className="text-emerald-400 font-bold block mb-1">
                  👨‍🏫 名师旁白助记：
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {currentQ.explanation.teacherNote}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs">
                <span className="text-red-400 font-bold block mb-1">
                  🍄 马里奥通关秘籍：
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {currentQ.explanation.marioWisdom}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
