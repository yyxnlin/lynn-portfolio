"use client";

import Image from "next/image";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import NeuralBackground from "../background-nodes";
import { Footer } from "../../footer";

export function HomeSection() {
  return (
    <section className="min-h-[100dvh] overflow-hidden bg-[#fcfbff] flex flex-col">
      <NeuralBackground />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 items-center pt-20 sm:pt-0">
        <div className="mx-auto flex w-full max-w-6xl items-center px-6">
          
          <div className="grid w-full items-center gap-10 lg:grid-cols-2 text-center lg:text-left">
            
            {/* LEFT SIDE */}
            <div className="relative z-10">
              <p className="mb-6 text-xs sm:text-sm tracking-[0.25em] text-neutral-400 font-[var(--font-mono)]">
                welcome to my page! ( ´ ▽ ` )ﾉ
              </p>

              <h1 className="font-[var(--font-newsreader)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-none text-neutral-800">
                Lynn <span style={{ color: "#9F8DB3" }}>Tao</span>
              </h1>

              <p className="mt-6 sm:mt-8 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-neutral-500">
                <span className="font-medium text-neutral-600">
                  Engineering Science @ University of Toronto
                </span>

                <br /><br />

                <span className="text-sm sm:text-base text-neutral-400">
                  Mathematics, machine learning, financial engineering
                </span>
              </p>

              {/* ICONS */}
              <div className="mt-8 sm:mt-10 flex gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white"
                  href="https://linkedin.com/in/lynnyltao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn size={18} />
                </a>

                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white"
                  href="https://github.com/yyxnlin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={18} />
                </a>

                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white"
                  href="mailto:lnwtt20@gmail.com"
                >
                  <FaEnvelope size={18} />
                </a>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="relative w-[80%] max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0 aspect-square">
              <Image
                src="/profile7.png"
                alt="profile"
                fill
                priority
                className="object-contain scale-105 sm:scale-110 md:scale-125"
              />
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="shrink-0">
        <Footer />
      </div>
    </section>
  );
}