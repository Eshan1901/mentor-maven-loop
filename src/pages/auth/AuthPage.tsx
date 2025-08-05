import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Welcome message */}
        <div className="text-white space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to{' '}
              <span className="text-yellow-300">TeachLoop</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Connect, Learn, and Teach Together
            </p>
            <p className="text-lg text-white/80 max-w-md">
              Join our community of passionate learners and teachers. Share your knowledge, 
              learn new skills, and build meaningful connections.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-white/80">Active Learners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-white/80">Courses Available</div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <SignupForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}