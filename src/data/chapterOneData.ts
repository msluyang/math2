import { StageInfo, TextbookKnowledgeItem, QuizQuestion, ChapterRoadmapItem } from '../types/math';

export const MARIO_IMAGES = {
  worldMap: '/src/assets/images/mario_world_map_1791949379037.jpg',
  numberLine: '/src/assets/images/mario_number_line_1791949378721.jpg',
  powerup: '/src/assets/images/mario_math_powerup_1791949379710.jpg',
  bossCastle: '/src/assets/images/mario_boss_castle_1791949379958.jpg',
};

export const STAGES: StageInfo[] = [
  {
    id: '1-1',
    name: '1.1 有理数的有关概念',
    subTitle: '正负数 · 数轴 · 相反数 · 绝对值',
    marioWorldName: '第1关：数轴之森与正负蘑菇',
    themeColor: 'emerald',
    icon: 'Trees',
    description: '跟随马里奥探索数轴大道！认识具有相反意义的量，解救原点两边的正负蘑菇，解密相反数与绝对值的奥秘！',
    keyFormulas: ['a + (-a) = 0', '|a| ≥ 0', '0 既不是正数也不是负数', '右边的数 > 左边的数']
  },
  {
    id: '1-2',
    name: '1.2 有理数的四则运算',
    subTitle: '加减法则 · 乘除倒数 · 巧算秘籍',
    marioWorldName: '第2关：四则能量管道与金币撞击',
    themeColor: 'amber',
    icon: 'Calculator',
    description: '撞击问号方块！掌握“减变加，两变一不变”的魔法，用“奇负偶正”雷达探查乘除符号，收集速算金币！',
    keyFormulas: ['a - b = a + (-b)', '同号得正，异号得负', 'a ÷ b = a · (1/b)', 'a(b+c) = ab + ac']
  },
  {
    id: '1-3',
    name: '1.3 有理数的乘方',
    subTitle: '底数与指数 · 奇负偶正 · 尾数循环律',
    marioWorldName: '第3关：乘方云海与超级无敌星',
    themeColor: 'purple',
    icon: 'Sparkles',
    description: '乘坐耀西飞向乘方云海！领悟 aⁿ 的几何级爆炸力量，辨清 (-3)² 与 -3² 的经典陷阱，探索神秘的尾数循环规律！',
    keyFormulas: ['(-a)ⁿ: 奇负偶正', '(-3)² = 9 ≠ -3² = -9', 'aⁿ = a · a · ... · a (n个a)']
  },
  {
    id: '1-4',
    name: '1.4 科学记数法与近似数',
    subTitle: 'a × 10ⁿ · 精确度 · 舍小不舍大',
    marioWorldName: '第4关：浩瀚宇宙与奇诺比奥望远镜',
    themeColor: 'blue',
    icon: 'Telescope',
    description: '向蘑菇王国的外太空发射探针！用科学记数法丈量608亿米宇宙，用精确度标尺锁定四舍五入的取值范围！',
    keyFormulas: ['a × 10ⁿ (1 ≤ |a| < 10)', 'n = 整数位数 - 1', '近似数取值范围：舍小不舍大']
  },
  {
    id: 'boss',
    name: '酷霸王城堡：终极数学大决战',
    subTitle: '初中数学名师精选 10 道关卡真题综合测验',
    marioWorldName: '终极挑战：攻克酷霸王数学城堡！',
    themeColor: 'red',
    icon: 'Castle',
    description: '酷霸王抓走了碧姬公主并用有理数魔法封印了大门！用第一章的智慧解答真题，释放火球打败酷霸王！',
    keyFormulas: ['综合实战', '满分宝典', '名师手账式批注解析']
  }
];

