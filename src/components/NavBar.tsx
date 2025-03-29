'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import WalletConnect from '@/components/WalletConnect';
import { useWalletConnection } from '@/utils/web3';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isConnected } = useWalletConnection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10',
        isScrolled
          ? 'py-3 bg-white/80 dark:bg-cropchain-dark/80 backdrop-blur-md shadow-sm'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-display font-semibold tracking-tight text-cropchain-dark dark:text-white flex items-center"
        >
          <div className="w-10 h-10 mr-2 rounded-lg bg-cropchain-green flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          CropChain
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/"
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              isActive('/')
                ? 'text-cropchain-green'
                : 'text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white'
            )}
          >
            Home
          </Link>
          <Link
            href="/marketplace"
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              isActive('/marketplace')
                ? 'text-cropchain-green'
                : 'text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white'
            )}
          >
            Marketplace
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center',
                  (isActive('/farmer-dashboard') || isActive('/investor-dashboard'))
                    ? 'text-cropchain-green'
                    : 'text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white'
                )}
              >
                Dashboard <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  href="/farmer-dashboard"
                  className={cn(
                    'w-full px-4 py-2 text-sm',
                    isActive('/farmer-dashboard') && 'font-medium text-cropchain-green'
                  )}
                >
                  Farmer Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/investor-dashboard"
                  className={cn(
                    'w-full px-4 py-2 text-sm',
                    isActive('/investor-dashboard') && 'font-medium text-cropchain-green'
                  )}
                >
                  Investor Dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <WalletConnect />

          {isConnected && (
            <Link href="/investor-dashboard">
              <Button variant="outline" className="border-cropchain-gray hover:bg-cropchain-gray/30">
                My Portfolio
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <WalletConnect />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-effect border-t border-cropchain-gray/30 py-4 px-6 flex flex-col space-y-4 animate-slide-up">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'px-4 py-3 rounded-md text-sm font-medium transition-colors',
              isActive('/') ? 'bg-cropchain-green-light text-cropchain-green' : 'hover:bg-cropchain-gray/50'
            )}
          >
            Home
          </Link>
          <Link
            href="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'px-4 py-3 rounded-md text-sm font-medium transition-colors',
              isActive('/marketplace') ? 'bg-cropchain-green-light text-cropchain-green' : 'hover:bg-cropchain-gray/50'
            )}
          >
            Marketplace
          </Link>
          <Link
            href="/farmer-dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'px-4 py-3 rounded-md text-sm font-medium transition-colors',
              isActive('/farmer-dashboard') ? 'bg-cropchain-green-light text-cropchain-green' : 'hover:bg-cropchain-gray/50'
            )}
          >
            Farmer Dashboard
          </Link>
          <Link
            href="/investor-dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'px-4 py-3 rounded-md text-sm font-medium transition-colors',
              isActive('/investor-dashboard') ? 'bg-cropchain-green-light text-cropchain-green' : 'hover:bg-cropchain-gray/50'
            )}
          >
            Investor Dashboard
          </Link>

          {isConnected && (
            <Link
              href="/investor-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="outline" className="w-full border-cropchain-gray hover:bg-cropchain-gray/30">
                My Portfolio
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default NavBar;
