export const bscToIotexTokens = {
  cashier: '0x797f1465796fd89ea7135e76dbc7cdb136bba1ca',
  mintableTokenList: '0xa6ae9312D0AA3CC74d969Fcd4806d7729A321EE3',
  standardTokenList: '0x0d793F4D4287265B9bdA86b7a4083193E8743b34',
  tokens: [
    {
      address: '0x0000000000000000000000000000000000000000',
      destAddress: '0x97e6c48867fdc391a8dfe9d169ecd005d1d90283',
      name: 'Binance Coin',
      decimals: 18,
      symbol: 'BNB',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
    },
    {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      destAddress: '0x97e6c48867fdc391a8dfe9d169ecd005d1d90283',
      name: 'Wrapped BSC',
      decimals: 18,
      isWrapped: true,
      symbol: 'WBNB',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
    },
    {
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      destAddress: '0x84abcb2832be606341a50128aeb1db43aa017449',
      name: 'BUSD',
      decimals: 18,
      symbol: 'BUSD',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png'
    },
    {
      address: '0x810ee35443639348adbbc467b33310d2ab43c168',
      destAddress: '0x4d7b88403aa2f502bf289584160db01ca442426c',
      name: 'Cyclone Protocol',
      decimals: 18,
      symbol: 'CYC',
      logoURI: 'https://iotexproject.iotex.io/iotex-token-metadata/master/images/io1f4acssp65t6s90egjkzpvrdsrjjyysnvxgqjrh.png'
    },
    {
      address: '0x2aaF50869739e317AB80A57Bf87cAA35F5b60598',
      destAddress: '0x99B2B0eFb56E62E36960c20cD5ca8eC6ABD5557A',
      quickSwap: 'https://pancakeswap.finance/swap?outputCurrency=0x2aaf50869739e317ab80a57bf87caa35f5b60598&inputCurrency=0x9678E42ceBEb63F23197D726B29b1CB20d0064E5',
      quickSwapFrom: "IOTX",
      name: 'Crosschain IOTX',
      decimals: 18,
      symbol: 'CIOTX',
      logoURI: 'https://g.iotube.org/web-iotube-web3/main/public/images/tokens/ctoken_logo.jpeg'
    }
  ]
};

export const iotexBscNetTokens = {
  cashier: '0x14bf347a597aac623240ae7ac8383ae198966277',
  mintableTokenList: '0xf0cb9bca0b74aa84804e0ede74ca6dd3f577d6ea',
  standardTokenList:'0xba9b11bdaa7ae8783357f3fc10e0b42d9903ba50',
  tokens: [
    {
      address: '0x97e6c48867fdc391a8dfe9d169ecd005d1d90283',
      destAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      name: 'Binance Coin',
      decimals: 18,
      symbol: 'BNB',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png'
    },
    {
      address: '0x84abcb2832be606341a50128aeb1db43aa017449',
      destAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      name: 'Binance USD',
      decimals: 18,
      symbol: 'BUSD_b',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png'
    },
    {
      address: '0x4d7b88403aa2f502bf289584160db01ca442426c',
      destAddress: '0x810ee35443639348adbbc467b33310d2ab43c168',
      name: 'Cyclone Protocol',
      decimals: 18,
      symbol: 'CYC',
      logoURI: 'https://iotexproject.iotex.io/iotex-token-metadata/master/images/io1f4acssp65t6s90egjkzpvrdsrjjyysnvxgqjrh.png'
    },
    {
      address: '0x99B2B0eFb56E62E36960c20cD5ca8eC6ABD5557A',
      destAddress: '0x2aaF50869739e317AB80A57Bf87cAA35F5b60598',
      name: 'Crosschain IOTX',
      decimals: 18,
      symbol: 'CIOTX',
      logoURI: 'https://iotexproject.iotex.io/iotex-token-metadata/master/images/io1nxetpma4de3wx6tqcgxdtj5wc64a24t64dc76s.png'
    }
  ]
};
