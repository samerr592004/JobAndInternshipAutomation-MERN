import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Target,
  Award,
  TrendingUp,
  Download
} from "lucide-react";

const cvAnalysis = {
  overallScore: 78,
  sections: [
    {
      name: "Contact Information",
      score: 90,
      status: "good",
      feedback: "Complete contact details provided"
    },
    {
      name: "Professional Summary",
      score: 85,
      status: "good", 
      feedback: "Strong summary that highlights key skills"
    },
    {
      name: "Work Experience",
      score: 75,
      status: "warning",
      feedback: "Consider adding more quantifiable achievements"
    },
    {
      name: "Skills & Technologies",
      score: 80,
      status: "good",
      feedback: "Good mix of technical and soft skills"
    },
    {
      name: "Education",
      score: 70,
      status: "warning",
      feedback: "Include relevant certifications if any"
    },
    {
      name: "Formatting & Structure",
      score: 65,
      status: "error",
      feedback: "Improve visual hierarchy and readability"
    }
  ],
  suggestions: [
    "Add more quantifiable achievements in work experience",
    "Include relevant certifications and training",
    "Improve document formatting and visual appeal",
    "Add keywords relevant to your target positions",
    "Consider adding a projects section"
  ],
  keywords: {
    found: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    missing: ["TypeScript", "AWS", "Docker", "Kubernetes", "GraphQL"],
    score: 60
  }
};

export default function CVChecker() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true); // Set to true to show demo results
  const [jobDescription, setJobDescription] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">CV Checker</h1>
        <p className="text-muted-foreground">
          Analyze and improve your CV with AI-powered insights
        </p>
      </div>

      {/* Upload Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Upload Your CV</CardTitle>
          <CardDescription>
            Upload your CV in PDF, DOC, or DOCX format for analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {uploadedFile ? uploadedFile.name : "Choose a file or drag & drop"}
              </p>
              <p className="text-sm text-muted-foreground">
                PDF, DOC, DOCX files up to 10MB
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button className="mt-4">
              <Upload className="w-4 h-4 mr-2" />
              Select File
            </Button>
          </div>

          {/* Job Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Job Description (Optional)
            </label>
            <Textarea
              placeholder="Paste the job description here to get targeted recommendations..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {uploadedFile && (
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze CV"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {isAnalyzing && (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Your CV</h3>
            <p className="text-muted-foreground">
              Our AI is reviewing your CV and generating insights...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {showResults && !isAnalyzing && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Overall CV Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-primary">
                  {cvAnalysis.overallScore}
                </div>
                <div className="flex-1">
                  <Progress value={cvAnalysis.overallScore} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {cvAnalysis.overallScore >= 80 ? "Excellent" : 
                     cvAnalysis.overallScore >= 60 ? "Good" : "Needs Improvement"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Analysis */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span>Section Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cvAnalysis.sections.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(section.status)}
                    <div>
                      <h4 className="font-medium">{section.name}</h4>
                      <p className="text-sm text-muted-foreground">{section.feedback}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                      {section.score}%
                    </div>
                    <Progress value={section.score} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Keywords Analysis */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Keywords Analysis</span>
              </CardTitle>
              <CardDescription>
                Keywords help your CV get noticed by ATS systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Keyword Match Score</span>
                <span className={`font-bold ${getScoreColor(cvAnalysis.keywords.score)}`}>
                  {cvAnalysis.keywords.score}%
                </span>
              </div>
              <Progress value={cvAnalysis.keywords.score} />
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">Found Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {cvAnalysis.keywords.found.map((keyword, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-100">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-yellow-600">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {cvAnalysis.keywords.missing.map((keyword, index) => (
                      <Badge key={index} className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
              <CardDescription>
                Here are specific recommendations to enhance your CV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cvAnalysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button className="bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Analyze Another CV
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}