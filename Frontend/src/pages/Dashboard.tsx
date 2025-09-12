import { Sidebar } from "@/components/Sidebar";
import { UserMenu } from "@/components/UserMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  FileText, 
  Mail, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowRight,
  User,
  HelpCircle,
  RefreshCw,
  Plus,
  AlertTriangle
} from "lucide-react";

const actionCards = [
  {
    icon: User,
    title: "Setup profile",
    description: "Complete your profile information",
    action: "GO",
    variant: "primary" as const
  },
  {
    icon: HelpCircle,
    title: "Answer questions",
    description: "Help us understand your preferences",
    action: "GO",
    variant: "secondary" as const
  },
  {
    icon: RefreshCw,
    title: "Start first loop",
    description: "Begin your job search automation",
    action: "GO",
    variant: "accent" as const
  },
  {
    icon: Plus,
    title: "Add extension",
    description: "Install our browser extension",
    action: "GO",
    variant: "muted" as const
  }
];

const stats = [
  {
    title: "Active Loops",
    value: "0",
    icon: RefreshCw,
    description: "Currently running job searches"
  },
  {
    title: "Total Matches",
    value: "0", 
    icon: Target,
    description: "Jobs matched to your profile"
  },
  {
    title: "Applications Submitted",
    value: "0",
    icon: FileText,
    description: "Auto-submitted applications"
  },
  {
    title: "Emails Sent",
    value: "0",
    icon: Mail,
    description: "Outreach emails sent"
  },
  {
    title: "Pending applications",
    value: "0",
    icon: AlertTriangle,
    description: "Applications awaiting action"
  }
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 ml-12 md:ml-0">
            <h1 className="text-xl font-semibold text-foreground">Overview</h1>
          </div>
          <UserMenu />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">You're almost there!</h2>
            <p className="text-muted-foreground">
              Complete these steps to start your automated job search
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionCards.map((card, index) => (
              <Card key={index} className="group hover:shadow-card transition-smooth cursor-pointer border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className={`p-2 rounded-lg w-fit ${
                        card.variant === 'primary' ? 'bg-gradient-primary/10' :
                        card.variant === 'secondary' ? 'bg-gradient-secondary/10' :
                        card.variant === 'accent' ? 'bg-accent/50' :
                        'bg-muted'
                      }`}>
                        <card.icon className={`h-5 w-5 ${
                          card.variant === 'primary' ? 'text-primary' :
                          card.variant === 'secondary' ? 'text-secondary' :
                          card.variant === 'accent' ? 'text-accent-foreground' :
                          'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-border/50 hover:bg-accent/50 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-smooth"
                    >
                      {card.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Statistics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-border/50 hover:shadow-card transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-gradient-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Getting Started Tips */}
          <Card className="border-border/50 bg-gradient-subtle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Getting Started Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Complete Your Profile</h4>
                  <p className="text-sm text-muted-foreground">
                    Add your skills, experience, and job preferences to help our AI find the best matches.
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    Start Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Create Your First Loop</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up automated job searches based on your criteria and let AI apply for you.
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    Create Loop <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}