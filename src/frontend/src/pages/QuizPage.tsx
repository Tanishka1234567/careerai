import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle2, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { QuizAnswer } from "../backend.d";
import { useGetQuestions, useSubmitAnswers } from "../hooks/useQueries";

type Page = "home" | "quiz" | "roadmap" | "colleges" | "chat" | "results";

interface QuizPageProps {
  onNavigate: (page: Page) => void;
  onQuizComplete: (result: {
    recommendedJob: string;
    scores: Record<string, number>;
  }) => void;
}

const CAREER_PATHS = [
  "Web Development",
  "Cybersecurity",
  "Data Science",
  "UI/UX Design",
  "Cloud Computing",
];

const SEED_QUESTIONS = [
  {
    id: 0n,
    text: "What activity do you enjoy most?",
    options: [
      "Building websites",
      "Solving security puzzles",
      "Analyzing data",
      "Designing interfaces",
      "Managing cloud systems",
    ],
  },
  {
    id: 1n,
    text: "Which subject interests you most?",
    options: [
      "Computer Science",
      "Mathematics",
      "Psychology",
      "Art & Design",
      "Physics",
    ],
  },
  {
    id: 2n,
    text: "How do you prefer to work?",
    options: [
      "Solo on technical problems",
      "In a team",
      "Creatively",
      "Analytically",
      "Strategically",
    ],
  },
  {
    id: 3n,
    text: "What's your biggest strength?",
    options: [
      "Logic & coding",
      "Problem-solving",
      "Communication",
      "Creativity",
      "Organization",
    ],
  },
  {
    id: 4n,
    text: "Which tool excites you most?",
    options: ["VS Code", "Wireshark", "Python/Jupyter", "Figma", "AWS Console"],
  },
  {
    id: 5n,
    text: "What outcome matters most to you?",
    options: [
      "Building products users love",
      "Keeping systems secure",
      "Finding insights in data",
      "Creating beautiful experiences",
      "Scaling infrastructure",
    ],
  },
  {
    id: 6n,
    text: "How do you handle challenges?",
    options: [
      "Debug step by step",
      "Think adversarially",
      "Look at patterns",
      "Sketch solutions",
      "Optimize resources",
    ],
  },
  {
    id: 7n,
    text: "What's your ideal work environment?",
    options: [
      "Startup",
      "Security firm",
      "Research lab",
      "Design agency",
      "Tech giant",
    ],
  },
  {
    id: 8n,
    text: "Which field would you explore?",
    options: [
      "Full-stack development",
      "Ethical hacking",
      "Machine learning",
      "UX/UI research",
      "DevOps/Cloud",
    ],
  },
  {
    id: 9n,
    text: "What drives your career choice?",
    options: [
      "Innovation",
      "Security & protection",
      "Knowledge & discovery",
      "Aesthetics & usability",
      "Efficiency & scale",
    ],
  },
];

export function QuizPage({ onQuizComplete }: QuizPageProps) {
  const { data: backendQuestions, isLoading } = useGetQuestions();
  const { mutateAsync: submitAnswers, isPending } = useSubmitAnswers();

  const questions =
    backendQuestions && backendQuestions.length > 0
      ? backendQuestions
      : SEED_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<
    { questionId: bigint; selectedOption: number }[]
  >([]);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;

  const handleNext = async () => {
    if (selectedOption === null) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, selectedOption },
    ];
    setAnswers(newAnswers);

    if (!isLast) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      return;
    }

    // Calculate scores
    const scores: Record<string, number> = {};
    for (const p of CAREER_PATHS) {
      scores[p] = 0;
    }
    for (const a of newAnswers) {
      const career = CAREER_PATHS[a.selectedOption % CAREER_PATHS.length];
      scores[career] = (scores[career] || 0) + 1;
    }

    const recommendedJob = Object.entries(scores).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    const quizAnswers: QuizAnswer[] = newAnswers.map((a) => ({
      questionId: a.questionId,
      selectedOption: BigInt(a.selectedOption),
    }));

    try {
      await submitAnswers({ answers: quizAnswers, recommendedJob });
    } catch {
      // Continue even if backend fails
    }

    onQuizComplete({ recommendedJob, scores });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center" data-ocid="quiz.loading_state">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen pt-24 pb-12 px-4"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.18 0.06 285 / 0.3), transparent 60%), oklch(0.10 0.025 270)",
      }}
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Brain className="w-3.5 h-3.5 mr-1.5" />
            Career Quiz
          </Badge>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Discover Your Career Path
          </h1>
          <p className="text-muted-foreground mt-2">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              {currentIndex + 1}/{questions.length}
            </span>
            <span className="gradient-text font-semibold">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.22 290), oklch(0.82 0.18 200))",
                boxShadow: "0 0 8px oklch(0.72 0.22 290 / 0.5)",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="border-border mb-6"
              style={{
                background: "oklch(0.14 0.03 268 / 0.9)",
                backdropFilter: "blur(12px)",
                boxShadow:
                  "0 4px 32px oklch(0.05 0.02 270 / 0.5), 0 0 0 1px oklch(0.22 0.04 265 / 0.8)",
              }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl font-semibold text-foreground leading-relaxed">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    type="button"
                    key={option}
                    onClick={() => setSelectedOption(idx)}
                    data-ocid={`quiz.option.${idx + 1}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                      selectedOption === idx
                        ? "text-foreground"
                        : "border-border bg-muted/20 text-muted-foreground hover:text-foreground"
                    }`}
                    style={
                      selectedOption === idx
                        ? {
                            borderColor: "oklch(0.72 0.22 290 / 0.6)",
                            background:
                              "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.12), oklch(0.82 0.18 200 / 0.06))",
                            boxShadow:
                              "0 0 16px oklch(0.72 0.22 290 / 0.2), inset 0 1px 0 oklch(0.72 0.22 290 / 0.1)",
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedOption === idx
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedOption === idx && (
                          <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => {
              if (currentIndex > 0) {
                setDirection(-1);
                setCurrentIndex((i) => i - 1);
                setSelectedOption(
                  answers[currentIndex - 1]?.selectedOption ?? null,
                );
              }
            }}
            disabled={currentIndex === 0}
            data-ocid="quiz.prev.button"
            className="text-muted-foreground hover:text-foreground"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedOption === null || isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 primary-glow transition-all"
            data-ocid={isLast ? "quiz.submit_button" : "quiz.next.button"}
          >
            {isPending
              ? "Analyzing..."
              : isLast
                ? "Submit & See Results"
                : "Next Question"}
            {!isPending && <ChevronRight className="ml-1 w-4 h-4" />}
          </Button>
        </div>
      </div>
    </main>
  );
}
