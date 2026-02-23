"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, User, ChevronDown, BookOpen, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { SearchBar } from "@/components/shared/SearchBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/70 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text hidden sm:block">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                  "hover:bg-primary/10 hover:text-primary",
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1 px-1 py-0.5 text-[10px] font-bold bg-primary text-white rounded">
                    {item.badge}
                  </span>
                )}
                {item.children && (
                  <ChevronDown className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === item.label && "rotate-180"
                  )} />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[calc(100%+4px)] left-0 glass-card rounded-xl p-2 min-w-[220px] shadow-xl"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Search bar */}
        <SearchBar compact className="flex-1 max-w-sm hidden md:block ml-auto" />

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
          {/* Portfolio link */}
          <a
            href="https://korachoco.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
          >
            <ExternalLink className="h-3 w-3" />
            korachoco.cv
          </a>

          <ThemeToggle />

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
                2
              </span>
            </Link>
          </Button>

          {/* Auth buttons — desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              size="sm"
              className="text-sm bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:from-[#6d28d9] hover:to-[#0891b2] text-white border-0 shadow-[0_0_15px_var(--glow-primary)]"
              asChild
            >
              <Link href="/register">Sign up free</Link>
            </Button>
          </div>

          {/* Mobile auth icon */}
          <Button variant="ghost" size="icon" className="sm:hidden h-9 w-9 rounded-full" asChild>
            <Link href="/login">
              <User className="h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
