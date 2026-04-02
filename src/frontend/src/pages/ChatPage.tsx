import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { motion } from "motion/react";

export function ChatPage() {
  return (
    <main
      className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(0.18 0.06 290 / 0.25), transparent 60%), oklch(0.10 0.025 270)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.3), oklch(0.82 0.18 200 / 0.2))",
            border: "2px solid oklch(0.72 0.22 290 / 0.4)",
            boxShadow:
              "0 0 30px oklch(0.72 0.22 290 / 0.4), 0 0 60px oklch(0.72 0.22 290 / 0.15)",
          }}
        >
          <MessageSquare className="w-12 h-12 text-primary" />
        </div>
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          AI Chatbot
        </Badge>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
          Chat with Your <span className="gradient-text">AI Advisor</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Our AI career advisor is available in the chat bubble at the
          bottom-right corner of your screen. Click it to ask questions about
          career paths, skills, salaries, colleges, and more!
        </p>
        <div className="mt-8 flex justify-center">
          <motion.div
            className="flex items-center gap-2 text-primary"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-sm font-medium">
              Look for the chat button
            </span>
            <span className="text-2xl">↘</span>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
