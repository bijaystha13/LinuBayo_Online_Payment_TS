"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  MoreVertical,
  Send,
  Download,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import styles from "./Dashboard.module.css";
import { useAuth } from "../shared/Context/AuthContext";
import Link from "next/link";

interface Transaction {
  id: string;
  type: "sent" | "received";
  recipient: string;
  amount: string;
  status: "completed" | "pending" | "failed";
  date: string;
  category: string;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  // Mock data - replace with actual API calls
  const recentTransactions: Transaction[] = [
    {
      id: "1",
      type: "sent",
      recipient: "Sarah Johnson",
      amount: "$250.00",
      status: "completed",
      date: "2 hours ago",
      category: "Transfer",
    },
    {
      id: "2",
      type: "received",
      recipient: "Michael Chen",
      amount: "$1,200.00",
      status: "completed",
      date: "5 hours ago",
      category: "Payment",
    },
    {
      id: "3",
      type: "sent",
      recipient: "Emma Wilson",
      amount: "$85.50",
      status: "pending",
      date: "1 day ago",
      category: "Transfer",
    },
    {
      id: "4",
      type: "received",
      recipient: "David Martinez",
      amount: "$450.00",
      status: "completed",
      date: "2 days ago",
      category: "Payment",
    },
    {
      id: "5",
      type: "sent",
      recipient: "Lisa Anderson",
      amount: "$320.00",
      status: "failed",
      date: "3 days ago",
      category: "Transfer",
    },
  ];

  const quickActions: QuickAction[] = [
    {
      icon: <Send />,
      label: "Send Money",
      href: "/transfer",
      color: "blue",
    },
    {
      icon: <Download />,
      label: "Request",
      href: "/request",
      color: "green",
    },
    {
      icon: <CreditCard />,
      label: "Add Card",
      href: "/cards",
      color: "purple",
    },
    {
      icon: <Users />,
      label: "Contacts",
      href: "/contacts",
      color: "orange",
    },
  ];

  const stats = [
    {
      label: "Total Sent",
      value: "$8,450.00",
      change: "+12.5%",
      trend: "up",
      icon: <ArrowUpRight />,
    },
    {
      label: "Total Received",
      value: "$15,230.00",
      change: "+8.2%",
      trend: "up",
      icon: <ArrowDownLeft />,
    },
    {
      label: "Active Cards",
      value: "3",
      change: "+1",
      trend: "up",
      icon: <CreditCard />,
    },
    {
      label: "Pending",
      value: "$85.50",
      change: "1 transaction",
      trend: "neutral",
      icon: <Clock />,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className={styles.statusIconCompleted} />;
      case "pending":
        return <Clock className={styles.statusIconPending} />;
      case "failed":
        return <XCircle className={styles.statusIconFailed} />;
      default:
        return <AlertCircle className={styles.statusIconPending} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "pending":
        return styles.statusPending;
      case "failed":
        return styles.statusFailed;
      default:
        return styles.statusPending;
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardContainer}>
        {/* Header Section */}
        <div className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>
              Welcome back, {user?.fullName?.split(" ")[0] || "User"}!
            </h1>
            <p className={styles.pageSubtitle}>
              Here's what's happening with your money today
            </p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/transfer" className={styles.primaryButton}>
              <Send className={styles.buttonIcon} />
              Send Money
            </Link>
          </div>
        </div>

        {/* Balance Card */}
        <div className={styles.balanceCard}>
          <div className={styles.balanceCardContent}>
            <div className={styles.balanceHeader}>
              <div className={styles.balanceInfo}>
                <p className={styles.balanceLabel}>Total Balance</p>
                <div className={styles.balanceAmount}>
                  {showBalance ? (
                    <span className={styles.amount}>
                      {user?.balance || "$0.00"}
                    </span>
                  ) : (
                    <span className={styles.hiddenAmount}>••••••</span>
                  )}
                  <button
                    className={styles.eyeButton}
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className={styles.balanceTrend}>
                <TrendingUp className={styles.trendIcon} />
                <span className={styles.trendText}>+15.3% this month</span>
              </div>
            </div>
            <div className={styles.balanceActions}>
              <button className={styles.balanceActionButton}>
                <DollarSign className={styles.actionIcon} />
                Add Money
              </button>
              <button className={styles.balanceActionButton}>
                <CreditCard className={styles.actionIcon} />
                Withdraw
              </button>
            </div>
          </div>
          <div className={styles.balancePattern}></div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActionsSection}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`${styles.quickActionCard} ${
                  styles[`quickAction${action.color}`]
                }`}
              >
                <div className={styles.quickActionIcon}>{action.icon}</div>
                <span className={styles.quickActionLabel}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statIconWrapper}>{stat.icon}</div>
                  <button className={styles.statMenu}>
                    <MoreVertical />
                  </button>
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                  <div
                    className={`${styles.statChange} ${
                      styles[`statChange${stat.trend}`]
                    }`}
                  >
                    {stat.trend === "up" && (
                      <ArrowUpRight className={styles.changeIcon} />
                    )}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={styles.transactionsSection}>
          <div className={styles.transactionsHeader}>
            <h2 className={styles.sectionTitle}>Recent Transactions</h2>
            <Link href="/transactions" className={styles.viewAllLink}>
              View All
              <ArrowRight className={styles.linkIcon} />
            </Link>
          </div>

          <div className={styles.transactionsCard}>
            <div className={styles.transactionsList}>
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className={styles.transactionItem}>
                  <div className={styles.transactionIcon}>
                    {transaction.type === "sent" ? (
                      <ArrowUpRight className={styles.iconSent} />
                    ) : (
                      <ArrowDownLeft className={styles.iconReceived} />
                    )}
                  </div>
                  <div className={styles.transactionDetails}>
                    <p className={styles.transactionRecipient}>
                      {transaction.type === "sent" ? "To: " : "From: "}
                      {transaction.recipient}
                    </p>
                    <div className={styles.transactionMeta}>
                      <span className={styles.transactionDate}>
                        {transaction.date}
                      </span>
                      <span className={styles.metaDivider}>•</span>
                      <span className={styles.transactionCategory}>
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                  <div className={styles.transactionRight}>
                    <p
                      className={`${styles.transactionAmount} ${
                        transaction.type === "sent"
                          ? styles.amountSent
                          : styles.amountReceived
                      }`}
                    >
                      {transaction.type === "sent" ? "-" : "+"}
                      {transaction.amount}
                    </p>
                    <div
                      className={`${styles.transactionStatus} ${getStatusClass(
                        transaction.status
                      )}`}
                    >
                      {getStatusIcon(transaction.status)}
                      <span>{transaction.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Chart Placeholder */}
        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <h2 className={styles.sectionTitle}>Spending Overview</h2>
            <div className={styles.chartTabs}>
              <button className={`${styles.chartTab} ${styles.chartTabActive}`}>
                Week
              </button>
              <button className={styles.chartTab}>Month</button>
              <button className={styles.chartTab}>Year</button>
            </div>
          </div>
          <div className={styles.chartCard}>
            <div className={styles.chartPlaceholder}>
              <TrendingUp className={styles.chartIcon} />
              <p className={styles.chartText}>
                Chart visualization will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
