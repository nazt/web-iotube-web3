export const publicConfig = {
  isProd: import.meta.env.PROD,
  infuraId: import.meta.env.VITE_INFURA_ID,
  BSC_ACTIONS_ENDPOINT: import.meta.env.PROD ? '/api/list3': `${import.meta.env.VITE_BSC_ACTIONS_ENDPOINT}`,
  ETH_ACTIONS_ENDPOINT:  import.meta.env.PROD ? '/api/list': `${import.meta.env.VITE_ETH_ACTIONS_ENDPOINT}`,
  PLOYGON_ACTIONS_ENDPOINT:  import.meta.env.PROD ? '/api/list2': `${import.meta.env.VITE_PLOYGON_ACTIONS_ENDPOINT}`,
  IOTEX_ACTIONS_ENDPOINT:  import.meta.env.PROD ? '/api/list1': `${import.meta.env.VITE_IOTEX_ACTIONS_ENDPOINT}`,
};
