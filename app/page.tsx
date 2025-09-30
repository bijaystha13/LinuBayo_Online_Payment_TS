"use client";

import React, { useState } from "react";
import {
  Send,
  Shield,
  Zap,
  TrendingUp,
  Globe,
  Lock,
  ArrowRight,
  CheckCircle,
  Smartphone,
  CreditCard,
  DollarSign,
  Users,
  Star,
  Play,
} from "lucide-react";
import styles from "./page.module.css";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

interface TestimonialProps {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

const HomePage: React.FC = () => {
  const [email, setEmail] = useState("");

  const features: FeatureCardProps[] = [
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "Instant Transfers",
      description:
        "Send money in seconds to anyone, anywhere in the world with zero delays.",
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Bank-Level Security",
      description:
        "Your transactions are protected with military-grade encryption and 2FA.",
    },
    {
      icon: <DollarSign className={styles.featureIcon} />,
      title: "Low Fees",
      description:
        "Enjoy the lowest transaction fees in the industry. No hidden charges.",
    },
    {
      icon: <Globe className={styles.featureIcon} />,
      title: "Global Access",
      description:
        "Transfer funds to over 180 countries with multi-currency support.",
    },
    {
      icon: <Smartphone className={styles.featureIcon} />,
      title: "Mobile First",
      description:
        "Manage your money on the go with our intuitive mobile experience.",
    },
    {
      icon: <TrendingUp className={styles.featureIcon} />,
      title: "Real-Time Analytics",
      description:
        "Track your spending and income with powerful analytics tools.",
    },
  ];

  const stats: StatCardProps[] = [
    { number: "10M+", label: "Active Users", icon: <Users /> },
    { number: "$50B+", label: "Transferred", icon: <DollarSign /> },
    { number: "180+", label: "Countries", icon: <Globe /> },
    { number: "99.9%", label: "Uptime", icon: <Shield /> },
  ];

  const testimonials: TestimonialProps[] = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      rating: 5,
      comment:
        "PayFlow has revolutionized how I receive payments from clients worldwide. Fast, secure, and incredibly easy to use!",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      rating: 5,
      comment:
        "The analytics features help me track every transaction. Best financial app I have ever used for my business.",
      avatar: "MC",
    },
    {
      name: "Emma Williams",
      role: "Digital Nomad",
      rating: 5,
      comment:
        "Managing finances across different currencies was a nightmare. PayFlow made it effortless!",
      avatar: "EW",
    },
  ];

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <Zap className={styles.badgeIcon} />
              <span>Trusted by 10M+ users worldwide</span>
            </div>

            <h1 className={styles.heroTitle}>
              Send Money <span className={styles.gradient}>Instantly</span> to
              Anyone, Anywhere
            </h1>

            <p className={styles.heroDescription}>
              Experience the future of money transfers with lightning-fast
              transactions, bank-level security, and the lowest fees in the
              industry.
            </p>

            <form className={styles.heroForm} onSubmit={handleGetStarted}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.ctaButton}>
                Get Started Free
                <ArrowRight className={styles.buttonIcon} />
              </button>
            </form>

            <div className={styles.heroFeatures}>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>No credit card required</span>
              </div>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>Free for 30 days</span>
              </div>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.mockupCard}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupDot}></div>
                <div className={styles.mockupDot}></div>
                <div className={styles.mockupDot}></div>
              </div>
              <div className={styles.mockupContent}>
                <div className={styles.balanceCard}>
                  <span className={styles.balanceLabel}>Total Balance</span>
                  <h2 className={styles.balanceAmount}>$24,567.89</h2>
                  <div className={styles.balanceChange}>
                    <TrendingUp className={styles.trendIcon} />
                    <span>+12.5% this month</span>
                  </div>
                </div>

                <div className={styles.transactionsList}>
                  <div className={styles.transaction}>
                    <div className={styles.transactionIcon}>
                      <Send />
                    </div>
                    <div className={styles.transactionDetails}>
                      <span className={styles.transactionName}>
                        Sent to John
                      </span>
                      <span className={styles.transactionDate}>
                        Today, 2:30 PM
                      </span>
                    </div>
                    <span className={styles.transactionAmount}>-$150.00</span>
                  </div>

                  <div className={styles.transaction}>
                    <div className={styles.transactionIcon}>
                      <CreditCard />
                    </div>
                    <div className={styles.transactionDetails}>
                      <span className={styles.transactionName}>
                        Received Payment
                      </span>
                      <span className={styles.transactionDate}>
                        Yesterday, 4:15 PM
                      </span>
                    </div>
                    <span
                      className={`${styles.transactionAmount} ${styles.positive}`}
                    >
                      +$2,500.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Why Choose <span className={styles.gradient}>PayFlow</span>
          </h2>
          <p className={styles.sectionDescription}>
            Everything you need to manage and transfer money effortlessly
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Get Started in{" "}
            <span className={styles.gradient}>3 Simple Steps</span>
          </h2>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Create Account</h3>
            <p className={styles.stepDescription}>
              Sign up in seconds with just your email address. No lengthy forms
              or verification delays.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Add Funds</h3>
            <p className={styles.stepDescription}>
              Link your bank account or card to instantly add money to your
              PayFlow wallet.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Start Sending</h3>
            <p className={styles.stepDescription}>
              Send money to anyone, anywhere in the world with just a few taps.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Loved by <span className={styles.gradient}>Millions</span>
          </h2>
          <p className={styles.sectionDescription}>
            See what our users have to say about their experience
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className={styles.starIcon} />
                ))}
              </div>
              <p className={styles.testimonialComment}>{testimonial.comment}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>{testimonial.avatar}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.name}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Finances?</h2>
          <p className={styles.ctaDescription}>
            Join millions of users who trust PayFlow for their money transfers
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              Get Started Now
              <ArrowRight className={styles.buttonIcon} />
            </button>
            <button className={styles.secondaryButton}>
              <Play className={styles.buttonIcon} />
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
