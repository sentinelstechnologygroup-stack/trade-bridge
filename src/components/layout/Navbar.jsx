// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const mainLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "U.S. Product Sourcing", path: "/us-product-sourcing" },
      { label: "Export Coordination", path: "/export-coordination" },
      { label: "Sri Lanka Trade Lane", path: "/sri-lanka-trade-lane" },
      { label: "Import & Wholesale", path: "/import-wholesale" },
    ],
  },
  { label: "Product Categories", path: "/product-categories" },
  { label: "How It Works", path: "/how-it-works" },
  {
    label: "For Partners",
    path: "#",
    children: [
      { label: "For Sri Lanka Buyers", path: "/for-sri-lanka-buyers" },
      { label: "For U.S. Suppliers", path: "/for-us-suppliers" },
    ],
  },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navTextClass = scrolled
    ? "text-slate-900 hover:text-amber-700"
    : "text-white/90 hover:text-amber-300";

  const activeTextClass = scrolled
    ? "text-amber-700"
    : "text-amber-300";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-sm">
              <span className="text-slate-950 font-bold text-sm">TC</span>
            </div>

            <div className="hidden sm:block">
              <span
                className={`font-display font-semibold text-lg leading-tight ${
                  scrolled ? "text-slate-950" : "text-white"
                }`}
              >
                TradeConnect
              </span>
              <span
                className={`block text-[10px] tracking-widest uppercase ${
                  scrolled ? "text-slate-500" : "text-white/55"
                }`}
              >
                Houston · Sri Lanka
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {mainLinks.map((link) =>
                  link.children ? (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuTrigger
                        className={`bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-transparent data-[state=open]:bg-transparent ${
                          location.pathname === link.path ? activeTextClass : navTextClass
                        }`}
                      >
                        {link.label}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        <ul className="w-64 p-2 bg-white border border-slate-200 shadow-xl rounded-lg">
                          {link.children.map((child) => (
                            <li key={child.path}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={child.path}
                                  className="block px-3 py-2 text-sm text-slate-800 rounded-md hover:bg-amber-50 hover:text-amber-700 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.label}>
                      <Link
                        to={link.path}
                        className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                          location.pathname === link.path ? activeTextClass : navTextClass
                        }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link to="/request-quote">
              <Button className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold text-sm px-5 shadow-sm">
                Request a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={scrolled ? "text-slate-900" : "text-white"}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 p-0">
              <div className="p-6 border-b">
                <span className="font-display font-semibold text-lg">TradeConnect</span>
                <span className="block text-xs tracking-widest uppercase text-slate-500">
                  Houston · Sri Lanka
                </span>
              </div>

              <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
                {mainLinks.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <div>
                        <span className="block px-3 py-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                          {link.label}
                        </span>

                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-3 py-2 pl-6 text-sm rounded-md text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className="block px-3 py-2 text-sm font-medium rounded-md text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t">
                <Link to="/request-quote">
                  <Button className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold">
                    Request a Quote
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}