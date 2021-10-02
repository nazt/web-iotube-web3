export const iotexCCSwapPairs = {
  wTokens: [
    {
      address: '0xa00744882684c3e4747faefd68d283ea44099d03',
      name: 'Wrapped IOTX',
      decimals: 18,
      symbol: 'WIOTX',
      logoURI: 'https://iotexproject.iotex.io/iotex-token-metadata/master/images/io15qr5fzpxsnp7garl4m7k355rafzqn8grrm0grz.png',
      destAddress: '0x99B2B0eFb56E62E36960c20cD5ca8eC6ABD5557A'

    }, {
      address: '0x490CfbF9b9C43633DdD1968d062996227ef438A9',
      name: 'iMAGIC Token',
      decimals: 18,
      symbol: 'iMAGIC',
      logoURI: 'https://raw.githubusercontent.com/magiclandfinance/logo/master/logo.png',
      destAddress: '0xc1932AC6f0aD660bE341B5C980E44df31a30f528'
    }],
  ccTokens: [{
    name: 'Crosschain IOTX',
    symbol: 'CIOTX',
    address: '0x99B2B0eFb56E62E36960c20cD5ca8eC6ABD5557A',
    decimals: 18,
    logoURI: 'https://iotube.org/images/tokens/ctoken_logo.jpeg',
    destAddress: '0x0000000000000000000000000000000000000000',
  }, {
    address: '0xc1932AC6f0aD660bE341B5C980E44df31a30f528',
    name: 'Cross Chain iMAGIC',
    decimals: 18,
    symbol: 'CiMAGIC',
    logoURI: 'https://iotube.org/images/tokens/token_imagic-c.png',
    destAddress: '0x490CfbF9b9C43633DdD1968d062996227ef438A9',
  }]
};
