export const getPredefinedHabits = () => {
  return {
    Health: [
      { name: "Go to the Gym", isNumeric: false },
      { name: "Drink Water", isNumeric: true, target: 8, unit: "glasses" },
      { name: "Stretch", isNumeric: false },
      { name: "Sleep 8 Hours", isNumeric: true, target: 8, unit: "hours" },
      { name: "Run", isNumeric: true, target: 5, unit: "km" },
    ],
    Mind: [
      { name: "Meditate", isNumeric: false },
      { name: "Read a Book", isNumeric: true, target: 20, unit: "pages" },
      { name: "Journal", isNumeric: false },
      { name: "No Screen Time", isNumeric: true, target: 4, unit: "hours" },
    ],
    Work: [
      { name: "Code Python", isNumeric: true, target: 2, unit: "hours" },
      { name: "Review PRs", isNumeric: false },
      { name: "Clear Inbox", isNumeric: false },
      {
        name: "Study System Design",
        isNumeric: true,
        target: 2,
        unit: "hours",
      },
    ],
    Lifestyle: [
      { name: "Water Plants", isNumeric: false },
      { name: "Practice Guitar", isNumeric: true, target: 30, unit: "mins" },
      { name: "Walk the Dog", isNumeric: true, target: 30, unit: "mins" },
      { name: "Cook a Meal", isNumeric: false },
    ],
  };
};
