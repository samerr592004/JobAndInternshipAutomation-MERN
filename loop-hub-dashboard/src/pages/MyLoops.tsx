import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, Settings, MoreHorizontal } from "lucide-react";

const loops = [
  {
    id: 1,
    name: "Frontend Developer - Remote",
    status: "active",
    matches: 12,
    applications: 8,
    responses: 2,
    created: "2024-01-15",
    lastRun: "2 hours ago"
  },
  {
    id: 2,
    name: "React Developer - San Francisco",
    status: "paused",
    matches: 25,
    applications: 15,
    responses: 5,
    created: "2024-01-10",
    lastRun: "1 day ago"
  },
  {
    id: 3,
    name: "Full Stack Engineer - NYC",
    status: "completed",
    matches: 45,
    applications: 30,
    responses: 12,
    created: "2024-01-05",
    lastRun: "3 days ago"
  }
];

export default function MyLoops() {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Loops</h1>
          <p className="text-muted-foreground">Manage your automated job search campaigns</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create New Loop
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {["all", "active", "paused", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loops Grid */}
      <div className="grid gap-4">
        {loops.map((loop) => (
          <Card key={loop.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{loop.name}</CardTitle>
                  <CardDescription>Created on {loop.created} • Last run {loop.lastRun}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(loop.status)}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{loop.matches}</p>
                  <p className="text-sm text-muted-foreground">Matches</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">{loop.applications}</p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{loop.responses}</p>
                  <p className="text-sm text-muted-foreground">Responses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-500">
                    {Math.round((loop.responses / loop.applications) * 100) || 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {loop.status === "active" ? (
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {loops.length === 0 && (
        <Card className="bg-card border-border text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No loops created yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first automated job search loop to get started
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Loop
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}