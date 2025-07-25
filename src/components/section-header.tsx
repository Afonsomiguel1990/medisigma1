interface SectionHeaderProps {
  children: React.ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <div className="border-b w-full h-full p-10 md:p-14">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2">
        {children}
      </div>
    </div>
  );
}
