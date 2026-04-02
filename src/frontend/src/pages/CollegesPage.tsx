import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart2,
  Cloud,
  Code2,
  Globe,
  GraduationCap,
  Palette,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const COLLEGE_DATA = [
  {
    path: "Web Development",
    icon: Code2,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    colleges: [
      {
        name: "Massachusetts Institute of Technology (MIT)",
        country: "USA",
        rating: 5,
        note: "World-leading CS programs, strong project culture",
      },
      {
        name: "Stanford University",
        country: "USA",
        rating: 5,
        note: "Silicon Valley connections, entrepreneurship focus",
      },
      {
        name: "Carnegie Mellon University",
        country: "USA",
        rating: 5,
        note: "Top-ranked CS school, strong industry ties",
      },
      {
        name: "IIT Bombay",
        country: "India",
        rating: 4,
        note: "Premier Indian tech institute, excellent placements",
      },
      {
        name: "University of Toronto",
        country: "Canada",
        rating: 4,
        note: "Strong research programs, vibrant tech scene",
      },
      {
        name: "freeCodeCamp + Coursera",
        country: "Online",
        rating: 4,
        note: "Free/low-cost full-stack certifications",
      },
    ],
  },
  {
    path: "Cybersecurity",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    colleges: [
      {
        name: "Carnegie Mellon University – CyLab",
        country: "USA",
        rating: 5,
        note: "Dedicated cybersecurity research center",
      },
      {
        name: "Georgia Tech",
        country: "USA",
        rating: 5,
        note: "MSCS with cybersecurity specialization",
      },
      {
        name: "University of Maryland",
        country: "USA",
        rating: 4,
        note: "NSA Center of Academic Excellence",
      },
      {
        name: "IIT Delhi",
        country: "India",
        rating: 4,
        note: "Strong security research department",
      },
      {
        name: "SANS Institute",
        country: "Online",
        rating: 5,
        note: "Industry-leading GIAC certifications",
      },
      {
        name: "TryHackMe / HackTheBox",
        country: "Online",
        rating: 4,
        note: "Hands-on pentesting platforms",
      },
    ],
  },
  {
    path: "Data Science",
    icon: BarChart2,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    colleges: [
      {
        name: "UC Berkeley",
        country: "USA",
        rating: 5,
        note: "Data Science division, world-class faculty",
      },
      {
        name: "Columbia University",
        country: "USA",
        rating: 5,
        note: "MS in Data Science, NYC tech access",
      },
      {
        name: "Imperial College London",
        country: "UK",
        rating: 5,
        note: "Strong statistics & ML programs",
      },
      {
        name: "IISc Bangalore",
        country: "India",
        rating: 4,
        note: "Premier research institute for ML/AI",
      },
      {
        name: "Coursera (Deep Learning.AI)",
        country: "Online",
        rating: 5,
        note: "Andrew Ng's renowned ML specialization",
      },
      {
        name: "Kaggle Learn",
        country: "Online",
        rating: 4,
        note: "Free hands-on data science courses",
      },
    ],
  },
  {
    path: "UI/UX Design",
    icon: Palette,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    colleges: [
      {
        name: "Rhode Island School of Design",
        country: "USA",
        rating: 5,
        note: "World-renowned design school",
      },
      {
        name: "Parsons School of Design",
        country: "USA",
        rating: 5,
        note: "Strong UX and digital design programs",
      },
      {
        name: "Royal College of Art",
        country: "UK",
        rating: 5,
        note: "Premier postgraduate design institution",
      },
      {
        name: "NID Ahmedabad",
        country: "India",
        rating: 4,
        note: "National Institute of Design, top in India",
      },
      {
        name: "Google UX Design Certificate",
        country: "Online",
        rating: 5,
        note: "Industry-recognized 6-month program",
      },
      {
        name: "Interaction Design Foundation",
        country: "Online",
        rating: 4,
        note: "Affordable, comprehensive UX courses",
      },
    ],
  },
  {
    path: "Cloud Computing",
    icon: Cloud,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    colleges: [
      {
        name: "University of Washington",
        country: "USA",
        rating: 5,
        note: "Cloud computing certificate programs",
      },
      {
        name: "ETH Zurich",
        country: "Switzerland",
        rating: 5,
        note: "Top European tech university",
      },
      {
        name: "University of Illinois Urbana-Champaign",
        country: "USA",
        rating: 4,
        note: "Strong cloud and distributed systems",
      },
      {
        name: "IIT Madras",
        country: "India",
        rating: 4,
        note: "Cloud computing online degree programs",
      },
      {
        name: "AWS Training & Certification",
        country: "Online",
        rating: 5,
        note: "Official AWS cloud certifications",
      },
      {
        name: "Linux Foundation Courses",
        country: "Online",
        rating: 4,
        note: "Kubernetes, DevOps certifications",
      },
    ],
  },
];

export function CollegesPage() {
  const [activeTab, setActiveTab] = useState(COLLEGE_DATA[0].path);

  return (
    <main
      className="min-h-screen pt-24 pb-16 px-4"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 20% 20%, oklch(0.18 0.06 285 / 0.2), transparent 50%), oklch(0.10 0.025 270)",
      }}
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
            College Finder
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-foreground">
            Top Recommendations
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Curated college and online program recommendations for each tech
            career path.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="flex flex-wrap h-auto gap-1 p-1 mb-8 rounded-xl"
            style={{
              background: "oklch(0.14 0.03 268 / 0.8)",
              border: "1px solid oklch(0.22 0.04 265)",
              backdropFilter: "blur(12px)",
            }}
          >
            {COLLEGE_DATA.map((item) => {
              const Icon = item.icon;
              return (
                <TabsTrigger
                  key={item.path}
                  value={item.path}
                  data-ocid={`colleges.${item.path.toLowerCase().replace(/[ /]/g, "_")}.tab`}
                  className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:text-foreground"
                  style={{
                    background:
                      activeTab === item.path
                        ? "linear-gradient(135deg, oklch(0.72 0.22 290 / 0.2), oklch(0.82 0.18 200 / 0.1))"
                        : undefined,
                  }}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className="hidden sm:inline">{item.path}</span>
                  <span className="sm:hidden">{item.path.split(" ")[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {COLLEGE_DATA.map((item) => (
            <TabsContent
              key={item.path}
              value={item.path}
              data-ocid={`colleges.${item.path.toLowerCase().replace(/[ /]/g, "_")}.panel`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {item.colleges.map((college, i) => (
                  <motion.div
                    key={college.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    data-ocid={`colleges.${item.path.toLowerCase().replace(/[ /]/g, "_")}.item.${i + 1}`}
                  >
                    <Card
                      className="border-border card-hover h-full"
                      style={{
                        background: "oklch(0.14 0.03 268 / 0.8)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="font-heading text-sm font-semibold text-foreground leading-snug">
                            {college.name}
                          </CardTitle>
                          <div
                            className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}
                          >
                            {college.country === "Online" ? (
                              <Globe className={`w-4 h-4 ${item.color}`} />
                            ) : (
                              <GraduationCap
                                className={`w-4 h-4 ${item.color}`}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs bg-muted/50 text-muted-foreground border-border">
                            {college.country}
                          </Badge>
                          <div className="flex">
                            {Array.from({ length: college.rating }, (_, si) => (
                              <Star
                                key={`${college.name}-star-${si}`}
                                className="w-3 h-3 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {college.note}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
