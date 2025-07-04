"use client";

import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { NAVIGATION_LINKS } from "@/lib/constants";
import { MobileNav } from "../components/MobileNavigation";
import { useCallback } from "react";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to scroll to section
  const scrollToSection = useCallback((hash) => {
    if (!hash || hash === "#" || hash === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Handler for nav links
  const handleNavClick = (e, href) => {
    if (!href.startsWith("#")) return; // let normal links (e.g. /login) work
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // Wait for navigation, then scroll
      setTimeout(() => scrollToSection(href), 50);
    } else {
      scrollToSection(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center space-x-2"
          onClick={(e) => handleNavClick(e, "#hero")}
        >
          <Shield className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-lg">MyBarangay</span>
            <span className="text-xs text-muted-foreground">
              Digital Community
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary relative group"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm">
            Login
          </Link>
          <Button size="sm" className="text-sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileNav onNavigate={handleNavClick} />
      </div>
    </header>
  );
}
