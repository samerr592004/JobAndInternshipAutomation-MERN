import { Menu, Bell, Search, Plus, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Menu and search */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-muted/50"
            />
          </div>
        </div>
      </div>

      {/* Right side - Actions and profile */}
      <div className="flex items-center space-x-3">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          NEW LOOP
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="w-5 h-5" />
        </Button>

        {/* User profile */}
        <div className="flex items-center space-x-3 ml-4">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">JD</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}