"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/shared/Context/AuthContext";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Debug logging
  useEffect(() => {
    console.log("Auth state updated:", {
      isLoggedIn,
      isLoading,
      user,
    });
  }, [isLoggedIn, isLoading, user]);

  // Handle click outside for user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    router.push("/login");
    closeMobileMenu();
  };

  const handleSignup = () => {
    router.push("/login");
    closeMobileMenu();
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/");
    console.log("User logged out");
  };

  // Get logo destination based on login status
  const getLogoDestination = () => {
    if (!isLoggedIn) {
      return "/";
    }
    // You can add role-based routing here if needed
    return "/dashboard";
  };

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <Wallet className={styles.logoIcon} />
            <span className={styles.logoText}>PayFlow</span>
          </Link>
          <div className={styles.navbarLoading}>
            <div className={styles.loadingSkeleton}></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Logo Section - Dynamic destination */}
          <div className={styles.logoSection}>
            <Link href={getLogoDestination()} className={styles.logo}>
              <Wallet className={styles.logoIcon} />
              <span className={styles.logoText}>PayFlow</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuToggle} ${
              isMobileMenuOpen ? styles.active : ""
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Navigation Links */}
          <div className={styles.navLinks}>
            {/* Home - Dynamic based on login status */}
            {!isLoggedIn && (
              <Link
                href="/"
                className={`${styles.publicNavLink} ${
                  pathname === "/" ? styles.publicNavLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            )}

            {isLoggedIn && (
              <Link
                href="/dashboard"
                className={`${styles.navLink} ${
                  pathname === "/dashboard" ? styles.navLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                <Wallet className={styles.navIcon} />
                <span>Dashboard</span>
              </Link>
            )}

            {/* Features - Only when logged out */}
            {!isLoggedIn && (
              <Link
                href="/features"
                className={`${styles.publicNavLink} ${
                  pathname === "/features" ? styles.publicNavLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                Features
              </Link>
            )}

            {/* Transfer - Only when logged in */}
            {isLoggedIn && (
              <Link
                href="/transfer"
                className={`${styles.navLink} ${
                  pathname === "/transfer" ? styles.navLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                <Send className={styles.navIcon} />
                <span>Transfer</span>
              </Link>
            )}

            {/* How It Works - Only when logged out */}
            {!isLoggedIn && (
              <Link
                href="/how-it-works"
                className={`${styles.publicNavLink} ${
                  pathname === "/how-it-works" ? styles.publicNavLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                How It Works
              </Link>
            )}

            {/* Cards - Only when logged in */}
            {isLoggedIn && (
              <Link
                href="/cards"
                className={`${styles.navLink} ${
                  pathname === "/cards" ? styles.navLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                <CreditCard className={styles.navIcon} />
                <span>Cards</span>
              </Link>
            )}

            {/* Pricing - Only when logged out */}
            {!isLoggedIn && (
              <Link
                href="/pricing"
                className={`${styles.publicNavLink} ${
                  pathname === "/pricing" ? styles.publicNavLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
            )}

            {/* Analytics - Only when logged in */}
            {isLoggedIn && (
              <Link
                href="/analytics"
                className={`${styles.navLink} ${
                  pathname === "/analytics" ? styles.navLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                <TrendingUp className={styles.navIcon} />
                <span>Analytics</span>
              </Link>
            )}

            {/* About - Only when logged out */}
            {!isLoggedIn && (
              <Link
                href="/about"
                className={`${styles.publicNavLink} ${
                  pathname === "/about" ? styles.publicNavLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            {isLoggedIn ? (
              // Logged In Right Section
              <>
                {/* Balance Display */}
                <div className={styles.balanceDisplay}>
                  <span className={styles.balanceLabel}>Balance</span>
                  <span className={styles.balanceAmount}>
                    {user?.balance || "$0.00"}
                  </span>
                </div>

                {/* Notifications */}
                <div className={styles.notificationWrapper}>
                  <button
                    className={styles.notificationBtn}
                    aria-label="Notifications"
                  >
                    <Bell className={styles.notificationIcon} />
                    {notifications > 0 && (
                      <span className={styles.notificationBadge}>
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>

                {/* User Menu */}
                <div className={styles.userMenu} ref={userDropdownRef}>
                  <button
                    className={styles.userButton}
                    onClick={toggleUserMenu}
                    aria-label="User menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className={styles.userAvatar}
                      />
                    ) : (
                      <div className={styles.userAvatarPlaceholder}>
                        <User className={styles.userIcon} />
                      </div>
                    )}
                    <span className={styles.userName}>
                      {user?.fullName || "User"}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className={styles.userDropdown}>
                      <div className={styles.userInfo}>
                        <span className={styles.userNameDropdown}>
                          {user?.fullName}
                        </span>
                        <span className={styles.userEmail}>{user?.email}</span>
                      </div>
                      <div className={styles.dropdownDivider}></div>
                      <Link
                        href="/profile"
                        className={styles.dropdownItem}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className={styles.dropdownIcon} />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className={styles.dropdownItem}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className={styles.dropdownIcon} />
                        Settings
                      </Link>
                      <div className={styles.dropdownDivider}></div>
                      <button
                        className={styles.dropdownItem}
                        onClick={handleLogout}
                      >
                        <LogOut className={styles.dropdownIcon} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Logged Out Right Section
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
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className={styles.mobileMenu}>
            {isLoggedIn ? (
              // Logged In Mobile Menu
              <>
                <div className={styles.mobileBalance}>
                  <span className={styles.mobileBalanceLabel}>
                    Current Balance
                  </span>
                  <span className={styles.mobileBalanceAmount}>
                    {user?.balance || "$0.00"}
                  </span>
                </div>

                <div className={styles.mobileNavLinks}>
                  <Link
                    href="/dashboard"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <Wallet className={styles.mobileNavIcon} />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/transfer"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <Send className={styles.mobileNavIcon} />
                    <span>Transfer</span>
                  </Link>

                  <Link
                    href="/cards"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <CreditCard className={styles.mobileNavIcon} />
                    <span>Cards</span>
                  </Link>

                  <Link
                    href="/analytics"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <TrendingUp className={styles.mobileNavIcon} />
                    <span>Analytics</span>
                  </Link>
                </div>

                <div className={styles.mobileUserSection}>
                  <Link
                    href="/profile"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <User className={styles.mobileNavIcon} />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <Settings className={styles.mobileNavIcon} />
                    Settings
                  </Link>
                  <button
                    className={styles.mobileNavLink}
                    onClick={handleLogout}
                  >
                    <LogOut className={styles.mobileNavIcon} />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              // Logged Out Mobile Menu
              <>
                <div className={styles.mobileNavLinks}>
                  <Link
                    href="/"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/features"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <span>Features</span>
                  </Link>

                  <Link
                    href="/how-it-works"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <span>How It Works</span>
                  </Link>

                  <Link
                    href="/pricing"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <span>Pricing</span>
                  </Link>

                  <Link
                    href="/about"
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    <span>About</span>
                  </Link>
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

          {/* Mobile Menu Overlay */}
          <div
            className={styles.mobileMenuOverlay}
            onClick={closeMobileMenu}
          ></div>
        </>
      )}
    </>
  );
};

export default Navbar;
