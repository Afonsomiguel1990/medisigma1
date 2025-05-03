"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
}

const navs: NavItem[] = siteConfig.nav.links;

export function NavMenu() {
  const ref = useRef<HTMLUListElement>(null);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isManualScroll, setIsManualScroll] = useState(false);
  const pathname = usePathname();

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
    handleScroll(); // Initial check
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
      // Set manual scroll flag
      setIsManualScroll(true);

      // Immediately update nav state
      setActiveSection(targetId);
      const navItem = e.currentTarget.parentElement;
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setLeft(navItem.offsetLeft);
        setWidth(rect.width);
      }

      // Calculate exact scroll position
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset

      // Smooth scroll to exact position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Reset manual scroll flag after animation completes
      setTimeout(() => {
        setIsManualScroll(false);
      }, 500); // Adjust timing to match scroll animation duration
    }
  };

  return (
    <div className="w-full hidden md:block">
      <ul
        className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center"
        ref={ref}
      >
        {navs.map((item) => {
          // Determine if the link is for a section or a page
          const isSectionLink = item.href.startsWith("#");
          // Determine if the link is active
          const isActive = isSectionLink
            ? activeSection === item.href.substring(1) && pathname === "/" // Section links only active on homepage
            : pathname === item.href; // Page links active if path matches

          return (
            <li
              key={item.name}
              className={`z-10 h-full flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive // Use combined isActive state
                  ? "text-primary"
                  : "text-primary/60 hover:text-primary"
              } tracking-tight`}
            >
              {/* Always use Link component. For section links, prepend '/' to href */}
              <Link href={isSectionLink ? `/${item.href}` : item.href} className="cursor-pointer">
                {item.name}
              </Link>
            </li>
          );
        })}
        {/* Only show the animated indicator if an active *section* is set and we are on the homepage */}
        {isReady && activeSection && pathname === "/" && navs.find(item => item.href === `#${activeSection}`) && (
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
