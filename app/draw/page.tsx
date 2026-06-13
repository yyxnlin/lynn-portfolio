import type { Metadata } from "next";
import { DrawCanvas } from "../components/draw/draw-canvas";

export const metadata: Metadata = {
  title: "Draw Keroppi",
};

export default function DrawPage() {
  return (
    <main className="px-6 pb-24 pt-28 md:pt-32">
      <DrawCanvas />
    </main>
  );
}
