import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  GraduationCap,
  Map as MapIcon,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";

type Page = "home" | "quiz" | "roadmap" | "colleges" | "chat" | "results";

interface ResultsPageProps {
  onNavigate: (page: Page) => void;
  result: { recommendedJob: string; scores: Record<string, number> } | null;
}

const pathColors: Record<string, string> = {
  "Web Development": "text-blue-400",
  Cybersecurity: "text-red-400",
  "Data Science": "text-purple-400",
  "UI/UX Design": "text-pink-400",
  "Cloud Computing": "text-yellow-400",
};

export function ResultsPage({ onNavigate, result }: ResultsPageProps) {
  if (!result) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center" data-ocid="results.empty_state">
          <p className="text-muted-foreground mb-4">No quiz results found.</p>
          <Button
            onClick={() => onNavigate("quiz")}
            className="bg-primary text-primary-foreground primary-glow"
            data-ocid="results.quiz.primary_button"
          >
            Take Quiz
          </Button>
        </div>
      </main>
    );
  }

  const totalAnswers = Object.values(result.scores).reduce((a, b) => a + b, 0);
  const sortedScores = Object.entries(result.scores).sort(
    (a, b) => b[1] - a[1],
  );
  const maxScore = sortedScores[0][1];

  return (
    <main
      className="min-h-screen pt-24 pb-16 px-4"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.18 0.06 285 / 0.3), transparent 60%), oklch(0.10 0.025 270)",
      }}
    >
      <div className="container mx-auto max-w-2xl">
        {/* Winner card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.3), oklch(0.82 0.18 200 / 0.2))",
              border: "2px solid oklch(0.72 0.22 290 / 0.4)",
              boxShadow:
                "0 0 30px oklch(0.72 0.22 290 / 0.4), 0 0 60px oklch(0.72 0.22 290 / 0.15)",
            }}
          >
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5">
            Your Career Match
          </Badge>
          <h1 className="font-heading text-4xl font-bold mb-3">
            <span className="gradient-text">{result.recommendedJob}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your quiz responses, this is your ideal tech career path.
          </p>
        </motion.div>

        {/* Score breakdown */}
        <Card
          className="border-border mb-6"
          data-ocid="results.card"
          style={{
            background: "oklch(0.14 0.03 268 / 0.9)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 4px 32px oklch(0.05 0.02 270 / 0.5), 0 0 0 1px oklch(0.22 0.04 265 / 0.8)",
          }}
        >
          <CardHeader>
            <CardTitle className="font-heading text-lg text-foreground">
              Career Path Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedScores.map(([path, score], i) => {
              const pct =
                totalAnswers > 0 ? Math.round((score / totalAnswers) * 100) : 0;
              const isTop =
                score === maxScore && path === result.recommendedJob;
              return (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`results.score.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          isTop
                            ? pathColors[path] || "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {path}
                      </span>
                      {isTop && (
                        <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                          Best Match
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {score}/{totalAnswers} ({pct}%)
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: isTop
                          ? "linear-gradient(90deg, oklch(0.72 0.22 290), oklch(0.82 0.18 200))"
                          : "oklch(0.50 0.08 268)",
                        boxShadow: isTop
                          ? "0 0 8px oklch(0.72 0.22 290 / 0.5)"
                          : "none",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>

        {/* CTA buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={() => onNavigate("roadmap")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold primary-glow"
            data-ocid="results.roadmap.primary_button"
          >
            <MapIcon className="mr-2 w-4 h-4" />
            View Roadmap
          </Button>
          <Button
            onClick={() => onNavigate("colleges")}
            variant="outline"
            className="border-border hover:bg-muted/50 hover:border-primary/40"
            data-ocid="results.colleges.secondary_button"
          >
            <GraduationCap className="mr-2 w-4 h-4" />
            Find Colleges
          </Button>
          <Button
            onClick={() => onNavigate("quiz")}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            data-ocid="results.retake.button"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            Retake Quiz
          </Button>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => onNavigate("chat")}
            className="text-primary text-sm hover:underline flex items-center gap-1 mx-auto transition-all hover:text-accent"
            data-ocid="results.chat.link"
          >
            Have questions? Chat with our AI advisor{" "}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </main>
  );
}
