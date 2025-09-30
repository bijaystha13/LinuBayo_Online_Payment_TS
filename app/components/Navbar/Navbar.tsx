"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Send,
  TrendingUp,
  User,
  Bell,
  Menu,
  X,
  Wallet,
  Settings,
  LogOut,
  LogIn,
} from "lucide-react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavbarProps {
  isLoggedIn?: boolean;
  userBalance?: string;
  userName?: string;
  userAvatar?: string;
  onLogin?: () => void;
  onSignup?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn = false,
  userBalance = "$12,345.67",
  userName = "John Doe",
  userAvatar,
  onLogin,
  onSignup,
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const publicNavItems = [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  const privateNavItems = [
    { icon: Wallet, label: "Dashboard", href: "/dashboard" },
    { icon: Send, label: "Transfer", href: "/transfer" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
    { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      window.location.href = "/login";
    }
  };

  const handleSignup = () => {
    if (onSignup) {
      onSignup();
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logo}>
            <Wallet className={styles.logoIcon} />
            <span className={styles.logoText}>LinuBayo mSewa</span>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className={styles.navLinks}>
            {privateNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.navLinkActive : ""
                }`}
              >
                <item.icon className={styles.navIcon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.navLinks}>
            {publicNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.publicNavLink} ${
                  pathname === item.href ? styles.publicNavLinkActive : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <div className={styles.rightSection}>
          {isLoggedIn ? (
            <>
              <div className={styles.balanceDisplay}>
                <span className={styles.balanceLabel}>Balance</span>
                <span className={styles.balanceAmount}>{userBalance}</span>
              </div>

              <div className={styles.notificationWrapper}>
                <button className={styles.notificationBtn}>
                  <Bell className={styles.notificationIcon} />
                  {notifications > 0 && (
                    <span className={styles.notificationBadge}>
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              <div className={styles.userMenu}>
                <button className={styles.userButton} onClick={toggleUserMenu}>
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt={userName}
                      className={styles.userAvatar}
                    />
                  ) : (
                    <div className={styles.userAvatarPlaceholder}>
                      <User className={styles.userIcon} />
                    </div>
                  )}
                  <span className={styles.userName}>{userName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <span className={styles.userNameDropdown}>
                        {userName}
                      </span>
                      <span className={styles.userEmail}>john@example.com</span>
                    </div>
                    <div className={styles.dropdownDivider}></div>
                    <Link href="/profile" className={styles.dropdownItem}>
                      <User className={styles.dropdownIcon} />
                      Profile
                    </Link>
                    <Link href="/settings" className={styles.dropdownItem}>
                      <Settings className={styles.dropdownIcon} />
                      Settings
                    </Link>
                    <div className={styles.dropdownDivider}></div>
                    <button className={styles.dropdownItem}>
                      <LogOut className={styles.dropdownIcon} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              <button className={styles.loginButton} onClick={handleLogin}>
                <LogIn className={styles.authIcon} />
                Log In
              </button>
              <button className={styles.signupButton} onClick={handleSignup}>
                Get Started
              </button>
            </div>
          )}

          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {isLoggedIn ? (
            <>
              <div className={styles.mobileBalance}>
                <span className={styles.mobileBalanceLabel}>
                  Current Balance
                </span>
                <span className={styles.mobileBalanceAmount}>
                  {userBalance}
                </span>
              </div>

              <div className={styles.mobileNavLinks}>
                {privateNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.mobileNavLink}
                  >
                    <item.icon className={styles.mobileNavIcon} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className={styles.mobileUserSection}>
                <Link href="/profile" className={styles.mobileNavLink}>
                  <User className={styles.mobileNavIcon} />
                  Profile
                </Link>
                <Link href="/settings" className={styles.mobileNavLink}>
                  <Settings className={styles.mobileNavIcon} />
                  Settings
                </Link>
                <button className={styles.mobileNavLink}>
                  <LogOut className={styles.mobileNavIcon} />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.mobileNavLinks}>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.mobileNavLink}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className={styles.mobileAuthSection}>
                <button
                  className={styles.mobileLoginButton}
                  onClick={handleLogin}
                >
                  <LogIn className={styles.mobileNavIcon} />
                  Log In
                </button>
                <button
                  className={styles.mobileSignupButton}
                  onClick={handleSignup}
                >
                  Get Started
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
