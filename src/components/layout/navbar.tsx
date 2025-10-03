"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import React, { useState, useContext, useEffect } from "react";
import { cartContext } from "@/contexts/cartContext";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "../shared";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, isLoaded } = useContext(cartContext);
  const { data, status } = useSession();


  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <header className="sticky top-0 z-50 h-18 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center ml-2 space-x-1">
            <img src="/logo.png" alt="Pixel" className="h-11 w-11" />
            <span className="font-bold text-2xl">Pixel</span>
          </Link>

          {/* Center: Desktop Navigation (absolute true center) */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((navItem) => {
                  const isActive =
                    pathname === navItem.href || pathname.startsWith(navItem.href);
                  return (
                    <NavigationMenuItem key={navItem.href}>
                      <NavigationMenuLink
                        href={navItem.href}
                        className={cn(
                          "group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-md font-medium transition-all duration-200 focus:outline-none",
                          isActive
                            ? "bg-orange-500 text-primary-foreground shadow-md font-semibold"
                            : "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        {navItem.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center space-x-2 mr-2">
            {status === "loading" ? <LoadingSpinner /> : status === "authenticated" ? (
              <>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute bg-orange-500 top-1 -right-1 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center">
                      {isLoaded ? (cartCount >= 99 ? "99+" : cartCount) : ""}
                    </span>
                    <span className="sr-only">Shopping cart</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
            )}



            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 border-t bg-background">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((navItem) => {
                  const isActive =
                    pathname === navItem.href || pathname.startsWith(navItem.href);
                  return (
                    <Link
                      key={navItem.href}
                      href={navItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-orange-500 text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      {navItem.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header >
  );
}
