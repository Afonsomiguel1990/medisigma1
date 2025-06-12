"use client";

import { siteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ChevronDown } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navs: NavItem[] = siteConfig.nav.links;

// Obter os serviços do footer
const servicosLinks = siteConfig.footerLinks.find(section => section.title === "Serviços")?.links || [];

export function NavMenu() {
  const ref = useRef<HTMLUListElement>(null);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Initialize with first nav item if on homepage
    const firstItem = ref.current?.querySelector(
      `[href="#${navs[0].href.substring(1)}"]`,
    )?.parentElement;
    if (firstItem) {
      const rect = firstItem.getBoundingClientRect();
      setLeft(firstItem.offsetLeft);
      setWidth(rect.width);
      setIsReady(true);
    }
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      // Skip scroll handling during manual click scrolling
      if (isManualScroll) return;

      const sections = navs.map((item) => item.href.substring(1));

      // Find the section closest to viewport top
      let closestSection = sections[0];
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100); // Offset by 100px to trigger earlier
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }

      // Update active section and nav indicator if it's a section link
      // Ensure we only update based on scroll if the link is a section link
      const activeItem = navs.find(item => item.href.substring(1) === closestSection);
      if (activeItem && activeItem.href.startsWith("#")) {
          setActiveSection(closestSection);
          const navItemElement = ref.current?.querySelector(
            `[href="#${closestSection}"]`,
          )?.parentElement;
          if (navItemElement) {
            const rect = navItemElement.getBoundingClientRect();
            setLeft(navItemElement.offsetLeft);
            setWidth(rect.width);
          }
      } else if (!navs.some(item => item.href === pathname)) {
          // If not on a defined page path and no section is active, potentially clear or default activeSection
          // Or handle based on desired behavior when scrolling on non-main pages
          // For now, we clear activeSection if not matching a section ID
          // setActiveSection(""); // Option: Clear active section if not a section link
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll, pathname]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    e.preventDefault();
    const targetId = item.href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      setIsManualScroll(true);
      setActiveSection(targetId);
      const navItem = e.currentTarget.parentElement;
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setLeft(navItem.offsetLeft);
        setWidth(rect.width);
      }
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setTimeout(() => {
        setIsManualScroll(false);
      }, 500);
    }
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowServicesDropdown(!showServicesDropdown);
  };

  const handleMouseEnter = (item: NavItem) => {
    if (item.name === "Serviços") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowServicesDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowServicesDropdown(false);
    }, 150); // Pequeno delay antes de fechar
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowServicesDropdown(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full hidden md:block">
      <ul
        className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center max-w-full"
        ref={ref}
      >
        {navs.map((item) => {
          // Determine if the link is for a section or a page
          const isSectionLink = item.href.startsWith("#");
          const isServicesItem = item.name === "Serviços";
          // Determine if the link is active
          const isActive = isSectionLink
            ? activeSection === item.href.substring(1) && pathname === "/" // Section links only active on homepage
            : pathname === item.href; // Page links active if path matches

          return (
            <li
              key={item.name}
              className={`z-10 h-full flex items-center justify-center px-2 md:px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive // Use combined isActive state
                  ? "text-primary"
                  : "text-primary/60 hover:text-primary"
              } tracking-tight relative whitespace-nowrap`}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Serviços com dropdown */}
              {isServicesItem ? (
                <div className="relative">
                  <button
                    onClick={handleServicesClick}
                    className="cursor-pointer flex items-center gap-1"
                  >
                    {item.name}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showServicesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-lg z-[9999] py-2"
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-b border-border">
                          Nossos Serviços
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-2">
                          {servicosLinks.map((servico) => (
                            <Link
                              key={servico.id}
                              href={servico.url}
                              className="flex items-center px-3 py-2.5 text-sm text-primary/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200 group"
                              onClick={() => setShowServicesDropdown(false)}
                            >
                              <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 mr-3 transition-colors duration-200"></div>
                              {servico.title}
                            </Link>
                          ))}
                        </div>
                        <div className="px-3 py-2 border-t border-border">
                          <Link
                            href="/servicos"
                            className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                            onClick={() => setShowServicesDropdown(false)}
                          >
                            Ver todos os serviços →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Links normais para secção ou páginas */
                isSectionLink ? (
                  <Link href={`/${item.href}`} className="cursor-pointer" onClick={e => handleClick(e, item)}>
                    {item.name}
                  </Link>
                ) : (
                  <Link href={item.href} className="cursor-pointer">
                    {item.name}
                  </Link>
                )
              )}
            </li>
          );
        })}
        {/* Only show the animated indicator if an active *section* is set and we are on the homepage */}
        {isReady && activeSection && pathname === "/" && (
          <motion.li
            animate={{ left, width }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-0 my-1.5 rounded-full bg-accent/60 border border-border"
          />
        )}
      </ul>
    </div>
  );
}
