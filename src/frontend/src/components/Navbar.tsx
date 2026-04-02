import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type Page = "home" | "quiz" | "roadmap" | "colleges" | "chat";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Quiz", page: "quiz" },
  { label: "Roadmap", page: "roadmap" },
  { label: "Colleges", page: "colleges" },
  { label: "Chat", page: "chat" },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      style={{
        boxShadow:
          "0 1px 0 oklch(0.72 0.22 290 / 0.15), 0 4px 20px oklch(0.05 0.02 270 / 0.4)",
      }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center primary-glow group-hover:bg-primary/30 transition-colors">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground">
            Career<span className="gradient-text">AI</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => onNavigate(link.page)}
              data-ocid={`nav.${link.page}.link`}
              className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentPage === link.page
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {currentPage === link.page && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-md bg-primary/10 border border-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        <Button
          onClick={() => onNavigate("quiz")}
          className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold primary-glow transition-all hover:primary-glow-lg"
          data-ocid="nav.quiz.primary_button"
        >
          Take Quiz
        </Button>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.mobile.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => {
                onNavigate(link.page);
                setMobileOpen(false);
              }}
              data-ocid={`nav.mobile.${link.page}.link`}
              className={`block w-full text-left px-6 py-3 text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? "text-primary bg-primary/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