export const CHAPTER_ONE_KNOWLEDGE: Record<string, TextbookKnowledgeItem[]> = {
  '1-1': [
    {
      id: 'k1-1-1',
      title: '正数与负数（相反意义的量）',
      stars: 2,
      coreConcept: '大于0的数叫做正数（如 +12, 1.3）；在正数前面加上负号“-”的数叫做负数（如 -5, -0.1）。具有相反意义的量成对出现（如向东/向西，收入/支出，盈利/亏损）。',
      handwrittenNote: '【批注式讲解】0既不是正数，也不是负数！0是正数和负数的分界线，也是最小的自然数。如果向东走 3m 记作 +3m，那么向西走 5m 就记作 -5m！',
      commonMistake: '易错点：“节约3吨汽油与浪费1吨水”不是具有相反意义的量，因为它们不是同类量！必须“属性相同、方向相反”。',
      marioTip: '马里奥往右跑收集金币是正数（+），被板栗仔碰倒扣分是负数（-）！0就像原地不动的水管入口！',
      example: {
        question: '如果某天马里奥在地下水管向下移动 4m 记作 -4m，那么向上跳跃 6m 记作什么？',
        answer: '+6m（或 6m）',
        analysis: '向上与向下是具有相反意义的量。向下为负，则向上为正。'
      }
    },
    {
      id: 'k1-1-2',
      title: '有理数及其分类',
      stars: 1,
      coreConcept: '整数和分数统称为有理数。按定义分为：整数（正整数、0、负整数）和分数（正分数、负分数）。按性质分为：正有理数、0、负有理数。',
      handwrittenNote: '【分类图解】所有的有限小数和无限循环小数都可以化为分数，所以它们都是有理数！但是无限不循环小数（如圆周率 π）不是有理数！',
      commonMistake: '易错点：不要把 0 漏掉！0 是整数，也是非正数、非负数。',
      marioTip: '就像蘑菇王国里的角色分类：马里奥和路易吉都是水管工家族（整数），而半个蘑菇是分数，大家都在有理数大家庭里！',
      example: {
        question: '在 -3, 0, 2/3, -0.15, π, 100 中，非负有理数有哪些？',
        answer: '0, 2/3, 100',
        analysis: '非负有理数包含正有理数和0。-3和-0.15是负数，π是无理数，故非负有理数为 0, 2/3, 100。'
      }
    },
    {
      id: 'k1-1-3',
      title: '数轴（三要素与点的移动）',
      stars: 2,
      coreConcept: '规定了原点、正方向和单位长度的直线叫做数轴。数轴上任意一个有理数都可以用唯一点来表示。在数轴上，右边的点表示的数总比左边的点表示的数大。',
      handwrittenNote: '【三要素口诀】原点、正向、单位长，一条直线无限长！画数轴别画成线段，箭头代表正方向！',
      commonMistake: '易错点：数轴上的点向右移动加，向左移动减。从点 A(-2) 向右移动 5 个单位，新数是 -2 + 5 = 3。',
      marioTip: '数轴就是马里奥横版过关大地图！原点是城堡正中央，往右是旗杆（+），往左是地下密道（-）！',
      example: {
        question: '点 A 在数轴上表示 -2，向右移动 5 个单位到达点 B，再向左移动 2 个单位到达点 C，点 C 表示的数是？',
        answer: '1',
        analysis: '-2 + 5 = 3；3 - 2 = 1。'
      }
    },
    {
      id: 'k1-1-4',
      title: '相反数与绝对值',
      stars: 3,
      coreConcept: '只有符号不同的两个数互为相反数（a 与 -a 互为相反数，a + (-a) = 0；0的相反数是0）。数轴上表示数 a 的点到原点的距离叫做数 a 的绝对值，记作 |a|。|a| ≥ 0。',
      handwrittenNote: '【代数意义】正数的绝对值是它本身；负数的绝对值是它的相反数；0的绝对值是0。|a| = a (a>0), 0 (a=0), -a (a<0)。',
      commonMistake: '易错点：“-a”不一定是负数！当 a 是负数时，-a 反而是正数（如 a = -3，-a = 3）。两个负数比较大小：绝对值大的反而小！',
      marioTip: '绝对值就是看你距离原点城堡有多少格步数，不管你在左边还是右边，步数永远不可能是负的！',
      example: {
        question: '比较大小：-7 与 -2；化简：-[-(-3)]。',
        answer: '-7 < -2；-[-(-3)] = -3',
        analysis: '|-7|=7, |-2|=2，因为7>2，所以两个负数比较绝对值大的反而小，即 -7 < -2。多重符号奇负偶正：有3个负号，结果为负，即 -3。'
      }
    }
  ],
  '1-2': [
    {
      id: 'k1-2-1',
      title: '有理数的加法与减法',
      stars: 3,
      coreConcept: '加法法则：同号相加，取相同符号并绝对值相加；绝对值不等的异号相加，取绝对值较大者符号并大减小；互为相反数相加得0。减法法则：减去一个数，等于加上这个数的相反数（a - b = a + (-b)，“减变加，两变一不变”）。',
      handwrittenNote: '【口诀助记】同号同正同负加，异号相争大减小！减号变加号，减数变相反，被减数千万不要变！',
      commonMistake: '易错点：(-5) + (+2) = -(5-2) = -3；而 3 - (-5) = 3 + (+5) = 8。不要把符号弄混！',
      marioTip: '马里奥吃了毒蘑菇掉血（负数加法），如果击碎毒蘑菇扣除负面buff（减去负数），相当于生命值增加了！',
      example: {
        question: '计算：(-20) + (+13) 与 (-3) - (-7)',
        answer: '-7 与 4',
        analysis: '(-20)+(+13) = -(20-13) = -7；(-3)-(-7) = (-3)+7 = +(7-3) = 4。'
      }
    },
    {
      id: 'k1-2-2',
      title: '加法简便运算五大招式',
      stars: 2,
      coreConcept: '1. 相反数结合法（互为相反数先结合得0）；2. 凑整法（能凑成整数的先加）；3. 同号结合法；4. 同分母结合法；5. 拆分法（带分数拆成整数和真分数）。',
      handwrittenNote: '【老师旁白】合理运用交换律和结合律，能把十几行的繁琐算式在2秒钟内秒杀！一定要带着性质符号一起交换！',
      commonMistake: '易错点：交换加数位置时，切记符号是数字的随身行李，必须连同前面的“+”或“-”号一起搬家！',
      marioTip: '就像马里奥连吃金币触发连击加成！先找+5和-5这对相反数直接消除，快速通关！',
      example: {
        question: '简便计算：(+26) + (-14) + (-16) + (+18)',
        answer: '14',
        analysis: '同号结合：[(+26)+(+18)] + [(-14)+(-16)] = 44 + (-30) = 14。'
      }
    },
    {
      id: 'k1-2-3',
      title: '有理数乘除法与“奇负偶正”',
      stars: 3,
      coreConcept: '两数相乘除：同号得正，异号得负，并把绝对值相乘除。多个非零因数相乘：负因数个数为奇数时积为负，为偶数时积为正（奇负偶正）。乘积为1的两个数互为倒数（0没有倒数）。除以一个数等于乘以它的倒数。',
      handwrittenNote: '【乘法分配律】a(b + c) = ab + ac，逆向使用即提取公因数：ab + ac = a(b + c)。算式里如果有因数0，整个乘积立即为0！',
      commonMistake: '易错点：-1的倒数是-1；0不能作除数；求带分数的倒数必须先化为假分数！',
      marioTip: '问号方块里的负号炸弹！数一数一共有几个负号：1个炸弹是负，2个炸弹相互消解变安全金币（正），3个是负，4个是正！',
      example: {
        question: '计算：(-12) ÷ (-3) 与 (-2) × (-3) × (-5)',
        answer: '4 与 -30',
        analysis: '(-12)÷(-3) = +(12÷3) = 4；3个负因数（奇数个），积为负：-(2×3×5) = -30。'
      }
    }
  ],
  '1-3': [
    {
      id: 'k1-3-1',
      title: '乘方的意义与读法',
      stars: 2,
      coreConcept: '求 n 个相同因数的积的运算叫做乘方，乘方的结果叫做幂。在 aⁿ 中，a 叫做底数，n 叫做指数。aⁿ 读作 a 的 n 次方（或 a 的 n 次幂）。',
      handwrittenNote: '【书写规范】当底数是负数或分数时，一定要用括号把底数括起来！如 (-2)⁴ 不能写成 -2⁴；(2/3)² 不能写成 2/3²。',
      commonMistake: '【超高频考点】(-3)² 与 -3² 区别：(-3)² 是两个 (-3) 相乘，结果是 9；而 -3² 是 3² 的相反数，等于 -(3×3) = -9！',
      marioTip: '马里奥吃无敌星！底数是马里奥，指数是连跳次数！(-2)⁴ 表示马里奥带护盾连跳4次，负号也被护盾乘了4次变成了正能量+16！',
      example: {
        question: '计算 (-1)²⁰²⁶ 与 -1²⁰²⁶ 的值。',
        answer: '1 与 -1',
        analysis: '(-1)²⁰²⁶ 指数是偶数，结果为正数 1；而 -1²⁰²⁶ 的底数是 1，负号在外面，结果为 -(1²⁰²⁶) = -1。'
      }
    },
    {
      id: 'k1-3-2',
      title: '乘方符号法则与混合运算顺序',
      stars: 3,
      coreConcept: '法则：正数的任何次幂都是正数；负数的奇数次幂是负数，负数的偶数次幂是正数；0的任何正整数次幂都是0。混合运算顺序：先乘方，再乘除，最后加减；有括号先算括号内。',
      handwrittenNote: '【运算层级金字塔】顶层：乘方(Power) -> 中层：乘除(Multiply/Divide) -> 基层：加减(Add/Subtract)。括号插队先算！',
      commonMistake: '易错点：计算 -72 - 3 × [(-2) + (-1)²⁰¹⁸] 时，先算方括号内的乘方 (-1)²⁰¹⁸ = 1，不要先做 -72 - 3！',
      marioTip: '先吃乘方大蘑菇，再踩乘除管道，最后走加减平地！遵守规则才能顺利通关打Boss！',
      example: {
        question: '计算：-2³ + (-3)² × (-1)³',
        answer: '-17',
        analysis: '-2³ = -8；(-3)² = 9；(-1)³ = -1。原式 = -8 + 9 × (-1) = -8 + (-9) = -17。'
      }
    },
    {
      id: 'k1-3-3',
      title: '乘方的规律探索（末位数字循环）',
      stars: 3,
      coreConcept: '同一个数字乘方的末位数字具有周期性循环规律。通过计算前几次乘方观察尾数周期，用指数除以周期，看余数确定答案。',
      handwrittenNote: '【课本经典题】求 3²⁰⁰⁹ + 1 的个位数字：3¹=3, 3²=9, 3³=27(尾7), 3⁴=81(尾1), 3⁵=243(尾3)... 周期为4！2009 ÷ 4 = 502 余 1，所以 3²⁰⁰⁹ 尾数与 3¹ 相同为 3，故 3²⁰⁰⁹+1 尾数是 3+1 = 4！',
      commonMistake: '易错点：除尽时余数视为周期最后一个数，如指数是 2008，除以 4 余 0，个位就是第 4 个数字 1。',
      marioTip: '就像旋转火球机关！每转4圈回到原点，算好余数就能精准踩中机关！',
      example: {
        question: '2¹⁰¹ 的个位数字是多少？',
        answer: '2',
        analysis: '2的幂末位依次为 2, 4, 8, 6, 周期为4。101 ÷ 4 = 25 余 1，对应周期的第1个数，所以个位数字是 2。'
      }
    }
  ],
  '1-4': [
    {
      id: 'k1-4-1',
      title: '科学记数法 a × 10ⁿ',
      stars: 3,
      coreConcept: '把一个大于10的数表示成 a × 10ⁿ 的形式（其中 1 ≤ |a| < 10，n 为正整数），这种记数法叫做科学记数法。n 的值等于原数整数位数减 1（或者将小数点向左移动了几位，n 就是几）。',
      handwrittenNote: '【口诀】a 只要一位整数(1到9之间)，n 是整数位数减去1！负数也能用科学记数法，负号照写在最前面即可，如 -365 000 = -3.65 × 10⁵。',
      commonMistake: '易错点：不要写成 60.8 × 10⁹ 或 0.608 × 10¹¹，因为 a 必须满足 1 ≤ |a| < 10！',
      marioTip: '城堡里堆了 60800000000 颗金币？数数一共有11位数，写成 6.08 × 10¹⁰，不仅省纸还超酷！',
      example: {
        question: '我国陆地面积约 9 600 000 平方千米，用科学记数法表示为？',
        answer: '9.6 × 10⁶ 平方千米',
        analysis: '原数整数位数为 7 位，所以指数 n = 7 - 1 = 6，a = 9.6，记作 9.6 × 10⁶。'
      }
    },
    {
      id: 'k1-4-2',
      title: '近似数与精确度（舍小不舍大）',
      stars: 2,
      coreConcept: '近似数与准确数很接近。四舍五入到哪一位，就说这个近似数精确到哪一位。注意：近似数末尾的“0”不能随便去掉，它代表精确度！',
      handwrittenNote: '【取值范围口诀】舍小不舍大！近似数 1.20，在最后一位(百分位)的下一位加减5，其取值范围是：1.195 ≤ a < 1.205（注意：左边含等号，右边不含等号）！',
      commonMistake: '易错点：近似数 6.30万 不能直接看最后一位是0就说精确到个位，6.30万 = 63 000，这里的“0”在百位，所以精确到百位！',
      marioTip: '马里奥体重 51 kg，碧姬公主体重 51.0 kg。虽然数值一样，但公主更精准（精确到0.1kg）哦！',
      example: {
        question: '近似数 3.50 × 10⁴ 精确到哪一位？',
        answer: '百位',
        analysis: '3.50 × 10⁴ = 35 000，最后一位有效数字 0 处于百位上，因此精确到百位。'
      }
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    stageId: '1-1',
    title: '第一关挑战 1：正负数与相反意义的量',
    storyContext: '马里奥在蘑菇王国记录金币收支。如果马里奥通过吃金币赚取 50 金币记作 +50 金币...',
    mathQuestion: '如果赚取 50 金币记作 +50 金币，那么马里奥被酷霸王的小怪偷走 30 金币应记作？',
    options: [
      { key: 'A', text: '+30 金币' },
      { key: 'B', text: '-30 金币' },
      { key: 'C', text: '+20 金币' },
      { key: 'D', text: '-20 金币' }
    ],
    correctAnswer: 'B',
    explanation: {
      steps: [
        '赚取与被偷走属于具有相反意义的量。',
        '既然“赚取”记作正号“+”，那么“被偷走/损失”就记作负号“-”。',
        '因此损失 30 金币应记作 -30 金币。'
      ],
      teacherNote: '具有相反意义的量成对出现，规定其中一种为正，则与之相反的量必须记为负。',
      marioWisdom: '记住：负号就是失去了金币！'
    },
    coinsReward: 10,
    difficulty: 'easy'
  },
  {
    id: 'q2',
    stageId: '1-1',
    title: '第一关挑战 2：数轴上的跳跃',
    storyContext: '马里奥站在数轴上的点 A（坐标为 -3），他吃下超级弹簧，向右大跳 7 个单位到达点 B...',
    mathQuestion: '点 A 在数轴上表示 -3，向右移动 7 个单位到达点 B，那么点 B 表示的数是？',
    options: [
      { key: 'A', text: '-10' },
      { key: 'B', text: '+10' },
      { key: 'C', text: '+4' },
      { key: 'D', text: '-4' }
    ],
    correctAnswer: 'C',
    explanation: {
      steps: [
        '在数轴上，向右移动对应“加”，向左移动对应“减”。',
        '点 A 从 -3 向右移动 7 个单位，计算式为：-3 + 7。',
        '异号相加，取绝对值大者的符号并大减小：+(7 - 3) = 4。'
      ],
      teacherNote: '数轴几何移动口诀：“左减右加”。向右跳跃就是不断向正方向前进！',
      marioWisdom: '从 -3 起跳，跨过原点 0，稳稳落在 +4！'
    },
    coinsReward: 15,
    difficulty: 'easy'
  },
  {
    id: 'q3',
    stageId: '1-1',
    title: '第一关挑战 3：绝对值与负数比大小',
    storyContext: '酷霸王派出两个冰霜小怪，分别带着标牌 -8 和 -5 想要挡住城堡去路...',
    mathQuestion: '请比较大小：-8 与 -5 的大小关系是？',
    options: [
      { key: 'A', text: '-8 > -5' },
      { key: 'B', text: '-8 < -5' },
      { key: 'C', text: '-8 = -5' },
      { key: 'D', text: '无法比较' }
    ],
    correctAnswer: 'B',
    explanation: {
      steps: [
        '求两个数的绝对值：|-8| = 8，|-5| = 5。',
        '因为 8 > 5（-8 到原点的距离更远，在数轴更左侧）。',
        '法则：两个负数比较大小，绝对值大的反而小！',
        '所以 -8 < -5。'
      ],
      teacherNote: '数轴上右边的数总比左边大。-8 在 -5 的左边，所以 -8 小于 -5。',
      marioWisdom: '越冷的地下深渊负得越多，数值反而越小！'
    },
    coinsReward: 15,
    difficulty: 'medium'
  },
  {
    id: 'q4',
    stageId: '1-2',
    title: '第二关挑战 1：减变加的奥秘',
    storyContext: '马里奥遇到一道机关门，门锁上写着算式：(-5) - (-9)...',
    mathQuestion: '计算 (-5) - (-9) 的结果是？',
    options: [
      { key: 'A', text: '-14' },
      { key: 'B', text: '-4' },
      { key: 'C', text: '+4' },
      { key: 'D', text: '+14' }
    ],
    correctAnswer: 'C',
    explanation: {
      steps: [
        '运用有理数减法法则：“减去一个数，等于加上这个数的相反数”。',
        '即：(-5) - (-9) = (-5) + (+9)。',
        '异号两数相加，取绝对值较大者的符号，并用较大的绝对值减去较小的绝对值：+(9 - 5) = +4。'
      ],
      teacherNote: '减变加，两变一不变：被减数 -5 不变，减号“-”变“+”，减数 -9 变成它的相反数 +9。',
      marioWisdom: '负负得正，机关大门瞬间开启！'
    },
    coinsReward: 15,
    difficulty: 'easy'
  },
  {
    id: 'q5',
    stageId: '1-2',
    title: '第二关挑战 2：连续相乘的“奇负偶正”',
    storyContext: '路易吉在水管里拾取了4个带符号能量球：(-2) × (-1) × (-3) × (-5)...',
    mathQuestion: '计算 (-2) × (-1) × (-3) × (-5) 的结果是？',
    options: [
      { key: 'A', text: '-30' },
      { key: 'B', text: '+30' },
      { key: 'C', text: '-60' },
      { key: 'D', text: '+60' }
    ],
    correctAnswer: 'D',
    explanation: {
      steps: [
        '第一步审定符号：式子中共有 4 个负因数。',
        '4 是偶数，根据“奇负偶正”法则，积的符号必定为正号“+”。',
        '第二步把绝对值相乘：2 × 1 × 3 × 5 = 30 × 2 = 60。',
        '因此最终结果为 +60。'
      ],
      teacherNote: '先定符号，再定数值！养成好习惯，计算快准狠。',
      marioWisdom: '4个负号凑成两对，负负得正，变成大金币 +60！'
    },
    coinsReward: 20,
    difficulty: 'medium'
  },
  {
    id: 'q6',
    stageId: '1-3',
    title: '第三关挑战 1：真假护盾大辨析',
    storyContext: '问号方块里藏着真假无敌星！马里奥必须分清 (-2)⁴ 与 -2⁴ 的本质区别...',
    mathQuestion: '关于 (-2)⁴ 和 -2⁴ 的计算结果，下列说法正确的是？',
    options: [
      { key: 'A', text: '(-2)⁴ = 16，-2⁴ = -16' },
      { key: 'B', text: '两者都等于 16' },
      { key: 'C', text: '两者都等于 -16' },
      { key: 'D', text: '(-2)⁴ = -16，-2⁴ = 16' }
    ],
    correctAnswer: 'A',
    explanation: {
      steps: [
        '(-2)⁴ 的底数是 -2，表示 4 个 (-2) 相乘：(-2)×(-2)×(-2)×(-2) = 16。',
        '-2⁴ 的底数是 2，负号在乘方外，表示 2⁴ 的相反数：-(2×2×2×2) = -16。',
        '因此 (-2)⁴ = 16，而 -2⁴ = -16。'
      ],
      teacherNote: '初中高频必考大陷阱！有括号底数带负号，没括号底数只有数字！',
      marioWisdom: '括号就像小钢盔，戴上了钢盔负号才跟着一起升级！'
    },
    coinsReward: 20,
    difficulty: 'medium'
  },
  {
    id: 'q7',
    stageId: '1-3',
    title: '第三关挑战 2：乘方尾数周期规律',
    storyContext: '奇诺比奥转动能量转盘，发现底数 3 的幂次尾数很有节律（3¹=3, 3²=9, 3³=27, 3⁴=81, 3⁵=243...）...',
    mathQuestion: '请问 3²⁰²⁵ + 1 的个位数字是多少？',
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '4' },
      { key: 'C', text: '8' },
      { key: 'D', text: '0' }
    ],
    correctAnswer: 'B',
    explanation: {
      steps: [
        '观察 3 的幂个位数字变化：3¹->3, 3²->9, 3³->7, 3⁴->1, 3⁵->3... 每 4 次为一个循环周期：3, 9, 7, 1。',
        '求 3²⁰²⁵ 的个位数：用指数除以周期：2025 ÷ 4 = 506 余 1。',
        '余数是 1，对应周期中第 1 个数，即 3。所以 3²⁰²⁵ 的个位数字是 3。',
        '因此 3²⁰²⁵ + 1 的个位数字为 3 + 1 = 4。'
      ],
      teacherNote: '课本第15页例2变形题！利用周期性规律与除法求余数解决高次幂个位问题。',
      marioWisdom: '掌握规律，算 2025 次方比算个位数还轻松！'
    },
    coinsReward: 25,
    difficulty: 'boss'
  },
  {
    id: 'q8',
    stageId: '1-4',
    title: '第四关挑战 1：科学记数法表示宏大数字',
    storyContext: '蘑菇王国的超级火箭飞往距地球约 384 000 千米的月球...',
    mathQuestion: '将数据 384 000 用科学记数法表示，正确的是？',
    options: [
      { key: 'A', text: '38.4 × 10⁴' },
      { key: 'B', text: '3.84 × 10⁵' },
      { key: 'C', text: '3.84 × 10⁶' },
      { key: 'D', text: '0.384 × 10⁶' }
    ],
    correctAnswer: 'B',
    explanation: {
      steps: [
        '科学记数法要求写成 a × 10ⁿ 形式，其中 1 ≤ |a| < 10。',
        '原数 384 000 是一个 6 位整数。',
        '指数 n = 整数位数 - 1 = 6 - 1 = 5。',
        '所以 a = 3.84，结果为 3.84 × 10⁵。'
      ],
      teacherNote: '检查 a 是否在 [1, 10) 之间，检查 n 是否等于原数小数点向左移动的位数。',
      marioWisdom: '小数点跳5步，就是 3.84 × 10⁵！'
    },
    coinsReward: 15,
    difficulty: 'easy'
  },
  {
    id: 'q9',
    stageId: '1-4',
    title: '第四关挑战 2：近似数取值范围“舍小不舍大”',
    storyContext: '碧姬公主用精密天平测量魔法宝石，称得质量约为 1.20 克（四舍五入得出）...',
    mathQuestion: '某近似数 1.20 是由数 a 四舍五入得到的，那么数 a 的取值范围是？',
    options: [
      { key: 'A', text: '1.15 < a < 1.25' },
      { key: 'B', text: '1.15 ≤ a < 1.25' },
      { key: 'C', text: '1.195 < a < 1.205' },
      { key: 'D', text: '1.195 ≤ a < 1.205' }
    ],
    correctAnswer: 'D',
    explanation: {
      steps: [
        '近似数 1.20 精确到百分位（0.01）。',
        '考虑千分位（第三位小数）四舍五入。',
        '最小达到 1.195 时五入成为 1.20（含等号）；',
        '最大不能达到 1.205（如果等于1.205就会进位成1.21），所以要小于 1.205（不含等号）。',
        '口诀：“舍小不舍大”，即 1.195 ≤ a < 1.205。'
      ],
      teacherNote: '课本第17页例4中考母题！左边有等于号，右边绝无等于号！',
      marioWisdom: '左闭右开，舍小不舍大，宝石精准锁定！'
    },
    coinsReward: 25,
    difficulty: 'boss'
  },
  {
    id: 'q10',
    stageId: 'boss',
    title: '酷霸王城堡终极大决战：综合思维题',
    storyContext: '酷霸王使出终极魔法盾：已知 |a - 1| + (b - 2)² = 0，如果答不出 a + b 的值，城堡大门就将永久关闭！',
    mathQuestion: '若 |a - 1| + (b - 2)² = 0，则 a + b 的值是？',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '3' },
      { key: 'D', text: '-1' }
    ],
    correctAnswer: 'C',
    explanation: {
      steps: [
        '根据绝对值和偶次方的非负性：|a - 1| ≥ 0 且 (b - 2)² ≥ 0。',
        '两个非负数相加等于 0，则每一个非负数都必须等于 0！',
        '因此：|a - 1| = 0 得到 a - 1 = 0，解得 a = 1。',
        '同理：(b - 2)² = 0 得到 b - 2 = 0，解得 b = 2。',
        '所以 a + b = 1 + 2 = 3。'
      ],
      teacherNote: '“几个非负数之和为零，则每个非负数都为零”！这是初中数学贯穿整本图书的核心解题金钥匙！',
      marioWisdom: '非负数双重锁解开！火球击退酷霸王，城堡通关！'
    },
    coinsReward: 30,
    difficulty: 'boss'
  }
];

