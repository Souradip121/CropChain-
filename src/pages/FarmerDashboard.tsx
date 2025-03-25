
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { useWalletConnection, createNewToken, TokenData } from '@/utils/web3';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Loader2, ChevronRight, PlusCircle, FileText, CheckCircle2, Clock, BarChart, ArrowUpRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import TokenCard from '@/components/TokenCard';

const FarmerDashboard = () => {
  const { isConnected, address } = useWalletConnection();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [farmerTokens, setFarmerTokens] = useState<TokenData[]>([]);
  
  // Form state for new token
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    cropType: 'Corn',
    projectedYield: 180,
    price: 0.025,
    harvestDate: '',
    riskLevel: 'Low' as TokenData['riskLevel'],
    location: '',
    image: '',
    totalSupply: 10000,
    availableSupply: 10000,
  });

  useEffect(() => {
    // Set the default harvest date to 6 months from now
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    setNewToken(prev => ({
      ...prev,
      harvestDate: sixMonthsFromNow.toISOString().split('T')[0]
    }));
    
    window.scrollTo(0, 0);
    
    if (isConnected) {
      loadFarmerData();
    } else {
      setIsLoading(false);
    }
  }, [isConnected]);

  const loadFarmerData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would fetch actual farmer data from a backend
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data for demonstration
      const mockTokens: TokenData[] = [
        {
          id: 'corn-2024-farmer',
          name: 'Iowa Premium Corn Yield 2024',
          symbol: 'CORN24F',
          cropType: 'Corn',
          projectedYield: 190,
          price: 0.027,
          farmerId: address || 'farmer-01',
          harvestDate: '2024-09-15',
          riskLevel: 'Low',
          location: 'Iowa, USA',
          image: '/corn.jpg',
          totalSupply: 15000,
          availableSupply: 12500,
        },
        {
          id: 'soy-2024-farmer',
          name: 'Organic Soybean Yield 2024',
          symbol: 'ORGSOYT',
          cropType: 'Soybean',
          projectedYield: 70,
          price: 0.035,
          farmerId: address || 'farmer-01',
          harvestDate: '2024-10-05',
          riskLevel: 'Medium',
          location: 'Illinois, USA',
          image: '/soybean.jpg',
          totalSupply: 8000,
          availableSupply: 5600,
        }
      ];
      
      setFarmerTokens(mockTokens);
    } catch (error) {
      console.error('Error loading farmer data:', error);
      toast({
        title: "Error",
        description: "Failed to load your farmer data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewToken(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = name === 'price' ? parseFloat(value) : parseInt(value);
    setNewToken(prev => ({
      ...prev,
      [name]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewToken(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateToken = async () => {
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Please connect your wallet to create tokens.",
        variant: "destructive",
      });
      return;
    }

    // Basic validation
    if (!newToken.name || !newToken.symbol || !newToken.location || !newToken.harvestDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, this would interact with a blockchain contract
      const createdToken = await createNewToken({
        ...newToken,
        farmerId: address || 'unknown'
      });
      
      setFarmerTokens(prev => [...prev, createdToken]);
      
      toast({
        title: "Token Created",
        description: `Successfully created ${createdToken.symbol} token.`,
      });
      
      setIsCreateDialogOpen(false);
      
      // Reset form to defaults
      setNewToken({
        name: '',
        symbol: '',
        cropType: 'Corn',
        projectedYield: 180,
        price: 0.025,
        harvestDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
        riskLevel: 'Low',
        location: '',
        image: '',
        totalSupply: 10000,
        availableSupply: 10000,
      });
    } catch (error) {
      console.error('Error creating token:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create the token. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              You need to connect your wallet to access the Farmer Dashboard.
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
              <span className="ml-2 text-cropchain-medium">Loading dashboard...</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-semibold text-cropchain-dark dark:text-white mb-2">
                    Farmer Dashboard
                  </h1>
                  <p className="text-lg text-cropchain-medium max-w-2xl">
                    Manage your tokenized crop yields and monitor farming operations.
                  </p>
                </div>
                
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 md:mt-0 bg-cropchain-green hover:bg-cropchain-green/90 text-white">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Token
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] bg-cropchain-light dark:bg-cropchain-dark border-cropchain-gray/50">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-medium">Create Yield-Backed Token</DialogTitle>
                    </DialogHeader>
                    
                    <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Token Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={newToken.name}
                            onChange={handleInputChange}
                            className="mt-1 border-cropchain-gray/50"
                            placeholder="e.g. Premium Corn Yield 2024"
                          />
                        </div>
                        <div>
                          <Label htmlFor="symbol">Token Symbol</Label>
                          <Input
                            id="symbol"
                            name="symbol"
                            value={newToken.symbol}
                            onChange={handleInputChange}
                            className="mt-1 border-cropchain-gray/50"
                            placeholder="e.g. CORN24"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cropType">Crop Type</Label>
                          <Select 
                            value={newToken.cropType} 
                            onValueChange={(value) => handleSelectChange('cropType', value)}
                          >
                            <SelectTrigger className="mt-1 border-cropchain-gray/50">
                              <SelectValue placeholder="Select crop type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Corn">Corn</SelectItem>
                              <SelectItem value="Wheat">Wheat</SelectItem>
                              <SelectItem value="Soybean">Soybean</SelectItem>
                              <SelectItem value="Rice">Rice</SelectItem>
                              <SelectItem value="Cotton">Cotton</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="riskLevel">Risk Level</Label>
                          <Select 
                            value={newToken.riskLevel} 
                            onValueChange={(value) => handleSelectChange('riskLevel', value as TokenData['riskLevel'])}
                          >
                            <SelectTrigger className="mt-1 border-cropchain-gray/50">
                              <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="projectedYield">Projected Yield (bu/acre)</Label>
                          <Input
                            id="projectedYield"
                            name="projectedYield"
                            type="number"
                            value={newToken.projectedYield}
                            onChange={handleNumberChange}
                            className="mt-1 border-cropchain-gray/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Token Price (USD)</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.001"
                            value={newToken.price}
                            onChange={handleNumberChange}
                            className="mt-1 border-cropchain-gray/50"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="totalSupply">Total Supply</Label>
                          <Input
                            id="totalSupply"
                            name="totalSupply"
                            type="number"
                            value={newToken.totalSupply}
                            onChange={handleNumberChange}
                            className="mt-1 border-cropchain-gray/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="harvestDate">Estimated Harvest Date</Label>
                          <Input
                            id="harvestDate"
                            name="harvestDate"
                            type="date"
                            value={newToken.harvestDate}
                            onChange={handleInputChange}
                            className="mt-1 border-cropchain-gray/50"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Farm Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={newToken.location}
                          onChange={handleInputChange}
                          className="mt-1 border-cropchain-gray/50"
                          placeholder="e.g. Iowa, USA"
                        />
                      </div>
                      
                      <div className="bg-cropchain-beige dark:bg-cropchain-dark/70 rounded-md p-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-cropchain-medium mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-cropchain-medium">
                              By creating a tokenized yield, you're committing to delivering the projected harvest to token holders at the specified date. Please ensure all information is accurate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-cropchain-green hover:bg-cropchain-green/90 text-white"
                      onClick={handleCreateToken}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Create Token</>
                      )}
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Dashboard Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Active Tokens</CardTitle>
                    <CardDescription>Total tokenized crops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold">{farmerTokens.length}</div>
                      <div className="text-sm text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +1 this month
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Supply</CardTitle>
                    <CardDescription>Tokens issued</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold">
                        {farmerTokens.reduce((sum, token) => sum + token.totalSupply, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-cropchain-medium">
                        {farmerTokens.reduce((sum, token) => sum + token.totalSupply - token.availableSupply, 0).toLocaleString()} sold
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Revenue</CardTitle>
                    <CardDescription>From token sales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold">
                        ${farmerTokens.reduce((sum, token) => 
                          sum + (token.totalSupply - token.availableSupply) * token.price, 
                        0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +12.4%
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Next Harvest</CardTitle>
                    <CardDescription>Nearest upcoming</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-semibold">
                        {farmerTokens.length > 0 ? (
                          new Date(
                            Math.min(
                              ...farmerTokens.map(token => new Date(token.harvestDate).getTime())
                            )
                          ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        ) : (
                          "N/A"
                        )}
                      </div>
                      <div className="text-sm text-cropchain-medium">
                        {farmerTokens.length > 0 ? (
                          Math.ceil((Math.min(
                            ...farmerTokens.map(token => new Date(token.harvestDate).getTime())
                          ) - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        ) : (
                          "0"
                        )} days
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Dashboard Content */}
              <Tabs defaultValue="tokens" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="tokens">My Tokens</TabsTrigger>
                  <TabsTrigger value="farm">Farm Status</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tokens" className="space-y-6">
                  {farmerTokens.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {farmerTokens.map(token => (
                        <TokenCard
                          key={token.id}
                          token={token}
                          viewOnly={true}
                        />
                      ))}
                      
                      <Card className="border-dashed border-2 border-cropchain-gray/40 bg-transparent h-full flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-cropchain-gray/10 transition-colors"
                        onClick={() => setIsCreateDialogOpen(true)}
                      >
                        <div className="w-12 h-12 rounded-full bg-cropchain-green/10 flex items-center justify-center mb-4">
                          <PlusCircle className="h-6 w-6 text-cropchain-green" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Create New Token</h3>
                        <p className="text-sm text-cropchain-medium text-center">
                          Tokenize a new crop yield to raise funds and manage distribution.
                        </p>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-cropchain-gray/30 rounded-xl">
                      <FileText className="h-12 w-12 mx-auto text-cropchain-medium mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Tokens Yet</h3>
                      <p className="text-cropchain-medium max-w-md mx-auto mb-6">
                        You haven't created any tokenized crop yields yet. Get started by creating your first token.
                      </p>
                      <Button 
                        className="bg-cropchain-green hover:bg-cropchain-green/90 text-white"
                        onClick={() => setIsCreateDialogOpen(true)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create First Token
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="farm" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                      <CardHeader>
                        <CardTitle>Crop Status</CardTitle>
                        <CardDescription>Current growing conditions and progress</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-cropchain-medium">Corn (Iowa)</span>
                            <span className="font-medium">Growing</span>
                          </div>
                          <Progress value={65} className="h-2" />
                          <div className="flex justify-between text-xs">
                            <span>Planted Apr 15</span>
                            <span>65% to harvest</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-cropchain-medium">Soybean (Illinois)</span>
                            <span className="font-medium">Early Stage</span>
                          </div>
                          <Progress value={32} className="h-2" />
                          <div className="flex justify-between text-xs">
                            <span>Planted May 10</span>
                            <span>32% to harvest</span>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex items-center justify-between text-sm">
                          <div className="flex items-center text-cropchain-green">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span>All crops on schedule</span>
                          </div>
                          <Button variant="link" className="p-0 h-auto text-cropchain-medium">
                            Details
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                      <CardHeader>
                        <CardTitle>Weather Conditions</CardTitle>
                        <CardDescription>7-day forecast for your farm locations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-7 gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                              <div key={i} className="text-center">
                                <div className="text-xs font-medium">{day}</div>
                                <div className="my-2 h-8 flex items-center justify-center">
                                  {/* Weather icons would go here in a real app */}
                                  <div className={`h-8 w-8 rounded-full ${
                                    i < 2 ? 'bg-blue-100' : 
                                    i < 5 ? 'bg-yellow-100' : 'bg-blue-100'
                                  } flex items-center justify-center`}>
                                    <span className="text-xs">
                                      {i < 2 ? '🌧️' : i < 5 ? '☀️' : '🌧️'}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-xs">
                                  {75 + Math.floor(Math.random() * 10)}°F
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-4 border-t border-cropchain-gray/20">
                            <h4 className="font-medium mb-2">Iowa, USA</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-cropchain-medium">Precipitation</p>
                                <p className="font-medium">2.3 inches (weekly)</p>
                              </div>
                              <div>
                                <p className="text-xs text-cropchain-medium">Soil Moisture</p>
                                <p className="font-medium">Optimal</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-cropchain-gray/20 pt-4">
                        <Button variant="outline" className="w-full border-cropchain-gray/40">
                          View Full Weather Report
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                        <CardDescription>Scheduled farm operations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center p-3 rounded-lg bg-cropchain-green-light border border-cropchain-green/20">
                            <div className="h-10 w-10 rounded-full bg-cropchain-green/20 flex items-center justify-center mr-4">
                              <Clock className="h-5 w-5 text-cropchain-green" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">Corn Field Irrigation</h4>
                              <p className="text-sm text-cropchain-medium">Scheduled for tomorrow, 6:00 AM</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-cropchain-green/30 text-cropchain-green">
                              Reschedule
                            </Button>
                          </div>
                          
                          <div className="flex items-center p-3 rounded-lg bg-cropchain-gray/30 border border-cropchain-gray/30">
                            <div className="h-10 w-10 rounded-full bg-cropchain-gray/30 flex items-center justify-center mr-4">
                              <BarChart className="h-5 w-5 text-cropchain-medium" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">Soybean Growth Assessment</h4>
                              <p className="text-sm text-cropchain-medium">Scheduled for July 15, 9:00 AM</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-cropchain-gray/50">
                              Details
                            </Button>
                          </div>
                          
                          <div className="flex items-center p-3 rounded-lg bg-cropchain-gray/30 border border-cropchain-gray/30">
                            <div className="h-10 w-10 rounded-full bg-cropchain-gray/30 flex items-center justify-center mr-4">
                              <FileText className="h-5 w-5 text-cropchain-medium" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">Quarterly Yield Report</h4>
                              <p className="text-sm text-cropchain-medium">Due by July 30</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-cropchain-gray/50">
                              Start
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-cropchain-gray/20 pt-4">
                        <Button variant="outline" className="w-full border-cropchain-gray/40">
                          View All Tasks
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="reports" className="space-y-6">
                  <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                    <CardHeader>
                      <CardTitle>Yield Reports</CardTitle>
                      <CardDescription>Status updates for token holders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-cropchain-gray/20">
                          <div>
                            <h4 className="font-medium">Corn Growth Progress Report</h4>
                            <p className="text-sm text-cropchain-medium mt-1">Published June 2, 2024</p>
                          </div>
                          <Button variant="outline" className="border-cropchain-gray/40">
                            View Report
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between pb-4 border-b border-cropchain-gray/20">
                          <div>
                            <h4 className="font-medium">Soybean Planting Completion</h4>
                            <p className="text-sm text-cropchain-medium mt-1">Published May 15, 2024</p>
                          </div>
                          <Button variant="outline" className="border-cropchain-gray/40">
                            View Report
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Q2 Yield Projection</h4>
                            <p className="text-sm text-cropchain-medium mt-1">Published April 30, 2024</p>
                          </div>
                          <Button variant="outline" className="border-cropchain-gray/40">
                            View Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-cropchain-gray/20 pt-4 flex justify-between">
                      <Button variant="outline" className="border-cropchain-gray/40">
                        View All Reports
                      </Button>
                      <Button className="bg-cropchain-green hover:bg-cropchain-green/90 text-white">
                        Create New Report
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-cropchain-gray/20 bg-white dark:bg-cropchain-dark">
                    <CardHeader>
                      <CardTitle>Communication with Investors</CardTitle>
                      <CardDescription>Updates and announcements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-cropchain-medium mb-4">
                        Send updates to token holders about farm operations, expected yields, and any relevant information.
                      </p>
                      <Textarea
                        placeholder="Write your announcement here..."
                        className="min-h-[120px] border-cropchain-gray/40"
                      />
                    </CardContent>
                    <CardFooter className="border-t border-cropchain-gray/20 pt-4 flex justify-end">
                      <Button className="bg-cropchain-green hover:bg-cropchain-green/90 text-white">
                        Send to All Token Holders
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
