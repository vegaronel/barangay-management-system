import {
  Users,
  FileText,
  Shield,
  Bell,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export const FEATURES = [
  {
    icon: Users,
    title: "Resident Management",
    description:
      "Maintain comprehensive resident records, family profiles, and demographic data with easy search and filtering.",
  },
  {
    icon: FileText,
    title: "Document Issuance",
    description:
      "Generate certificates, clearances, permits, and other official documents with digital signatures and tracking.",
  },
  {
    icon: Bell,
    title: "Announcements",
    description:
      "Broadcast important community announcements, events, and emergency alerts to all residents instantly.",
  },
  {
    icon: Shield,
    title: "Incident Reporting",
    description:
      "Track and manage community incidents, complaints, and requests with proper documentation and follow-up.",
  },
  {
    icon: MapPin,
    title: "Geographic Mapping",
    description:
      "Visualize barangay boundaries, household locations, and community assets with interactive mapping tools.",
  },
  {
    icon: Calendar,
    title: "Event Management",
    description:
      "Plan, schedule, and manage community events, meetings, and programs with automated reminders.",
  },
];

export const STATS = [
  { value: "500+", label: "Barangays Served" },
  { value: "1M+", label: "Residents Managed" },
  { value: "50K+", label: "Documents Issued" },
  { value: "99.9%", label: "System Uptime" },
];

export const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#security" },
      { label: "Updates", href: "#updates" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "Training", href: "#training" },
      { label: "Help Center", href: "#help" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const CONTACT_INFO = [
  { icon: Phone, text: "+63 (02) 123-4567" },
  { icon: Mail, text: "support@barangayms.ph" },
  { icon: Clock, text: "24/7 Support" },
];

export const NAVIGATION_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "Stats", href: "#stats" },
  { label: "Get Started", href: "#cta" },
];

export const SERVICE_BENEFITS = [
  "Online document requests and processing",
  "Digital payment integration for fees",
  "Automated workflow and approval processes",
  "Real-time status tracking for residents",
];
