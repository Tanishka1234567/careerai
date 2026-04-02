import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();
  if (/web|frontend|react|html|css|javascript/.test(lower)) {
    return "Web development is a great career choice! 🌐 Start with HTML, CSS, and JavaScript fundamentals, then learn React or Vue.js. Key skills include responsive design, REST APIs, and Git. You can land a junior developer role in 6-12 months of focused learning. Check out the Roadmap section for a detailed Web Dev path!";
  }
  if (/security|hack|cyber|pentest|ctf/.test(lower)) {
    return "Cybersecurity is one of the fastest-growing fields! 🛡️ Begin with networking basics (CompTIA Network+), then study ethical hacking (CEH or OSCP). Key skills: penetration testing, SIEM tools, incident response. The demand for security professionals has never been higher—average salary exceeds $95K in the US.";
  }
  if (/data|ml|ai|machine|python|analytics|sql/.test(lower)) {
    return "Data Science & ML is incredibly exciting! 📊 Master Python, Pandas, NumPy, and Scikit-learn. Progress to deep learning with TensorFlow or PyTorch. Key roles: Data Analyst, ML Engineer, AI Researcher. A strong portfolio with Kaggle projects and GitHub repos will land you interviews at top companies.";
  }
  if (/design|ux|ui|figma|prototype|user/.test(lower)) {
    return "UI/UX Design is the bridge between technology and people! 🎨 Learn Figma for wireframing and prototyping. Study design principles, user research, and accessibility (WCAG). Build a portfolio of 3-5 case studies. You can transition from other fields—strong empathy and problem-solving matter more than artistic talent.";
  }
  if (/cloud|aws|azure|devops|docker|kubernetes|infra/.test(lower)) {
    return "Cloud & DevOps is powering the modern internet! ☁️ Start with AWS or Azure fundamentals, then learn Docker and Kubernetes for containerization. CI/CD pipelines, Terraform for IaC, and monitoring tools (Prometheus, Grafana) are must-knows. AWS certifications significantly boost your earning potential.";
  }
  if (/salary|earn|money|pay|income/.test(lower)) {
    return "Great question about compensation! 💰 Tech salaries vary by specialization:\n• Web Dev: $65K–$130K\n• Cybersecurity: $85K–$150K\n• Data Science: $90K–$160K\n• UI/UX: $70K–$140K\n• Cloud/DevOps: $100K–$180K\nLocation and experience level matter. Remote roles often offer flexibility on location.";
  }
  if (/college|university|degree|education/.test(lower)) {
    return "Education paths in tech are flexible! 🎓 A CS degree gives strong fundamentals, but bootcamps, self-study, and online certifications are equally valid. Top resources: freeCodeCamp, Coursera, Udemy, MIT OpenCourseWare. Many top engineers are self-taught. Check our College Finder for curated recommendations per career path!";
  }
  if (/quiz|result|recommend/.test(lower)) {
    return "Take our Career Quiz to get a personalized recommendation! 🧠 It's just 10 multiple-choice questions about your interests, strengths, and work style. Based on your answers, our AI will suggest the best career path and skills roadmap for you. Click 'Take Quiz' in the navigation to get started!";
  }
  return "Hi there! I'm your AI career advisor. 🤖 I can help you with:\n• Career path recommendations\n• Skills and learning roadmaps\n• Salary expectations\n• College and course recommendations\n• Cybersecurity, Web Dev, Data Science, UI/UX, or Cloud Computing\n\nWhat would you like to explore?";
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Hi! I'm your AI career advisor. Ask me anything about tech careers, skills, salaries, or how to get started! 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageCount = messages.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when messages or typing indicator changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageCount, isTyping]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 800));

    const response = getMockResponse(text);
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, role: "assistant", content: response },
    ]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-ocid="chat.open_modal_button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-primary-foreground flex items-center justify-center shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.22 290), oklch(0.65 0.25 285))",
          boxShadow:
            "0 0 24px oklch(0.72 0.22 290 / 0.5), 0 4px 16px oklch(0.05 0.02 270 / 0.5)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isOpen
            ? {}
            : {
                scale: [1, 1.06, 1],
                boxShadow: [
                  "0 0 24px oklch(0.72 0.22 290 / 0.5), 0 4px 16px oklch(0.05 0.02 270 / 0.5)",
                  "0 0 40px oklch(0.72 0.22 290 / 0.7), 0 4px 16px oklch(0.05 0.02 270 / 0.5)",
                  "0 0 24px oklch(0.72 0.22 290 / 0.5), 0 4px 16px oklch(0.05 0.02 270 / 0.5)",
                ],
              }
        }
        transition={
          isOpen
            ? {}
            : {
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }
        }
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-ocid="chat.modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              background: "oklch(0.14 0.03 268)",
              border: "1px solid oklch(0.22 0.04 265)",
              boxShadow:
                "0 0 0 1px oklch(0.72 0.22 290 / 0.15), 0 25px 50px oklch(0.05 0.02 270 / 0.7), 0 0 30px oklch(0.72 0.22 290 / 0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{
                borderColor: "oklch(0.22 0.04 265)",
                background:
                  "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.12), oklch(0.82 0.18 200 / 0.06))",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.4), oklch(0.82 0.18 200 / 0.3))",
                  border: "1px solid oklch(0.72 0.22 290 / 0.3)",
                }}
              >
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">
                  CareerAI Assistant
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{
                      background: "oklch(0.75 0.18 145)",
                      boxShadow: "0 0 6px oklch(0.75 0.18 145 / 0.6)",
                    }}
                  />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user" ? "" : ""
                      }`}
                      style={{
                        background:
                          msg.role === "user"
                            ? "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.4), oklch(0.65 0.25 285 / 0.4))"
                            : "oklch(0.18 0.035 268)",
                        border: "1px solid oklch(0.22 0.04 265)",
                      }}
                    >
                      {msg.role === "user" ? (
                        <User className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                        msg.role === "user"
                          ? "rounded-tr-sm text-primary-foreground"
                          : "rounded-tl-sm text-foreground"
                      }`}
                      style={{
                        background:
                          msg.role === "user"
                            ? "linear-gradient(135deg, oklch(0.72 0.22 290), oklch(0.65 0.25 285))"
                            : "oklch(0.18 0.035 268)",
                        border:
                          msg.role === "user"
                            ? "none"
                            : "1px solid oklch(0.22 0.04 265)",
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: "oklch(0.18 0.035 268)",
                        border: "1px solid oklch(0.22 0.04 265)",
                      }}
                    >
                      <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div
                      className="px-3 py-2 rounded-xl rounded-tl-sm flex gap-1 items-center"
                      style={{
                        background: "oklch(0.18 0.035 268)",
                        border: "1px solid oklch(0.22 0.04 265)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div
              className="p-3 flex gap-2"
              style={{
                borderTop: "1px solid oklch(0.22 0.04 265)",
                background: "oklch(0.12 0.028 268)",
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about careers..."
                className="flex-1 text-sm"
                style={{
                  background: "oklch(0.18 0.035 268)",
                  border: "1px solid oklch(0.22 0.04 265)",
                }}
                disabled={isTyping}
                data-ocid="chat.input"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="text-primary-foreground"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.22 290), oklch(0.65 0.25 285))",
                  boxShadow: "0 0 12px oklch(0.72 0.22 290 / 0.3)",
                }}
                data-ocid="chat.submit_button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
