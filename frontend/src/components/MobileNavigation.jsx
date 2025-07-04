"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Shield,
  Home,
  FileText,
  Users,
  Phone,
  Bell,
  MapPin,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const MOBILE_MENU_ITEMS = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "Features", href: "#features", icon: FileText },
  { label: "Services", href: "#services", icon: Users },
  { label: "Stats", href: "#stats", icon: Bell },
  { label: "Get Started", href: "#cta", icon: Phone },
];

const QUICK_ACTIONS = [
  {
    label: "Documents",
    icon: FileText,
    href: "#documents",
    color: "bg-blue-500",
  },
  { label: "Report Issue", icon: Shield, href: "#report", color: "bg-red-500" },
  { label: "Events", icon: Bell, href: "#events", color: "bg-green-500" },
  { label: "Map", icon: MapPin, href: "#map", color: "bg-purple-500" },
];

export function MobileNav({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handler for /login and other route links
  const handleRoute = (e, to) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== to) {
      navigate(to);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden relative">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 pb-4 bg-gradient-to-r from-primary/5 to-primary/10">
            <SheetTitle className="flex items-center space-x-3 text-left">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">MyBarangay</span>
                <span className="text-sm text-muted-foreground font-normal">
                  Digital Community
                </span>
              </div>
            </SheetTitle>
            <SheetDescription className="text-left text-sm">
              Access barangay services and stay connected with your community.
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Navigation Links */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Navigation
              </h3>
              {MOBILE_MENU_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setOpen(false);
                      if (onNavigate) onNavigate(e, item.href);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground group"
                  >
                    <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <Separator />

            {/* Quick Actions Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_ACTIONS.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <a
                      key={action.href}
                      href={action.href}
                      onClick={(e) => {
                        setOpen(false);
                        if (onNavigate) onNavigate(e, action.href);
                      }}
                      className="flex flex-col items-center space-y-2 p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-accent/50 transition-all group"
                    >
                      <div
                        className={`p-3 rounded-full ${action.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}
                      >
                        <IconComponent
                          className={`h-5 w-5 text-current`}
                          style={{
                            color: action.color
                              .replace("bg-", "")
                              .replace("-500", ""),
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-center">
                        {action.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Auth Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full justify-start h-12"
                onClick={(e) => handleRoute(e, "/")}
              >
                <FileText className="mr-3 h-5 w-5" />
                Get Started
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12 bg-transparent"
                onClick={(e) => handleRoute(e, "/login")}
              >
                <Users className="mr-3 h-5 w-5" />
                Login to Account
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 border-t bg-muted/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Need Help?</h4>
                <Badge variant="secondary" className="text-xs">
                  24/7
                </Badge>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <span>Hotline: 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>barangay@community.ph</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
