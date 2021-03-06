import { TokenState } from '@/store/lib/TokenState';

export const metamaskUtils = {
  setupNetwork: async ({
     chainId,
     chainName,
     rpcUrls,
     blockExplorerUrls,
     nativeCurrency
   }: {
    chainId: number;
    chainName: string;
    rpcUrls: string[];
    blockExplorerUrls: string[];
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  }) => {
    //@ts-ignore
    const provider = window.ethereum;
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }]
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName,
                  nativeCurrency,
                  rpcUrls,
                  blockExplorerUrls
                }
              ]
            });
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        }
      }
    } else {
      console.error('Can\'t setup the BSC network on metamask because window.ethereum is undefined');
      return false;
    }
  },
  addNetwork: async ({
                       chainId,
                       chainName,
                       rpcUrls,
                       blockExplorerUrls,
                       nativeCurrency
                     }: {
    chainId: number;
    chainName: string;
    rpcUrls: string[];
    blockExplorerUrls: string[];
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  }) => {
    //@ts-ignore
    const provider = window.ethereum;
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName,
              nativeCurrency,
              rpcUrls,
              blockExplorerUrls
            }
          ]
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  },
  addTokenToMetamask: async ({
                          tokenAddress,
                          tokenSymbol,
                          tokenDecimals,
                          tokenImage,
                        }: {
    tokenAddress: string;
    tokenSymbol: string;
    tokenDecimals: number;
    tokenImage: string;
  }) => {
    // @ts-ignore
    const tokenAdded = await (window as WindowChain).ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage.startsWith('http')? tokenImage: '',
        },
      },
    })
    return tokenAdded
  }
};
