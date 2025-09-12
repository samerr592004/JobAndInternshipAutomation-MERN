import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  CheckCircle, 
  BarChart3, 
  Mail, 
  Target, 
  Zap,
  Users,
  TrendingUp,
  Shield,
  Star,
  PlayCircle,
  Globe,
  Clock,
  Award,
  Briefcase,
  FileText,
  Search,
  Send,
  Sparkles,
  Rocket,
  Heart,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { TokenStorage } from "@/lib/tokenStorage";

const features = [
  {
    icon: Target,
    title: "AI-Powered Job Matching",
    description: "Our advanced AI analyzes thousands of job postings daily and matches you with positions that perfectly align with your skills, experience, and career goals.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Automated Applications",
    description: "Save 20+ hours per week. Our AI applies to relevant jobs on your behalf with personalized cover letters and optimized applications.",
    color: "text-secondary"
  },
  {
    icon: Mail,
    title: "Smart Email Outreach",
    description: "Automatically reach out to recruiters and hiring managers with AI-generated, personalized messages that get responses.",
    color: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track your job search performance with detailed insights, response rates, and optimization recommendations.",
    color: "text-secondary"
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Enterprise-grade security ensures your personal data and job search activities remain completely confidential.",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Join 10,000+ professionals who've landed their dream jobs. Average 3x increase in interview invitations.",
    color: "text-secondary"
  }
];

const steps = [
  {
    number: "1",
    title: "Create your profile and upload your CV",
    description: "Tell us about your skills, experience, and what you're looking for in your next role. Our AI will analyze your background and create an optimized profile.",
    icon: FileText
  },
  {
    number: "2", 
    title: "Select your desired job titles, locations and preferences",
    description: "Define your job search criteria including salary expectations, company size, remote options, and industry preferences.",
    icon: Search
  },
  {
    number: "3",
    title: "Let JobLoop work its magic automatically",
    description: "Our AI searches thousands of job boards daily, applies on your behalf, and sends personalized outreach messages to accelerate your job search.",
    icon: Rocket
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior Software Engineer at Google",
    image: "SJ",
    content: "JobLoop completely transformed my job search. I went from sending 50+ applications manually to getting 3 job offers in just 2 weeks. The AI found opportunities I never would have discovered.",
    rating: 5,
    company: "Google"
  },
  {
    name: "Michael Chen", 
    role: "Product Manager at Microsoft",
    image: "MC",
    content: "The automated outreach feature is incredible. I got responses from hiring managers at top tech companies within days. JobLoop saved me months of manual networking.",
    rating: 5,
    company: "Microsoft"
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist at Netflix", 
    image: "ER",
    content: "The analytics dashboard helped me understand exactly what was working. I optimized my approach and landed my dream job at Netflix with a 40% salary increase!",
    rating: 5,
    company: "Netflix"
  }
];

const stats = [
  { number: "10,000+", label: "Success Stories", icon: Users },
  { number: "500,000+", label: "Jobs Applied", icon: Send },
  { number: "98%", label: "Success Rate", icon: Award },
  { number: "3x", label: "More Interviews", icon: TrendingUp }
];

const companies = [
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix", "Tesla", "Spotify"
];

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, user, checkTokenValidity, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  
  // Check if user has valid token
  const hasValidToken = TokenStorage.hasValidToken();

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    // For now, navigate directly to dashboard. 
    // In production, this would go to login/signup first
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="lg" className="animate-scale-in" />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-smooth relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-smooth relative group">
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-sm font-medium text-foreground hover:text-primary transition-smooth relative group">
              Success Stories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-smooth relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
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
              <a href="#features" className="block text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Features
              </a>
              <a href="#how-it-works" className="block text-sm font-medium text-foreground hover:text-primary transition-smooth">
                How it Works
              </a>
              <a href="#testimonials" className="block text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Success Stories
              </a>
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <ThemeToggle />
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="flex-1"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate("/signup")}
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm animate-float"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center text-white">
            <Badge className="mb-8 bg-white/20 text-white border-white/30 hover:bg-white/30 animate-scale-in">
              <Sparkles className="h-4 w-4 mr-2" />
              🚀 Join 10,000+ professionals who found their dream jobs
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
              Get{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent animate-glow">
                3x More Interviews
              </span>
              <br />
              with AI Automation
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
              Upload your CV, set your preferences, and let our AI apply to hundreds of relevant jobs daily. 
              <span className="font-semibold text-white"> Stop manual applications forever.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-bounce text-lg px-10 py-6 h-auto transform hover:scale-105"
              >
                <Rocket className="mr-3 h-6 w-6" />
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white transition-smooth text-lg px-10 py-6 h-auto backdrop-blur-sm"
              >
                <PlayCircle className="mr-3 h-6 w-6" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-white/80" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trusted by */}
            <div className="mt-16 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <p className="text-white/70 mb-6">Trusted by professionals at</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {companies.map((company, index) => (
                  <div key={index} className="text-white font-semibold text-lg hover:opacity-100 transition-smooth">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <Badge className="mb-6 bg-gradient-primary/10 text-primary border-primary/20">
              <Zap className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Everything You Need to
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Accelerate Your Career
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform automates every aspect of your job search, from finding opportunities to landing interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-border/50 hover:shadow-card transition-smooth group cursor-pointer animate-on-scroll hover:scale-105 transform"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8">
                  <div className={`mb-6 p-4 rounded-xl bg-gradient-primary/10 w-fit group-hover:bg-gradient-primary/20 transition-smooth`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-smooth">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-primary group-hover:text-primary-glow transition-smooth">
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <Badge className="mb-6 bg-gradient-secondary/10 text-secondary border-secondary/20">
              <Target className="h-4 w-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              From Setup to Success
              <span className="block bg-gradient-secondary bg-clip-text text-transparent">
                In Just 3 Steps
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our streamlined process gets you from job searching frustration to interview success in minutes, not months.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col lg:flex-row gap-8 mb-16 last:mb-0 animate-on-scroll"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="flex-shrink-0 lg:w-1/3">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow animate-glow">
                      {step.number}
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 lg:w-2/3">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA in How It Works */}
          <div className="text-center mt-16 animate-on-scroll">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-primary hover:shadow-glow transition-bounce text-lg px-8 py-6 h-auto transform hover:scale-105"
            >
              <Rocket className="mr-3 h-5 w-5" />
              Start Your Job Search Automation
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 lg:py-32 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <Badge className="mb-6 bg-gradient-hero/10 text-primary border-primary/20">
              <Heart className="h-4 w-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Real Results from
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Real Professionals
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how JobLoop has transformed careers and accelerated job search success across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-border/50 hover:shadow-card transition-smooth group animate-on-scroll relative overflow-hidden"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-8 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {testimonial.company}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of professionals who are already using AI to land their dream jobs faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              />
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-smooth h-12 px-8 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              No credit card required • Free 7-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Logo size="lg" />
              <p className="text-muted-foreground leading-relaxed">
                AI-powered job search automation that gets you 3x more interviews.
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  SOC 2 Compliant
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  ISO 27001
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">API</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">About</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 JobLoop. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Status
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Security
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}