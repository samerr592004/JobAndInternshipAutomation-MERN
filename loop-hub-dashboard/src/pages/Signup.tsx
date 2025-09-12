import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle, Chrome, Menu, X, Briefcase } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import useAuthStore from "@/stores/authStore";
import { TokenStorage } from "@/lib/tokenStorage";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, verifyOTP, isLoading, error, otpEmail, clearError, isAuthenticated, user, logout } = useAuthStore();
  
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if user has valid token
  const hasValidToken = TokenStorage.hasValidToken();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (formData.password !== formData.confirmPassword) {
      useAuthStore.setState({ error: "Passwords don't match" });
      return;
    }

    if (formData.password.length < 6) {
      useAuthStore.setState({ error: "Password must be at least 6 characters" });
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);
      setStep('otp');
      setSuccessMessage("OTP has been sent to your email!");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (otp.length !== 6) {
      useAuthStore.setState({ error: "Please enter a valid 6-digit OTP" });
      return;
    }

    try {
      await verifyOTP(formData.email, otp);
      setSuccessMessage("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  const handleResendOTP = async () => {
    clearError();
    try {
      await signup(formData.name, formData.email, formData.password);
      setSuccessMessage("OTP has been resent to your email!");
    } catch (error) {
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="lg" className="animate-scale-in" onClick={() => navigate("/")} />
          
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
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium hover:bg-accent/50 transition-smooth"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
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
                      onClick={() => navigate("/login")}
                      className="flex-1"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => navigate("/login")}
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
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

        {step === 'signup' ? (
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your details to get started with JobLoop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Sign Up
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground text-center w-full">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
              <CardDescription className="text-center">
                We've sent a 6-digit code to<br />
                <span className="font-semibold text-foreground">{formData.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl font-bold tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {successMessage && (
                  <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      {successMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Didn't receive the code?
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setStep('signup')}
              >
                Back to signup
              </Button>
            </CardFooter>
          </Card>
        )}
        </div>
      </div>
    </div>
  );
}
