
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TokenData, purchaseTokens } from '@/utils/web3';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Clock, MapPin, BarChart3, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TokenCardProps {
  token: TokenData;
  onPurchase?: (token: TokenData, amount: number) => void;
  viewOnly?: boolean;
  owned?: number;
}

export function TokenCard({ token, onPurchase, viewOnly = false, owned = 0 }: TokenCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!purchaseAmount || purchaseAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to purchase.",
        variant: "destructive",
      });
      return;
    }

    if (purchaseAmount > token.availableSupply) {
      toast({
        title: "Exceeds available supply",
        description: `Only ${token.availableSupply} tokens available for purchase.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await purchaseTokens(token.id, purchaseAmount);
      
      if (success) {
        toast({
          title: "Purchase Successful",
          description: `You have successfully purchased ${purchaseAmount} ${token.symbol} tokens.`,
        });
        
        if (onPurchase) {
          onPurchase(token, purchaseAmount);
        }
        
        setIsPurchaseOpen(false);
      } else {
        toast({
          title: "Purchase Failed",
          description: "Transaction failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during the purchase.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRiskBadgeColor = (risk: TokenData['riskLevel']) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'High':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getImagePlaceholder = (cropType: string) => {
    const placeholders: Record<string, string> = {
      'Corn': 'https://images.unsplash.com/photo-1623211270083-276a0a6eb9c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      'Soybean': 'https://images.unsplash.com/photo-1599472480247-78b13305581e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e8c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      'Cotton': 'https://images.unsplash.com/photo-1594632913636-cefa6260cce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    };
    
    return placeholders[cropType] || 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';
  };

  return (
    <>
      <Card className="overflow-hidden card-hover border-cropchain-gray/30 bg-white dark:bg-cropchain-dark">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={getImagePlaceholder(token.cropType)} 
            alt={token.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between">
            <Badge className="bg-cropchain-green text-white hover:bg-cropchain-green/90">
              {token.cropType}
            </Badge>
            <Badge className={`${getRiskBadgeColor(token.riskLevel)}`}>
              {token.riskLevel} Risk
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{token.name}</h3>
              <p className="text-xs text-cropchain-medium">{token.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-cropchain-green">${token.price.toFixed(3)}</p>
              <p className="text-xs text-cropchain-medium">per token</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="flex justify-between text-sm mb-2">
            <div className="flex items-center">
              <Clock className="mr-1 h-3.5 w-3.5 text-cropchain-medium" />
              <span className="text-cropchain-medium">Harvest: {new Date(token.harvestDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-3.5 w-3.5 text-cropchain-medium" />
              <span className="text-cropchain-medium">{token.location.split(',')[0]}</span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <BarChart3 className="mr-1 h-3.5 w-3.5 text-cropchain-green" />
              <span>Yield: {token.projectedYield} bu/acre</span>
            </div>
            <div>
              {owned > 0 && (
                <Badge variant="outline" className="border-cropchain-blue text-cropchain-blue">
                  You own: {owned}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 mr-2 border-cropchain-gray/50 hover:bg-cropchain-gray/20"
            onClick={() => setIsDetailsOpen(true)}
          >
            Details
          </Button>
          
          {!viewOnly && (
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-cropchain-green hover:bg-cropchain-green/90 text-white"
              onClick={() => setIsPurchaseOpen(true)}
            >
              Buy Now
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px] bg-cropchain-light dark:bg-cropchain-dark border-cropchain-gray/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">{token.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <img 
                src={getImagePlaceholder(token.cropType)} 
                alt={token.name} 
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-cropchain-medium">Token Symbol</h4>
                <p className="font-semibold">{token.symbol}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-cropchain-medium">Projected Yield</h4>
                <p className="font-semibold">{token.projectedYield} bushels/acre</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-cropchain-medium">Harvest Date</h4>
                <p className="font-semibold">{new Date(token.harvestDate).toLocaleDateString()}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-cropchain-medium">Risk Assessment</h4>
                <Badge className={`mt-1 ${getRiskBadgeColor(token.riskLevel)}`}>
                  {token.riskLevel} Risk
                </Badge>
              </div>
            </div>
          </div>
          
          <Separator className="my-1" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <h4 className="text-sm font-medium text-cropchain-medium">Token Economics</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-cropchain-medium">Price per Token</span>
                  <span className="font-semibold">${token.price.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cropchain-medium">Total Supply</span>
                  <span className="font-semibold">{token.totalSupply.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cropchain-medium">Available</span>
                  <span className="font-semibold">{token.availableSupply.toLocaleString()} ({Math.round(token.availableSupply / token.totalSupply * 100)}%)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cropchain-medium">Farming Location</h4>
              <div className="mt-2">
                <p className="font-semibold">{token.location}</p>
                <div className="mt-3 h-24 bg-cropchain-gray rounded-md flex items-center justify-center">
                  <span className="text-sm text-cropchain-medium">Map View</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-cropchain-beige dark:bg-cropchain-dark/70 rounded-md p-4 mt-2">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-cropchain-green mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Risk Information</h4>
                <p className="text-sm text-cropchain-medium mt-1">
                  Yield-backed tokens are subject to agricultural risks including weather conditions, pests, and market fluctuations. Returns are not guaranteed.
                </p>
              </div>
            </div>
          </div>
          
          {!viewOnly && (
            <Button 
              className="w-full mt-2 bg-cropchain-green hover:bg-cropchain-green/90 text-white"
              onClick={() => {
                setIsDetailsOpen(false);
                setIsPurchaseOpen(true);
              }}
            >
              Purchase Tokens
            </Button>
          )}
        </DialogContent>
      </Dialog>

      {/* Purchase Dialog */}
      <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
        <DialogContent className="sm:max-w-[400px] bg-cropchain-light dark:bg-cropchain-dark border-cropchain-gray/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">Purchase {token.symbol} Tokens</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-cropchain-medium text-sm">Token Price</p>
                <p className="font-semibold">${token.price.toFixed(3)} per token</p>
              </div>
              <div className="text-right">
                <p className="text-cropchain-medium text-sm">Available</p>
                <p className="font-semibold">{token.availableSupply.toLocaleString()} tokens</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-cropchain-medium mb-1">
                Amount to Purchase
              </label>
              <Input
                id="amount"
                type="number"
                min="1"
                max={token.availableSupply}
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(parseInt(e.target.value) || 0)}
                className="w-full border-cropchain-gray/50 focus:border-cropchain-green focus:ring-cropchain-green"
              />
            </div>
            
            <div className="bg-cropchain-green-light p-4 rounded-md">
              <div className="flex justify-between">
                <p className="text-cropchain-medium">Total Cost</p>
                <p className="font-semibold text-cropchain-green">${(purchaseAmount * token.price).toFixed(2)}</p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-cropchain-medium">Projected Return</p>
                <p className="font-semibold text-cropchain-green">
                  ${(purchaseAmount * token.price * (1 + token.projectedYield/1000)).toFixed(2)}*
                </p>
              </div>
              <p className="text-xs text-cropchain-medium mt-2">*Estimated value at harvest, subject to market conditions</p>
            </div>
          </div>
          
          <Button 
            className="w-full bg-cropchain-green hover:bg-cropchain-green/90 text-white"
            onClick={handlePurchase}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Purchase ${purchaseAmount} Tokens`}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TokenCard;
