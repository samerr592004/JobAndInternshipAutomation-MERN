import { useState } from "react";
import { 
  BarChart3, 
  Briefcase, 
  FileText, 
  HelpCircle, 
  Inbox, 
  Languages, 
  LayoutDashboard, 
  Menu, 
  Settings, 
  Target, 
  User, 
  Users,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Loops", href: "/dashboard/loops", icon: Target },
  { name: "Board", href: "/dashboard/board", icon: BarChart3 },
  { name: "All Matches", href: "/dashboard/matches", icon: Users },
  { name: "My Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Questions", href: "/dashboard/questions", icon: HelpCircle },
  { name: "CV Checker", href: "/dashboard/cv-checker", icon: Briefcase },
  { name: "Inbox", href: "/dashboard/inbox", icon: Inbox },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
        <Logo size="md" />
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.href);
                setIsMobileOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-smooth",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-card"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <HelpCircle className="h-5 w-5" />
          HELP - FAQ
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <Languages className="h-5 w-5" />
          SELECT LANGUAGE
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-sidebar border border-sidebar-border shadow-card"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Desktop sidebar */}
      <aside className={cn("hidden md:block w-64 shrink-0", className)}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 md:hidden">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}