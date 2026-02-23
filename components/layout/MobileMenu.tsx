"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SearchBar } from "@/components/shared/SearchBar";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9 rounded-full border border-border/50"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-sm glass border-l border-border/50 p-0"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/50">
          <SheetTitle asChild>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">{siteConfig.name}</span>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation menu
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 py-3 border-b border-border/50">
          <SearchBar placeholder="Search courses…" />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        expanded === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {expanded === item.label && (
                    <div className="ml-3 mt-1 space-y-1 border-l border-border/50 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="px-4 py-4 border-t border-border/50 space-y-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0"
            asChild
          >
            <Link href="/register" onClick={() => setOpen(false)}>
              Sign up free
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
