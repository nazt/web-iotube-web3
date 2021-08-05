export const polygonToIotexTokens = {
  cashier: '0xf72CFb704d49aC7BB7FFa420AE5f084C671A29be',
  mintableTokenList: '0xC8DC8dCDFd94f9Cb953f379a7aD8Da5fdC303F3E',
  standardTokenList: '0xDe9395d2f4940aA501f9a27B98592589D14Bb0f7',
  tokens: [
    {
      address: '0x0000000000000000000000000000000000000000',
      destAddress: '0x8e66c0d6b70c0b23d39f4b21a1eac52bba8ed89a',
      name: 'Matic',
      decimals: 18,
      symbol: 'Matic',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'
    },
    {
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      destAddress: '0x8e66c0d6b70c0b23d39f4b21a1eac52bba8ed89a',
      name: 'Wrapped Matic',
      decimals: 18,
      isWrapped: true,
      symbol: 'WMatic',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'
    },
    {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      destAddress: '0x653656f84381e8a359a268f3002621bbb14c62f8',
      name: 'Wrapped Ether',
      decimals: 18,
      symbol: 'WETH-matic',
      logoURI: 'https://iotexscan.io/image/token/io1v5m9d7zrs852xkdzdresqf3phwc5cchc5crylc.png'
    },
    {
      address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
      destAddress: '0x7f0ad63c902c67b1fa1b1102b0daffb889f5d5cb',
      name: 'Wrapped BTC',
      decimals: 8,
      symbol: 'WBTC-matic',
      logoURI: 'https://iotexscan.io/image/token/io10u9dv0ys93nmr7smzyptpkhlhzylt4wtqzrvld.png'
    },
    {
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      destAddress: '0x62a9d987cbf4c45a550deed5b57b200d7a319632',
      name: 'DAI Stablecoin',
      decimals: 18,
      symbol: 'DAI-matic',
      logoURI: 'https://iotexscan.io/image/token/io1v25anp7t7nz954gdam2m27eqp4arr93jly4maa.png'
    }, {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      destAddress: '0x3cdb7c48e70b854ed2fa392e21687501d84b3afc',
      name: 'Tether USD',
      decimals: 6,
      symbol: 'USDT-matic',
      logoURI: 'https://iotexscan.io/image/token/io18ndhcj88pwz5a5h68yhzz6r4q8vykwhugq45ns.png'
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      destAddress: '0xc04da3a99d17135857bb937d2fbb321d3b6c6a81',
      name: 'USD Coin',
      decimals: 6,
      symbol: 'USDC-matic',
      logoURI: 'https://iotexscan.io/image/token/io1cpx682vazuf4s4amjd7jlwejr5akc65plgmdru.png'
    }, {
      address: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
      destAddress: '0x295ebb8c782e186bcb70d9a8124053043d1adf5c',
      name: 'SushiToken',
      decimals: 18,
      symbol: 'Sushi-matic',
      logoURI: 'https://iotexscan.io/image/token/io1990thrrc9cvxhjmsmx5pysznqs734h6uhxfxkq.png'
    }, {
      address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
      destAddress: '0xe46ba98a87dca989725e9a2389975c0bbbb8f985',
      name: 'Quickswap',
      decimals: 18,
      symbol: 'QUICK-matic',
      logoURI: 'https://iotexscan.io/image/token/io1u346nz58mj5cjuj7ng3cn96upwam37v9axtju2.png'
    }, {
      address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
      name: 'Aave Token',
      decimals: 18,
      symbol: 'AAVE-matic',
      logoURI: 'https://iotexscan.io/image/token/io14tw8gyn3p8v5fcmvh4c0w8797ryjrlrvnsr6zf.png'
    }, {
      address: '0xcFb54a6D2dA14ABeCD231174FC5735B4436965D8',
      destAddress: '0x4d7b88403aa2f502bf289584160db01ca442426c',
      name: 'Cyclone Protocol',
      decimals: 18,
      symbol: 'CYC-matic',
      logoURI: 'https://iotexscan.io/image/token/io1f4acssp65t6s90egjkzpvrdsrjjyysnvxgqjrh.png'
    }
  ]
};

