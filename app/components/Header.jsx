"use client";

import { Home, LogIn, Building, Info } from "lucide-react";
import { TubelightNavbar } from "./TubelightNavbar";

export default function Header() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Departments", url: "/departments", icon: Building },
    { name: "About", url: "/about", icon: Info },
    { name: "Login", url: "/login", icon: LogIn },
  ];

  return <TubelightNavbar items={navItems} />;
}

