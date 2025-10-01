import React from "react";
import styles from "./AboutPage.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Revolutionizing Digital Payments</h1>
          <p className={styles.heroSubtitle}>
            Fast, secure, and seamless money transactions at your fingertips
          </p>
        </div>
        <div className={styles.heroGraphic}>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>💳</div>
          </div>
          <div
            className={styles.floatingCard}
            style={{ animationDelay: "0.5s" }}
          >
            <div className={styles.cardIcon}>🔒</div>
          </div>
          <div className={styles.floatingCard} style={{ animationDelay: "1s" }}>
            <div className={styles.cardIcon}>⚡</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            We&apos;re on a mission to democratize financial transactions,
            making it easier for everyone to send, receive, and manage money
            without barriers. Our platform combines cutting-edge technology with
            user-friendly design to deliver a payment experience that&apos;s
            both powerful and accessible.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose Us</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚀</div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureDescription}>
              Complete transactions in seconds with our optimized infrastructure
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3 className={styles.featureTitle}>Bank-Level Security</h3>
            <p className={styles.featureDescription}>
              Enterprise-grade encryption protecting your financial data 24/7
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌍</div>
            <h3 className={styles.featureTitle}>Global Reach</h3>
            <p className={styles.featureDescription}>
              Send money anywhere in the world with competitive exchange rates
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3 className={styles.featureTitle}>Low Fees</h3>
            <p className={styles.featureDescription}>
              Transparent pricing with no hidden charges or surprise costs
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>10M+</div>
            <div className={styles.statLabel}>Active Users</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>$50B+</div>
            <div className={styles.statLabel}>Transactions</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>150+</div>
            <div className={styles.statLabel}>Countries</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>99.9%</div>
            <div className={styles.statLabel}>Uptime</div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>Built by Experts</h2>
        <p className={styles.teamDescription}>
          Our team combines decades of experience in fintech, security, and user
          experience to create the most reliable payment platform in the
          industry.
        </p>
        <div className={styles.teamGrid}>
          <div className={styles.teamCard}>
            <div className={styles.teamAvatar}>👨‍💼</div>
            <h3 className={styles.teamName}>Leadership</h3>
            <p className={styles.teamRole}>
              Former executives from top financial institutions
            </p>
          </div>
          <div className={styles.teamCard}>
            <div className={styles.teamAvatar}>👩‍💻</div>
            <h3 className={styles.teamName}>Engineering</h3>
            <p className={styles.teamRole}>
              World-class developers from tech giants
            </p>
          </div>
          <div className={styles.teamCard}>
            <div className={styles.teamAvatar}>🔐</div>
            <h3 className={styles.teamName}>Security</h3>
            <p className={styles.teamRole}>
              Cybersecurity specialists protecting your funds
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
        <p className={styles.ctaDescription}>
          Join millions of users who trust us with their money every day
        </p>
        <button className={styles.ctaButton}>Open Your Account</button>
      </section>
    </div>
  );
};

export default About;
