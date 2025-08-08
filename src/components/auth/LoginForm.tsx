import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from './AuthProvider';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
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
            <Lock className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Sign in to continue your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="px-10 pb-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-base font-medium">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-4 text-lg transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="text-base font-medium">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 py-4 text-lg transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg btn-modern"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-base text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={onToggleMode}
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};