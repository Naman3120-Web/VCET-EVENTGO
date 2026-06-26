"use client";

import { Home, Building, Info, LogIn } from "lucide-react";
import { TubelightNavbar } from "./TubelightNavbar";


const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Departments", url: "/departments", icon: Building },
  { name: "About", url: "/about", icon: Info },
  {name:"Login",url:"/login", icon: LogIn }
];

export default function Header() {
  return <TubelightNavbar items={navItems} />;
}

