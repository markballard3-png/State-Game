export type Region =
  | "Northeast Division"
  | "ACC / Atlantic Division"
  | "SEC South Division"
  | "Big Ten Midwest Division"
  | "Big 12 Plains Division"
  | "Mountain West Division"
  | "Pac-12 West Coast Division";

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type GameMode =
  | "practice"
  | "roadTrip"
  | "rivalry"
  | "bowl"
  | "championship"
  | "dashboard";

export type QuestionType = "map" | "capital-choice" | "capital-typed";

export type TeamColors = {
  primary: string;
  secondary: string;
  accent: string;
};

export type StateInfo = {
  name: string;
  abbreviation: string;
  capital: string;
  region: Region;
  neighboringStates: string[];
  primaryTeamAnchor: string;
  secondaryTeamAnchor?: string;
  teamColors: TeamColors;
  memoryHook: string;
  footballNickname: string;
  masteryScore: number;
  correctAnswers: number;
  missedAnswers: number;
};

export type StateProgress = {
  masteryScore: number;
  correctAnswers: number;
  missedAnswers: number;
  mapCorrect: number;
  mapMissed: number;
  capitalCorrect: number;
  capitalMissed: number;
  streak: number;
  lastSeenAt: number | null;
};

export type GlobalStats = {
  totalQuestions: number;
  correctAnswers: number;
  bestStreak: number;
  xp: number;
  bowlTrophies: number;
  seasonWins: number;
  seasonLosses: number;
};

export type ProgressData = {
  byState: Record<string, StateProgress>;
  unlockedRegions: Region[];
  badges: string[];
  trophies: string[];
  stats: GlobalStats;
};

export type StandardPrompt = {
  kind: "standard";
  questionType: QuestionType;
  state: StateInfo;
  options?: string[];
  mode: GameMode;
};

export type RivalryPrompt = {
  kind: "rivalry";
  matchup: {
    title: string;
    states: [string, string];
    bonusQuestion: string;
    bonusAnswer: string;
  };
};

export type Prompt = StandardPrompt | RivalryPrompt;
