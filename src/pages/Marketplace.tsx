
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import TokenCard from '@/components/TokenCard';
import { fetchAvailableTokens, TokenData, useWalletConnection } from '@/utils/web3';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowUpDown, Loader2 } from 'lucide-react';

const Marketplace = () => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'yield' | 'date' | 'risk'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [cropTypeFilter, setCropTypeFilter] = useState<string>('all');
  const [riskLevelFilter, setRiskLevelFilter] = useState<string>('all');
  const { toast } = useToast();
  const { isConnected } = useWalletConnection();

  // Load tokens on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    loadTokens();
  }, []);

  const loadTokens = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAvailableTokens();
      setTokens(data);
      setFilteredTokens(data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      toast({
        title: "Failed to load tokens",
        description: "Could not fetch available tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    let result = [...tokens];
    
    // Apply crop type filter
    if (cropTypeFilter !== 'all') {
      result = result.filter(token => token.cropType === cropTypeFilter);
    }
    
    // Apply risk level filter
    if (riskLevelFilter !== 'all') {
      result = result.filter(token => token.riskLevel === riskLevelFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(token => 
        token.name.toLowerCase().includes(query) || 
        token.symbol.toLowerCase().includes(query) ||
        token.location.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'yield':
          comparison = a.projectedYield - b.projectedYield;
          break;
        case 'date':
          comparison = new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime();
          break;
        case 'risk':
          const riskOrder: Record<string, number> = { 'Low': 1, 'Medium': 2, 'High': 3 };
          comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredTokens(result);
  }, [tokens, searchQuery, sortBy, sortOrder, cropTypeFilter, riskLevelFilter]);

  // Handle token purchase
  const handleTokenPurchase = (token: TokenData, amount: number) => {
    // In a real app, this would update the token's availableSupply
    const updatedTokens = tokens.map(t => {
      if (t.id === token.id) {
        return {
          ...t,
          availableSupply: t.availableSupply - amount
        };
      }
      return t;
    });
    
    setTokens(updatedTokens);
    
    toast({
      title: "Purchase Successful",
      description: `You have purchased ${amount} ${token.symbol} tokens.`,
    });
  };

  // Get unique crop types for filter
  const cropTypes = ['all', ...new Set(tokens.map(token => token.cropType))];
  
  // Get unique risk levels for filter
  const riskLevels = ['all', ...new Set(tokens.map(token => token.riskLevel))];

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white mb-4">
              Yield Token Marketplace
            </h1>
            <p className="text-lg text-cropchain-medium max-w-2xl">
              Browse and purchase tokens representing agricultural yields from various crops and locations.
            </p>
          </div>
          
          {/* Filters and Search Section */}
          <div className="mb-8 bg-white dark:bg-cropchain-dark rounded-xl shadow-soft p-4 border border-cropchain-gray/30">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-cropchain-medium" />
                </div>
                <Input
                  type="text"
                  placeholder="Search tokens by name, symbol, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-cropchain-gray/30 border-cropchain-gray/30"
                />
              </div>
              
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <Select value={cropTypeFilter} onValueChange={setCropTypeFilter}>
                    <SelectTrigger className="bg-cropchain-gray/30 border-cropchain-gray/30">
                      <SelectValue placeholder="Crop Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'All Crop Types' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-1/2">
                  <Select value={riskLevelFilter} onValueChange={setRiskLevelFilter}>
                    <SelectTrigger className="bg-cropchain-gray/30 border-cropchain-gray/30">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {riskLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level === 'all' ? 'All Risk Levels' : level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                  <SelectTrigger className="bg-cropchain-gray/30 border-cropchain-gray/30">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="yield">Projected Yield</SelectItem>
                    <SelectItem value="date">Harvest Date</SelectItem>
                    <SelectItem value="risk">Risk Level</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="bg-cropchain-gray/30 border-cropchain-gray/30"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Active filters */}
            {(cropTypeFilter !== 'all' || riskLevelFilter !== 'all' || searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {cropTypeFilter !== 'all' && (
                  <Badge variant="outline" className="bg-cropchain-green-light text-cropchain-green border-cropchain-green/20">
                    Crop: {cropTypeFilter}
                    <button 
                      className="ml-2 hover:text-cropchain-dark"
                      onClick={() => setCropTypeFilter('all')}
                    >
                      ×
                    </button>
                  </Badge>
                )}
                
                {riskLevelFilter !== 'all' && (
                  <Badge variant="outline" className="bg-cropchain-blue-light text-cropchain-blue border-cropchain-blue/20">
                    Risk: {riskLevelFilter}
                    <button 
                      className="ml-2 hover:text-cropchain-dark"
                      onClick={() => setRiskLevelFilter('all')}
                    >
                      ×
                    </button>
                  </Badge>
                )}
                
                {searchQuery && (
                  <Badge variant="outline" className="bg-cropchain-gray/40 border-cropchain-gray/30">
                    Search: "{searchQuery}"
                    <button 
                      className="ml-2 hover:text-cropchain-dark"
                      onClick={() => setSearchQuery('')}
                    >
                      ×
                    </button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setCropTypeFilter('all');
                    setRiskLevelFilter('all');
                    setSearchQuery('');
                  }}
                  className="text-cropchain-medium hover:text-cropchain-dark text-xs"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-cropchain-green" />
                <span className="ml-2 text-cropchain-medium">Loading available tokens...</span>
              </div>
            ) : filteredTokens.length > 0 ? (
              <Tabs defaultValue="grid" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-cropchain-medium">
                    Showing {filteredTokens.length} {filteredTokens.length === 1 ? 'token' : 'tokens'}
                  </p>
                  <TabsList className="grid grid-cols-2 w-[160px]">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTokens.map((token) => (
                      <TokenCard 
                        key={token.id} 
                        token={token} 
                        onPurchase={isConnected ? handleTokenPurchase : undefined}
                        viewOnly={!isConnected}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4">
                    {filteredTokens.map((token) => (
                      <div 
                        key={token.id} 
                        className="flex flex-col md:flex-row bg-white dark:bg-cropchain-dark rounded-xl shadow-soft border border-cropchain-gray/30 overflow-hidden hover:shadow-hover transition-all duration-300"
                      >
                        <div className="w-full md:w-48 h-48 md:h-auto">
                          <img 
                            src={token.image || `https://source.unsplash.com/500x500/?${token.cropType.toLowerCase()},farm`} 
                            alt={token.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-4 flex-grow flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge className="bg-cropchain-green text-white hover:bg-cropchain-green/90">
                                  {token.cropType}
                                </Badge>
                                <Badge className={token.riskLevel === 'Low' 
                                  ? 'bg-green-100 text-green-800' 
                                  : token.riskLevel === 'Medium' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'
                                }>
                                  {token.riskLevel} Risk
                                </Badge>
                              </div>
                              <h3 className="text-lg font-medium">{token.name}</h3>
                              <p className="text-sm text-cropchain-medium">{token.symbol}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-cropchain-green">${token.price.toFixed(3)}</p>
                              <p className="text-xs text-cropchain-medium">per token</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                            <div>
                              <p className="text-xs text-cropchain-medium">Yield</p>
                              <p className="font-medium">{token.projectedYield} bu/acre</p>
                            </div>
                            <div>
                              <p className="text-xs text-cropchain-medium">Harvest Date</p>
                              <p className="font-medium">{new Date(token.harvestDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-cropchain-medium">Location</p>
                              <p className="font-medium">{token.location.split(',')[0]}</p>
                            </div>
                            <div>
                              <p className="text-xs text-cropchain-medium">Available</p>
                              <p className="font-medium">{token.availableSupply.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-auto flex space-x-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 md:flex-none border-cropchain-gray/50 hover:bg-cropchain-gray/20"
                              onClick={() => {/* Open details */}}
                            >
                              View Details
                            </Button>
                            
                            {isConnected && (
                              <Button
                                variant="default"
                                size="sm"
                                className="flex-1 md:flex-none bg-cropchain-green hover:bg-cropchain-green/90 text-white"
                                onClick={() => {/* Open purchase dialog */}}
                              >
                                Buy Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-20 bg-cropchain-gray/30 rounded-xl">
                <Filter className="h-12 w-12 mx-auto text-cropchain-medium mb-4" />
                <h3 className="text-xl font-medium mb-2">No tokens found</h3>
                <p className="text-cropchain-medium max-w-md mx-auto">
                  No tokens match your current filters. Try adjusting your search criteria or clear filters to see all available tokens.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-cropchain-gray/50 hover:bg-cropchain-gray/20"
                  onClick={() => {
                    setCropTypeFilter('all');
                    setRiskLevelFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Connection Prompt (if not connected) */}
      {!isConnected && (
        <div className="bg-cropchain-green-light dark:bg-cropchain-green/10 py-6 border-t border-cropchain-green/20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium">Connect your wallet to start trading</h3>
                <p className="text-cropchain-medium">You need to connect a wallet to purchase tokens.</p>
              </div>
              <Button className="bg-cropchain-green hover:bg-cropchain-green/90 text-white">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
