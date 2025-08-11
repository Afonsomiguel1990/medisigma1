import { siteConfig } from "@/lib/config";

export function CompanyShowcase() {
  const { companyShowcase } = siteConfig;
  return (
    <section
      id="company"
      className="flex flex-col items-center justify-center gap-10 py-10 pt-11 w-full relative px-6"
    >
      <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1">
        + de 500 empresas líderes confiam em nós
      </h2>
      <p className="text-muted-foreground text-center text-balance font-medium">
        Alguns dos nossos parceiros:
      </p>
      <div className="grid w-full max-w-7xl grid-cols-2 md:grid-cols-4 overflow-hidden border-y border-border items-center justify-center z-20">
        {companyShowcase.companyLogos.map((logo) => (
          <div
            className="group w-full h-28 flex items-center justify-center relative p-4 before:absolute before:-left-1 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-1 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-['']"
            key={logo.id}
            aria-label={logo.name}
          >
            <div className="flex items-center justify-center w-full h-full transition-all duration-300 [&_img]:grayscale [&_img]:opacity-70 group-hover:[&_img]:grayscale-0 group-hover:[&_img]:opacity-100 [&_img]:h-auto [&_img]:w-auto [&_img]:object-contain">
              {logo.logo}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
