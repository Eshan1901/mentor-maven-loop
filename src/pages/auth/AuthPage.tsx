import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-cyan-900 to-teal-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Welcome message */}
          <div className="text-white space-y-8 page-enter">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-sm font-medium">🚀 Welcome to the future of learning</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  TeachLoop
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/90 font-light">
                Connect, Learn, and Teach Together
              </p>
              
              <p className="text-lg text-white/80 max-w-lg leading-relaxed">
                Join our community of passionate learners and teachers. Share your knowledge, 
                learn new skills, and build meaningful connections in an innovative learning environment.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 card-hover">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">1000+</div>
                <div className="text-sm text-white/80 mt-1">Active Learners</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 card-hover">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-white/80 mt-1">Courses Available</div>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm">Live Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                <span className="text-white/80 text-sm">Expert Instructors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-400"></div>
                <span className="text-white/80 text-sm">Community Support</span>
              </div>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="flex justify-center lg:justify-end">
            <div className="transform transition-all duration-500 ease-in-out">
              {isLogin ? (
                <LoginForm onToggleMode={() => setIsLogin(false)} />
              ) : (
                <SignupForm onToggleMode={() => setIsLogin(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}