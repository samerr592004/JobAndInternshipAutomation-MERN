import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Chrome, Briefcase, Loader2, ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { TokenStorage } from "@/lib/tokenStorage";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError, isAuthenticated, user, logout } = useAuthStore();
  
  const from = (location.state as any)?.from?.pathname || '/dashboard';
  const hasValidToken = TokenStorage.hasValidToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="lg" className="animate-scale-in cursor-pointer" onClick={() => navigate("/")} />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => navigate("/")}
              className="text-sm font-medium text-foreground hover:text-primary transition-smooth relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            {hasValidToken && isAuthenticated ? (
              // Authenticated user actions
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/dashboard")}
                  className="text-sm font-medium hover:bg-accent/50 transition-smooth"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={logout}
                    className="text-sm font-medium hover:bg-accent/50 transition-smooth"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              // Non-authenticated user actions
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/signup")}
                  className="text-sm font-medium hover:bg-accent/50 transition-smooth"
                >
                  Sign Up
                </Button>
                <Button 
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-primary hover:shadow-glow transition-smooth transform hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-card/95 backdrop-blur-sm animate-slide-in-right">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button 
                onClick={() => navigate("/")}
                className="block text-sm font-medium text-foreground hover:text-primary transition-smooth w-full text-left"
              >
                Home
              </button>
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <ThemeToggle />
                {hasValidToken && isAuthenticated ? (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate("/dashboard")}
                      className="flex-1"
                    >
                      Dashboard
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={logout}
                      className="flex-1"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate("/signup")}
                      className="flex-1"
                    >
                      Sign Up
                    </Button>
                    <Button 
                      onClick={() => navigate("/signup")}
                      className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-gradient-subtle">
          <div className="w-full max-w-md space-y-8">
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="space-y-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-center">
                    Welcome Back!
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 text-center">
                    Sign in to continue to JobLoop
                  </CardDescription>
                </div>

                {/* Google Sign In */}
                <Button variant="outline" className="w-full gap-2 h-12 border-border/50 hover:bg-accent/50 transition-smooth">
                  <Chrome className="h-5 w-5" />
                  Continue with Google
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-border/50 focus:border-primary transition-smooth"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password *
                      </Label>
                      <button
                        type="button"
                        className="text-sm text-primary hover:text-primary-glow transition-smooth"
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Type your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-smooth font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>

                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">
                      Don't have an account?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="text-primary hover:text-primary-glow transition-smooth font-medium"
                    >
                      Create account
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
    </div>
  );
}