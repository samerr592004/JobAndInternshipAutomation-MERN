import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Chrome, Briefcase, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import useAuthStore from "@/stores/authStore";

// Mantine imports
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PinInput } from "@mantine/core";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const { login, signUp, sendOtp, OTP } = useAuthStore();
  const navigate = useNavigate();

  // Mantine Modal state
  const [opened, { open, close }] = useDisclosure(false);

  // Handle main submit (login or signup)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignup) {
        if (password !== confirmPass) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        // ✅ Step 1: Send OTP before registration
        if (!otpSent) {
          await sendOtp(email);
          setOtpSent(true);
          open(); // open modal for OTP input
          setIsLoading(false);
          return; // stop here — don’t register yet
        }

        // ✅ Step 2: After OTP verified, allow registration
        if (verified) {
          await signUp({
            username: name,
            email,
            password,
          });
          navigate("/dashboard");
        } else {
          setError("Please verify your email before signing up.");
        }
      } else {
        // login flow
        await login({
          email,
          password,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ OTP Verification logic
  const handleOtpVerify = async () => {
    if (otp.length < 6) {
      setError("Please enter the full 6-digit OTP");
      return;
    }

    try {
      setIsVerifying(true);

      // 🔥 Step 3: Compare entered OTP with stored one in Zustand
      if (otp === OTP) {
        setVerified(true);
        close(); // close modal
        setOtpSent(false); // reset for next flow

        // ✅ Proceed with registration automatically
        await signUp({
          username: name,
          email,
          password,
        });

        navigate("/dashboard");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      {/* OTP Verification Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Verify Your Email"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-600">
            We’ve sent a 6-digit verification code to <b>{email}</b>.
          </p>

          <PinInput
            length={6}
            oneTimeCode
            size="lg"
            onChange={setOtp}
            value={otp}
            className="justify-center"
          />

          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleOtpVerify}
            className="w-full h-11 mt-3 bg-gradient-primary"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </div>
      </Modal>

      {/* Existing Auth Page */}
      <div className="min-h-screen bg-background flex flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10 bg-gradient-subtle">
          <div className="w-full max-w-md space-y-8">
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="space-y-4 text-center">
                <Logo size="lg" className="mx-auto" />
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {isSignup ? "Create your account" : "Welcome Back!"}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {isSignup
                      ? "Join JobLoop and find your dream job faster"
                      : "Sign in to continue to JobLoop"}
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2 h-12 border-border/50 hover:bg-accent/50 transition-smooth"
                >
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
                  {isSignup && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isSignup && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPass">Confirm Password *</Label>
                      <Input
                        id="confirmPass"
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                      />
                    </div>
                  )}

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
                        {isSignup ? "Creating account..." : "Signing in..."}
                      </>
                    ) : isSignup ? (
                      "Sign Up"
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <div className="text-center text-sm">
                    {isSignup ? (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsSignup(false)}
                          className="text-primary hover:text-primary-glow font-medium transition-smooth"
                        >
                          Sign in
                        </button>
                      </>
                    ) : (
                      <>
                        Don’t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsSignup(true)}
                          className="text-primary hover:text-primary-glow font-medium transition-smooth"
                        >
                          Create account
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
          <div className="relative z-10 text-center text-white max-w-md">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-glow">
                <Briefcase className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {isSignup
                  ? "Start Your Career Journey"
                  : "Find Your Dream Job with AI"}
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {isSignup
                  ? "Join thousands using JobLoop to land better jobs, faster."
                  : "JobLoop helps you get 3x more interviews using AI. Upload your CV and let our AI apply for you automatically."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
