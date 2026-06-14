import { AWARDS } from "../../data/awards";

export function Awards() {
  return (
    <div>
      <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
        Awards
      </h3>

      <ul className="space-y-1">
        {AWARDS.map((award) => (
            <li
            key={award}
            className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600"
            >
            <span className="mt-[8px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#9F8DB3]" />
            <span>{award}</span>
            </li>
        ))}
        </ul>
    </div>
  );
}