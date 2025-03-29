'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-cropchain-light dark:bg-cropchain-dark py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-5 -top-5 h-64 w-64 rounded-full bg-cropchain-green/10 blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-cropchain-blue/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cropchain-green/10 border border-cropchain-green/20">
                <span className="text-sm font-medium text-cropchain-green">Revolutionizing Agriculture</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-balance max-w-xl text-cropchain-dark dark:text-white">
                <span className="text-cropchain-green">Tokenized</span> Agricultural Yield
              </h1>
              <p className="mt-4 md:mt-6 text-lg md:text-xl leading-relaxed text-cropchain-medium max-w-xl">
                CropChain connects farmers and investors through blockchain technology,
                creating a transparent marketplace for trading tokenized crop yields.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/marketplace">
                <Button
                  className="w-full sm:w-auto px-8 py-6 text-base bg-cropchain-green hover:bg-cropchain-green/90 text-white"
                >
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/farmer-dashboard">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-6 text-base border-cropchain-gray/50 hover:bg-cropchain-gray/20 text-cropchain-medium"
                >
                  I'm a Farmer
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cropchain-gray/30">
              <div>
                <p className="text-3xl font-semibold text-cropchain-dark dark:text-white">2,800+</p>
                <p className="text-sm text-cropchain-medium">Tokenized Yields</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-cropchain-dark dark:text-white">$18M+</p>
                <p className="text-sm text-cropchain-medium">Value Traded</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-cropchain-dark dark:text-white">650+</p>
                <p className="text-sm text-cropchain-medium">Active Farmers</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-cropchain-green/20 blur-3xl animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 p-4">
              <div className="glass-effect rounded-2xl overflow-hidden shadow-glass">
                <div className="flex items-center justify-between bg-cropchain-green p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <span className="text-cropchain-green font-semibold">C</span>
                    </div>
                    <span className="ml-3 text-white font-medium">CropChain Token</span>
                  </div>
                  <span className="text-white/80 text-sm">WHEAT24</span>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-cropchain-medium">Kansas Wheat Yield</p>
                      <p className="text-xl font-semibold">100 Tokens</p>
                    </div>
                    <div className="h-16 w-16 rounded-lg bg-cropchain-green/10 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V18M18 12H6" stroke="#3CAB5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-cropchain-gray/50 p-3">
                      <p className="text-xs text-cropchain-medium">Token Price</p>
                      <p className="text-base font-semibold">$0.018</p>
                    </div>
                    <div className="rounded-lg bg-cropchain-gray/50 p-3">
                      <p className="text-xs text-cropchain-medium">Est. Return</p>
                      <p className="text-base font-semibold text-cropchain-green">6-8%</p>
                    </div>
                    <div className="rounded-lg bg-cropchain-gray/50 p-3">
                      <p className="text-xs text-cropchain-medium">Harvest Date</p>
                      <p className="text-base font-semibold">Jul 2024</p>
                    </div>
                    <div className="rounded-lg bg-cropchain-gray/50 p-3">
                      <p className="text-xs text-cropchain-medium">Risk Level</p>
                      <p className="text-base font-semibold">Medium</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-cropchain-green-light p-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Total Value</p>
                      <p className="text-lg font-semibold text-cropchain-green">$1,800</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 glass-effect rounded-2xl p-4 w-40 shadow-glass transform rotate-6 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-cropchain-blue flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">C</span>
                  </div>
                  <span className="text-sm font-medium">CORN24</span>
                </div>
                <p className="mt-2 text-xs text-cropchain-medium">Projected Yield</p>
                <p className="text-base font-semibold">180 bu/acre</p>
              </div>

              <div className="absolute -top-10 -left-10 glass-effect rounded-2xl p-4 w-36 shadow-glass transform -rotate-6 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-cropchain-green flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">C</span>
                  </div>
                  <span className="text-sm font-medium">SOY24</span>
                </div>
                <p className="mt-2 text-xs text-cropchain-medium">Risk Level</p>
                <p className="text-base font-semibold">Low</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
