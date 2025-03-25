
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import TokenCard from '@/components/TokenCard';
import { useWalletConnection, fetchUserPortfolio, TokenData, fetchMarketTrends } from '@/utils/web3';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Loader2, ArrowRight, BarChart3, ArrowUpRight, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const InvestorDashboard = () => {
  const { isConnected, address } = useWalletConnection();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<{
    tokens: (TokenData & { amount: number })[];
    totalValue: number;
    projectedReturn: number;
  } | null>(null);
  const [marketTrends, setMarketTrends] = useState<{
    volumeData: { date: string; value: number }[];
    priceData: { date: string; value: number }[];
    popularTokens: string[];
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (isConnected && address) {
      loadInvestorData();
    } else {
      setIsLoading(false);
    }
  }, [isConnected, address]);

  const loadInvestorData = async () => {
    setIsLoading(true);
    try {
      // Load portfolio data
      const portfolioData = await fetchUserPortfolio(address || '');
      setPortfolio(portfolioData);
      
      // Load market trends
      const trendsData = await fetchMarketTrends();
      setMarketTrends(trendsData);
    } catch (error) {
      console.error('Error loading investor data:', error);
      toast({
        title: "Error",
        description: "Failed to load your portfolio data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate portfolio allocation for pie chart
  const getPortfolioAllocation = () => {
    if (!portfolio || portfolio.tokens.length === 0) return [];
    
    return portfolio.tokens.map(token => ({
      name: token.symbol,
      value: token.amount * token.price
    }));
  };

  // Colors for pie chart
  const COLORS = ['#3CAB5A', '#34ADDD', '#F5A623', '#9B51E0', '#FF6B6B'];

  if (!isConnected && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <div className="flex-grow flex items-center justify-center pt-16">
          <div className="max-w-md mx-auto p-6 text-center">
            <div className="mb-6 w-16 h-16 rounded-full bg-cropchain-gray/50 flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-cropchain-medium" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Wallet Not Connected</h1>
            <p className="text-cropchain-medium mb-6">
              You need to connect your wallet to access the Investor Dashboard.
            </p>
            <Button className="bg-cropchain-green text-white hover:bg-cropchain-green/90">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-cropchain-green" />
              <span className="ml-2 text-cropchain-medium">Loading portfolio...</span>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white mb-2">
                  Investor Dashboard
                </h1>
                <p className="text-lg text-cropchain-medium max-w-2xl">
                  Track your agricultural investments and monitor market trends.
                </p>
              </div>
              
              {/* Dashboard Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Portfolio Value</CardTitle>
                    <CardDescription>Current holdings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold">
                        ${portfolio?.totalValue.toFixed(2) || '0.00'}
                      </div>
                      {portfolio && portfolio.totalValue > 0 && (
                        <div className="text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          +5.2% this week
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Projected Return</CardTitle>
                    <CardDescription>At harvest time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold text-cropchain-green">
                        ${portfolio?.projectedReturn.toFixed(2) || '0.00'}
                      </div>
                      {portfolio && portfolio.projectedReturn > 0 && (
                        <div className="text-sm text-cropchain-medium">
                          Est. {portfolio && ((portfolio.projectedReturn / portfolio.totalValue - 1) * 100).toFixed(1)}% ROI
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Token Types</CardTitle>
                    <CardDescription>Unique holdings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold">
                        {portfolio?.tokens.length || 0}
                      </div>
                      {portfolio && portfolio.tokens.length > 0 && (
                        <div className="text-sm text-cropchain-medium flex flex-wrap">
                          {portfolio.tokens.slice(0, 3).map((token, i) => (
                            <Badge key={i} variant="outline" className="mr-1 mb-1 border-cropchain-green/20 bg-cropchain-green/10">
                              {token.symbol}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Nearest Harvest</CardTitle>
                    <CardDescription>Next payout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold">
                        {portfolio && portfolio.tokens.length > 0 ? (
                          new Date(
                            Math.min(
                              ...portfolio.tokens.map(token => new Date(token.harvestDate).getTime())
                            )
                          ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        ) : (
                          "N/A"
                        )}
                      </div>
                      <div className="text-sm text-cropchain-medium">
                        {portfolio && portfolio.tokens.length > 0 ? (
                          Math.ceil((Math.min(
                            ...portfolio.tokens.map(token => new Date(token.harvestDate).getTime())
                          ) - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        ) : (
                          "0"
                        )} days left
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Dashboard Content */}
              <Tabs defaultValue="portfolio" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="market">Market Trends</TabsTrigger>
                </TabsList>
                
                <TabsContent value="portfolio">
                  {portfolio && portfolio.tokens.length > 0 ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark h-full">
                            <CardHeader>
                              <CardTitle>Token Holdings</CardTitle>
                              <CardDescription>Your agricultural token investments</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {portfolio.tokens.map((token, index) => (
                                <div key={token.id} className={`flex items-center p-3 rounded-lg ${
                                  index % 2 === 0 ? 'bg-cropchain-green-light dark:bg-cropchain-green/10' : 'bg-cropchain-blue-light dark:bg-cropchain-blue/10'
                                }`}>
                                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                                    index % 2 === 0 ? 'bg-cropchain-green/20' : 'bg-cropchain-blue/20'
                                  }`}>
                                    <span className={`font-semibold ${
                                      index % 2 === 0 ? 'text-cropchain-green' : 'text-cropchain-blue'
                                    }`}>
                                      {token.symbol.substring(0, 1)}
                                    </span>
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between">
                                      <h4 className="font-medium">{token.name}</h4>
                                      <span className="font-semibold">${(token.amount * token.price).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <div className="text-sm flex items-center">
                                        <Badge variant="outline" className="mr-2 border-none bg-white/50 dark:bg-black/20">
                                          {token.symbol}
                                        </Badge>
                                        <span className="text-cropchain-medium">{token.amount} tokens</span>
                                      </div>
                                      <span className="text-sm text-cropchain-medium">
                                        ${token.price.toFixed(3)} per token
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                            <CardFooter className="border-t border-cropchain-gray/20 pt-4">
                              <Link to="/marketplace" className="w-full">
                                <Button variant="outline" className="w-full border-cropchain-gray/40">
                                  Explore More Tokens
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </CardFooter>
                          </Card>
                        </div>
                        
                        <div>
                          <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark h-full">
                            <CardHeader>
                              <CardTitle>Portfolio Allocation</CardTitle>
                              <CardDescription>Distribution by token value</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                              <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={getPortfolioAllocation()}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={60}
                                      outerRadius={80}
                                      paddingAngle={5}
                                      dataKey="value"
                                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                      {getPortfolioAllocation().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip
                                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                                    />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                              
                              <div className="w-full mt-6 space-y-3">
                                {portfolio.tokens.map((token, index) => (
                                  <div key={token.id} className="flex items-center text-sm">
                                    <div 
                                      className="w-3 h-3 mr-2 rounded-full"
                                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="flex-grow">{token.symbol}</span>
                                    <span className="font-medium">
                                      ${(token.amount * token.price).toFixed(2)}
                                    </span>
                                    <span className="ml-2 text-cropchain-medium">
                                      ({((token.amount * token.price / portfolio.totalValue) * 100).toFixed(1)}%)
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                        <CardHeader>
                          <CardTitle>Harvest Schedule</CardTitle>
                          <CardDescription>Upcoming token harvests and expected returns</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {portfolio.tokens
                              .sort((a, b) => new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime())
                              .map((token, index) => {
                                const harvestDate = new Date(token.harvestDate);
                                const daysRemaining = Math.ceil((harvestDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                                const progressPercent = Math.max(0, Math.min(100, 100 - (daysRemaining / 180) * 100));
                                
                                return (
                                  <div key={token.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="font-medium flex items-center">
                                          {token.symbol}
                                          <Badge 
                                            className="ml-2 bg-cropchain-green-light text-cropchain-green dark:bg-cropchain-green/20"
                                          >
                                            {token.cropType}
                                          </Badge>
                                        </h4>
                                        <p className="text-sm text-cropchain-medium mt-1">
                                          Harvest Date: {harvestDate.toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium">${(token.amount * token.price * (1 + token.projectedYield/1000)).toFixed(2)}</p>
                                        <p className="text-sm text-cropchain-medium">
                                          Projected Return
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                      <Progress value={progressPercent} className="h-2" />
                                      <div className="flex justify-between text-xs text-cropchain-medium">
                                        <span>Growing Period</span>
                                        <span>{daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Ready for harvest'}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-cropchain-gray/30 rounded-xl">
                      <BarChart3 className="h-12 w-12 mx-auto text-cropchain-medium mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Tokens Yet</h3>
                      <p className="text-cropchain-medium max-w-md mx-auto mb-6">
                        You haven't purchased any agricultural tokens yet. Visit the marketplace to start investing in tokenized crop yields.
                      </p>
                      <Link to="/marketplace">
                        <Button 
                          className="bg-cropchain-green hover:bg-cropchain-green/90 text-white"
                        >
                          Explore Marketplace
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="performance">
                  <div className="space-y-6">
                    <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                      <CardHeader>
                        <CardTitle>Portfolio Performance</CardTitle>
                        <CardDescription>Value over time and projected returns</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={[
                              { date: '2024-01', actual: 0, projected: 0 },
                              { date: '2024-02', actual: 2600, projected: 2600 },
                              { date: '2024-03', actual: 4200, projected: 4200 },
                              { date: '2024-04', actual: 6800, projected: 6800 },
                              { date: '2024-05', actual: 8400, projected: 8400 },
                              { date: '2024-06', actual: 10200, projected: 10200 },
                              { date: '2024-07', actual: 0, projected: 12800 },
                              { date: '2024-08', actual: 0, projected: 14000 },
                              { date: '2024-09', actual: 0, projected: 15400 },
                              { date: '2024-10', actual: 0, projected: 16800 },
                              { date: '2024-11', actual: 0, projected: 17200 },
                              { date: '2024-12', actual: 0, projected: 18600 },
                            ]}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3CAB5A" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3CAB5A" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#34ADDD" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#34ADDD" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis 
                              dataKey="date" 
                              tickFormatter={(tick) => {
                                const date = new Date(tick);
                                return date.toLocaleDateString('en-US', { month: 'short' });
                              }}
                            />
                            <YAxis 
                              tickFormatter={(tick) => `$${tick}`}
                            />
                            <Tooltip 
                              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                              labelFormatter={(label) => {
                                const date = new Date(label);
                                return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                              }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="#3CAB5A" 
                              fillOpacity={1} 
                              fill="url(#colorActual)" 
                              name="Actual Value"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="projected" 
                              stroke="#34ADDD" 
                              fillOpacity={1}
                              fill="url(#colorProjected)"
                              strokeDasharray="5 5"
                              name="Projected Value"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                      <CardFooter className="border-t border-cropchain-gray/20 pt-4">
                        <div className="w-full flex flex-col sm:flex-row items-center justify-between">
                          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-cropchain-green mr-2"></div>
                              <span className="text-sm">Actual Value</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-cropchain-blue mr-2"></div>
                              <span className="text-sm">Projected Return</span>
                            </div>
                          </div>
                          <div className="text-sm text-cropchain-medium">
                            Projected annual return: 
                            <span className="font-medium text-cropchain-green ml-1">
                              {portfolio && portfolio.totalValue > 0 
                                ? ((portfolio.projectedReturn / portfolio.totalValue - 1) * 100).toFixed(1)
                                : '0.0'}%
                            </span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                        <CardHeader>
                          <CardTitle>Token Performance</CardTitle>
                          <CardDescription>Individual token returns</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {portfolio && portfolio.tokens.length > 0 ? (
                              portfolio.tokens.map((token) => {
                                const returnPercent = (token.projectedYield / 1000) * 100;
                                const isPositive = returnPercent > 0;
                                
                                return (
                                  <div key={token.id} className="flex items-center p-3 rounded-lg bg-cropchain-gray/20">
                                    <div className="flex-grow">
                                      <h4 className="font-medium">{token.symbol}</h4>
                                      <p className="text-sm text-cropchain-medium">{token.cropType}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                                        {isPositive ? (
                                          <TrendingUp className="h-4 w-4 mr-1" />
                                        ) : (
                                          <TrendingDown className="h-4 w-4 mr-1" />
                                        )}
                                        <span className="font-medium">{returnPercent.toFixed(1)}%</span>
                                      </div>
                                      <p className="text-xs text-cropchain-medium">Expected Return</p>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-center py-8 text-cropchain-medium">
                                No tokens in your portfolio.
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                        <CardHeader>
                          <CardTitle>Risk Assessment</CardTitle>
                          <CardDescription>Portfolio risk distribution</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {portfolio && portfolio.tokens.length > 0 ? (
                            <div className="space-y-6">
                              <div className="grid grid-cols-3 gap-4">
                                {['Low', 'Medium', 'High'].map((risk) => {
                                  const tokensByRisk = portfolio.tokens.filter(t => t.riskLevel === risk);
                                  const valueByRisk = tokensByRisk.reduce((sum, token) => 
                                    sum + token.amount * token.price, 
                                  0);
                                  const percentByRisk = portfolio.totalValue > 0 
                                    ? (valueByRisk / portfolio.totalValue) * 100 
                                    : 0;
                                  
                                  return (
                                    <div 
                                      key={risk} 
                                      className={`p-3 rounded-lg ${
                                        risk === 'Low' 
                                          ? 'bg-green-100 dark:bg-green-900/30' 
                                          : risk === 'Medium' 
                                            ? 'bg-yellow-100 dark:bg-yellow-900/30' 
                                            : 'bg-red-100 dark:bg-red-900/30'
                                      }`}
                                    >
                                      <p className={`text-sm font-medium ${
                                        risk === 'Low' 
                                          ? 'text-green-800 dark:text-green-400' 
                                          : risk === 'Medium' 
                                            ? 'text-yellow-800 dark:text-yellow-400' 
                                            : 'text-red-800 dark:text-red-400'
                                      }`}>
                                        {risk} Risk
                                      </p>
                                      <p className="text-lg font-semibold mt-1">{percentByRisk.toFixed(1)}%</p>
                                      <p className="text-xs text-cropchain-medium mt-1">
                                        {tokensByRisk.length} tokens
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">Risk Breakdown by Crop Type</h4>
                                <div className="space-y-3">
                                  {/* Group tokens by crop type */}
                                  {Array.from(new Set(portfolio.tokens.map(t => t.cropType))).map(cropType => {
                                    const cropTokens = portfolio.tokens.filter(t => t.cropType === cropType);
                                    const cropValue = cropTokens.reduce((sum, token) => sum + token.amount * token.price, 0);
                                    const cropPercent = portfolio.totalValue > 0 
                                      ? (cropValue / portfolio.totalValue) * 100 
                                      : 0;
                                    
                                    // Count tokens by risk level within this crop type
                                    const lowRisk = cropTokens.filter(t => t.riskLevel === 'Low').length;
                                    const mediumRisk = cropTokens.filter(t => t.riskLevel === 'Medium').length;
                                    const highRisk = cropTokens.filter(t => t.riskLevel === 'High').length;
                                    
                                    return (
                                      <div key={cropType} className="space-y-1">
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm font-medium">{cropType}</span>
                                          <span className="text-sm">{cropPercent.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-cropchain-gray/30 overflow-hidden flex">
                                          {lowRisk > 0 && (
                                            <div 
                                              className="h-full bg-green-500" 
                                              style={{ 
                                                width: `${(lowRisk / cropTokens.length) * 100}%` 
                                              }}
                                            />
                                          )}
                                          {mediumRisk > 0 && (
                                            <div 
                                              className="h-full bg-yellow-500" 
                                              style={{ 
                                                width: `${(mediumRisk / cropTokens.length) * 100}%` 
                                              }}
                                            />
                                          )}
                                          {highRisk > 0 && (
                                            <div 
                                              className="h-full bg-red-500" 
                                              style={{ 
                                                width: `${(highRisk / cropTokens.length) * 100}%` 
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-cropchain-medium">
                              No tokens in your portfolio to assess risk.
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="market">
                  <div className="space-y-6">
                    <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                      <CardHeader>
                        <CardTitle>Market Trends</CardTitle>
                        <CardDescription>Trading volume and token price trends</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        {marketTrends ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={marketTrends.volumeData}
                              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                              <defs>
                                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3CAB5A" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#3CAB5A" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <XAxis 
                                dataKey="date" 
                                tickFormatter={(tick) => {
                                  const date = new Date(tick);
                                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                }}
                              />
                              <YAxis 
                                tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}k`}
                              />
                              <Tooltip 
                                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Volume']}
                                labelFormatter={(label) => {
                                  const date = new Date(label);
                                  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                                }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#3CAB5A" 
                                fillOpacity={1} 
                                fill="url(#colorVolume)" 
                                name="Trading Volume"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Loader2 className="h-8 w-8 animate-spin text-cropchain-medium" />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="border-t border-cropchain-gray/20 pt-4">
                        <div className="w-full grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-sm text-cropchain-medium">30-Day Volume</p>
                            <p className="font-semibold">$348,952</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-cropchain-medium">Average Price</p>
                            <p className="font-semibold">$0.024</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-cropchain-medium">Price Trend</p>
                            <p className="font-semibold text-green-600 flex items-center justify-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              +8.3%
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                        <CardHeader>
                          <CardTitle>Popular Tokens</CardTitle>
                          <CardDescription>Most traded in the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {marketTrends ? (
                              marketTrends.popularTokens.map((symbol, index) => (
                                <div key={symbol} className="flex items-center p-3 rounded-lg bg-cropchain-gray/20">
                                  <div className="flex-shrink-0 mr-4 text-lg font-semibold text-cropchain-medium">
                                    #{index + 1}
                                  </div>
                                  <div className="flex-grow">
                                    <h4 className="font-medium">{symbol}</h4>
                                    <p className="text-sm text-cropchain-medium">
                                      {
                                        symbol === 'CORN24' ? 'Corn' : 
                                        symbol === 'WHEAT24' ? 'Wheat' : 'Soybean'
                                      }
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">
                                      ${(0.02 + 0.005 * Math.random()).toFixed(3)}
                                    </p>
                                    <div className={`text-xs flex items-center justify-end ${
                                      index % 3 === 0 ? 'text-green-600' : 
                                      index % 3 === 1 ? 'text-red-500' : 'text-green-600'
                                    }`}>
                                      {index % 3 === 0 ? (
                                        <>
                                          <TrendingUp className="h-3 w-3 mr-1" />
                                          +{(Math.random() * 10).toFixed(1)}%
                                        </>
                                      ) : index % 3 === 1 ? (
                                        <>
                                          <TrendingDown className="h-3 w-3 mr-1" />
                                          -{(Math.random() * 5).toFixed(1)}%
                                        </>
                                      ) : (
                                        <>
                                          <TrendingUp className="h-3 w-3 mr-1" />
                                          +{(Math.random() * 8).toFixed(1)}%
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex justify-center items-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-cropchain-medium" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-cropchain-gray/20 pt-4">
                          <Link to="/marketplace" className="w-full">
                            <Button variant="outline" className="w-full border-cropchain-gray/40">
                              View All Tokens
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                      
                      <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                        <CardHeader>
                          <CardTitle>Upcoming Harvests</CardTitle>
                          <CardDescription>Market-wide harvest schedule</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { crop: 'Wheat', region: 'Kansas, USA', date: '2024-07-20', tokens: ['WHEAT24', 'KSWHT24'] },
                              { crop: 'Corn', region: 'Iowa, USA', date: '2024-09-15', tokens: ['CORN24', 'IOWC24'] },
                              { crop: 'Soybean', region: 'Illinois, USA', date: '2024-10-05', tokens: ['SOY24', 'ILSOY24'] },
                              { crop: 'Rice', region: 'California, USA', date: '2024-08-30', tokens: ['RICE24', 'CARIC24'] },
                            ].map((harvest, index) => (
                              <div key={index} className="flex items-start p-3 rounded-lg bg-cropchain-gray/20">
                                <div className="flex-shrink-0 mr-4">
                                  <div className="h-10 w-10 rounded-full bg-white/50 dark:bg-black/30 flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-cropchain-medium" />
                                  </div>
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{harvest.crop} Harvest</h4>
                                  <p className="text-sm text-cropchain-medium">{harvest.region}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {harvest.tokens.map((token) => (
                                      <Badge key={token} variant="outline" className="bg-cropchain-green/10 border-cropchain-green/20">
                                        {token}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">
                                    {new Date(harvest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </p>
                                  <p className="text-xs text-cropchain-medium">
                                    {Math.ceil((new Date(harvest.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;
