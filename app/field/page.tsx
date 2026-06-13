import type { Metadata } from "next";
import { KeroppiField } from "../components/field/keroppi-field";
import { Footer } from "../footer";

export default function FieldPage() {
  return (
    <main className="fixed inset-0 overflow-hidden">
      <KeroppiField />
      <Footer />
    </main>
    
  );
}
