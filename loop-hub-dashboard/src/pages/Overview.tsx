import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Users, 
  FileText, 
  Mail, 
  AlertTriangle,
  RefreshCw,
  User,
  MessageSquare,
  CheckCircle,
  Plus
} from "lucide-react";

const stats = [
  {
    title: "Active Loops",
    value: "0",
    icon: RefreshCw,
    color: "text-primary"
  },
  {
    title: "Total Matches",
    value: "0", 
    icon: Target,
    color: "text-primary"
  },
  {
    title: "Applications Submitted",
    value: "0",
    icon: FileText,
    color: "text-blue-500"
  },
  {
    title: "Emails Sent",
    value: "0",
    icon: Mail,
    color: "text-green-500"
  },
  {
    title: "Pending applications",
    value: "0",
    icon: AlertTriangle,
    color: "text-yellow-500"
  }
];

const setupSteps = [
  {
    title: "Setup profile",
    description: "Complete your profile information",
    icon: User,
    completed: false,
    action: "GO"
  },
  {
    title: "Answer questions", 
    description: "Help us understand your preferences",
    icon: MessageSquare,
    completed: false,
    action: "GO"
  },
  {
    title: "Start first loop",
    description: "Begin your job search automation",
    icon: RefreshCw,
    completed: false,
    action: "GO"
  },
  {
    title: "Add extension",
    description: "Install our browser extension",
    icon: Plus,
    completed: false,
    action: "+"
  }
];

export default function Overview() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">You're almost there!</h1>
        <p className="text-muted-foreground">Complete these steps to start your automated job search</p>
      </div>

      {/* Setup Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {setupSteps.map((step, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <Button
                  size="sm"
                  variant={step.action === "+" ? "secondary" : "default"}
                  className="h-8 px-3"
                >
                  {step.action}
                </Button>
              </div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Getting Started Tips */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <span>Getting Started Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Complete Your Profile</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Add your skills, experience, and job preferences to help our AI find the best matches.
              </p>
              <Button variant="outline" size="sm">
                Update Profile
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Create Your First Loop</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Set up automated job searches based on your criteria and let AI apply for you.
              </p>
              <Button variant="outline" size="sm">
                Create Loop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}