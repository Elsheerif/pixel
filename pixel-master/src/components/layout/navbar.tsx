'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Loader, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React, { useState, useContext } from 'react';
import { cartContext } from '@/contexts/cartContext';
import { signOut, useSession } from 'next-auth/react';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount = 0, isLoaded } = useContext(cartContext);
  const { data, status } = useSession();

  const navItems = [
    { href: '/products', label: 'Products' },
    { href: '/brands', label: 'Brands' },
    { href: '/categories', label: 'Categories' },
  ];

  // Check if the current page is sign-in or sign-up
  const isAuthPage = pathname === '/auth/signin' || pathname === '/auth/signup';

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto px-2 sm:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center ml-2 sm:ml-3 space-x-1">
            <img src="/logo.png" alt="Pixel" className="h-9 w-9 sm:h-10 sm:w-10" />
            <span className="font-bold text-lg sm:text-xl md:text-2xl">Pixel</span>
          </Link>

          {/* Center: Desktop Navigation (absolute true center) */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-1">
                {navItems.map((navItem) => {
                  const isActive =
                    pathname === navItem.href || pathname.startsWith(navItem.href + '/');
                  return (
                    <NavigationMenuItem key={navItem.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={navItem.href}
                          className={cn(
                            'group inline-flex h-9 items-center justify-center rounded-md px-3 sm:px-4 py-2 text-sm md:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500',
                            isActive
                              ? 'bg-orange-500 text-primary-foreground shadow-md font-semibold'
                              : 'bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                          )}
                        >
                          {navItem.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2 mr-1 sm:mr-2">
            {status === 'loading' ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Loading authentication status"
                className="h-8 w-8"
                disabled
              >
                <Loader className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                <span className="sr-only">Loading</span>
              </Button>
            ) : status === 'authenticated' && data?.user ? (
              <>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <p className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px]">
                    Hi, {data.user.name || 'User'}
                  </p>
                </div>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8"
                    aria-label={`Shopping cart with ${cartCount} items`}
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="absolute bg-orange-500 top-0 -right-0.5 w-5 h-5 sm:w-4 sm:h-4 rounded-full text-xs text-white flex items-center justify-center">
                      {isLoaded ? (cartCount >= 99 ? '99+' : cartCount) : (
                        <Loader className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                      )}
                    </span>
                    <span className="sr-only">Shopping cart</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Logout"
                  className="h-8 w-8"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </>
            ) : !isAuthPage ? (
              <Link href="/auth/signin">
                <Button
                  variant="ghost"
                  className="bg-orange-200 hover:bg-orange-100 text-xs sm:text-sm px-2 sm:px-3"
                >
                  Sign In
                </Button>
              </Link>
            ) : null}
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-16 border-t bg-background shadow-lg transition-all duration-300 ease-in-out">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((navItem) => {
                  const isActive =
                    pathname === navItem.href || pathname.startsWith(navItem.href + '/');
                  return (
                    <Link
                      key={navItem.href}
                      href={navItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500',
                        isActive
                          ? 'bg-orange-500 text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
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
    </header>
  );
}