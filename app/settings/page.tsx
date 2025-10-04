"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Key,
  Eye,
  EyeOff,
  LogOut,
  Trash2,
  Download,
  ChevronRight,
  Check,
} from "lucide-react";
import styles from "./SettingsPage.module.css";

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    transactions: true,
    security: true,
    marketing: false,
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const sections: SettingSection[] = [
    { id: "profile", title: "Profile", icon: <User size={20} /> },
    { id: "security", title: "Security", icon: <Shield size={20} /> },
    { id: "notifications", title: "Notifications", icon: <Bell size={20} /> },
    { id: "payment", title: "Payment Methods", icon: <CreditCard size={20} /> },
    { id: "preferences", title: "Preferences", icon: <Globe size={20} /> },
  ];

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>
              Manage your account and preferences
            </p>
          </div>
        </header>

        <div className={styles.settingsLayout}>
          <aside className={styles.sidebar}>
            <nav className={styles.navigation}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`${styles.navItem} ${
                    activeSection === section.id ? styles.navItemActive : ""
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className={styles.navIcon}>{section.icon}</div>
                  <span className={styles.navText}>{section.title}</span>
                  <ChevronRight className={styles.navChevron} size={18} />
                </button>
              ))}
            </nav>
          </aside>

          <main className={styles.mainContent}>
            {activeSection === "profile" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Profile Information</h2>
                <p className={styles.sectionDescription}>
                  Update your personal details and profile picture
                </p>

                <div className={styles.profileHeader}>
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                      <User size={48} />
                    </div>
                    <button className={styles.avatarEditBtn}>
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      className={styles.input}
                      defaultValue="John Davidson"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      className={styles.input}
                      defaultValue="john.davidson@example.com"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      className={styles.input}
                      defaultValue="+1 (555) 123-4567"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Date of Birth</label>
                    <input
                      type="date"
                      className={styles.input}
                      defaultValue="1990-01-15"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Bio</label>
                  <textarea
                    className={styles.textarea}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    defaultValue="Passionate about financial management and technology."
                  />
                </div>

                <div className={styles.actionButtons}>
                  <button className={styles.cancelBtn}>Cancel</button>
                  <button className={styles.saveBtn}>Save Changes</button>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Security Settings</h2>
                <p className={styles.sectionDescription}>
                  Manage your password and security preferences
                </p>

                <div className={styles.settingCard}>
                  <div className={styles.settingCardHeader}>
                    <div
                      className={styles.settingCardIcon}
                      style={{ background: "#667eea20", color: "#667eea" }}
                    >
                      <Lock size={24} />
                    </div>
                    <div className={styles.settingCardInfo}>
                      <h3 className={styles.settingCardTitle}>
                        Change Password
                      </h3>
                      <p className={styles.settingCardDescription}>
                        Update your password regularly to keep your account
                        secure
                      </p>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Current Password</label>
                    <div className={styles.passwordInput}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={styles.input}
                        placeholder="Enter current password"
                      />
                      <button
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>New Password</label>
                      <input
                        type="password"
                        className={styles.input}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Confirm Password</label>
                      <input
                        type="password"
                        className={styles.input}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <button className={styles.updateBtn}>Update Password</button>
                </div>

                <div className={styles.settingCard}>
                  <div className={styles.settingCardHeader}>
                    <div
                      className={styles.settingCardIcon}
                      style={{ background: "#10b98120", color: "#10b981" }}
                    >
                      <Key size={24} />
                    </div>
                    <div className={styles.settingCardInfo}>
                      <h3 className={styles.settingCardTitle}>
                        Two-Factor Authentication
                      </h3>
                      <p className={styles.settingCardDescription}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.settingCard}>
                  <div className={styles.settingCardHeader}>
                    <div
                      className={styles.settingCardIcon}
                      style={{ background: "#f5576c20", color: "#f5576c" }}
                    >
                      <Smartphone size={24} />
                    </div>
                    <div className={styles.settingCardInfo}>
                      <h3 className={styles.settingCardTitle}>
                        Biometric Authentication
                      </h3>
                      <p className={styles.settingCardDescription}>
                        Use fingerprint or face ID to access your account
                      </p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={biometricEnabled}
                        onChange={() => setBiometricEnabled(!biometricEnabled)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Notification Preferences
                </h2>
                <p className={styles.sectionDescription}>
                  Choose how you want to be notified
                </p>

                <div className={styles.notificationGroup}>
                  <h3 className={styles.notificationGroupTitle}>
                    Communication Channels
                  </h3>
                  <div className={styles.settingCard}>
                    <div className={styles.settingCardHeader}>
                      <div
                        className={styles.settingCardIcon}
                        style={{ background: "#667eea20", color: "#667eea" }}
                      >
                        <Mail size={20} />
                      </div>
                      <div className={styles.settingCardInfo}>
                        <h3 className={styles.settingCardTitle}>
                          Email Notifications
                        </h3>
                        <p className={styles.settingCardDescription}>
                          Receive updates via email
                        </p>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={() => handleNotificationToggle("email")}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingCard}>
                    <div className={styles.settingCardHeader}>
                      <div
                        className={styles.settingCardIcon}
                        style={{ background: "#10b98120", color: "#10b981" }}
                      >
                        <Bell size={20} />
                      </div>
                      <div className={styles.settingCardInfo}>
                        <h3 className={styles.settingCardTitle}>
                          Push Notifications
                        </h3>
                        <p className={styles.settingCardDescription}>
                          Receive push notifications on your device
                        </p>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={() => handleNotificationToggle("push")}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingCard}>
                    <div className={styles.settingCardHeader}>
                      <div
                        className={styles.settingCardIcon}
                        style={{ background: "#f5576c20", color: "#f5576c" }}
                      >
                        <Smartphone size={20} />
                      </div>
                      <div className={styles.settingCardInfo}>
                        <h3 className={styles.settingCardTitle}>
                          SMS Notifications
                        </h3>
                        <p className={styles.settingCardDescription}>
                          Receive text messages for important updates
                        </p>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={notifications.sms}
                          onChange={() => handleNotificationToggle("sms")}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.notificationGroup}>
                  <h3 className={styles.notificationGroupTitle}>
                    Notification Types
                  </h3>
                  <div className={styles.settingCard}>
                    <div className={styles.settingCardHeader}>
                      <div className={styles.settingCardInfo}>
                        <h3 className={styles.settingCardTitle}>
                          Transaction Alerts
                        </h3>
                        <p className={styles.settingCardDescription}>
                          Get notified about account activity
                        </p>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={notifications.transactions}
                          onChange={() =>
                            handleNotificationToggle("transactions")
                          }
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingCard}>
                    <div className={styles.settingCardHeader}>
                      <div className={styles.settingCardInfo}>
                        <h3 className={styles.settingCardTitle}>
                          Security Alerts
                        </h3>
                        <p className={styles.settingCardDescription}>
                          Important security notifications
                        </p>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={notifications.security}
                          onChange={() => handleNotificationToggle("security")}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingCard}>
                    <div className={styles.settingCardHeader}>
                      <div className={styles.settingCardInfo}>
                        <h3 className={styles.settingCardTitle}>
                          Marketing & Promotions
                        </h3>
                        <p className={styles.settingCardDescription}>
                          Receive offers and product updates
                        </p>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={notifications.marketing}
                          onChange={() => handleNotificationToggle("marketing")}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "payment" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment Methods</h2>
                <p className={styles.sectionDescription}>
                  Manage your linked payment methods
                </p>

                <div className={styles.paymentCards}>
                  <div className={styles.paymentCard}>
                    <div className={styles.paymentCardHeader}>
                      <div className={styles.paymentCardIcon}>
                        <CreditCard size={24} />
                      </div>
                      <span className={styles.paymentCardBadge}>Primary</span>
                    </div>
                    <div className={styles.paymentCardBody}>
                      <p className={styles.paymentCardNumber}>
                        •••• •••• •••• 4532
                      </p>
                      <p className={styles.paymentCardName}>Visa Debit</p>
                      <p className={styles.paymentCardExpiry}>Expires 12/27</p>
                    </div>
                    <div className={styles.paymentCardActions}>
                      <button className={styles.paymentCardBtn}>Edit</button>
                      <button className={styles.paymentCardBtn}>Remove</button>
                    </div>
                  </div>

                  <div className={styles.paymentCard}>
                    <div className={styles.paymentCardHeader}>
                      <div className={styles.paymentCardIcon}>
                        <CreditCard size={24} />
                      </div>
                    </div>
                    <div className={styles.paymentCardBody}>
                      <p className={styles.paymentCardNumber}>
                        •••• •••• •••• 8976
                      </p>
                      <p className={styles.paymentCardName}>
                        Mastercard Credit
                      </p>
                      <p className={styles.paymentCardExpiry}>Expires 09/26</p>
                    </div>
                    <div className={styles.paymentCardActions}>
                      <button className={styles.paymentCardBtn}>Edit</button>
                      <button className={styles.paymentCardBtn}>Remove</button>
                    </div>
                  </div>

                  <button className={styles.addPaymentCard}>
                    <CreditCard size={24} />
                    <span>Add Payment Method</span>
                  </button>
                </div>
              </div>
            )}

            {activeSection === "preferences" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Preferences</h2>
                <p className={styles.sectionDescription}>
                  Customize your app experience
                </p>

                <div className={styles.settingCard}>
                  <div className={styles.settingCardHeader}>
                    <div
                      className={styles.settingCardIcon}
                      style={{
                        background: darkMode ? "#fbbf2420" : "#667eea20",
                        color: darkMode ? "#fbbf24" : "#667eea",
                      }}
                    >
                      {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                    </div>
                    <div className={styles.settingCardInfo}>
                      <h3 className={styles.settingCardTitle}>Dark Mode</h3>
                      <p className={styles.settingCardDescription}>
                        Switch between light and dark theme
                      </p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.settingCard}>
                  <div className={styles.settingCardHeader}>
                    <div className={styles.settingCardInfo}>
                      <h3 className={styles.settingCardTitle}>Language</h3>
                      <p className={styles.settingCardDescription}>
                        Choose your preferred language
                      </p>
                    </div>
                  </div>
                  <select className={styles.select}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className={styles.settingCard}>
                  <div className={styles.settingCardHeader}>
                    <div className={styles.settingCardInfo}>
                      <h3 className={styles.settingCardTitle}>Currency</h3>
                      <p className={styles.settingCardDescription}>
                        Set your default currency
                      </p>
                    </div>
                  </div>
                  <select className={styles.select}>
                    <option value="usd">USD - US Dollar</option>
                    <option value="eur">EUR - Euro</option>
                    <option value="gbp">GBP - British Pound</option>
                    <option value="cad">CAD - Canadian Dollar</option>
                  </select>
                </div>

                <div className={styles.dangerZone}>
                  <h3 className={styles.dangerZoneTitle}>Danger Zone</h3>
                  <div className={styles.dangerCard}>
                    <div className={styles.dangerCardContent}>
                      <h4 className={styles.dangerCardTitle}>
                        Export Your Data
                      </h4>
                      <p className={styles.dangerCardDescription}>
                        Download a copy of all your data
                      </p>
                    </div>
                    <button className={styles.dangerBtn}>
                      <Download size={18} />
                      Export Data
                    </button>
                  </div>
                  <div className={styles.dangerCard}>
                    <div className={styles.dangerCardContent}>
                      <h4 className={styles.dangerCardTitle}>Log Out</h4>
                      <p className={styles.dangerCardDescription}>
                        Sign out from your account
                      </p>
                    </div>
                    <button className={styles.dangerBtn}>
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                  <div className={styles.dangerCard}>
                    <div className={styles.dangerCardContent}>
                      <h4 className={styles.dangerCardTitle}>Delete Account</h4>
                      <p className={styles.dangerCardDescription}>
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <button
                      className={`${styles.dangerBtn} ${styles.deleteBtnDanger}`}
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
