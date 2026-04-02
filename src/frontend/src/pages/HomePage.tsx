import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  GraduationCap,
  Map as MapIcon,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

type Page = "home" | "quiz" | "roadmap" | "colleges" | "chat";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const features = [
  {
    icon: Brain,
    title: "Career Quiz",
    description:
      "10 targeted MCQ questions to analyze your interests, strengths, and work style.",
    badge: "10 Questions",
    page: "quiz" as Page,
    accentColor: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-t-primary/60",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description:
      "Get personalized career recommendations powered by intelligent scoring algorithms.",
    badge: "AI Powered",
    page: "quiz" as Page,
    accentColor: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-t-accent/60",
  },
  {
    icon: MapIcon,
    title: "Skills Roadmap",
    description:
      "Step-by-step learning paths for Web Dev, Cybersecurity, Data Science, UI/UX, and Cloud.",
    badge: "5 Paths",
    page: "roadmap" as Page,
    accentColor: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-t-primary/60",
  },
  {
    icon: GraduationCap,
    title: "College Finder",
    description:
      "Curated college and course recommendations for each tech career specialization.",
    badge: "Top Picks",
    page: "colleges" as Page,
    accentColor: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-t-accent/60",
  },
];

const steps = [
  {
    num: "01",
    title: "Take the Quiz",
    desc: "Answer 10 questions about your interests and strengths",
  },
  {
    num: "02",
    title: "Get Your Match",
    desc: "AI analyzes your answers and recommends the best career path",
  },
  {
    num: "03",
    title: "Follow the Roadmap",
    desc: "Access curated skills, resources, and college recommendations",
  },
  {
    num: "04",
    title: "Chat & Clarify",
    desc: "Use our AI chatbot to answer any career questions",
  },
];

const stats = [
  { value: "5+", label: "Career Paths" },
  { value: "50+", label: "Skills Mapped" },
  { value: "100+", label: "College Picks" },
  { value: "AI", label: "Powered" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden">
        {/* Animated blob decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Violet blob */}
          <div
            className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob-float"
            style={{
              background: "oklch(0.72 0.22 290)",
              animationDelay: "0s",
            }}
          />
          {/* Cyan blob */}
          <div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 animate-blob-float"
            style={{
              background: "oklch(0.82 0.18 200)",
              animationDelay: "2.5s",
            }}
          />
          {/* Small accent blob */}
          <div
            className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10 animate-blob-float"
            style={{
              background: "oklch(0.72 0.22 290)",
              animationDelay: "5s",
            }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block"
            >
              <Badge
                className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-1.5 text-sm animate-badge-ring"
                style={{
                  boxShadow: "0 0 0 1px oklch(0.72 0.22 290 / 0.2)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                AI-Powered Career Guidance
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Discover Your{" "}
              <span className="gradient-text">Perfect Career</span> Path
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Take our AI-powered career quiz, explore personalized skill
              roadmaps, and find the right colleges — all in one platform
              designed to launch your tech career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => onNavigate("quiz")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 py-6 primary-glow transition-all hover:scale-105"
                data-ocid="hero.quiz.primary_button"
              >
                Take the Quiz
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("roadmap")}
                className="border-border text-foreground hover:bg-muted/50 hover:border-primary/40 font-semibold text-base px-8 py-6 transition-all"
                data-ocid="hero.roadmap.secondary_button"
              >
                Explore Roadmaps
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mt-20"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card-glass text-center rounded-xl p-5"
              >
                <p className="font-heading font-bold text-3xl gradient-text">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Target className="w-3.5 h-3.5 mr-1.5" />
              Core Features
            </Badge>
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From self-assessment to career planning — we&apos;ve got your
              entire journey covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`bg-card border-border card-hover cursor-pointer h-full group relative overflow-hidden border-t-2 ${feat.borderColor}`}
                  onClick={() => onNavigate(feat.page)}
                  data-ocid={`features.${feat.title.toLowerCase().replace(/ /g, "_")}.card`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${feat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feat.icon className={`w-6 h-6 ${feat.accentColor}`} />
                    </div>
                    <Badge className="mb-3 text-xs bg-primary/5 text-primary border-primary/15">
                      {feat.badge}
                    </Badge>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-20"
        style={{ background: "oklch(0.12 0.028 270)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
              How It Works
            </Badge>
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Your Journey in 4 Steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 primary-glow"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.2), oklch(0.82 0.18 200 / 0.1))",
                    border: "1px solid oklch(0.72 0.22 290 / 0.3)",
                  }}
                >
                  <span className="font-heading font-bold gradient-text text-lg">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center rounded-2xl p-12 relative overflow-hidden gradient-border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.14 0.03 268) 0%, oklch(0.16 0.045 280) 100%)",
              boxShadow:
                "0 0 0 1px oklch(0.72 0.22 290 / 0.2), 0 20px 60px oklch(0.05 0.02 270 / 0.6), 0 0 40px oklch(0.72 0.22 290 / 0.1)",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.72 0.22 290 / 0.12), transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 primary-glow"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.3), oklch(0.82 0.18 200 / 0.2))",
                  border: "1px solid oklch(0.72 0.22 290 / 0.4)",
                }}
              >
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Ready to Find Your Path?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of students who found their ideal tech career
                using CareerAI.
              </p>
              <Button
                size="lg"
                onClick={() => onNavigate("quiz")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10 py-6 primary-glow hover:scale-105 transition-all"
                data-ocid="cta.quiz.primary_button"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
