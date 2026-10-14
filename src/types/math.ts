export type StageId = '1-1' | '1-2' | '1-3' | '1-4' | 'boss';

export interface StageInfo {
  id: StageId;
  name: string;
  subTitle: string;
  marioWorldName: string;
  themeColor: string;
  icon: string;
  description: string;
  keyFormulas: string[];
}

export interface TextbookKnowledgeItem {
  id: string;
  title: string;
  stars: number; // 1 to 3 stars from the textbook
  coreConcept: string;
  handwrittenNote: string; // 仿初中知识清单学生手绘/名师旁白
  commonMistake: string;   // 易混对比与温馨提示
  formula?: string;
  marioTip: string;        // 马里奥小贴士
  example: {
    question: string;
    answer: string;
    analysis: string;
  };
}

export interface QuizQuestion {
  id: string;
  stageId: StageId;
  title: string;
  storyContext: string; // 马里奥情境故事
  mathQuestion: string;
  options: {
    key: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: {
    steps: string[];
    teacherNote: string; // 名师旁白
    marioWisdom: string; // 马里奥通关秘籍
  };
  coinsReward: number;
  difficulty: 'easy' | 'medium' | 'boss';
}

export interface ChapterRoadmapItem {
  chapterNumber: number;
  title: string;
  category: '代数入门' | '代数精馏' | '函数思想' | '空间与图形' | '统计与概率';
  status: 'active' | 'locked' | 'coming-soon';
  pageRange: string;
  description: string;
}

export interface UserGameState {
  currentStage: StageId;
  coins: number;
  stars: number;
  hp: number;
  soundEnabled: boolean;
  completedStages: Record<StageId, boolean>;
  quizScores: Record<string, boolean>;
}
