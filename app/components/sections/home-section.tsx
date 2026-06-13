"use client";

import Image from "next/image";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import NeuralBackground from "../background-nodes";
import { Footer } from "../../footer";

const newsreader = Newsreader({ subsets: ["latin"] });
const mono = JetBrains_Mono({ subsets: ["latin"] });

export function HomeSection() {
  return (
    <section className="h-screen overflow-hidden bg-[#fcfbff] flex flex-col">
      <NeuralBackground />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 items-center">
        <div className="mx-auto flex w-full max-w-6xl items-center px-6">
          <div className="grid w-full items-center gap-8 lg:grid-cols-2">
            
            {/* left */}
            <div className="relative z-10">
              <p className={`mb-6 text-sm tracking-[0.25em] text-neutral-400 ${mono.className}`}>
                welcome to my page! ( ´ ▽ ` )ﾉ
              </p>

              <h1 className={`${newsreader.className} text-6xl font-medium leading-none text-neutral-800 md:text-8xl`}>
                Lynn <span style={{ color: "#9F8DB3" }}>Tao</span>
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-500">
                <span className="font-medium text-neutral-600">
                  Engineering Science @ University of Toronto
                </span>

                <br /><br />

                <span className="text-base text-neutral-400">
                  Mathematics, machine learning, financial engineering
                </span>
              </p>

              <div className="mt-10 flex gap-4">
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white"
                  href="https://linkedin.com/in/lynnyltao"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedinIn size={18} />
                </a>

                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white"
                  href="https://github.com/yyxnlin"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaGithub size={18} />
                </a>

                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white"
                  href="mailto:lnwtt20@gmail.com">
                  <FaEnvelope size={18} />
                </a>
              </div>
            </div>

            {/* right */}
            <div className="relative w-full max-w-[600px] aspect-square mx-auto">
              <Image
                src="/profile7.png"
                alt="profile"
                fill
                priority
                className="object-contain scale-110 md:scale-125"
              />
            </div>

          </div>
        </div>
      </div>

      <div className="shrink-0">
        <Footer />
      </div>
    </section>
  );
}