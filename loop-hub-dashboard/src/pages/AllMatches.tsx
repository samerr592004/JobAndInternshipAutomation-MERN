import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, DollarSign, Clock, Heart, ExternalLink, Filter } from "lucide-react";

const matches = [
  {
    id: 1,
    company: "TechCorp Inc",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    remote: true,
    matchScore: 95,
    posted: "2 days ago",
    description: "We're looking for a senior frontend developer with expertise in React, TypeScript, and modern web technologies.",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    saved: false
  },
  {
    id: 2,
    company: "StartupXYZ",
    position: "React Developer", 
    location: "Remote",
    salary: "$100k - $130k",
    type: "Full-time",
    remote: true,
    matchScore: 88,
    posted: "1 day ago",
    description: "Join our fast-growing startup as a React developer. You'll work on cutting-edge projects with a talented team.",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    saved: true
  },
  {
    id: 3,
    company: "MegaCorp",
    position: "Full Stack Engineer",
    location: "New York, NY",
    salary: "$130k - $160k", 
    type: "Full-time",
    remote: false,
    matchScore: 82,
    posted: "3 days ago",
    description: "We need a full stack engineer to work on our enterprise applications using modern technologies.",
    skills: ["React", "Python", "PostgreSQL", "Docker"],
    saved: false
  },
  {
    id: 4,
    company: "InnovateTech",
    position: "Lead Developer",
    location: "Austin, TX",
    salary: "$140k - $170k",
    type: "Full-time", 
    remote: true,
    matchScore: 91,
    posted: "5 days ago",
    description: "Lead a team of developers while contributing to our innovative products. Remote-first culture.",
    skills: ["React", "Leadership", "TypeScript", "GraphQL"],
    saved: false
  }
];

export default function AllMatches() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [filterBy, setFilterBy] = useState("all");
  const [savedJobs, setSavedJobs] = useState<number[]>([2]);

  const toggleSaved = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "saved") return matchesSearch && savedJobs.includes(match.id);
    if (filterBy === "remote") return matchesSearch && match.remote;
    return matchesSearch;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    switch (sortBy) {
      case "match": return b.matchScore - a.matchScore;
      case "salary": return parseInt(b.salary.replace(/[^0-9]/g, '')) - parseInt(a.salary.replace(/[^0-9]/g, ''));
      case "date": return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      default: return 0;
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Matches</h1>
          <p className="text-muted-foreground">Discover job opportunities that match your profile</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-muted/50"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Match Score</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
            <SelectItem value="date">Date Posted</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="saved">Saved Jobs</SelectItem>
            <SelectItem value="remote">Remote Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {sortedMatches.map((match) => (
          <Card key={match.id} className="bg-card border-border hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{match.position}</CardTitle>
                    <Badge className={`${getMatchScoreColor(match.matchScore)} bg-transparent border`}>
                      {match.matchScore}% match
                    </Badge>
                    {match.remote && (
                      <Badge variant="secondary">Remote</Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {match.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {match.posted}
                    </span>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSaved(match.id)}
                  className={savedJobs.includes(match.id) ? "text-red-500" : ""}
                >
                  <Heart className={`w-4 h-4 ${savedJobs.includes(match.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{match.description}</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                  <span className="font-medium">{match.salary}</span>
                </div>
                <Badge variant="outline">{match.type}</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {match.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="flex space-x-2">
                  <Button className="bg-primary hover:bg-primary/90">
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Match score: <span className={`font-medium ${getMatchScoreColor(match.matchScore)}`}>
                    {match.matchScore}%
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedMatches.length === 0 && (
        <Card className="bg-card border-border text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}