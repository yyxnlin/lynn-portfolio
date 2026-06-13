// data/projects.ts
export const projects = {
  odeProject: {
    published: true,
    title: "Predicting Abnormal Heart Rhythms Using ECG Signals",
    description:
      "Developed a computationally efficient ECG classification model using the FitzHugh–Nagumo system to detect abnormal cardiac rhythms.",
    date: "2025-12-19",
    url: "/papers/mat292-final-report.pdf",
    repository: "yyxnlin/MAT292-final-project",
  },

  unityMaze: {
    published: true,
    title: "Unity Maze Game",
    description: "Unity-based maze game with various feedback conditions",
    date: "2026-04-07",
    url: "https://github.com/richashah29/Maze-Game-Unity",
    repository: "richashah29/Maze-Game-Unity",
  },

  praxis3: {
    published: true,
    title: "Wabot",
    description: "Wabot (water-bot) is an Arduino-based autonomous robot designed for obstacle avoidance and navigation, fire (red) detection, and targeted water spraying.",
    date: "2026-04-06",
    url: "/papers/wabot-va.pdf",
    repository: "yyxnlin/wabot",
  },
} as const;