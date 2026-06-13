export type CourseNote = {
  label: string;
  url: string;
};

export type Course = {
  name: string;
  notes: CourseNote[];
};


export const COURSES: Course[] = [
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
    name: "ECE253 - Digital and Computer Systems (A+)",
    notes: [
      {
        label: "Course Notes",
        url: "https://ribbon-element-22c.notion.site/ece253-27224983773c803ba81cdc8a1ed3eea7?source=copy_link",
      },
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
    name: "ESC190 - Data Structures and Algorithms (A+)",
    notes: [
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
    name: "ESC195 - Calculus II (A+)",
    notes: [
    ],
  },

  {
    name: "ESC194 - Calculus I (A+)",
    notes: [
    ],
  },

  {
    name: "LIN102 - Introduction to Linguistics: Sentence Structure and Meaning (A+)",
    notes: [
    ],
  },
];