import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Briefcase,
  GraduationCap,
  Award,
  Settings,
  Upload,
  Plus,
  X
} from "lucide-react";

export default function Profile() {
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js", "Python", "SQL"]);
  const [newSkill, setNewSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
        >
          <Settings className="w-4 h-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <div className="space-y-6">
          <Card className="bg-card border-border text-center">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-primary-foreground">JD</span>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-muted-foreground">Senior Frontend Developer</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>john.doe@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Complete</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>CV Uploaded</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Skills Added</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Portfolio Linked</span>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">!</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@gmail.com"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  defaultValue="San Francisco, CA, USA"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input
                  id="website"
                  placeholder="https://johndoe.dev"
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Professional Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Current Title</Label>
                <Input
                  id="title"
                  defaultValue="Senior Frontend Developer"
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue placeholder="5-7 years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-5">4-5 years</SelectItem>
                      <SelectItem value="5-7">5-7 years</SelectItem>
                      <SelectItem value="8-10">8-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Expected Salary</Label>
                  <Input
                    id="salary"
                    placeholder="$120,000 - $150,000"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Tell us about your professional background and career goals..."
                  className="min-h-[100px]"
                  disabled={!isEditing}
                  defaultValue="Experienced frontend developer with 6+ years of experience building scalable web applications using React, TypeScript, and modern web technologies. Passionate about creating user-friendly interfaces and collaborating with cross-functional teams."
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Skills & Technologies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Preferences */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Job Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Full-time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remote">Remote Work</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Remote or On-site" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Fully Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="locations">Preferred Locations</Label>
                <Input
                  id="locations"
                  placeholder="San Francisco, New York, Remote"
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}