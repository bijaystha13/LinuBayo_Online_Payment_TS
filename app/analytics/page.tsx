"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  ShoppingBag,
  Utensils,
  Home,
  Car,
  Zap,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./AnalyticsPage.module.css";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const monthlyData = [
    { month: "Jan", income: 12400, expense: 8200 },
    { month: "Feb", income: 13800, expense: 9100 },
    { month: "Mar", income: 14200, expense: 8800 },
    { month: "Apr", income: 15600, expense: 10200 },
    { month: "May", income: 14800, expense: 9500 },
    { month: "Jun", income: 16200, expense: 10800 },
    { month: "Jul", income: 17400, expense: 11200 },
    { month: "Aug", income: 16800, expense: 10600 },
  ];

  const weeklyData = [
    { day: "Mon", amount: 2340 },
    { day: "Tue", amount: 1890 },
    { day: "Wed", amount: 2780 },
    { day: "Thu", amount: 2150 },
    { day: "Fri", amount: 3200 },
    { day: "Sat", amount: 2890 },
    { day: "Sun", amount: 1950 },
  ];

  const categoryData: CategoryData[] = [
    {
      name: "Shopping",
      value: 3240,
      color: "#667eea",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Food",
      value: 2180,
      color: "#f093fb",
      icon: <Utensils size={18} />,
    },
    {
      name: "Housing",
      value: 4500,
      color: "#4facfe",
      icon: <Home size={18} />,
    },
    {
      name: "Transport",
      value: 1560,
      color: "#f5576c",
      icon: <Car size={18} />,
    },
    {
      name: "Utilities",
      value: 890,
      color: "#ffd700",
      icon: <Zap size={18} />,
    },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: "1",
      name: "Amazon Purchase",
      category: "Shopping",
      amount: -245.8,
      type: "expense",
      date: "2025-10-03",
    },
    {
      id: "2",
      name: "Salary Deposit",
      category: "Income",
      amount: 5400.0,
      type: "income",
      date: "2025-10-01",
    },
    {
      id: "3",
      name: "Grocery Store",
      category: "Food",
      amount: -125.4,
      type: "expense",
      date: "2025-09-30",
    },
    {
      id: "4",
      name: "Uber Ride",
      category: "Transport",
      amount: -32.5,
      type: "expense",
      date: "2025-09-29",
    },
    {
      id: "5",
      name: "Freelance Payment",
      category: "Income",
      amount: 850.0,
      type: "income",
      date: "2025-09-28",
    },
  ];

  const stats = [
    {
      title: "Total Income",
      value: "$16,800",
      change: "+12.5%",
      trend: "up",
      icon: <TrendingUp size={24} />,
      color: "#10b981",
    },
    {
      title: "Total Expenses",
      value: "$10,600",
      change: "+8.3%",
      trend: "up",
      icon: <TrendingDown size={24} />,
      color: "#ef4444",
    },
    {
      title: "Net Savings",
      value: "$6,200",
      change: "+18.2%",
      trend: "up",
      icon: <DollarSign size={24} />,
      color: "#667eea",
    },
    {
      title: "Transactions",
      value: "247",
      change: "+5.7%",
      trend: "up",
      icon: <CreditCard size={24} />,
      color: "#f59e0b",
    },
  ];

  const totalExpenses = categoryData.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.gradient3}></div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Analytics</h1>
            <p className={styles.subtitle}>Track your financial insights</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.filterBtn}>
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className={styles.downloadBtn}>
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </header>

        <div className={styles.timeRangeTabs}>
          <button
            className={`${styles.tab} ${
              timeRange === "week" ? styles.tabActive : ""
            }`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button
            className={`${styles.tab} ${
              timeRange === "month" ? styles.tabActive : ""
            }`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button
            className={`${styles.tab} ${
              timeRange === "year" ? styles.tabActive : ""
            }`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statHeader}>
                <div
                  className={styles.statIcon}
                  style={{ background: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div
                  className={`${styles.statChange} ${
                    styles[`change${stat.trend === "up" ? "Up" : "Down"}`]
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={styles.statBody}>
                <h3 className={styles.statTitle}>{stat.title}</h3>
                <p className={styles.statValue}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Income vs Expenses</h3>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <div
                    className={styles.legendDot}
                    style={{ background: "#667eea" }}
                  ></div>
                  <span>Income</span>
                </div>
                <div className={styles.legendItem}>
                  <div
                    className={styles.legendDot}
                    style={{ background: "#f5576c" }}
                  ></div>
                  <span>Expenses</span>
                </div>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpense"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f5576c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f5576c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#667eea"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#f5576c"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorExpense)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Weekly Spending</h3>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className={styles.bottomGrid}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>Spending by Category</h3>
              <div className={styles.totalExpenses}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>
                  ${totalExpenses.toLocaleString()}
                </span>
              </div>
            </div>
            <div className={styles.categoryContent}>
              <div className={styles.pieChartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.categoryList}>
                {categoryData.map((category, index) => (
                  <div key={index} className={styles.categoryItem}>
                    <div className={styles.categoryInfo}>
                      <div
                        className={styles.categoryIcon}
                        style={{
                          background: `${category.color}20`,
                          color: category.color,
                        }}
                      >
                        {category.icon}
                      </div>
                      <span className={styles.categoryName}>
                        {category.name}
                      </span>
                    </div>
                    <div className={styles.categoryDetails}>
                      <span className={styles.categoryAmount}>
                        ${category.value.toLocaleString()}
                      </span>
                      <span className={styles.categoryPercent}>
                        {((category.value / totalExpenses) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.transactionsCard}>
            <div className={styles.transactionsHeader}>
              <h3 className={styles.transactionsTitle}>Recent Transactions</h3>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.transactionsList}>
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <div
                      className={`${styles.transactionIcon} ${
                        transaction.type === "income"
                          ? styles.incomeIcon
                          : styles.expenseIcon
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowDownRight size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>
                    <div className={styles.transactionDetails}>
                      <span className={styles.transactionName}>
                        {transaction.name}
                      </span>
                      <span className={styles.transactionCategory}>
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                  <div className={styles.transactionRight}>
                    <span
                      className={`${styles.transactionAmount} ${
                        transaction.type === "income"
                          ? styles.incomeAmount
                          : styles.expenseAmount
                      }`}
                    >
                      {transaction.type === "income" ? "+" : ""}
                      {transaction.amount < 0
                        ? transaction.amount
                        : `+${transaction.amount}`}
                    </span>
                    <span className={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
