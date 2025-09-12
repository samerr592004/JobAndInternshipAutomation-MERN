import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, Calendar, Clock, ExternalLink, MessageSquare } from "lucide-react";

const applications = [
  {
    id: 1,
    company: "TechCorp Inc",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    status: "applied",
    appliedDate: "2024-01-20",
    lastUpdate: "2024-01-20",
    notes: "Applied through automated loop",
    responseRate: "Usually responds within 1 week"
  },
  {
    id: 2,
    company: "StartupXYZ", 
    position: "React Developer",
    location: "Remote",
    salary: "$100k - $130k",
    status: "screening",
    appliedDate: "2024-01-18",
    lastUpdate: "2024-01-22",
    notes: "HR reached out for initial screening call",
    responseRate: "Usually responds within 3 days"
  },
  {
    id: 3,
    company: "MegaCorp",
    position: "Full Stack Engineer", 
    location: "New York, NY",
    salary: "$130k - $160k",
    status: "interview",
    appliedDate: "2024-01-15",
    lastUpdate: "2024-01-25",
    notes: "Technical interview scheduled for next week",
    responseRate: "Usually responds within 5 days"
  },
  {
    id: 4,
    company: "InnovateTech",
    position: "Lead Developer",
    location: "Austin, TX", 
    salary: "$140k - $170k",
    status: "offer",
    appliedDate: "2024-01-10",
    lastUpdate: "2024-01-28",
    notes: "Offer received! Reviewing terms",
    responseRate: "Fast responder"
  },
  {
    id: 5,
    company: "BigTech Co",
    position: "Software Engineer",
    location: "Seattle, WA",
    salary: "$150k - $180k", 
    status: "rejected",
    appliedDate: "2024-01-05",
    lastUpdate: "2024-01-12",
    notes: "Not selected for this role",
    responseRate: "Usually responds within 2 weeks"
  }
];

export default function MyApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Applied</Badge>;
      case "screening":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Screening</Badge>;
      case "interview":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Interview</Badge>;
      case "offer":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Offer</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      case "company":
        return a.company.localeCompare(b.company);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
        <p className="text-muted-foreground">Track and manage your job applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{applications.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">{statusCounts.applied || 0}</p>
            <p className="text-sm text-muted-foreground">Applied</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">{statusCounts.screening || 0}</p>
            <p className="text-sm text-muted-foreground">Screening</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-500">{statusCounts.interview || 0}</p>
            <p className="text-sm text-muted-foreground">Interview</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{statusCounts.offer || 0}</p>
            <p className="text-sm text-muted-foreground">Offers</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-muted/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="screening">Screening</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date Applied</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {sortedApplications.map((application) => (
          <Card key={application.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{application.position}</CardTitle>
                  <CardDescription className="flex items-center space-x-4 mt-1">
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {application.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {application.location}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(application.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Applied:</span>
                    <span className="ml-1 font-medium">{application.appliedDate}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Update:</span>
                    <span className="ml-1 font-medium">{application.lastUpdate}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="ml-1 font-medium text-green-600">{application.salary}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Response Rate:</span>
                    <span className="ml-1 font-medium">{application.responseRate}</span>
                  </p>
                </div>
              </div>

              {application.notes && (
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    {application.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Company Page
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedApplications.length === 0 && (
        <Card className="bg-card border-border text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filters"
                : "Start applying to jobs to see them here"
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}