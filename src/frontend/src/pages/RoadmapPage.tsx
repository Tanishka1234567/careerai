import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  BarChart2,
  CheckCircle2,
  Circle,
  Cloud,
  Code2,
  Map as MapIcon,
  Palette,
  Shield,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetAllCareerPaths } from "../hooks/useQueries";

const FALLBACK_PATHS = [
  {
    title: "Web Development",
    icon: Code2,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderTopColor: "border-t-blue-400/50",
    skillMap: [
      "HTML5 & CSS3 Fundamentals",
      "JavaScript ES6+ & TypeScript",
      "React.js / Vue.js Framework",
      "Node.js & Express Backend",
      "RESTful APIs & GraphQL",
      "Database: SQL & MongoDB",
      "Git & Version Control",
      "Deployment: Docker & CI/CD",
      "Testing: Jest & Cypress",
      "Web Performance & SEO",
    ],
    collegeRecommendations: [] as string[],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderTopColor: "border-t-red-400/50",
    skillMap: [
      "Networking Fundamentals (TCP/IP)",
      "Linux & Command Line Mastery",
      "CompTIA Security+ Certification",
      "Ethical Hacking & Penetration Testing",
      "SIEM Tools (Splunk, ELK Stack)",
      "Vulnerability Assessment & Scanning",
      "Incident Response & Forensics",
      "Cloud Security (AWS/Azure)",
      "OSCP / CEH Certifications",
      "Bug Bounty Programs",
    ],
    collegeRecommendations: [] as string[],
  },
  {
    title: "Data Science",
    icon: BarChart2,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderTopColor: "border-t-purple-400/50",
    skillMap: [
      "Python Programming (NumPy, Pandas)",
      "SQL & Database Management",
      "Statistics & Probability",
      "Data Visualization (Matplotlib, Tableau)",
      "Machine Learning (Scikit-learn)",
      "Deep Learning (TensorFlow, PyTorch)",
      "Feature Engineering & EDA",
      "Big Data (Spark, Hadoop)",
      "MLOps & Model Deployment",
      "Kaggle Competitions & Portfolio",
    ],
    collegeRecommendations: [] as string[],
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderTopColor: "border-t-pink-400/50",
    skillMap: [
      "Design Principles & Typography",
      "Figma & Adobe XD Mastery",
      "User Research Methods",
      "Wireframing & Prototyping",
      "Design Systems & Components",
      "Usability Testing & Heuristics",
      "Accessibility (WCAG Standards)",
      "Motion Design & Microinteractions",
      "Portfolio: 3-5 Case Studies",
      "Frontend Basics (HTML/CSS)",
    ],
    collegeRecommendations: [] as string[],
  },
  {
    title: "Cloud Computing",
    icon: Cloud,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderTopColor: "border-t-yellow-400/50",
    skillMap: [
      "Linux & Scripting (Bash/Python)",
      "AWS / Azure / GCP Fundamentals",
      "Docker & Container Management",
      "Kubernetes Orchestration",
      "Infrastructure as Code (Terraform)",
      "CI/CD Pipelines (Jenkins, GitHub Actions)",
      "Monitoring (Prometheus, Grafana)",
      "Security & IAM Best Practices",
      "AWS Solutions Architect Certification",
      "Microservices Architecture",
    ],
    collegeRecommendations: [] as string[],
  },
];

export function RoadmapPage() {
  const { data: backendPaths } = useGetAllCareerPaths();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>(
    {},
  );

  const paths =
    backendPaths && backendPaths.length > 0
      ? backendPaths.map((p, i) => ({
          ...FALLBACK_PATHS[i % FALLBACK_PATHS.length],
          ...p,
        }))
      : FALLBACK_PATHS;

  const selectedPath = selectedIndex !== null ? paths[selectedIndex] : null;

  const toggleSkill = (skill: string) => {
    setCheckedSkills((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  return (
    <main
      className="min-h-screen pt-24 pb-16 px-4"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 80% 20%, oklch(0.18 0.06 200 / 0.2), transparent 50%), oklch(0.10 0.025 270)",
      }}
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <MapIcon className="w-3.5 h-3.5 mr-1.5" />
            Skills Roadmap
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-foreground">
            Career Path Roadmaps
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Choose a career path to explore a detailed skill roadmap and track
            your progress.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedPath === null ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paths.map((path, i) => {
                const PathIcon = path.icon || MapIcon;
                return (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card
                      className={`border-border card-hover cursor-pointer group relative overflow-hidden border-t-2 ${path.borderTopColor}`}
                      onClick={() => setSelectedIndex(i)}
                      data-ocid={`roadmap.path.item.${i + 1}`}
                      style={{
                        background: "oklch(0.14 0.03 268 / 0.8)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="p-6">
                        <div
                          className={`w-12 h-12 rounded-xl ${path.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <PathIcon className={`w-6 h-6 ${path.color}`} />
                        </div>
                        <h3 className="font-heading font-bold text-foreground mb-2">
                          {path.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {path.skillMap.length} skills to master
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {path.skillMap.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              className="text-xs bg-muted/50 text-muted-foreground border-border"
                            >
                              {skill.split(" ")[0]}
                            </Badge>
                          ))}
                          <Badge className="text-xs bg-muted/50 text-muted-foreground border-border">
                            +{path.skillMap.length - 3} more
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedIndex(null)}
                className="mb-6 text-muted-foreground hover:text-foreground"
                data-ocid="roadmap.back.button"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Paths
              </Button>

              <Card
                className="border-border"
                style={{
                  background: "oklch(0.14 0.03 268 / 0.9)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 4px 32px oklch(0.05 0.02 270 / 0.5), 0 0 0 1px oklch(0.22 0.04 265 / 0.8)",
                }}
              >
                <CardHeader
                  className="border-b pb-4"
                  style={{ borderColor: "oklch(0.22 0.04 265)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${selectedPath.bgColor} flex items-center justify-center`}
                    >
                      <selectedPath.icon
                        className={`w-6 h-6 ${selectedPath.color}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="font-heading text-2xl text-foreground">
                        {selectedPath.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {selectedPath.skillMap.length} skills • Click to track
                        progress
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {selectedPath.skillMap.map((skill, idx) => (
                      <motion.button
                        type="button"
                        key={skill}
                        onClick={() =>
                          toggleSkill(`${selectedPath.title}-${skill}`)
                        }
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        data-ocid={`roadmap.skill.item.${idx + 1}`}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          checkedSkills[`${selectedPath.title}-${skill}`]
                            ? "border-primary/30 bg-primary/5"
                            : "border-border bg-muted/10 hover:bg-muted/30 hover:border-primary/20"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {checkedSkills[`${selectedPath.title}-${skill}`] ? (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-xs text-muted-foreground font-mono w-6">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              checkedSkills[`${selectedPath.title}-${skill}`]
                                ? "text-primary line-through"
                                : "text-foreground"
                            }`}
                          >
                            {skill}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
