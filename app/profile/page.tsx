"use client";

import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Download,
  Upload,
  Camera,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff,
  LogOut,
  Trash2,
  AlertCircle,
  CheckCircle,
  Settings,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  verified: boolean;
  avatar: string;
  accountType: string;
  balance: string;
  totalTransactions: number;
  totalSent: string;
  totalReceived: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    name: "John Anderson",
    email: "john.anderson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    joinDate: "January 15, 2023",
    verified: true,
    avatar: "",
    accountType: "Premium",
    balance: "$12,458.50",
    totalTransactions: 247,
    totalSent: "$45,230.00",
    totalReceived: "$57,688.50",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    transactions: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    biometric: false,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  const handleSecurityChange = (key: string) => {
    setSecurity({
      ...security,
      [key]: !security[key as keyof typeof security],
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className={styles.tabContent}>
            {/* Profile Header Card */}
            <div className={styles.profileHeaderCard}>
              <div className={styles.profileAvatarSection}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatar}>
                    {profileData.avatar ? (
                      <img src={profileData.avatar} alt="Profile" />
                    ) : (
                      <User className={styles.avatarIcon} />
                    )}
                  </div>
                  <button className={styles.avatarEditButton}>
                    <Camera size={16} />
                  </button>
                </div>
                <div className={styles.profileHeaderInfo}>
                  <h2 className={styles.profileName}>{profileData.name}</h2>
                  <div className={styles.profileBadges}>
                    {profileData.verified && (
                      <span className={styles.verifiedBadge}>
                        <CheckCircle size={14} />
                        Verified
                      </span>
                    )}
                    <span className={styles.accountTypeBadge}>
                      {profileData.accountType}
                    </span>
                  </div>
                  <p className={styles.memberSince}>
                    <Calendar size={14} />
                    Member since {profileData.joinDate}
                  </p>
                </div>
              </div>
              <div className={styles.profileActions}>
                {!isEditing ? (
                  <button
                    className={styles.editButton}
                    onClick={handleEditToggle}
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button className={styles.saveButton} onClick={handleSave}>
                      <Check size={18} />
                      Save
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={handleCancel}
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <DollarSign size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>Current Balance</p>
                  <h3 className={styles.statValue}>{profileData.balance}</h3>
                  <span className={styles.statChange}>
                    <TrendingUp size={14} />
                    +12.5% from last month
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Activity size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>Total Transactions</p>
                  <h3 className={styles.statValue}>
                    {profileData.totalTransactions}
                  </h3>
                  <span className={styles.statChange}>
                    <TrendingUp size={14} />
                    +8 this week
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Upload size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>Total Sent</p>
                  <h3 className={styles.statValue}>{profileData.totalSent}</h3>
                  <span className={styles.statChangeNeutral}>
                    142 transactions
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Download size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>Total Received</p>
                  <h3 className={styles.statValue}>
                    {profileData.totalReceived}
                  </h3>
                  <span className={styles.statChangeNeutral}>
                    105 transactions
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className={styles.infoSection}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <User size={18} />
                    <span>Full Name</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      className={styles.infoInput}
                      value={profileData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  ) : (
                    <p className={styles.infoValue}>{profileData.name}</p>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <Mail size={18} />
                    <span>Email Address</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      className={styles.infoInput}
                      value={profileData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  ) : (
                    <p className={styles.infoValue}>{profileData.email}</p>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <Phone size={18} />
                    <span>Phone Number</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      className={styles.infoInput}
                      value={profileData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  ) : (
                    <p className={styles.infoValue}>{profileData.phone}</p>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <MapPin size={18} />
                    <span>Address</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      className={styles.infoInput}
                      value={profileData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  ) : (
                    <p className={styles.infoValue}>{profileData.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className={styles.tabContent}>
            <div className={styles.securitySection}>
              <h3 className={styles.sectionTitle}>Security Settings</h3>

              {/* Password Change */}
              <div className={styles.securityCard}>
                <div className={styles.securityHeader}>
                  <div className={styles.securityIcon}>
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 className={styles.securityCardTitle}>Password</h4>
                    <p className={styles.securityCardDescription}>
                      Change your password regularly to keep your account secure
                    </p>
                  </div>
                </div>
                <div className={styles.passwordForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Current Password</label>
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
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={styles.input}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={styles.input}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className={styles.updateButton}>
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className={styles.securityCard}>
                <div className={styles.securityHeader}>
                  <div className={styles.securityIcon}>
                    <Shield size={24} />
                  </div>
                  <div className={styles.securityCardInfo}>
                    <h4 className={styles.securityCardTitle}>
                      Two-Factor Authentication
                    </h4>
                    <p className={styles.securityCardDescription}>
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={() => handleSecurityChange("twoFactor")}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              {/* Login Alerts */}
              <div className={styles.securityCard}>
                <div className={styles.securityHeader}>
                  <div className={styles.securityIcon}>
                    <AlertCircle size={24} />
                  </div>
                  <div className={styles.securityCardInfo}>
                    <h4 className={styles.securityCardTitle}>Login Alerts</h4>
                    <p className={styles.securityCardDescription}>
                      Get notified when someone logs into your account
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={security.loginAlerts}
                      onChange={() => handleSecurityChange("loginAlerts")}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              {/* Biometric Authentication */}
              <div className={styles.securityCard}>
                <div className={styles.securityHeader}>
                  <div className={styles.securityIcon}>
                    <Settings size={24} />
                  </div>
                  <div className={styles.securityCardInfo}>
                    <h4 className={styles.securityCardTitle}>
                      Biometric Authentication
                    </h4>
                    <p className={styles.securityCardDescription}>
                      Use fingerprint or face ID to login
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={security.biometric}
                      onChange={() => handleSecurityChange("biometric")}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className={styles.tabContent}>
            <div className={styles.notificationsSection}>
              <h3 className={styles.sectionTitle}>Notification Preferences</h3>

              <div className={styles.notificationCard}>
                <div className={styles.notificationHeader}>
                  <div className={styles.notificationIcon}>
                    <Mail size={24} />
                  </div>
                  <div className={styles.notificationInfo}>
                    <h4 className={styles.notificationTitle}>
                      Email Notifications
                    </h4>
                    <p className={styles.notificationDescription}>
                      Receive transaction updates via email
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange("email")}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.notificationCard}>
                <div className={styles.notificationHeader}>
                  <div className={styles.notificationIcon}>
                    <Bell size={24} />
                  </div>
                  <div className={styles.notificationInfo}>
                    <h4 className={styles.notificationTitle}>
                      Push Notifications
                    </h4>
                    <p className={styles.notificationDescription}>
                      Get instant updates on your device
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange("push")}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.notificationCard}>
                <div className={styles.notificationHeader}>
                  <div className={styles.notificationIcon}>
                    <Phone size={24} />
                  </div>
                  <div className={styles.notificationInfo}>
                    <h4 className={styles.notificationTitle}>
                      SMS Notifications
                    </h4>
                    <p className={styles.notificationDescription}>
                      Receive important alerts via text message
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange("sms")}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.notificationCard}>
                <div className={styles.notificationHeader}>
                  <div className={styles.notificationIcon}>
                    <CreditCard size={24} />
                  </div>
                  <div className={styles.notificationInfo}>
                    <h4 className={styles.notificationTitle}>
                      Transaction Notifications
                    </h4>
                    <p className={styles.notificationDescription}>
                      Get notified for every transaction
                    </p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.transactions}
                      onChange={() => handleNotificationChange("transactions")}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className={styles.tabContent}>
            <div className={styles.preferencesSection}>
              <h3 className={styles.sectionTitle}>Account Preferences</h3>

              <div className={styles.preferenceCard}>
                <h4 className={styles.preferenceTitle}>Language</h4>
                <select className={styles.select}>
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div className={styles.preferenceCard}>
                <h4 className={styles.preferenceTitle}>Currency</h4>
                <select className={styles.select}>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>JPY (¥)</option>
                </select>
              </div>

              <div className={styles.preferenceCard}>
                <h4 className={styles.preferenceTitle}>Time Zone</h4>
                <select className={styles.select}>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Pacific Time (PT)</option>
                </select>
              </div>

              <div className={styles.dangerZone}>
                <h3 className={styles.dangerZoneTitle}>Danger Zone</h3>
                <div className={styles.dangerActions}>
                  <button className={styles.logoutButton}>
                    <LogOut size={18} />
                    Log Out
                  </button>
                  <button className={styles.deleteButton}>
                    <Trash2 size={18} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>My Profile</h1>
            <p className={styles.pageSubtitle}>
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "overview" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <User size={18} />
              Overview
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "security" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              <Shield size={18} />
              Security
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "notifications" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "preferences" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("preferences")}
            >
              <Settings size={18} />
              Preferences
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
