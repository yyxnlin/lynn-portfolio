"use client";

import Image from "next/image";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import NeuralBackground from "../background-nodes";
import { Footer } from "../../footer";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function HomeSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 60, damping: 15 });
  const springY = useSpring(y, { stiffness: 60, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();

      const offsetX = (e.clientX - rect.width / 2) / 200;
      const offsetY = (e.clientY - rect.height / 2) / 200;

      x.set(offsetX);
      y.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section className="min-h-[100dvh] overflow-hidden bg-[#fcfbff] dark:bg-[#0f0f14] flex flex-col transition-colors duration-300">
      <NeuralBackground />

      <div className="flex flex-1 items-center pt-20 sm:pt-0">
        <div className="mx-auto flex w-full max-w-6xl items-center px-6">

          <div className="grid w-full items-center gap-10 lg:grid-cols-2 text-center lg:text-left">

            {/* LEFT SIDE (unchanged) */}
            <div className="relative z-10">
              <p className="mb-6 text-xs sm:text-sm tracking-[0.25em] text-neutral-400 dark:text-neutral-400 font-[var(--font-mono)]">
                welcome to my page! ( ´ ▽ ` )ﾉ
              </p>

              <h1 className="font-[var(--font-newsreader)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-none text-neutral-800 dark:text-neutral-100">
                Lynn{" "}
                <span className="text-[#9F8DB3] dark:text-[#CBB6DD]">
                  Tao
                </span>
              </h1>

              <p className="mt-6 sm:mt-8 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-neutral-500 dark:text-neutral-300">
                <span className="font-medium text-neutral-600 dark:text-neutral-200">
                  Engineering Science @ University of Toronto
                </span>
                <br /><br />
                <span className="text-sm sm:text-base text-neutral-400 dark:text-neutral-400">
                  Mathematics, machine learning, financial engineering
                </span>
              </p>

              <div className="mt-8 sm:mt-10 flex gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full
                  border border-neutral-200 dark:border-neutral-700
                  bg-white dark:bg-neutral-900
                  text-neutral-700 dark:text-neutral-200
                  transition-all duration-200
                  hover:bg-neutral-100 dark:hover:bg-neutral-800
                  hover:border-neutral-300 dark:hover:border-neutral-600
                  hover:text-[#9F8DB3] dark:hover:text-[#CBB6DD]
                  hover:scale-105"
                >
                  <FaLinkedinIn size={18} />
                </a>

                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full
                  border border-neutral-200 dark:border-neutral-700
                  bg-white dark:bg-neutral-900
                  text-neutral-700 dark:text-neutral-200
                  transition-all duration-200
                  hover:bg-neutral-100 dark:hover:bg-neutral-800
                  hover:border-neutral-300 dark:hover:border-neutral-600
                  hover:text-[#9F8DB3] dark:hover:text-[#CBB6DD]
                  hover:scale-105"
                >
                  <FaGithub size={18} />
                </a>

                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full
                  border border-neutral-200 dark:border-neutral-700
                  bg-white dark:bg-neutral-900
                  text-neutral-700 dark:text-neutral-200
                  transition-all duration-200
                  hover:bg-neutral-100 dark:hover:bg-neutral-800
                  hover:border-neutral-300 dark:hover:border-neutral-600
                  hover:text-[#9F8DB3] dark:hover:text-[#CBB6DD]
                  hover:scale-105"
                >
                  <FaEnvelope size={18} />
                </a>
              </div>
            </div>

           {/* RIGHT SIDE */}
          <motion.div
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.03 }}
            className="relative isolate w-[80%] max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0 aspect-square"
          >
            {/* GLOW (safely behind everything) */}
            <div className="absolute inset-0 -z-20 blur-3xl opacity-40 dark:opacity-30 pointer-events-none">
              <div className="w-full h-full bg-[#cbb6dd] dark:bg-[#4B3A66] rounded-full" />
            </div>

            {/* FLOATING WRAPPER */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-full z-10"
            >
              {/* LIGHT */}
              <div className="block dark:hidden w-full h-full">
                <Image
                  src="/profile7.png"
                  alt="profile light"
                  fill
                  className="object-contain scale-105 sm:scale-110 md:scale-125"
                />
              </div>

              {/* DARK */}
              <div className="hidden dark:block w-full h-full">
                <Image
                  src="/profile7_dark.png"
                  alt="profile dark"
                  fill
                  className="object-contain scale-105 sm:scale-110 md:scale-125"
                />
              </div>
            </motion.div>
          </motion.div>

          </div>
        </div>
      </div>

      <div className="shrink-0">
        <Footer />
      </div>
    </section>
  );
}