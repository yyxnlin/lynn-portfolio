export const projects = {
  odeProject: {
    published: true,
    title: "Predicting Abnormal Heart Rhythms Using ECG Signals",
    description:
      "Built a lightweight ECG classification model inspired by the FitzHugh–Nagumo dynamical system, enabling efficient detection of abnormal cardiac rhythms from physiological signal data.",
    date: "2025-12-19",
    readUrl: "/papers/mat292-final-report.pdf",
    github: "yyxnlin/MAT292-final-project",
    image: "/ecg-data.png",
  },

  unityMaze: {
    published: true,
    title: "Unity Maze Game",
    description:
      "Designed and developed an interactive 2D maze game in Unity to explore how different visual and auditory feedback mechanisms influence player navigation and decision-making.",
    date: "2026-04-07",
    github: "richashah29/Maze-Game-Unity",
    image:"/mie-unity-maze-game.png"
  },

  praxis3: {
    published: true,
    title: "Wabot",
    description:
      "Autonomous Arduino-powered robot capable of obstacle avoidance, navigation, fire detection, and water pumping for simulated emergency response scenarios.",
    date: "2026-04-06",
    readUrl: "/papers/wabot-va.pdf",
    github: "yyxnlin/wabot",
    image: "/wabot-side.jpg"
  },

  loudlars: {
    published: true,
    title: "LoudLARS",
    description: "A Discord bot that analyzes server conversations, generates a podcast recap of the top moments, and narrates it using users' voice clones via Boson AI's text-to-speech model.",    
    date: "2025-10-26",
    demoUrl: "https://youtu.be/pQ3ZEhj0Lqc",
    github: "yyxnlin/higgs-audio",
    image: "/loudlars.png"
  },
  blob: {
    published: true,
    title: "blob!",
    description: "2D platformer in Java for ICS4U final project, implementing object-oriented architecture, custom game mechanics, collision handling, and level progression",
    date: "2024-06-04",
    demoUrl: "https://youtu.be/soH9R2R2oEQ",
    github: "yyxnlin/blob",
    image: "/blob.png"
  },

  bunnyhop: {
    published: true,
    title: "bunnyhop!",
    description:
      "2D puzzle game created using Java, for ICS3U final project.",    
    date: "2023-06-04",
    demoUrl: "https://youtu.be/61K7bjsyuOE",
    github: "yyxnlin/bunnyhop",
    image: "/bunnyhop.png"
  },
} as const;