"use client";

import { Icons } from "@/components/icons";
import { NavMenu } from "@/components/nav-menu";
// import { ThemeToggle } from "@/components/theme-toggle"; // Removido conforme solicitado
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const INITIAL_WIDTH = "70rem";
const MAX_WIDTH = "800px";

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: 0.1 },
  },
};

const drawerMenuContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Obter os serviços do footer
const servicosLinks = siteConfig.footerLinks.find(section => section.title === "Serviços")?.links || [];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showMobileServicesDropdown, setShowMobileServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = siteConfig.nav.links.map((item) =>
        item.href.substring(1),
      );

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 10);
    });
    return unsubscribe;
  }, [scrollY]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const handleOverlayClick = () => setIsDrawerOpen(false);

  const handleMobileNavClick = (item: { name: string; href: string; id: number }, e: React.MouseEvent) => {
    if (item.name === "Serviços") {
      e.preventDefault();
      setShowMobileServicesDropdown(!showMobileServicesDropdown);
      return;
    }

    // Verificar se é um link de página (não âncora)
    if (!item.href.startsWith("#")) {
      // É um link de página, deixar o comportamento padrão
      setIsDrawerOpen(false);
      return;
    }

    // Para links de âncora (#section)
    e.preventDefault();
    const element = document.getElementById(item.href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsDrawerOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "sticky z-50 mx-4 flex justify-center transition-all duration-300 md:mx-0",
        hasScrolled ? "top-6" : "top-4 mx-0",
      )}
    >
      <motion.div
        initial={{ width: INITIAL_WIDTH }}
        animate={{ width: hasScrolled ? MAX_WIDTH : INITIAL_WIDTH }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ overflow: "visible" }}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-2xl transition-all duration-300  xl:px-0",
            hasScrolled
              ? "px-2 border border-border backdrop-blur-lg bg-background/75"
              : "shadow-none px-7",
          )}
        >
          <div className="flex h-[56px] items-center pl-0 pr-4 py-4">
            <Link href="/" className="flex items-center gap-3 mr-8 -ml-2">
              <Icons.logo className="size-30 md:size-45" />
            </Link>

            <div className="flex-1 flex justify-center min-w-0">
              <NavMenu />
            </div>

            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0 ml-2">
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link
                  href={siteConfig.hero.cta.secondary.href}
                  className="h-8 hidden md:flex items-center justify-center text-sm font-normal tracking-wide rounded-full w-fit px-4 bg-background border border-border hover:bg-accent active:scale-95 transition-colors"
                >
                  {siteConfig.hero.cta.secondary.text}
                </Link>
                <Link
                  className="bg-secondary h-8 hidden md:flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-primary-foreground dark:text-secondary-foreground w-fit px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12]"
                  href="/contact"
                >
                  Fale conosco
                </Link>
                {/* <ThemeToggle /> */}
              </div>
              <button
                className="md:hidden border border-border size-8 rounded-md cursor-pointer flex items-center justify-center"
                onClick={toggleDrawer}
              >
                {isDrawerOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              onClick={handleOverlayClick}
            />

            <motion.div
              className="fixed inset-x-0 w-[95%] mx-auto bottom-3 bg-background border border-border p-4 rounded-xl shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              {/* Mobile menu content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3">
                    <Icons.logo className="size-7 md:size-10" />
                  </Link>
                  <button
                    onClick={toggleDrawer}
                    className="border border-border rounded-md p-1 cursor-pointer"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <motion.ul
                  className="flex flex-col text-sm mb-4 border border-border rounded-md"
                  variants={drawerMenuContainerVariants}
                >
                  <AnimatePresence>
                    {siteConfig.nav.links.map((item) => (
                      <motion.li
                        key={item.id}
                        className="border-b border-border last:border-b-0"
                        variants={drawerMenuVariants}
                      >
                        {item.name === "Serviços" ? (
                          <div>
                            <button
                              onClick={(e) => handleMobileNavClick(item, e)}
                              className={`w-full flex items-center justify-between p-2.5 text-left underline-offset-4 hover:text-primary/80 transition-colors ${
                                activeSection === item.href.substring(1)
                                  ? "text-primary font-medium"
                                  : "text-primary/60"
                              }`}
                            >
                              {item.name}
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileServicesDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {showMobileServicesDropdown && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden bg-accent/20 border-t border-border"
                                >
                                  {servicosLinks.map((servico) => (
                                    <Link
                                      key={servico.id}
                                      href={servico.url}
                                      className="flex items-center px-6 py-2 text-sm text-primary/70 hover:text-primary hover:bg-accent/30 transition-all duration-200"
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mr-3"></div>
                                      {servico.title}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              handleMobileNavClick(item, e);
                            }}
                            className={`block p-2.5 underline-offset-4 hover:text-primary/80 transition-colors ${
                              activeSection === item.href.substring(1)
                                ? "text-primary font-medium"
                                : "text-primary/60"
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    href="/contact"
                    className="bg-secondary h-8 flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-primary-foreground dark:text-secondary-foreground w-full px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] hover:bg-secondary/80 transition-all ease-out active:scale-95"
                  >
                    Fale conosco
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