//from iotex-> matic
export const iotexPolygonTokens = {
  cashier: '0x540a92dd951407ee6c94b997a43ecf30ea6d04cd',
  mintableTokenList: '0xd757adff0ec4060e2c4a15f9777767f5ca738ca9',
  standardTokenList: '0x2f8768cd292e94a0da78671974b89b87a398356e',
  tokens: [
    {
      address: '0x8e66c0d6b70c0b23d39f4b21a1eac52bba8ed89a',
      destAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      name: 'Wrapped Matic',
      decimals: 18,
      symbol: 'WMatic',
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'
    },
    {
      address: '0x653656f84381e8a359a268f3002621bbb14c62f8',
      destAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      name: 'Wrapped Ether',
      decimals: 18,
      symbol: 'WETH-matic',
      logoURI: 'https://iotexscan.io/image/token/io1v5m9d7zrs852xkdzdresqf3phwc5cchc5crylc.png'
    },
    {
      address: '0x7f0ad63c902c67b1fa1b1102b0daffb889f5d5cb',
      destAddress: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
      name: 'Wrapped BTC',
      decimals: 8,
      symbol: 'WBTC-matic',
      logoURI: 'https://iotexscan.io/image/token/io10u9dv0ys93nmr7smzyptpkhlhzylt4wtqzrvld.png'
    },
    {
      address: '0x62a9d987cbf4c45a550deed5b57b200d7a319632',
      destAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      name: 'DAI Stablecoin',
      decimals: 18,
      symbol: 'DAI-matic',
      logoURI: 'https://iotexscan.io/image/token/io1v25anp7t7nz954gdam2m27eqp4arr93jly4maa.png'
    },
    {
      address: '0x3cdb7c48e70b854ed2fa392e21687501d84b3afc',
      destAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      name: 'Tether USD',
      decimals: 6,
      symbol: 'USDT-matic',
      logoURI: 'https://iotexscan.io/image/token/io18ndhcj88pwz5a5h68yhzz6r4q8vykwhugq45ns.png'
    },
    {
      address: '0xc04da3a99d17135857bb937d2fbb321d3b6c6a81',
      destAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      name: 'USD Coin',
      decimals: 6,
      symbol: 'USDC-matic',
      logoURI: 'https://iotexscan.io/image/token/io1cpx682vazuf4s4amjd7jlwejr5akc65plgmdru.png'
    },
    {
      address: '0x295ebb8c782e186bcb70d9a8124053043d1adf5c',
      destAddress: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
      name: 'SushiToken',
      decimals: 18,
      symbol: 'Sushi-matic',
      logoURI: 'https://iotexscan.io/image/token/io1990thrrc9cvxhjmsmx5pysznqs734h6uhxfxkq.png'
    },
    {
      address: '0xe46ba98a87dca989725e9a2389975c0bbbb8f985',
      destAddress: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
      name: 'Quickswap',
      decimals: 18,
      symbol: 'QUICK-matic',
      logoURI: 'https://iotexscan.io/image/token/io1u346nz58mj5cjuj7ng3cn96upwam37v9axtju2.png'
    },
    {
      address: '0xaadc74127109d944e36cbd70f71fc5f0c921fc6c',
      destAddress: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
      name: 'Aave Token',
      decimals: 18,
      symbol: 'AAVE-matic',
      logoURI: 'https://iotexscan.io/image/token/io14tw8gyn3p8v5fcmvh4c0w8797ryjrlrvnsr6zf.png'
    },
    {
      address: '0x4d7b88403aa2f502bf289584160db01ca442426c',
      destAddress: '0xcFb54a6D2dA14ABeCD231174FC5735B4436965D8',
      name: 'Cyclone Protocol',
      decimals: 18,
      symbol: 'CYC',
      logoURI: 'https://iotexscan.io/image/token/io1f4acssp65t6s90egjkzpvrdsrjjyysnvxgqjrh.png'
    }
  ]
};
