import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChatBot } from "./components/ChatBot";
import { Navbar } from "./components/Navbar";
import { ChatPage } from "./pages/ChatPage";
import { CollegesPage } from "./pages/CollegesPage";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { ResultsPage } from "./pages/ResultsPage";
import { RoadmapPage } from "./pages/RoadmapPage";

type Page = "home" | "quiz" | "roadmap" | "colleges" | "chat" | "results";

interface QuizResult {
  recommendedJob: string;
  scores: Record<string, number>;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentPage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navPage = currentPage === "results" ? "quiz" : currentPage;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Toaster />
      <Navbar
        currentPage={
          navPage as "home" | "quiz" | "roadmap" | "colleges" | "chat"
        }
        onNavigate={handleNavigate}
      />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
            {currentPage === "quiz" && (
              <QuizPage
                onNavigate={handleNavigate}
                onQuizComplete={handleQuizComplete}
              />
            )}
            {currentPage === "results" && (
              <ResultsPage onNavigate={handleNavigate} result={quizResult} />
            )}
            {currentPage === "roadmap" && <RoadmapPage />}
            {currentPage === "colleges" && <CollegesPage />}
            {currentPage === "chat" && <ChatPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <ChatBot />
    </div>
  );
}
