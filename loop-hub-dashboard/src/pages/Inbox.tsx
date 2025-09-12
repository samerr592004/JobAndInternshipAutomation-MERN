import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Reply, 
  Forward, 
  Archive,
  Star,
  MoreHorizontal,
  Search,
  Calendar,
  Building2,
  User
} from "lucide-react";

const emails = [
  {
    id: 1,
    from: "Sarah Johnson",
    company: "TechCorp Inc",
    subject: "Re: Frontend Developer Position - Next Steps",
    preview: "Thank you for your application. We'd like to schedule a technical interview...",
    timestamp: "2 hours ago",
    status: "unread",
    type: "interview",
    starred: false
  },
  {
    id: 2,
    from: "Mike Chen", 
    company: "StartupXYZ",
    subject: "Your Application Status Update",
    preview: "We've reviewed your application and would like to move forward with...",
    timestamp: "5 hours ago",
    status: "read",
    type: "update",
    starred: true
  },
  {
    id: 3,
    from: "HR Team",
    company: "MegaCorp",
    subject: "Offer Letter - Full Stack Engineer Position",
    preview: "Congratulations! We're pleased to extend an offer for the Full Stack...",
    timestamp: "1 day ago",
    status: "unread",
    type: "offer",
    starred: true
  },
  {
    id: 4,
    from: "Jennifer Smith",
    company: "InnovateTech", 
    subject: "Thank you for your interest",
    preview: "Thank you for applying to our Lead Developer position. After careful...",
    timestamp: "2 days ago",
    status: "read",
    type: "rejection",
    starred: false
  },
  {
    id: 5,
    from: "David Wilson",
    company: "NextGen Solutions",
    subject: "Screening Call Confirmation",
    preview: "This is to confirm our screening call scheduled for tomorrow at 2 PM...",
    timestamp: "3 days ago",
    status: "read",
    type: "screening",
    starred: false
  }
];

export default function Inbox() {
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [replyText, setReplyText] = useState("");

  const getEmailTypeBadge = (type: string) => {
    switch (type) {
      case "interview":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Interview</Badge>;
      case "offer":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Offer</Badge>;
      case "rejection":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejection</Badge>;
      case "screening":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Screening</Badge>;
      case "update":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Update</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "unread") return matchesSearch && email.status === "unread";
    if (filter === "starred") return matchesSearch && email.starred;
    return matchesSearch;
  });

  const unreadCount = emails.filter(email => email.status === "unread").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inbox</h1>
          <p className="text-muted-foreground">
            Manage communications from employers ({unreadCount} unread)
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Mail className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Email List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/50"
              />
            </div>
            
            <div className="flex space-x-2">
              {["all", "unread", "starred"].map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                  className="capitalize"
                >
                  {filterType}
                </Button>
              ))}
            </div>
          </div>

          {/* Email List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredEmails.map((email) => (
              <Card
                key={email.id}
                className={`cursor-pointer transition-colors ${
                  selectedEmail?.id === email.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                } ${email.status === "unread" ? "border-l-4 border-l-primary" : ""}`}
                onClick={() => setSelectedEmail(email)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{email.from}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {email.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {email.starred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate flex-1">
                        {email.subject}
                      </h4>
                      {getEmailTypeBadge(email.type)}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {email.preview}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {email.timestamp}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2">
          {selectedEmail ? (
            <div className="space-y-6">
              {/* Email Header */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{selectedEmail.subject}</CardTitle>
                      <CardDescription className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {selectedEmail.from}
                        </span>
                        <span className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          {selectedEmail.company}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedEmail.timestamp}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getEmailTypeBadge(selectedEmail.type)}
                      <Button variant="ghost" size="sm">
                        <Star className={`w-4 h-4 ${selectedEmail.starred ? "text-yellow-500 fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-sm leading-relaxed">
                      {selectedEmail.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                      commodo consequat.
                    </p>
                    <p className="text-sm leading-relaxed mt-4">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="text-sm leading-relaxed mt-4">
                      Please let me know if you have any questions or if you need any additional 
                      information from my side.
                    </p>
                    <p className="text-sm leading-relaxed mt-4">
                      Best regards,<br />
                      {selectedEmail.from}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Reply Section */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Reply</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </Button>
                      <Button variant="outline" size="sm">
                        <Forward className="w-4 h-4 mr-2" />
                        Forward
                      </Button>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Reply className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-card border-border h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select an email</h3>
                <p className="text-muted-foreground">
                  Choose an email from the list to view its contents
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}