"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  UserPlus,
  CreditCard,
  Send,
  Shield,
  Zap,
  Globe,
  Lock,
  CheckCircle,
  ArrowRight,
  Wallet,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import styles from "./HowItWorks.module.css";

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Sign up in minutes with just your email and phone number. No lengthy paperwork required.",
      details: [
        "Quick 2-minute registration",
        "Verify your identity securely",
        "Set up your security preferences",
        "Choose your account type",
      ],
      color: "#667eea",
    },
    {
      icon: CreditCard,
      title: "Link Your Payment Method",
      description:
        "Connect your bank account, debit card, or credit card securely to start transacting.",
      details: [
        "Bank-level encryption",
        "Multiple payment options",
        "Instant verification",
        "Secure storage",
      ],
      color: "#f59e0b",
    },
    {
      icon: Send,
      title: "Send Money Instantly",
      description:
        "Transfer money to anyone, anywhere in the world with just a few taps.",
      details: [
        "Real-time transfers",
        "Low transaction fees",
        "Global reach",
        "24/7 availability",
      ],
      color: "#10b981",
    },
    {
      icon: TrendingUp,
      title: "Track & Manage",
      description:
        "Monitor all your transactions, set budgets, and analyze your spending patterns.",
      details: [
        "Real-time notifications",
        "Spending insights",
        "Transaction history",
        "Smart budgeting tools",
      ],
      color: "#ef4444",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your data is protected with 256-bit encryption and multi-factor authentication",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Transactions complete in seconds, not days. Experience the speed of modern payments",
    },
    {
      icon: Globe,
      title: "Global Transfers",
      description:
        "Send money to over 180 countries with competitive exchange rates",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "We never share your personal information. Your privacy is our priority",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      stat: "< 3 sec",
      label: "Average Transfer Time",
    },
    {
      icon: Users,
      stat: "10M+",
      label: "Active Users",
    },
    {
      icon: Globe,
      stat: "180+",
      label: "Countries Supported",
    },
    {
      icon: Shield,
      stat: "99.9%",
      label: "Uptime Guarantee",
    },
  ];

  // Fixed scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Handle button clicks properly
  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection("steps-section");
  };

  const handleWatchDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Watch Demo clicked");
  };

  const handleCreateAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Create Account clicked");
  };

  const handleContactSales = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Contact Sales clicked");
  };

  // Add smooth scrolling to the entire page
  useEffect(() => {
    // Remove any global scroll behavior that might cause issues
    const originalScrollBehavior =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1}></div>
          <div className={styles.heroOrb2}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Wallet className={styles.badgeIcon} />
            <span>How PayFlow Works</span>
          </div>
          <h1 className={styles.heroTitle}>
            Send Money in{" "}
            <span className={styles.highlight}>4 Simple Steps</span>
          </h1>
          <p className={styles.heroDescription}>
            Experience the easiest way to send, receive, and manage money. Join
            millions of users who trust PayFlow for their daily transactions.
          </p>
          <div className={styles.heroButtons}>
            <button
              className={styles.primaryButton}
              onClick={handleGetStarted}
              type="button"
            >
              Get Started Free
              <ArrowRight className={styles.buttonIcon} />
            </button>
            <button
              className={styles.secondaryButton}
              onClick={handleWatchDemo}
              type="button"
            >
              Watch Demo
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard}>
            <div className={styles.cardGlow}></div>
            <Smartphone className={styles.phoneIcon} />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps-section" className={styles.stepsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Simple & Secure Process</h2>
          <p className={styles.sectionDescription}>
            Get started in minutes and enjoy seamless transactions
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.stepCard} ${
                activeStep === index ? styles.activeStep : ""
              }`}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className={styles.stepNumber}>{index + 1}</div>
              <div
                className={styles.stepIconWrapper}
                style={{
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                }}
              >
                <step.icon className={styles.stepIcon} />
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              <ul className={styles.stepDetails}>
                {step.details.map((detail, idx) => (
                  <li key={idx} className={styles.stepDetail}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose PayFlow?</h2>
          <p className={styles.sectionDescription}>
            Built with security, speed, and simplicity in mind
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <feature.icon className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.statCard}>
              <benefit.icon className={styles.statIcon} />
              <div className={styles.statNumber}>{benefit.stat}</div>
              <div className={styles.statLabel}>{benefit.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaVisual}>
            <div className={styles.ctaGlow}></div>
          </div>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Join millions of users who trust PayFlow for fast, secure, and
            simple money transfers
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.ctaPrimaryButton}
              onClick={handleCreateAccount}
              type="button"
            >
              Create Free Account
              <ArrowRight className={styles.buttonIcon} />
            </button>
            <button
              className={styles.ctaSecondaryButton}
              onClick={handleContactSales}
              type="button"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
