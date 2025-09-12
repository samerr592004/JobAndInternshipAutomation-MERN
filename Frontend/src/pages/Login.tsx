import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Chrome, Briefcase } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-subtle">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Logo size="lg" />
            <ThemeToggle />
          </div>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-4">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {isLogin 
                    ? "Sign in to continue to JobLoop" 
                    : "Create an account to get started with JobLoop"
                  }
                </CardDescription>
              </div>

              {/* Google Sign In */}
              <Button variant="outline" className="w-full gap-2 h-12 border-border/50 hover:bg-accent/50 transition-smooth">
                <Chrome className="h-5 w-5" />
                {isLogin ? "Sign in as John Doe" : "Sign up with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Type your Email"
                    className="h-12 border-border/50 focus:border-primary transition-smooth"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </Label>
                    {isLogin && (
                      <button
                        type="button"
                        className="text-sm text-primary hover:text-primary-glow transition-smooth"
                      >
                        Forgot your password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Type your Password"
                      className="h-12 pr-12 border-border/50 focus:border-primary transition-smooth"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-smooth font-medium">
                  {isLogin ? "Sign in" : "Create Account"}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {isLogin ? "Not registered? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary-glow transition-smooth font-medium"
                  >
                    {isLogin ? "Create an account" : "Sign in"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="relative z-10 text-center text-white max-w-md">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-glow">
              <Briefcase className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Find Your Dream Job with AI
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              JobLoop helps you get 3x more interviews using AI. Upload your CV, select job preferences, and let our AI apply for you automatically.
            </p>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm"></div>
      </div>
    </div>
  );
}