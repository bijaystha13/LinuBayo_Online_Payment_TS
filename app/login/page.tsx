"use client";

import React, { useState } from "react";
import { useForm } from "../shared/hooks/useForm";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Smartphone,
  AlertCircle,
} from "lucide-react";
import styles from "./LoginPage.module.css";
import { useAuth } from "../shared/Context/AuthContext";
import { useRouter } from "next/navigation";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const { login, signup } = useAuth();
  const router = useRouter();

  // Login Form State
  const [loginFormState, loginInputHandler, , resetLoginForm] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  // Signup Form State
  const [signupFormState, signupInputHandler, , resetSignupForm] = useForm(
    {
      fullName: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      confirmPassword: { value: "", isValid: false },
    },
    false
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string, isSignup: boolean = false) => {
    if (isSignup) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber;
    }
    return password.length >= 6;
  };

  const validateField = (
    id: string,
    value: string,
    isSignup: boolean = false
  ) => {
    let isValid = true;
    let errorMsg = "";

    switch (id) {
      case "email":
        isValid = validateEmail(value);
        if (!value) {
          errorMsg = "Email is required";
          isValid = false;
        } else if (!isValid) {
          errorMsg = "Invalid email address";
        }
        break;
      case "password":
        isValid = validatePassword(value, isSignup);
        if (!value) {
          errorMsg = "Password is required";
          isValid = false;
        } else if (!isValid) {
          errorMsg = isSignup
            ? "Password must be 8+ characters with uppercase, lowercase, and number"
            : "Password must be at least 6 characters";
        }
        break;
      case "fullName":
        isValid = value.trim().length >= 2;
        if (!value) {
          errorMsg = "Full name is required";
          isValid = false;
        } else if (!isValid) {
          errorMsg = "Name must be at least 2 characters";
        }
        break;
      case "confirmPassword":
        isValid = value === signupFormState.inputs.password.value;
        if (!value) {
          errorMsg = "Please confirm your password";
          isValid = false;
        } else if (!isValid) {
          errorMsg = "Passwords do not match";
        }
        break;
    }

    return { isValid, errorMsg };
  };

  const handleInputChange = (
    id: string,
    value: string,
    isSignup: boolean = false
  ) => {
    const { isValid } = validateField(id, value, isSignup);

    if (isSignup) {
      signupInputHandler(id, value, isValid);
    } else {
      loginInputHandler(id, value, isValid);
    }

    // Only show error if field has been touched and then cleared/invalidated
    if (touched[id]) {
      const { errorMsg } = validateField(id, value, isSignup);
      const newErrors = { ...errors };
      if (errorMsg) {
        newErrors[id] = errorMsg;
      } else {
        delete newErrors[id];
      }
      setErrors(newErrors);
    }
  };

  const handleInputBlur = (
    id: string,
    value: string,
    isSignup: boolean = false
  ) => {
    setTouched({ ...touched, [id]: true });

    const { errorMsg } = validateField(id, value, isSignup);
    const newErrors = { ...errors };

    if (errorMsg) {
      newErrors[id] = errorMsg;
    } else {
      delete newErrors[id];
    }
    setErrors(newErrors);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(loginFormState.inputs).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(loginFormState.inputs).forEach((key) => {
      const { errorMsg } = validateField(
        key,
        loginFormState.inputs[key].value,
        false
      );
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(
        loginFormState.inputs.email.value,
        loginFormState.inputs.password.value
      );

      if (success) {
        console.log("Login successful, navigating to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      } else {
        setAuthError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(signupFormState.inputs).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(signupFormState.inputs).forEach((key) => {
      const { errorMsg } = validateField(
        key,
        signupFormState.inputs[key].value,
        true
      );
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await signup(
        signupFormState.inputs.fullName.value,
        signupFormState.inputs.email.value,
        signupFormState.inputs.password.value
      );

      if (success) {
        console.log("Signup successful, navigating to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      } else {
        setAuthError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setAuthError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setAuthError("");
    setTouched({});
    resetLoginForm(
      {
        email: { value: "", isValid: false },
        password: { value: "", isValid: false },
      },
      false
    );
    resetSignupForm(
      {
        fullName: { value: "", isValid: false },
        email: { value: "", isValid: false },
        password: { value: "", isValid: false },
        confirmPassword: { value: "", isValid: false },
      },
      false
    );
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const features = [
    {
      icon: <Shield />,
      title: "Bank-Level Security",
      description: "256-bit encryption protects your data",
    },
    {
      icon: <Zap />,
      title: "Instant Transfers",
      description: "Send money in seconds worldwide",
    },
    {
      icon: <Globe />,
      title: "Global Access",
      description: "Transfer to 180+ countries",
    },
    {
      icon: <Smartphone />,
      title: "Mobile Ready",
      description: "Access anywhere, anytime",
    },
  ];

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        {/* Left Side - Features */}
        <div className={styles.leftSection}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Zap />
              </div>
              <span className={styles.logoText}>PayFlow</span>
            </div>

            <h1 className={styles.leftTitle}>
              Welcome to the Future of{" "}
              <span className={styles.gradient}>Money Transfers</span>
            </h1>

            <p className={styles.leftDescription}>
              Join millions of users who trust PayFlow for fast, secure, and
              affordable money transfers worldwide.
            </p>

            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>
                <CheckCircle className={styles.trustIcon} />
                <span>10M+ Active Users</span>
              </div>
              <div className={styles.trustBadge}>
                <CheckCircle className={styles.trustIcon} />
                <span>$50B+ Transferred</span>
              </div>
              <div className={styles.trustBadge}>
                <CheckCircle className={styles.trustIcon} />
                <span>180+ Countries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className={styles.formSubtitle}>
                {isLogin
                  ? "Sign in to access your account"
                  : "Join PayFlow and start sending money today"}
              </p>
            </div>

            {/* Global Auth Error */}
            {authError && (
              <div className={styles.authErrorBanner}>
                <AlertCircle className={styles.errorIcon} />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className={styles.form}>
                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="login-email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} />
                    <input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className={`${styles.input} ${
                        errors.email ? styles.inputError : ""
                      }`}
                      value={loginFormState.inputs.email.value}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value, false)
                      }
                      onBlur={(e) =>
                        handleInputBlur("email", e.target.value, false)
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <div className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="login-password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`${styles.input} ${
                        errors.password ? styles.inputError : ""
                      }`}
                      value={loginFormState.inputs.password.value}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value, false)
                      }
                      onBlur={(e) =>
                        handleInputBlur("password", e.target.value, false)
                      }
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>Remember me</span>
                  </label>
                  <a href="/forgot-password" className={styles.forgotLink}>
                    Forgot Password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`${styles.submitButton} ${
                    isSubmitting ? styles.loading : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                  {!isSubmitting && (
                    <ArrowRight className={styles.buttonIcon} />
                  )}
                </button>

                {/* Toggle to Signup */}
                <div className={styles.toggleText}>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className={styles.toggleButton}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignupSubmit} className={styles.form}>
                {/* Full Name Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="signup-name" className={styles.label}>
                    Full Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} />
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      className={`${styles.input} ${
                        errors.fullName ? styles.inputError : ""
                      }`}
                      value={signupFormState.inputs.fullName.value}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value, true)
                      }
                      onBlur={(e) =>
                        handleInputBlur("fullName", e.target.value, true)
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.fullName && (
                    <div className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="signup-email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} />
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className={`${styles.input} ${
                        errors.email ? styles.inputError : ""
                      }`}
                      value={signupFormState.inputs.email.value}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value, true)
                      }
                      onBlur={(e) =>
                        handleInputBlur("email", e.target.value, true)
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <div className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="signup-password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} />
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className={`${styles.input} ${
                        errors.password ? styles.inputError : ""
                      }`}
                      value={signupFormState.inputs.password.value}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value, true)
                      }
                      onBlur={(e) =>
                        handleInputBlur("password", e.target.value, true)
                      }
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className={styles.formGroup}>
                  <label
                    htmlFor="signup-confirm-password"
                    className={styles.label}
                  >
                    Confirm Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} />
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`${styles.input} ${
                        errors.confirmPassword ? styles.inputError : ""
                      }`}
                      value={signupFormState.inputs.confirmPassword.value}
                      onChange={(e) =>
                        handleInputChange(
                          "confirmPassword",
                          e.target.value,
                          true
                        )
                      }
                      onBlur={(e) =>
                        handleInputBlur("confirmPassword", e.target.value, true)
                      }
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      required
                    />
                    <span>
                      I agree to the{" "}
                      <a href="/terms" className={styles.link}>
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className={styles.link}>
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`${styles.submitButton} ${
                    isSubmitting ? styles.loading : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                  {!isSubmitting && (
                    <ArrowRight className={styles.buttonIcon} />
                  )}
                </button>

                {/* Toggle to Login */}
                <div className={styles.toggleText}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className={styles.toggleButton}
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Social Login */}
            <div className={styles.divider}>
              <span>Or continue with</span>
            </div>

            <div className={styles.socialButtons}>
              <button className={styles.socialButton} disabled={isSubmitting}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className={styles.socialButton} disabled={isSubmitting}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
