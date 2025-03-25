
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <Hero />
        <Features />
        
        {/* How It Works Section (condensed version) */}
        <section className="py-20 bg-white dark:bg-cropchain-dark">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cropchain-blue/10 border border-cropchain-blue/20">
                <span className="text-sm font-medium text-cropchain-blue">Transforming Agriculture</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white">
                Connecting Farmers and Investors
              </h2>
              <p className="mt-4 text-lg text-cropchain-medium max-w-2xl mx-auto">
                CropChain opens new funding channels for farmers while providing investors with 
                unique exposure to agricultural yields.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-cropchain-gray/30 dark:bg-cropchain-dark/60">
                <div className="w-16 h-16 rounded-full bg-cropchain-green-light flex items-center justify-center mb-4">
                  <span className="text-2xl font-semibold text-cropchain-green">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">For Farmers</h3>
                <p className="text-cropchain-medium mb-4">
                  Access new capital without debt. Tokenize your future harvest and sell shares directly to investors.
                </p>
                <Link to="/farmer-dashboard" className="mt-auto">
                  <Button variant="outline" className="border-cropchain-gray/50 hover:bg-cropchain-gray/20">
                    Farmer Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-cropchain-gray/30 dark:bg-cropchain-dark/60">
                <div className="w-16 h-16 rounded-full bg-cropchain-blue-light flex items-center justify-center mb-4">
                  <span className="text-2xl font-semibold text-cropchain-blue">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">For Investors</h3>
                <p className="text-cropchain-medium mb-4">
                  Diversify your portfolio with agricultural assets. Purchase tokens representing future crop yields.
                </p>
                <Link to="/investor-dashboard" className="mt-auto">
                  <Button variant="outline" className="border-cropchain-gray/50 hover:bg-cropchain-gray/20">
                    Investor Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-cropchain-gray/30 dark:bg-cropchain-dark/60">
                <div className="w-16 h-16 rounded-full bg-cropchain-green-light flex items-center justify-center mb-4">
                  <span className="text-2xl font-semibold text-cropchain-green">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Marketplace</h3>
                <p className="text-cropchain-medium mb-4">
                  Browse available tokens, analyze yields, and trade agricultural assets with ease.
                </p>
                <Link to="/marketplace" className="mt-auto">
                  <Button variant="outline" className="border-cropchain-gray/50 hover:bg-cropchain-gray/20">
                    Explore Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-cropchain-green-light dark:bg-cropchain-green/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="glass-effect rounded-2xl p-8 md:p-12 shadow-glass overflow-hidden relative">
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cropchain-green/20 blur-3xl"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                <div className="lg:col-span-3">
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white">
                    Ready to transform agricultural investment?
                  </h2>
                  <p className="mt-4 text-lg text-cropchain-medium">
                    Join our platform today to tokenize your crop yields or invest in agricultural futures.
                  </p>
                </div>
                
                <div className="lg:col-span-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link to="/marketplace" className="w-full">
                    <Button 
                      className="w-full px-8 py-6 text-base bg-cropchain-green hover:bg-cropchain-green/90 text-white"
                    >
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/farmer-dashboard" className="w-full">
                    <Button 
                      variant="outline"
                      className="w-full px-8 py-6 text-base border-cropchain-gray/50 hover:bg-cropchain-gray/20 text-cropchain-medium"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-cropchain-dark py-12 border-t border-cropchain-gray/20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <Link 
                  to="/" 
                  className="text-xl font-display font-semibold text-cropchain-dark dark:text-white flex items-center"
                >
                  <div className="w-8 h-8 mr-2 rounded-lg bg-cropchain-green flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  CropChain
                </Link>
                <p className="mt-4 text-sm text-cropchain-medium">
                  Revolutionizing agricultural investment with tokenized crop yields.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4 text-cropchain-dark dark:text-white">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/marketplace" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">Marketplace</Link>
                  </li>
                  <li>
                    <Link to="/farmer-dashboard" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">Farmer Tools</Link>
                  </li>
                  <li>
                    <Link to="/investor-dashboard" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">Investor Dashboard</Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4 text-cropchain-dark dark:text-white">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">Documentation</a>
                  </li>
                  <li>
                    <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">FAQ</a>
                  </li>
                  <li>
                    <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">Blog</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4 text-cropchain-dark dark:text-white">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">Terms of Service</a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-cropchain-gray/20 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-cropchain-medium">© {new Date().getFullYear()} CropChain. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-cropchain-medium hover:text-cropchain-dark dark:hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
