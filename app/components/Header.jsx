"use client";

import { Home, Building, Info } from "lucide-react";
import { TubelightNavbar } from "./TubelightNavbar";

// The navItems array no longer includes the "Login" link
const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Departments", url: "/departments", icon: Building },
  { name: "About", url: "/about", icon: Info },
];

export default function Header() {
  return <TubelightNavbar items={navItems} />;
}

