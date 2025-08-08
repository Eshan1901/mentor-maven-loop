import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { appwriteService } from '../../services/appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
  bio?: string;
  skills_teach?: string[];
  skills_learn?: string[];
  profile_picture?: string;
  role?: string;
  $createdAt: string;
  $updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await appwriteService.getCurrentUser();
      if (currentUser) {
        try {
          // Try to get user profile from database
          const userProfile = await appwriteService.getUserProfile(currentUser.$id);
          setUser({
            ...currentUser,
            ...userProfile
          });
        } catch (error) {
          // If profile doesn't exist, use basic user info
          setUser(currentUser);
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Starting login process...', { email });
      await appwriteService.login(email, password);
      console.log('Login successful');
      await checkUser();
    } catch (error) {
      console.error('Login error:', error);
      // Provide more specific error messages
      if (error.code === 401) {
        throw new Error('Invalid email or password');
      } else if (error.code === 400) {
        throw new Error('Please check your email and password');
      } else {
        throw new Error(error.message || 'Login failed');
      }
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      console.log('Starting signup process...', { email, name });
      
      // Step 1: Create account
      const newUser = await appwriteService.createAccount(email, password, name);
      console.log('Account created successfully:', newUser);
      
      // Step 2: Login with new account
      await appwriteService.login(email, password);
      console.log('Login successful after signup');
      
      // Step 3: Get current user
      const currentUser = await appwriteService.getCurrentUser();
      console.log('Current user fetched:', currentUser);
      
      if (currentUser) {
        // Step 4: Create user profile (optional, continue if it fails)
        const profileData = {
          name,
          email,
          role: 'student',
          bio: '',
          skills_teach: [],
          skills_learn: []
        };
        
        try {
          await appwriteService.createUserProfile(currentUser.$id, profileData);
          console.log('Profile created successfully');
        } catch (profileError) {
          console.warn('Profile creation failed, but continuing:', profileError);
          // Don't throw here, as the main account creation was successful
        }
        
        // Step 5: Update user state
        await checkUser();
        console.log('Signup process completed successfully');
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Provide more specific error messages
      if (error.code === 409) {
        throw new Error('An account with this email already exists');
      } else if (error.code === 400) {
        throw new Error('Invalid email or password format');
      } else {
        throw new Error(error.message || 'Failed to create account');
      }
    }
  };

  const logout = async () => {
    try {
      await appwriteService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (user) {
      try {
        await appwriteService.updateUserProfile(user.$id, data);
        setUser({ ...user, ...data });
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};