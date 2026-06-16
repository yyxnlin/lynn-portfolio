import { KeroppiField } from "../components/canvas/keroppi-field";
import { Footer } from "../footer";
import NeuralBackground from "../components/background-nodes";

export default function FieldPage() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f]">
      <main className="px-6 pt-16 md:pt-324">
        <NeuralBackground />
        <KeroppiField />
        <Footer />
      </main>
    </div>
  );
}