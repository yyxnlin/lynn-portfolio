export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f]">
      {children}
    </div>
  );
}