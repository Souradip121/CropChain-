"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  BookOpen,
  BarChart,
  Droplet,
  Calendar,
  Wallet,
  FileText,
  Shield,
  PiggyBank,
  Calculator,
  Award,
  Users,
  Globe,
  Download,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("agricultural");

  const learningCategories = {
    agricultural: [
      {
        title: "Crop-Specific Guides",
        description:
          "Step-by-step techniques for high-yield farming of specific crops.",
        icon: <Leaf className="h-10 w-10 text-cropchain-green" />,
        linkText: "Browse Crop Guides",
        link: "/learn/crops",
      },
      {
        title: "Soil & Water Management",
        description:
          "Tutorials on improving soil health, irrigation planning, and climate resilience.",
        icon: <Droplet className="h-10 w-10 text-cropchain-green" />,
        linkText: "Learn Soil Management",
        link: "/learn/soil-water",
      },
      {
        title: "Sustainable Farming",
        description:
          "Regenerative agriculture, organic practices, and reducing chemical use.",
        icon: <Leaf className="h-10 w-10 text-cropchain-green" />,
        linkText: "Explore Sustainable Methods",
        link: "/learn/sustainable",
      },
      {
        title: "Seasonal Calendars",
        description:
          "Region-wise planting and harvesting schedules based on real-time weather patterns.",
        icon: <Calendar className="h-10 w-10 text-cropchain-green" />,
        linkText: "View Calendars",
        link: "/learn/calendars",
      },
    ],
    blockchain: [
      {
        title: "Intro to Yield-Backed Tokens",
        description:
          "Simple explainer videos and interactive demos about tokenized crop yields.",
        icon: <FileText className="h-10 w-10 text-cropchain-blue" />,
        linkText: "Watch Introduction",
        link: "/learn/tokens-intro",
      },
      {
        title: "Smart Contracts 101",
        description:
          "How automated agreements work in farmers' favor and secure investments.",
        icon: <Shield className="h-10 w-10 text-cropchain-blue" />,
        linkText: "Learn Smart Contracts",
        link: "/learn/smart-contracts",
      },
      {
        title: "Wallet Setup & Security",
        description:
          "Guides on using wallets securely (e.g., MetaMask, Trust Wallet).",
        icon: <Wallet className="h-10 w-10 text-cropchain-blue" />,
        linkText: "Setup Your Wallet",
        link: "/learn/wallets",
      },
      {
        title: "Marketplace Use",
        description:
          "How to list, monitor, and manage tokenized crops on CropChain.",
        icon: <BarChart className="h-10 w-10 text-cropchain-blue" />,
        linkText: "Master the Marketplace",
        link: "/learn/marketplace-guide",
      },
    ],
    financial: [
      {
        title: "Budgeting & Planning",
        description:
          "How to plan seasons financially with upfront capital from token sales.",
        icon: <PiggyBank className="h-10 w-10 text-cropchain-green" />,
        linkText: "Financial Planning",
        link: "/learn/budgeting",
      },
      {
        title: "Profit Calculation Tools",
        description:
          "Mini-calculators to help farmers estimate returns from tokenized yields.",
        icon: <Calculator className="h-10 w-10 text-cropchain-green" />,
        linkText: "Calculate Profits",
        link: "/learn/profit-calc",
      },
      {
        title: "Understanding Risks",
        description:
          "Breakdowns of insurance features, market volatility, and how to hedge.",
        icon: <Shield className="h-10 w-10 text-cropchain-green" />,
        linkText: "Risk Management",
        link: "/learn/risks",
      },
    ],
    certification: [
      {
        title: "Badges and Rewards",
        description:
          "Earn tokens, badges, or reputation scores by completing lessons.",
        icon: <Award className="h-10 w-10 text-cropchain-blue" />,
        linkText: "View Achievements",
        link: "/learn/badges",
      },
      {
        title: "Certification Courses",
        description:
          "Short courses with certification to build credibility with investors.",
        icon: <BookOpen className="h-10 w-10 text-cropchain-blue" />,
        linkText: "Browse Certifications",
        link: "/learn/certification",
      },
    ],
    community: [
      {
        title: "Ask an Agronomist",
        description: "Submit queries and get advice from agricultural experts.",
        icon: <MessageCircle className="h-10 w-10 text-cropchain-green" />,
        linkText: "Ask a Question",
        link: "/learn/expert-advice",
      },
      {
        title: "Peer Learning",
        description:
          "Farmer success stories, shared techniques, and local innovations.",
        icon: <Users className="h-10 w-10 text-cropchain-green" />,
        linkText: "Community Stories",
        link: "/learn/community",
      },
      {
        title: "Live Webinars",
        description:
          "Regular virtual sessions with scientists, agritech companies, or blockchain educators.",
        icon: <Globe className="h-10 w-10 text-cropchain-green" />,
        linkText: "Upcoming Webinars",
        link: "/learn/webinars",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 bg-cropchain-beige dark:bg-cropchain-dark">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cropchain-green/10 border border-cropchain-green/20">
                <span className="text-sm font-medium text-cropchain-green">
                  Knowledge Center
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-cropchain-dark dark:text-white">
                Learn with CropChain
              </h1>
              <p className="mt-4 text-lg text-cropchain-medium max-w-2xl mx-auto">
                Educational resources to help you master farming techniques,
                understand blockchain technology, and maximize your success on
                our platform.
              </p>
            </div>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto relative mb-16">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for topics, guides, or tutorials..."
                  className="w-full px-6 py-4 rounded-xl border border-cropchain-gray/30 bg-white dark:bg-cropchain-dark/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-cropchain-green"
                />
                <Button className="absolute right-2 top-2 bg-cropchain-green hover:bg-cropchain-green/90">
                  Search
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <Badge
                  variant="outline"
                  className="bg-white/50 dark:bg-cropchain-dark/50 hover:bg-cropchain-green/10 cursor-pointer"
                >
                  Organic Farming
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/50 dark:bg-cropchain-dark/50 hover:bg-cropchain-green/10 cursor-pointer"
                >
                  Smart Contracts
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/50 dark:bg-cropchain-dark/50 hover:bg-cropchain-green/10 cursor-pointer"
                >
                  Wallet Setup
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/50 dark:bg-cropchain-dark/50 hover:bg-cropchain-green/10 cursor-pointer"
                >
                  Irrigation
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 bg-white dark:bg-cropchain-dark/90">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <Tabs
              defaultValue="agricultural"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <div className="mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <TabsTrigger
                    value="agricultural"
                    className="data-[state=active]:bg-cropchain-green-light data-[state=active]:text-cropchain-green"
                  >
                    Agricultural Practices
                  </TabsTrigger>
                  <TabsTrigger
                    value="blockchain"
                    className="data-[state=active]:bg-cropchain-blue-light data-[state=active]:text-cropchain-blue"
                  >
                    Blockchain Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="financial"
                    className="data-[state=active]:bg-cropchain-green-light data-[state=active]:text-cropchain-green"
                  >
                    Financial Literacy
                  </TabsTrigger>
                  <TabsTrigger
                    value="certification"
                    className="data-[state=active]:bg-cropchain-blue-light data-[state=active]:text-cropchain-blue"
                  >
                    Certification
                  </TabsTrigger>
                  <TabsTrigger
                    value="community"
                    className="data-[state=active]:bg-cropchain-green-light data-[state=active]:text-cropchain-green"
                  >
                    Community & Experts
                  </TabsTrigger>
                </TabsList>
              </div>

              {Object.keys(learningCategories).map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {learningCategories[category].map((item, index) => (
                      <Card
                        key={index}
                        className="border-cropchain-gray/20 hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <CardHeader className="pb-2">
                          <div className="mb-3">{item.icon}</div>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-cropchain-medium">
                            {item.description}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Link href={item.link} className="w-full">
                            <Button
                              variant="outline"
                              className={`w-full ${
                                activeTab === "blockchain" ||
                                activeTab === "certification"
                                  ? "text-cropchain-blue hover:bg-cropchain-blue/10"
                                  : "text-cropchain-green hover:bg-cropchain-green/10"
                              }`}
                            >
                              {item.linkText}
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="py-16 bg-cropchain-beige dark:bg-cropchain-dark/80">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cropchain-blue/10 border border-cropchain-blue/20">
                <span className="text-sm font-medium text-cropchain-blue">
                  Skill Development
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white">
                Learning Paths
              </h2>
              <p className="mt-4 text-lg text-cropchain-medium max-w-2xl mx-auto">
                Structured learning experiences designed for different roles and
                skill levels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                <CardHeader>
                  <CardTitle>For New Farmers</CardTitle>
                  <CardDescription>
                    Master the basics of sustainable farming and blockchain
                    integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-green/20 flex items-center justify-center">
                        <span className="text-cropchain-green font-medium">
                          1
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Introduction to Sustainable Farming
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-green/20 flex items-center justify-center">
                        <span className="text-cropchain-green font-medium">
                          2
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Blockchain Basics for Agriculture
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-green/20 flex items-center justify-center">
                        <span className="text-cropchain-green font-medium">
                          3
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Setting Up Your First Token Sale
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-cropchain-green hover:bg-cropchain-green/90">
                    Start Path
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                <CardHeader>
                  <CardTitle>For New Investors</CardTitle>
                  <CardDescription>
                    Learn how to evaluate and invest in agricultural tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-blue/20 flex items-center justify-center">
                        <span className="text-cropchain-blue font-medium">
                          1
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Understanding Yield-Backed Tokens
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-blue/20 flex items-center justify-center">
                        <span className="text-cropchain-blue font-medium">
                          2
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Evaluating Agricultural Investments
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-blue/20 flex items-center justify-center">
                        <span className="text-cropchain-blue font-medium">
                          3
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Building a Diversified Farm Portfolio
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-cropchain-blue hover:bg-cropchain-blue/90">
                    Start Path
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                <CardHeader>
                  <CardTitle>Advanced Topics</CardTitle>
                  <CardDescription>
                    Deepen your knowledge with specialized subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-green/20 flex items-center justify-center">
                        <span className="text-cropchain-green font-medium">
                          1
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Regenerative Agriculture Techniques
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-green/20 flex items-center justify-center">
                        <span className="text-cropchain-green font-medium">
                          2
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Advanced Smart Contract Strategies
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cropchain-green/20 flex items-center justify-center">
                        <span className="text-cropchain-green font-medium">
                          3
                        </span>
                      </div>
                      <p className="text-cropchain-medium">
                        Climate-Resilient Farming Methods
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-cropchain-green hover:bg-cropchain-green/90">
                    Start Path
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-cropchain-dark">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white">
                Additional Features
              </h2>
              <p className="mt-4 text-lg text-cropchain-medium max-w-2xl mx-auto">
                Designed for accessibility and convenience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl border border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cropchain-blue/10 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-cropchain-blue" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-cropchain-dark dark:text-white">
                  Multilingual Support
                </h3>
                <p className="text-cropchain-medium">
                  Content available in regional languages for better
                  accessibility to farmers worldwide.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl border border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cropchain-green/10 flex items-center justify-center">
                  <Download className="h-8 w-8 text-cropchain-green" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-cropchain-dark dark:text-white">
                  Offline Mode
                </h3>
                <p className="text-cropchain-medium">
                  Downloadable PDFs or video modules for learning without
                  internet access.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl border border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cropchain-blue/10 flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-cropchain-blue" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-cropchain-dark dark:text-white">
                  Progress Tracking
                </h3>
                <p className="text-cropchain-medium">
                  Track your learning path, completed lessons, and get
                  personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="glass-effect rounded-2xl p-8 md:p-12 shadow-glass overflow-hidden relative">
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cropchain-green/20 blur-3xl"></div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                <div className="lg:col-span-3">
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white">
                    Ready to expand your knowledge?
                  </h2>
                  <p className="mt-4 text-lg text-cropchain-medium">
                    Start your learning journey today and improve your farming
                    and investment outcomes.
                  </p>
                </div>

                <div className="lg:col-span-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button className="w-full px-8 py-6 text-base bg-cropchain-green hover:bg-cropchain-green/90 text-white">
                    Start Learning
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full px-8 py-6 text-base border-cropchain-gray/50 hover:bg-cropchain-gray/20 text-cropchain-medium"
                  >
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
