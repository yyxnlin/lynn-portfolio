import { KeroppiField } from "../components/canvas/keroppi-field";
import { Footer } from "../footer";

export default function FieldPage() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f]">
      <main className="px-6 pt-16 md:pt-324">
        <KeroppiField />
        <Footer />
      </main>
    </div>
  );
}