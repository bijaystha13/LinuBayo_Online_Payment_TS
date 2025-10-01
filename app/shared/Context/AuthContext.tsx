// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";

// interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   balance: string;
//   avatar?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoggedIn: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   signup: (
//     fullName: string,
//     email: string,
//     password: string
//   ) => Promise<boolean>;
//   logout: () => void;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for existing session on mount
//   useEffect(() => {
//     console.log("AuthProvider: Checking for existing session...");
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         console.log("AuthProvider: Found stored user:", parsedUser);
//         setUser(parsedUser);
//       } else {
//         console.log("AuthProvider: No stored user found");
//       }
//     } catch (error) {
//       console.error("AuthProvider: Error parsing stored user:", error);
//       localStorage.removeItem("user");
//     } finally {
//       setIsLoading(false);
//       console.log("AuthProvider: Initial loading complete");
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     console.log("AuthProvider: Login attempt for:", email);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Mock validation
//       const mockUsers = [
//         {
//           email: "user@example.com",
//           password: "password123",
//           fullName: "John Doe",
//           balance: "$12,345.67",
//         },
//         {
//           email: "demo@payflow.com",
//           password: "demo1234",
//           fullName: "Demo User",
//           balance: "$5,000.00",
//         },
//       ];

//       const foundUser = mockUsers.find(
//         (u) => u.email === email && u.password === password
//       );

//       if (foundUser) {
//         const userData: User = {
//           id: Math.random().toString(36).substr(2, 9),
//           fullName: foundUser.fullName,
//           email: foundUser.email,
//           balance: foundUser.balance,
//         };

//         console.log("AuthProvider: Login successful, setting user:", userData);
//         setUser(userData);
//         localStorage.setItem("user", JSON.stringify(userData));

//         // Force a small delay to ensure state propagates
//         await new Promise((resolve) => setTimeout(resolve, 50));
//         console.log("AuthProvider: User state updated");

//         return true;
//       }

//       console.log("AuthProvider: Login failed - invalid credentials");
//       return false;
//     } catch (error) {
//       console.error("AuthProvider: Login error:", error);
//       return false;
//     }
//   };

//   const signup = async (
//     fullName: string,
//     email: string,
//     password: string
//   ): Promise<boolean> => {
//     console.log("AuthProvider: Signup attempt for:", email);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const userData: User = {
//         id: Math.random().toString(36).substr(2, 9),
//         fullName,
//         email,
//         balance: "$0.00",
//       };

//       console.log("AuthProvider: Signup successful, setting user:", userData);
//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData));

//       // Force a small delay to ensure state propagates
//       await new Promise((resolve) => setTimeout(resolve, 50));
//       console.log("AuthProvider: User state updated");

//       return true;
//     } catch (error) {
//       console.error("AuthProvider: Signup error:", error);
//       return false;
//     }
//   };

//   const logout = () => {
//     console.log("AuthProvider: Logging out user");
//     setUser(null);
//     localStorage.removeItem("user");
//     console.log("AuthProvider: User logged out");
//   };

//   // Debug effect to track user changes
//   useEffect(() => {
//     console.log("AuthProvider: User state changed:", {
//       user,
//       isLoggedIn: !!user,
//       isLoading,
//     });
//   }, [user, isLoading]);

//   const value: AuthContextType = {
//     user,
//     isLoggedIn: !!user,
//     login,
//     signup,
//     logout,
//     isLoading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  balance: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    console.log("AuthProvider: Checking for existing session...");
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("AuthProvider: Found stored user:", parsedUser);
        setUser(parsedUser);
      } else {
        console.log("AuthProvider: No stored user found");
      }
    } catch (error) {
      console.error("AuthProvider: Error parsing stored user:", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
      console.log("AuthProvider: Initial loading complete");
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("AuthProvider: Login attempt for:", email);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Accept ANY email/password for demo purposes
      // Create user data from the provided email
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: email.split("@")[0] || "Demo User", // Use email prefix as name
        email: email,
        balance: "$12,345.67", // Default balance
      };

      console.log("AuthProvider: Login successful, setting user:", userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Small delay to ensure state propagates
      await new Promise((resolve) => setTimeout(resolve, 50));
      console.log("AuthProvider: User state updated");

      return true;
    } catch (error) {
      console.error("AuthProvider: Login error:", error);
      return false;
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    console.log("AuthProvider: Signup attempt for:", email);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create user data from provided information
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        fullName,
        email,
        balance: "$0.00", // New users start with $0
      };

      console.log("AuthProvider: Signup successful, setting user:", userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Small delay to ensure state propagates
      await new Promise((resolve) => setTimeout(resolve, 50));
      console.log("AuthProvider: User state updated");

      return true;
    } catch (error) {
      console.error("AuthProvider: Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    console.log("AuthProvider: Logging out user");
    setUser(null);
    localStorage.removeItem("user");
    console.log("AuthProvider: User logged out");
  };

  // Debug effect to track user changes
  useEffect(() => {
    console.log("AuthProvider: User state changed:", {
      user,
      isLoggedIn: !!user,
      isLoading,
    });
  }, [user, isLoading]);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
