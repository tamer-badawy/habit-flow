import {
  Dumbbell,
  BookOpen,
  Brain,
  Heart,
  Briefcase,
  Sparkles,
  Droplet,
  Coffee,
  Code,
  CheckSquare,
  Smile,
  Music,
} from "lucide-react";

const nameKeywordMap = [
  {
    keywords: ["gym", "workout", "exercise", "run", "lift", "train"],
    icon: Dumbbell,
  },
  { keywords: ["read", "book", "study", "learn", "pages"], icon: BookOpen },
  {
    keywords: ["meditate", "meditation", "breath", "calm", "yoga"],
    icon: Brain,
  },
  { keywords: ["water", "hydrate", "drink"], icon: Droplet },
  { keywords: ["code", "program", "build", "dev", "python"], icon: Code },
  { keywords: ["coffee", "tea"], icon: Coffee },
  { keywords: ["music", "guitar", "piano", "practice"], icon: Music },
  { keywords: ["journal", "write", "reflect"], icon: Smile },
];

const categoryMap = {
  health: Heart,
  mind: Brain,
  work: Briefcase,
  lifestyle: Sparkles,
};

export const getHabitIcon = (name = "", category = "") => {
  const normalizedName = name.toLowerCase();

  const matchedPair = nameKeywordMap.find((item) => {
    return item.keywords.some((keyword) => {
      return normalizedName.includes(keyword);
    });
  });

  if (matchedPair) return matchedPair.icon;

  const normalizedCategory = category.toLowerCase();
  return categoryMap[normalizedCategory] || CheckSquare;
};
