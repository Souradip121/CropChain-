
import { Card, CardContent } from '@/components/ui/card';
import { Coins, FileLock, Wallet, ShoppingBag, LayoutDashboard, BarChart3, FileText, Shield } from 'lucide-react';

export function Features() {
  const features = [
    {
      title: 'Yield-Backed Tokens',
      description: 'Invest in tokenized agricultural yields without owning the farmland.',
      icon: <Coins className="h-10 w-10 text-cropchain-green" />,
    },
    {
      title: 'Smart Contracts',
      description: 'Secure, transparent contracts define token distribution and yield claims.',
      icon: <FileLock className="h-10 w-10 text-cropchain-green" />,
    },
    {
      title: 'Wallet Integration',
      description: 'Connect your cryptocurrency wallet for secure, efficient transactions.',
      icon: <Wallet className="h-10 w-10 text-cropchain-green" />,
    },
    {
      title: 'Marketplace',
      description: 'Buy, sell, and trade yield-backed tokens with ease on our platform.',
      icon: <ShoppingBag className="h-10 w-10 text-cropchain-green" />,
    },
    {
      title: 'User Dashboards',
      description: 'Specialized interfaces for both farmers and investors to manage assets.',
      icon: <LayoutDashboard className="h-10 w-10 text-cropchain-green" />,
    },
    {
      title: 'Yield Analytics',
      description: 'Track and analyze historical and projected yields with powerful tools.',
      icon: <BarChart3 className="h-10 w-10 text-cropchain-green" />,
    },
    {
      title: 'Transparent Reporting',
      description: 'Real-time updates on crop status and farming progress.',
      icon: <FileText className="h-10 w-10 text-cropchain-green" />,
    },
    {
      title: 'Risk Management',
      description: 'Insurance-like features protect investors against failed yields.',
      icon: <Shield className="h-10 w-10 text-cropchain-green" />,
    },
  ];

  return (
    <section className="bg-cropchain-beige dark:bg-cropchain-dark py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-cropchain-green/5 blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-cropchain-blue/5 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cropchain-green/10 border border-cropchain-green/20">
            <span className="text-sm font-medium text-cropchain-green">Why Choose CropChain</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white">
            Connecting Farmers and Investors Through Blockchain
          </h2>
          <p className="mt-4 text-lg text-cropchain-medium max-w-2xl mx-auto">
            Our platform reimagines agricultural investment with tokenized crop yields, 
            creating opportunities for both farmers and investors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-cropchain-gray/20 bg-white/80 dark:bg-cropchain-dark/80 backdrop-blur-sm shadow-soft card-hover"
            >
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-lg bg-cropchain-green/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2 text-cropchain-dark dark:text-white">{feature.title}</h3>
                <p className="text-cropchain-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 p-6 rounded-2xl glass-effect shadow-soft border border-cropchain-gray/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <h3 className="text-2xl font-medium mb-4 text-cropchain-dark dark:text-white">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cropchain-green flex items-center justify-center text-white font-medium">1</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-cropchain-dark dark:text-white">Farmers Tokenize Yields</h4>
                    <p className="text-cropchain-medium">Agricultural producers create tokens representing portions of their expected harvest.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cropchain-green flex items-center justify-center text-white font-medium">2</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-cropchain-dark dark:text-white">Investors Purchase Tokens</h4>
                    <p className="text-cropchain-medium">Investors buy tokens on the marketplace, providing capital to farmers.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cropchain-green flex items-center justify-center text-white font-medium">3</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-cropchain-dark dark:text-white">Smart Contracts Secure Terms</h4>
                    <p className="text-cropchain-medium">Blockchain contracts establish agreement terms between parties.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cropchain-green flex items-center justify-center text-white font-medium">4</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-cropchain-dark dark:text-white">Returns Distributed at Harvest</h4>
                    <p className="text-cropchain-medium">When crops are harvested, investors receive returns based on yield.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-cropchain-gray/50 dark:bg-cropchain-dark/50 rounded-lg p-6">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-cropchain-green/20 to-cropchain-blue/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-cropchain-green" />
                    <h4 className="text-lg font-medium text-cropchain-dark dark:text-white">Projected Growth</h4>
                    <p className="text-cropchain-medium mb-4">Market expansion forecasted at 32% annually through 2026</p>
                    <div className="w-full bg-white/30 dark:bg-black/30 h-4 rounded-full overflow-hidden">
                      <div className="bg-cropchain-green h-4 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
