'use client';

import { useState } from 'react';
import { useWalletConnection } from '@/utils/web3';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, LogOut, Copy, CheckCheck } from 'lucide-react';

export function WalletConnect() {
  const { isConnected, address, balance, network, connect, disconnect, isConnecting } = useWalletConnection();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = async () => {
    try {
      await connect();
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
    setIsOpen(false);
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard.",
      });
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isConnected ? "outline" : "default"}
          className={`transition-all duration-300 ${isConnected
            ? 'bg-cropchain-green-light text-cropchain-green hover:bg-cropchain-green-light/80'
            : 'bg-cropchain-green text-white hover:bg-cropchain-green/90'}`}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnected ? truncateAddress(address || '') : 'Connect Wallet'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-cropchain-light dark:bg-cropchain-dark border border-cropchain-gray/50 rounded-xl shadow-soft">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            {isConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {isConnected ? (
            <div className="space-y-4">
              <div className="bg-cropchain-green-light p-4 rounded-lg">
                <p className="text-sm text-cropchain-medium">Connected to</p>
                <p className="font-medium text-cropchain-dark">{network}</p>
              </div>

              <div className="bg-cropchain-gray/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-cropchain-medium">Address</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-8 px-2 text-cropchain-medium hover:text-cropchain-green"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="font-medium text-cropchain-dark break-all">{address}</p>
              </div>

              <div className="bg-cropchain-blue-light p-4 rounded-lg">
                <p className="text-sm text-cropchain-medium">Balance</p>
                <p className="font-medium text-cropchain-dark">{balance} ETH</p>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2 border-cropchain-gray/50 text-cropchain-medium hover:bg-cropchain-gray/30"
                onClick={handleDisconnect}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-cropchain-medium">
                Connect your wallet to access the yield marketplace and manage your tokens.
              </p>

              <Button
                className="w-full mt-2 bg-cropchain-green text-white hover:bg-cropchain-green/90"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WalletConnect;
