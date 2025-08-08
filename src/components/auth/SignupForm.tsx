import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from './AuthProvider';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, User } from 'lucide-react';

interface SignupFormProps {
  onToggleMode: () => void;
}

export const SignupForm = ({ onToggleMode }: SignupFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate password confirmation
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    try {
      await signup(email, password, name);
      toast({
        title: "Welcome to TeachLoop!",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-enter">
      <Card className="w-full max-w-xl glass shadow-xl border-0 backdrop-blur-lg">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 float">
            <User className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Join TeachLoop
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Start your learning journey today
          </CardDescription>
        </CardHeader>
        <CardContent className="px-10 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300"
                    required
                    minLength={8}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-11 py-3 transition-all duration-300 focus:ring-2 hover:border-emerald-300 ${
                      confirmPassword && password !== confirmPassword 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : 'focus:ring-emerald-500/20 focus:border-emerald-500'
                    }`}
                    required
                    minLength={8}
                  />
                </div>
              </div>
            </div>
            
            {confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-500 slide-in-right">Passwords do not match</p>
            )}
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg btn-modern mt-6"
              disabled={isLoading || (password !== confirmPassword && confirmPassword !== '')}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={onToggleMode}
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};