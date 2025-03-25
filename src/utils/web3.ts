
import { useState, useEffect } from 'react';

// Mock contract addresses for our app
export const CONTRACT_ADDRESSES = {
  yieldToken: '0x1234567890123456789012345678901234567890',
  marketplace: '0x0987654321098765432109876543210987654321',
  riskManagement: '0x5432109876543210987654321098765432109876',
};

// Types
export type TokenData = {
  id: string;
  name: string;
  symbol: string;
  cropType: string;
  projectedYield: number;
  price: number;
  farmerId: string;
  harvestDate: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  location: string;
  image: string;
  totalSupply: number;
  availableSupply: number;
};

export type WalletState = {
  isConnected: boolean;
  address: string | null;
  balance: number;
  network: string | null;
};

// Mock function for connecting wallet
export async function connectWallet(): Promise<WalletState> {
  return new Promise((resolve) => {
    // Simulate network request
    setTimeout(() => {
      // Generate random wallet data (in a real app, this would use ethers.js or web3.js)
      const randomAddress = '0x' + Math.random().toString(16).substring(2, 42);
      const randomBalance = parseFloat((Math.random() * 10).toFixed(4));
      
      resolve({
        isConnected: true,
        address: randomAddress,
        balance: randomBalance,
        network: 'Ethereum',
      });
    }, 1000);
  });
}

// Hook for wallet connection
export function useWalletConnection() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0,
    network: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const result = await connectWallet();
      setWalletState(result);
      localStorage.setItem('cropchain_wallet_connected', 'true');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: 0,
      network: null,
    });
    localStorage.removeItem('cropchain_wallet_connected');
  };

  // Check for existing connection on mount
  useEffect(() => {
    const isConnected = localStorage.getItem('cropchain_wallet_connected') === 'true';
    if (isConnected) {
      connect();
    }
  }, []);

  return {
    ...walletState,
    connect,
    disconnect,
    isConnecting,
    error,
  };
}

// Mock function to get all available tokens
export async function fetchAvailableTokens(): Promise<TokenData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tokens: TokenData[] = [
        {
          id: 'corn-2024-01',
          name: 'Midwest Corn Yield 2024',
          symbol: 'CORN24',
          cropType: 'Corn',
          projectedYield: 180,
          price: 0.025,
          farmerId: 'farmer-01',
          harvestDate: '2024-09-15',
          riskLevel: 'Low',
          location: 'Iowa, USA',
          image: '/corn.jpg',
          totalSupply: 10000,
          availableSupply: 7500,
        },
        {
          id: 'wheat-2024-01',
          name: 'Kansas Wheat Yield 2024',
          symbol: 'WHEAT24',
          cropType: 'Wheat',
          projectedYield: 80,
          price: 0.018,
          farmerId: 'farmer-02',
          harvestDate: '2024-07-20',
          riskLevel: 'Medium',
          location: 'Kansas, USA',
          image: '/wheat.jpg',
          totalSupply: 8000,
          availableSupply: 3200,
        },
        {
          id: 'soy-2024-01',
          name: 'Illinois Soybean Yield 2024',
          symbol: 'SOY24',
          cropType: 'Soybean',
          projectedYield: 65,
          price: 0.022,
          farmerId: 'farmer-03',
          harvestDate: '2024-10-05',
          riskLevel: 'Low',
          location: 'Illinois, USA',
          image: '/soybean.jpg',
          totalSupply: 15000,
          availableSupply: 9800,
        },
        {
          id: 'rice-2024-01',
          name: 'California Rice Yield 2024',
          symbol: 'RICE24',
          cropType: 'Rice',
          projectedYield: 95,
          price: 0.032,
          farmerId: 'farmer-04',
          harvestDate: '2024-08-30',
          riskLevel: 'Medium',
          location: 'California, USA',
          image: '/rice.jpg',
          totalSupply: 5000,
          availableSupply: 2100,
        },
        {
          id: 'cotton-2024-01',
          name: 'Texas Cotton Yield 2024',
          symbol: 'CTTN24',
          cropType: 'Cotton',
          projectedYield: 110,
          price: 0.027,
          farmerId: 'farmer-05',
          harvestDate: '2024-11-10',
          riskLevel: 'High',
          location: 'Texas, USA',
          image: '/cotton.jpg',
          totalSupply: 7000,
          availableSupply: 4600,
        },
      ];
      resolve(tokens);
    }, 1500);
  });
}

