export type CourseNote = {
  label: string;
  url: string;
};

export type Course = {
  name: string;
  notes: CourseNote[];
};

export type CourseCategory = {
  name: string;
  courses: Course[];
};

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    name: "Mathematics",
    courses: [
      {
        name: "MIE286 - Probability & Statistics (A+)",
        notes: [
          { label: "Final cheat sheet", url: "/notes/mie286-final-cheat-sheet.pdf" },
          { label: "Midterm cheat sheet", url: "/notes/mie286-midterm-cheat-sheet.pdf" },
          { label: "Lecture notes", url: "/notes/mie286-lecture-notes.pdf" },
        ],
      },
      {
        name: "MAT292 - Ordinary Differential Equations (A)",
        notes: [
          { label: "Midterm Review Notes", url: "/notes/mat292/Midterm Review.pdf" },
          { label: "Numerical Methods", url: "/notes/mat292/Numerical Methods.pdf" },
          { label: "Convolutions", url: "/notes/mat292/Convolutions.pdf" },
          { label: "Laplace Transform", url: "/notes/mat292/Laplace Transform.pdf" },
          { label: "Fourier Transform", url: "/notes/mat292/Fourier Transform.pdf" },
        ],
      },
      {
        name: "AER210 - Vector Calculus and Fluid Mechanics (A+)",
        notes: [
          { label: "Midterm Notes (Vector Calc)", url: "/notes/aer210/Vector Calc.pdf" },
          { label: "Hydrostatic Forces", url: "/notes/aer210/Hydrostatic Forces.pdf" },
          { label: "Control volume", url: "/notes/aer210/Control volume.pdf" },
        ],
      },
      {
        name: "MAT185 - Linear Algebra (A+)",
        notes: [
          { label: "TT1 Review", url: "/notes/mat185/TT1 Review.pdf" },
          { label: "TT2 Review", url: "/notes/mat185/TT2 Review.pdf" },
          { label: "Exam Review", url: "/notes/mat185/Exam Review.pdf" },
        ],
      },
      {
        name: "ESC194/195 - Calculus I/II (A+)",
        notes: [
          { label: "ESC194 - Second order ODE's", url: "/notes/esc194-second-order-ode.pdf" },
        ],
      },
      {
        name: "ESC103 - Engineering Mathematics and Computation (A+)",
        notes: [
          { label: "Final exam review", url: "/notes/esc103-final-exam-review.pdf" },
        ],
      },
    ],
  },


  {
    name: "CS / Computer Hardware",
    courses: [
      {
        name: "ECE253 - Digital and Computer Systems (A+)",
        notes: [
          {
            label: "Course Notes",
            url: "https://ribbon-element-22c.notion.site/ece253-27224983773c803ba81cdc8a1ed3eea7?source=copy_link",
          },
        ],
      },
      {
        name: "ESC190 - Data Structures and Algorithms (A+)",
        notes: [
          { label: "GitHub repo", url: "https://github.com/yyxnlin/esc190" },
        ],
      },
      {
        name: "ECE159 - Fundamentals of Electric Circuits (A+)",
        notes: [
          { label: "Final Cheat Sheet", url: "/notes/ece159-cheat-sheet.pdf" },
        ],
      },
    ],
  },

  {
    name: "Physics & Electromagnetics",
    courses: [
      {
        name: "ECE259 - Electromagnetism (A)",
        notes: [
          { label: "Midterm 2 content", url: "/notes/ece259-midterm2.pdf" },
        ],
      },
      {
        name: "PHY294 - Quantum and Thermal Physics (A-)",
        notes: [
          {
            label: "Thermal physics memorizing",
            url: "/notes/phy294-thermal-final-exam.pdf",
          },
          {
            label: "Engines/refrigerators (thermal physics)",
            url: "/notes/phy294-thermal-engines-refrigerators.pdf",
          },
        ],
      },
      {
        name: "PHY293 - Waves and Modern Physics (A-)",
        notes: [
          { label: "Matter waves", url: "/notes/phy293-matter-waves.pdf" },
          { label: "Modern physics", url: "/notes/phy293-modern-physics.pdf" },
        ],
      },
      
      
    ],
  },
  {
    name: "Other",
    courses: [
      {
        name: "BME205 - Fundamentals of Biomedical Engineering (A-)",
        notes: [{ label: "Midterm notes", url: "/notes/bme205-midterm-notes.pdf" }],
      },
      {
        name: "CHE260 - Thermodynamics and Heat Transfer (A+)",
        notes: [{ label: "Notes", url: "/notes/mse160-notes.pdf" }],
      },
      {
        name: "CIV102 - Structures and Materials: An Introduction to Engineering Design (A+)",
        notes: [
          { label: "Final exam review", url: "/notes/civ102-final-exam-review.pdf" },
        ],
      },
      
      {
        name: "LIN102 - Introduction to Linguistics: Sentence Structure and Meaning (A+)",
        notes: [{ label: "Course Notes", url: "/notes/lin102-notes.pdf" }],
      },
      
      {
        name: "MSE160 - Molecules and Materials (A)",
        notes: [{ label: "Notes", url: "/notes/mse160-notes.pdf" }],
      },
      {
        name: "Miscellaneous",
        notes: [{ label: "Graphs (MAT344)", url: "/notes/mat344-graphs.pdf" }],
      },
    ],
  },
];