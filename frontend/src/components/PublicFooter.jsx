import { Shield } from "lucide-react";
import { Link } from "react-router";
import { FOOTER_SECTIONS, CONTACT_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">BarangayMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting communities with accessible digital services. Making
              barangay governance transparent, efficient, and resident-friendly.
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col space-y-3">
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <div className="flex flex-col space-y-2 text-sm">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold">Contact Info</h4>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              {CONTACT_INFO.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <div
                    key={contact.text}
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{contact.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 BarangayMS. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