// Mock function for purchasing tokens
export async function purchaseTokens(tokenId: string, amount: number): Promise<boolean> {
  return new Promise((resolve) => {
    // Simulate network delay and transaction
    setTimeout(() => {
      // 90% success rate
      const success = Math.random() > 0.1;
      resolve(success);
    }, 2000);
  });
}

// Mock function for creating new tokens (for farmers)
export async function createNewToken(tokenData: Omit<TokenData, 'id'>): Promise<TokenData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newToken: TokenData = {
        ...tokenData,
        id: `${tokenData.cropType.toLowerCase()}-${Date.now()}`,
      };
      resolve(newToken);
    }, 2000);
  });
}

// Mock function for getting user's token portfolio
export async function fetchUserPortfolio(address: string): Promise<{
  tokens: (TokenData & { amount: number })[];
  totalValue: number;
  projectedReturn: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a random portfolio based on some of the tokens
      const allTokens = [
        {
          id: 'corn-2024-01',
          name: 'Midwest Corn Yield 2024',
          symbol: 'CORN24',
          cropType: 'Corn',
          projectedYield: 180,
          price: 0.025,
          farmerId: 'farmer-01',
          harvestDate: '2024-09-15',
          riskLevel: 'Low' as const,
          location: 'Iowa, USA',
          image: '/corn.jpg',
          totalSupply: 10000,
          availableSupply: 7500,
          amount: Math.floor(Math.random() * 1000)
        },
        {
          id: 'wheat-2024-01',
          name: 'Kansas Wheat Yield 2024',
          symbol: 'WHEAT24',
          cropType: 'Wheat',
          projectedYield: 80,
          price: 0.018,
          farmerId: 'farmer-02',
          harvestDate: '2024-07-20',
          riskLevel: 'Medium' as const,
          location: 'Kansas, USA',
          image: '/wheat.jpg',
          totalSupply: 8000,
          availableSupply: 3200,
          amount: Math.floor(Math.random() * 800)
        },
        {
          id: 'soy-2024-01',
          name: 'Illinois Soybean Yield 2024',
          symbol: 'SOY24',
          cropType: 'Soybean',
          projectedYield: 65,
          price: 0.022,
          farmerId: 'farmer-03',
          harvestDate: '2024-10-05',
          riskLevel: 'Low' as const,
          location: 'Illinois, USA',
          image: '/soybean.jpg',
          totalSupply: 15000,
          availableSupply: 9800,
          amount: Math.floor(Math.random() * 1500)
        }
      ];
      
      // Calculate total value and projected return
      const totalValue = allTokens.reduce((sum, token) => sum + token.amount * token.price, 0);
      const projectedReturn = allTokens.reduce((sum, token) => sum + token.amount * token.price * (1 + token.projectedYield/1000), 0);
      
      resolve({
        tokens: allTokens,
        totalValue,
        projectedReturn
      });
    }, 1500);
  });
}

// Mock function for marketplace trends
export async function fetchMarketTrends(): Promise<{
  volumeData: { date: string; value: number }[];
  priceData: { date: string; value: number }[];
  popularTokens: string[];
}> {
  return new Promise((resolve) => {
    const dates = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (30 - i));
      return d.toISOString().split('T')[0];
    });
    
    // Generate some trend data
    const volumeData = dates.map(date => ({
      date,
      value: 10000 + Math.random() * 5000 + (parseInt(date.split('-')[2]) * 200)
    }));
    
    const priceData = dates.map(date => ({
      date,
      value: 0.02 + Math.random() * 0.005 + (parseInt(date.split('-')[2]) * 0.0003)
    }));
    
    const popularTokens = ['CORN24', 'WHEAT24', 'SOY24'];
    
    resolve({
      volumeData,
      priceData,
      popularTokens
    });
  });
}
