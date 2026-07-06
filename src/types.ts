export interface CharacterStats {
  combat: number;      // 1 to 10 scale
  initiative: number;  // 1 to 10 scale
  wits: number;        // 1 to 10 scale
  teamwork: number;    // 1 to 10 scale
  sacrifice: number;   // 1 to 10 scale
}

export interface Character {
  id: string;
  name: string;
  jpName: string;
  role: string;
  division: "Scout Regiment" | "Garrison" | "Military Police" | "Marley Warrior Unit" | "None";
  bio: string;
  stats: CharacterStats;
  quotes: string[];
  titanForm?: string;
  status: "Active" | "MIA" | "Deceased";
  gender: "Male" | "Female";
  height: string;
}

export interface TitanInfo {
  id: string;
  name: string;
  jpName: string;
  height: number; // in meters
  capabilities: string[];
  currentHolder: string;
  previousHolders: string[];
  description: string;
  signatureTrait: string;
  weakness: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  significantDeath?: string;
  battleOutcome?: string;
  category: "Walls" | "Expedition" | "Infiltration" | "Uprising" | "Marley" | "Rumbling";
}

export interface QuizOption {
  text: string;
  scores: {
    scouts: number;
    garrison: number;
    police: number;
    warriors: number;
  };
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

export interface MilitaryBranch {
  id: string;
  name: string;
  motto: string;
  mottoTranslation: string;
  description: string;
  insigniaDescription: string;
  primaryDuties: string[];
  iconName: string;
}
