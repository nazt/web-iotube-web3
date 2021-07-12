import { ETHMainnetConfig } from './ETHMainnetConfig';
import { BSCMainnetConfig } from './BSCMainnetConfig';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { PolygonMainnetConfig } from './PolygonMainnetConfig';

export const CashierConfig = {
  [IotexMainnetConfig.name.toLowerCase()]: {
    '0x797f1465796fd89ea7135e76dbc7cdb136bba1ca': BSCMainnetConfig,
    '0xa0fd7430852361931b23a31f84374ba3314e1682': ETHMainnetConfig,
    '0xf72cfb704d49ac7bb7ffa420ae5f084c671a29be': PolygonMainnetConfig
  },
  [ETHMainnetConfig.name.toLowerCase()]: {
    '0x44074576e015bfd4f93f074671bd5a2a55c5d9c5': IotexMainnetConfig
  },
  [BSCMainnetConfig.name.toLowerCase()]: {
    '0x14bf347a597aac623240ae7ac8383ae198966277': IotexMainnetConfig
  },
  [PolygonMainnetConfig.name.toLowerCase()]: {
    '0x540a92dd951407ee6c94b997a43ecf30ea6d04cd': IotexMainnetConfig
  }
};
