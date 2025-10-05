"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  Zap,
  Shield,
  Crown,
  Rocket,
  Users,
  Building,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Star,
  Sparkles,
} from "lucide-react";
import styles from "./PricingPage.module.css";

interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: string;
  yearlyPrice: string;
  description: string;
  features: Array<{ text: string; included: boolean }>;
  highlighted?: boolean;
  badge?: string;
  buttonText: string;
  buttonStyle: "primary" | "secondary" | "premium";
}

interface FAQ {
  question: string;
  answer: string;
}

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // const [selectedTier, setSelectedTier] = useState<number>(1);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  // const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      icon: <Users />,
      price: "$0",
      yearlyPrice: "$0",
      description:
        "Perfect for individuals just getting started with digital payments",
      features: [
        { text: "Up to 10 transactions per month", included: true },
        { text: "Basic money transfers", included: true },
        { text: "Mobile app access", included: true },
        { text: "Email support", included: true },
        { text: "Standard processing speed", included: true },
        { text: "Single currency support", included: true },
        { text: "Virtual cards", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Priority support", included: false },
        { text: "API access", included: false },
      ],
      buttonText: "Get Started Free",
      buttonStyle: "secondary",
    },
    {
      name: "Pro",
      icon: <Zap />,
      price: "$9.99",
      yearlyPrice: "$99",
      description:
        "Best for freelancers and active users who need more features",
      features: [
        { text: "Unlimited transactions", included: true },
        { text: "Instant transfers", included: true },
        { text: "Mobile & desktop apps", included: true },
        { text: "24/7 chat support", included: true },
        { text: "Priority processing", included: true },
        { text: "Multi-currency support (50+)", included: true },
        { text: "5 virtual cards", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Spending insights", included: true },
        { text: "API access", included: false },
      ],
      badge: "Most Popular",
      buttonText: "Start Pro Trial",
      buttonStyle: "primary",
    },
    {
      name: "Business",
      icon: <Building />,
      price: "$29.99",
      yearlyPrice: "$299",
      description:
        "Designed for small businesses and teams managing multiple accounts",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Team accounts (up to 10)", included: true },
        { text: "Bulk transfers", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom spending limits", included: true },
        { text: "Unlimited virtual cards", included: true },
        { text: "Advanced reporting", included: true },
        { text: "Invoice management", included: true },
        { text: "API access", included: true },
        { text: "White-label option", included: false },
      ],
      buttonText: "Start Business Trial",
      buttonStyle: "secondary",
    },
    {
      name: "Enterprise",
      icon: <Crown />,
      price: "Custom",
      yearlyPrice: "Custom",
      description:
        "Tailored solutions for large organizations with custom requirements",
      features: [
        { text: "Everything in Business", included: true },
        { text: "Unlimited team members", included: true },
        { text: "Custom integrations", included: true },
        { text: "SLA guarantee", included: true },
        { text: "Dedicated support team", included: true },
        { text: "On-premise deployment option", included: true },
        { text: "Advanced security features", included: true },
        { text: "Custom branding", included: true },
        { text: "Training & onboarding", included: true },
        { text: "White-label option", included: true },
      ],
      badge: "Custom",
      buttonText: "Contact Sales",
      buttonStyle: "premium",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "Can I switch plans at any time?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and bank transfers. For Enterprise plans, we also offer invoice-based billing.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! Pro and Business plans come with a 30-day free trial. No credit card required. You can cancel anytime during the trial period without being charged.",
    },
    {
      question: "What happens when I reach my transaction limit?",
      answer:
        "On the Free plan, you'll be notified when you approach your limit. You can upgrade to Pro for unlimited transactions. Pro and Business users have no transaction limits.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact us within 30 days of your purchase for a full refund.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees! The price you see is what you pay. Transaction fees may apply for certain types of transfers (international, currency conversion), which are clearly displayed before you confirm.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period, and you won't be charged again.",
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer:
        "Yes! We offer a 50% discount on all paid plans for registered non-profit organizations. Contact our sales team to verify your non-profit status and claim your discount.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getPrice = (tier: PricingTier) => {
    if (tier.price === "Custom") return "Custom";
    return billingCycle === "monthly" ? tier.price : tier.yearlyPrice;
  };

  const getSavings = () => {
    return billingCycle === "yearly" ? "Save 20%" : "";
  };

  const handleCardClick = (index: number) => {
    setSelectedTier(index);
  };

  return (
    <div className={styles.pricingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1}></div>
          <div className={styles.heroOrb2}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles className={styles.badgeIcon} />
            <span>Simple, Transparent Pricing</span>
          </div>

          <h1 className={styles.heroTitle}>
            Choose the Perfect{" "}
            <span className={styles.gradient}>Plan for You</span>
          </h1>

          <p className={styles.heroDescription}>
            Start free and scale as you grow. No hidden fees, no surprises.
            Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className={styles.billingToggle}>
            <span className={billingCycle === "monthly" ? styles.active : ""}>
              Monthly
            </span>
            <button
              className={styles.toggleSwitch}
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
            >
              <div
                className={`${styles.toggleSlider} ${
                  billingCycle === "yearly" ? styles.yearly : ""
                }`}
              ></div>
            </button>
            <span className={billingCycle === "yearly" ? styles.active : ""}>
              Yearly
              {billingCycle === "yearly" && (
                <span className={styles.savingsBadge}>{getSavings()}</span>
              )}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.pricingSection}>
        <div className={styles.pricingGrid}>
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`${styles.pricingCard} ${
                selectedTier === index ? styles.highlighted : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {tier.badge && (
                <div className={styles.pricingBadge}>
                  <Star className={styles.starIcon} />
                  {tier.badge}
                </div>
              )}

              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{tier.icon}</div>
                <h3 className={styles.cardTitle}>{tier.name}</h3>
                <p className={styles.cardDescription}>{tier.description}</p>
              </div>

              <div className={styles.cardPricing}>
                <div className={styles.priceWrapper}>
                  <span className={styles.price}>{getPrice(tier)}</span>
                  {tier.price !== "Custom" && (
                    <span className={styles.pricePeriod}>
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  )}
                </div>
                {billingCycle === "yearly" &&
                  tier.price !== "Custom" &&
                  tier.price !== "$0" && (
                    <span className={styles.monthlyEquivalent}>
                      $
                      {(
                        parseFloat(tier.yearlyPrice.replace("$", "")) / 12
                      ).toFixed(2)}
                      /month billed annually
                    </span>
                  )}
              </div>

              <button
                className={`${styles.cardButton} ${styles[tier.buttonStyle]}`}
                onClick={(e) => e.stopPropagation()}
              >
                {tier.buttonText}
                <ArrowRight className={styles.buttonIcon} />
              </button>

              <div className={styles.featuresList}>
                {tier.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`${styles.featureItem} ${
                      !feature.included ? styles.notIncluded : ""
                    }`}
                  >
                    {feature.included ? (
                      <Check className={styles.checkIcon} />
                    ) : (
                      <X className={styles.xIcon} />
                    )}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Compare All <span className={styles.gradient}>Features</span>
          </h2>
          <p className={styles.sectionDescription}>
            See exactly what&apos;s included in each plan
          </p>
        </div>

        <div className={styles.comparisonNote}>
          <Shield className={styles.noteIcon} />
          <p>
            All plans include bank-level security, 256-bit encryption, and fraud
            protection
          </p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Frequently Asked <span className={styles.gradient}>Questions</span>
          </h2>
          <p className={styles.sectionDescription}>
            Got questions? We&apos;ve got answers
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                openFaqIndex === index ? styles.open : ""
              }`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
              >
                <HelpCircle className={styles.questionIcon} />
                <span>{faq.question}</span>
                <ChevronDown className={styles.chevronIcon} />
              </button>
              {openFaqIndex === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <Rocket className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of users who trust PayFlow for their money transfers
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              Start Free Trial
              <ArrowRight className={styles.buttonIcon} />
            </button>
            <button className={styles.secondaryButton}>Talk to Sales</button>
          </div>
          <p className={styles.ctaNote}>
            No credit card required · Cancel anytime · 30-day money-back
            guarantee
          </p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
