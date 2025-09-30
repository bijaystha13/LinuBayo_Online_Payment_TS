"use client";

import React, { useState } from "react";
import {
  Zap,
  Shield,
  Globe,
  Smartphone,
  TrendingUp,
  DollarSign,
  Lock,
  CreditCard,
  RefreshCw,
  Bell,
  Users,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Award,
  Headphones,
} from "lucide-react";
import styles from "./FeaturesPage.module.css";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

interface ComparisonItem {
  feature: string;
  us: boolean | string;
  others: boolean | string;
}

const FeaturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"individuals" | "business">(
    "individuals"
  );

  const heroFeatures = [
    {
      icon: <Zap />,
      title: "Lightning Fast",
      description: "Instant transfers in seconds",
    },
    {
      icon: <Shield />,
      title: "Bank-Level Security",
      description: "256-bit encryption protection",
    },
    {
      icon: <Globe />,
      title: "Global Reach",
      description: "Send to 180+ countries",
    },
    {
      icon: <DollarSign />,
      title: "Low Fees",
      description: "Up to 80% lower than banks",
    },
  ];

  const coreFeatures: Feature[] = [
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "Instant Money Transfers",
      description:
        "Send and receive money in seconds, not days. Our lightning-fast infrastructure ensures your transactions are processed instantly.",
      benefits: [
        "Real-time processing",
        "No waiting periods",
        "24/7 availability",
        "Instant notifications",
      ],
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Advanced Security",
      description:
        "Your money and data are protected with military-grade encryption and multi-layer security protocols.",
      benefits: [
        "End-to-end encryption",
        "Two-factor authentication",
        "Biometric login",
        "Fraud detection AI",
      ],
    },
    {
      icon: <Globe className={styles.featureIcon} />,
      title: "Global Transactions",
      description:
        "Send money across borders with ease. Support for 50+ currencies and competitive exchange rates.",
      benefits: [
        "180+ countries supported",
        "Multi-currency accounts",
        "Real-time exchange rates",
        "No hidden charges",
      ],
    },
    {
      icon: <Smartphone className={styles.featureIcon} />,
      title: "Mobile-First Design",
      description:
        "Manage your finances on the go with our intuitive mobile app available for iOS and Android.",
      benefits: [
        "Native mobile apps",
        "Offline mode",
        "Push notifications",
        "Fingerprint & Face ID",
      ],
    },
    {
      icon: <TrendingUp className={styles.featureIcon} />,
      title: "Smart Analytics",
      description:
        "Get insights into your spending patterns with AI-powered analytics and personalized recommendations.",
      benefits: [
        "Spending insights",
        "Budget tracking",
        "Financial forecasts",
        "Custom reports",
      ],
    },
    {
      icon: <CreditCard className={styles.featureIcon} />,
      title: "Virtual Cards",
      description:
        "Create instant virtual cards for online purchases with customizable spending limits and merchant controls.",
      benefits: [
        "Unlimited virtual cards",
        "Instant creation",
        "Spending controls",
        "Auto-lock feature",
      ],
    },
    {
      icon: <RefreshCw className={styles.featureIcon} />,
      title: "Recurring Payments",
      description:
        "Set up automatic payments for bills, subscriptions, and regular transfers with smart scheduling.",
      benefits: [
        "Auto-pay setup",
        "Payment reminders",
        "Skip options",
        "Payment history",
      ],
    },
    {
      icon: <Bell className={styles.featureIcon} />,
      title: "Smart Notifications",
      description:
        "Stay informed with real-time alerts for all transactions, low balance warnings, and security updates.",
      benefits: [
        "Real-time alerts",
        "Customizable preferences",
        "Multi-channel delivery",
        "Smart filtering",
      ],
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Split Bills",
      description:
        "Easily split expenses with friends and family. Request money and settle group payments instantly.",
      benefits: [
        "Group payments",
        "Equal/custom splits",
        "Payment requests",
        "Expense tracking",
      ],
    },
    {
      icon: <BarChart3 className={styles.featureIcon} />,
      title: "Financial Reports",
      description:
        "Generate detailed financial reports for personal or business use with export options.",
      benefits: [
        "Monthly statements",
        "Tax reports",
        "CSV/PDF export",
        "Custom date ranges",
      ],
    },
    {
      icon: <Lock className={styles.featureIcon} />,
      title: "Account Security",
      description:
        "Advanced security features to protect your account including login alerts and device management.",
      benefits: [
        "Login history",
        "Device management",
        "Session control",
        "Security alerts",
      ],
    },
    {
      icon: <Headphones className={styles.featureIcon} />,
      title: "24/7 Support",
      description:
        "Get help anytime with our round-the-clock customer support via chat, email, or phone.",
      benefits: [
        "Live chat support",
        "Email assistance",
        "Phone support",
        "Help center",
      ],
    },
  ];

  const comparisonData: ComparisonItem[] = [
    { feature: "Transfer Speed", us: "Instant", others: "1-3 days" },
    { feature: "Transfer Fees", us: "0.5% - 2%", others: "3% - 7%" },
    {
      feature: "Currency Support",
      us: "50+ currencies",
      others: "10-20 currencies",
    },
    { feature: "Mobile App", us: true, others: "Limited" },
    { feature: "Virtual Cards", us: true, others: false },
    { feature: "AI Analytics", us: true, others: false },
    { feature: "Customer Support", us: "24/7", others: "Business hours" },
    { feature: "Account Setup", us: "2 minutes", others: "1-2 days" },
  ];

  const securityFeatures = [
    {
      icon: <Lock />,
      title: "256-bit Encryption",
      description: "Military-grade encryption protects all your data",
    },
    {
      icon: <Shield />,
      title: "PCI DSS Compliant",
      description: "Meets highest security standards for payment processing",
    },
    {
      icon: <CheckCircle />,
      title: "Two-Factor Auth",
      description: "Extra layer of security for your account",
    },
    {
      icon: <Target />,
      title: "Fraud Detection",
      description: "AI-powered system monitors suspicious activities",
    },
  ];

  return (
    <div className={styles.featuresPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1}></div>
          <div className={styles.heroOrb2}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <Sparkles className={styles.badgeIcon} />
              <span>Powerful Features</span>
            </div>

            <h1 className={styles.heroTitle}>
              Everything You Need to Manage{" "}
              <span className={styles.gradient}>Money Effortlessly</span>
            </h1>

            <p className={styles.heroDescription}>
              Experience the most advanced money transfer platform with
              cutting-edge features designed for modern finance management.
            </p>
          </div>

          <div className={styles.heroFeaturesGrid}>
            {heroFeatures.map((feature, index) => (
              <div key={index} className={styles.heroFeatureCard}>
                <div className={styles.heroFeatureIcon}>{feature.icon}</div>
                <h3 className={styles.heroFeatureTitle}>{feature.title}</h3>
                <p className={styles.heroFeatureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className={styles.coreFeaturesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Comprehensive <span className={styles.gradient}>Feature Set</span>
          </h2>
          <p className={styles.sectionDescription}>
            Discover all the powerful tools and features that make PayFlow the
            best choice for your financial needs
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {coreFeatures.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <ul className={styles.benefitsList}>
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className={styles.benefitItem}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.comparisonSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Why Choose <span className={styles.gradient}>PayFlow</span>
          </h2>
          <p className={styles.sectionDescription}>
            See how we compare to traditional banking and other payment
            platforms
          </p>
        </div>

        <div className={styles.comparisonTable}>
          <div className={styles.comparisonHeader}>
            <div className={styles.comparisonColumn}></div>
            <div className={`${styles.comparisonColumn} ${styles.highlight}`}>
              <Award className={styles.awardIcon} />
              <span>PayFlow</span>
            </div>
            <div className={styles.comparisonColumn}>
              <span>Others</span>
            </div>
          </div>

          {comparisonData.map((item, index) => (
            <div key={index} className={styles.comparisonRow}>
              <div className={styles.comparisonFeature}>{item.feature}</div>
              <div className={`${styles.comparisonValue} ${styles.highlight}`}>
                {typeof item.us === "boolean" ? (
                  item.us ? (
                    <CheckCircle className={styles.checkIconGreen} />
                  ) : (
                    <span className={styles.crossIcon}>✕</span>
                  )
                ) : (
                  <strong>{item.us}</strong>
                )}
              </div>
              <div className={styles.comparisonValue}>
                {typeof item.others === "boolean" ? (
                  item.others ? (
                    <CheckCircle className={styles.checkIconGreen} />
                  ) : (
                    <span className={styles.crossIcon}>✕</span>
                  )
                ) : (
                  <span>{item.others}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className={styles.securitySection}>
        <div className={styles.securityContent}>
          <div className={styles.securityText}>
            <h2 className={styles.securityTitle}>
              Your Security is Our{" "}
              <span className={styles.gradient}>Top Priority</span>
            </h2>
            <p className={styles.securityDescription}>
              We employ the latest security technologies and follow strict
              compliance standards to ensure your money and data are always
              protected.
            </p>

            <div className={styles.securityFeatures}>
              {securityFeatures.map((feature, index) => (
                <div key={index} className={styles.securityFeature}>
                  <div className={styles.securityIcon}>{feature.icon}</div>
                  <div className={styles.securityInfo}>
                    <h4 className={styles.securityFeatureTitle}>
                      {feature.title}
                    </h4>
                    <p className={styles.securityFeatureDesc}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.securityVisual}>
            <div className={styles.securityCard}>
              <div className={styles.securityCardHeader}>
                <Shield className={styles.securityShieldIcon} />
                <span>Protected</span>
              </div>
              <div className={styles.securityCardContent}>
                <div className={styles.securityStat}>
                  <span className={styles.securityStatLabel}>Encryption</span>
                  <span className={styles.securityStatValue}>256-bit</span>
                </div>
                <div className={styles.securityStat}>
                  <span className={styles.securityStatLabel}>Uptime</span>
                  <span className={styles.securityStatValue}>99.99%</span>
                </div>
                <div className={styles.securityStat}>
                  <span className={styles.securityStatLabel}>
                    Transactions Protected
                  </span>
                  <span className={styles.securityStatValue}>50M+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Experience the Future of Money Transfers?
          </h2>
          <p className={styles.ctaDescription}>
            Join millions of users who trust PayFlow for their financial needs
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              Get Started Free
              <ArrowRight className={styles.buttonIcon} />
            </button>
            <button className={styles.secondaryButton}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