export const BOOK_ROADMAP: ChapterRoadmapItem[] = [
  { chapterNumber: 1, title: '第1章 有理数', category: '代数入门', status: 'active', pageRange: '第2~17页', description: '正负数、数轴、相反数、绝对值、四则运算、乘方、科学记数法' },
  { chapterNumber: 2, title: '第2章 代数式与整式', category: '代数入门', status: 'coming-soon', pageRange: '第18~25页', description: '代数式、单项式与多项式、同类项合并、去括号化简' },
  { chapterNumber: 3, title: '第3章 一元一次方程', category: '代数入门', status: 'coming-soon', pageRange: '第26~37页', description: '等式性质、移项与去分母、应用题（行程/工程/利润/盈亏）' },
  { chapterNumber: 4, title: '第4章 实数', category: '代数入门', status: 'coming-soon', pageRange: '第38~45页', description: '平方根、算术平方根、立方根、无理数估算与运算' },
  { chapterNumber: 5, title: '第5章 平面直角坐标系', category: '代数入门', status: 'coming-soon', pageRange: '第46~53页', description: '有序数对、坐标象限特征、坐标平移变换、面积求法' },
  { chapterNumber: 6, title: '第6章 二元一次方程组', category: '代数精馏', status: 'locked', pageRange: '第54~62页', description: '代入消元法、加减消元法、整体代换、实际配套与行程问题' },
  { chapterNumber: 7, title: '第7章 不等式与不等式组', category: '代数精馏', status: 'locked', pageRange: '第63~73页', description: '不等式性质、数轴解集（同大取大/同小取小/大小小大中间找）' },
  { chapterNumber: 8, title: '第8章 整式的乘除与因式分解', category: '代数精馏', status: 'locked', pageRange: '第74~85页', description: '幂的运算性质、平方差与完全平方公式、提公因式与十字相乘' },
  { chapterNumber: 9, title: '第9章 分式与分式方程', category: '代数精馏', status: 'locked', pageRange: '第86~100页', description: '分式基本性质、约分通分、负整数指数幂、分式方程验根' },
  { chapterNumber: 10, title: '第10章 二次根式', category: '代数精馏', status: 'locked', pageRange: '第101~109页', description: '二次根式化简与双重非负性、分母有理化、最简二次根式' },
  { chapterNumber: 11, title: '第11章 一次函数', category: '函数思想', status: 'locked', pageRange: '第110~125页', description: '常量与变量、正比例函数与一次函数、k与b决定图像象限' },
  { chapterNumber: 12, title: '第12章 一元二次方程', category: '函数思想', status: 'locked', pageRange: '第126~134页', description: '配方法、公式法、因式分解法、根与系数关系（韦达定理）' },
  { chapterNumber: 13, title: '第13章 二次函数', category: '函数思想', status: 'locked', pageRange: '第135~150页', description: '抛物线三要素、顶点坐标公式、平移规律（左加右减上加下减）、最值问题' },
  { chapterNumber: 14, title: '第14章 反比例函数', category: '函数思想', status: 'locked', pageRange: '第151~163页', description: '双曲线特征、比例系数k的几何意义（矩形面积S=|k|）' },
  { chapterNumber: 15, title: '第15章 图形的初步认识', category: '空间与图形', status: 'locked', pageRange: '第164~178页', description: '立体图形与展开图、直线射线线段、角与钟面角运算' },
  { chapterNumber: 16, title: '第16章 相交线与平行线', category: '空间与图形', status: 'locked', pageRange: '第179~192页', description: '对顶角邻补角、三线八角、平行线判定与性质、图形平移' },
  { chapterNumber: 17, title: '第17章 三角形与多边形', category: '空间与图形', status: 'locked', pageRange: '第193~205页', description: '三边关系、内角和定理180°、外角和360°、多边形镶嵌' },
  { chapterNumber: 18, title: '第18章 全等三角形', category: '空间与图形', status: 'locked', pageRange: '第206~216页', description: 'SSS、SAS、ASA、AAS、HL判定法则与角平分线性质' },
  { chapterNumber: 19, title: '第19章 轴对称与等腰三角形', category: '空间与图形', status: 'locked', pageRange: '第217~228页', description: '垂直平分线、三线合一、等边三角形性质与判定' },
  { chapterNumber: 20, title: '第20章 勾股定理', category: '空间与图形', status: 'locked', pageRange: '第229~236页', description: 'a² + b² = c²、赵爽弦图、勾股逆定理、折叠翻折模型' },
  { chapterNumber: 21, title: '第21章 平行四边形', category: '空间与图形', status: 'locked', pageRange: '第237~257页', description: '平行四边形、矩形、菱形、正方形、中位线定理' },
  { chapterNumber: 22, title: '第22章 图形的旋转', category: '空间与图形', status: 'locked', pageRange: '第258~266页', description: '旋转三要素、中心对称图形、原点对称坐标特征' },
  { chapterNumber: 23, title: '第23章 圆', category: '空间与图形', status: 'locked', pageRange: '第267~288页', description: '垂径定理、圆周角定理、切线判定与性质、扇形面积与弧长' },
  { chapterNumber: 24, title: '第24章 相似形', category: '空间与图形', status: 'locked', pageRange: '第289~305页', description: '比例线段、平行线分线段成比例、相似三角形判定与应用' },
  { chapterNumber: 25, title: '第25章 锐角三角函数', category: '空间与图形', status: 'locked', pageRange: '第306~316页', description: '正弦sin、余弦cos、正切tan、解直角三角形及仰角俯角测量' },
  { chapterNumber: 26, title: '第26章 视图与投影', category: '空间与图形', status: 'locked', pageRange: '第317~325页', description: '平行投影、中心投影、主视图/左视图/俯视图（长对正高平齐宽相等）' },
  { chapterNumber: 27, title: '第27章 尺规作图与命题证明', category: '空间与图形', status: 'locked', pageRange: '第326~339页', description: '五种基本作图、真假命题与反例、综合法与反证法' },
  { chapterNumber: 28, title: '第28章 数据的收集整理与描述', category: '统计与概率', status: 'locked', pageRange: '第340~349页', description: '全面调查与抽样、频数分布直方图、条形/扇形/折线统计图' },
  { chapterNumber: 29, title: '第29章 数据的分析', category: '统计与概率', status: 'locked', pageRange: '第350~358页', description: '平均数、加权平均数、中位数、众数、方差与极差（稳定性判断）' },
  { chapterNumber: 30, title: '第30章 概率', category: '统计与概率', status: 'locked', pageRange: '第359~368页', description: '必然事件与随机事件、画树状图与列表法、几何概型与模拟试验' }
];
