import { Observable } from 'graphql-typed-client'

export interface Query {
  exchange: Exchange | null
  exchanges: (Exchange | null)[]
  tipHeight: String
  volumes: (AmountInOneDay | null)[]
  liquidities: (AmountInOneDay | null)[]
  tokenBalances: (AmountInOneDay | null)[]
  volumesOfExchange: (AmountInOneDay | null)[]
  liquiditiesOfExchange: (AmountInOneDay | null)[]
  tokenBalancesOfExchange: (AmountInOneDay | null)[]
  actionsOfExchange: (Action | null)[]
  numOfPairs: Int
  stats: Stats
  actions: (Action | null)[]
  __typename: 'Query'
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

export interface Exchange {
  address: String
  token: Token
  supply: String
  volumeInPast24Hours: String
  volumeInPast48Hours: String
  volumeInPast7Days: String
  balanceOfToken: String
  balanceOfToken24HoursAgo: String
  balanceOfIOTX: String
  balanceOfIOTX24HoursAgo: String
  __typename: 'Exchange'
}

export interface Token {
  address: String
  decimals: Int
  name: String
  symbol: String
  __typename: 'Token'
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

export interface AmountInOneDay {
  amount: String
  date: String
  __typename: 'AmountInOneDay'
}

export enum ActionType {
  ALL = 'ALL',
  BUY_COIN = 'BUY_COIN',
  BUY_TOKEN = 'BUY_TOKEN',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export interface Action {
  hash: String
  type: ActionType
  exchange: String
  account: String
  iotxAmount: String
  tokenAmount: String
  time: String
  __typename: 'Action'
}

export interface Stats {
  numOfTransations: Int
  volume: String
  __typename: 'Stats'
}

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

export interface QueryRequest {
  exchange?: [{ exchange: String }, ExchangeRequest]
  exchanges?: [{ pagination: Pagination }, ExchangeRequest]
  tipHeight?: boolean | number
  volumes?: [{ days: Int }, AmountInOneDayRequest]
  liquidities?: [{ days: Int }, AmountInOneDayRequest]
  tokenBalances?: [{ days: Int }, AmountInOneDayRequest]
  volumesOfExchange?: [{ exchange: String; days: Int }, AmountInOneDayRequest]
  liquiditiesOfExchange?: [{ exchange: String; days: Int }, AmountInOneDayRequest]
  tokenBalancesOfExchange?: [{ exchange: String; days: Int }, AmountInOneDayRequest]
  actionsOfExchange?: [{ exchange: String; type: ActionType; pagination: Pagination }, ActionRequest]
  numOfPairs?: boolean | number
  stats?: [{ hours: Int }, StatsRequest]
  actions?: [{ type: ActionType; pagination: Pagination }, ActionRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ExchangeRequest {
  address?: boolean | number
  token?: TokenRequest
  supply?: boolean | number
  volumeInPast24Hours?: boolean | number
  volumeInPast48Hours?: boolean | number
  volumeInPast7Days?: boolean | number
  balanceOfToken?: boolean | number
  balanceOfToken24HoursAgo?: boolean | number
  balanceOfIOTX?: boolean | number
  balanceOfIOTX24HoursAgo?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenRequest {
  address?: boolean | number
  decimals?: boolean | number
  name?: boolean | number
  symbol?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface Pagination {
  skip: Int
  first: Int
}

export interface AmountInOneDayRequest {
  amount?: boolean | number
  date?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ActionRequest {
  hash?: boolean | number
  type?: boolean | number
  exchange?: boolean | number
  account?: boolean | number
  iotxAmount?: boolean | number
  tokenAmount?: boolean | number
  time?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StatsRequest {
  numOfTransations?: boolean | number
  volume?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const Exchange_possibleTypes = ['Exchange']
export const isExchange = (obj: { __typename: String }): obj is Exchange => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Exchange_possibleTypes.includes(obj.__typename)
}

const Token_possibleTypes = ['Token']
export const isToken = (obj: { __typename: String }): obj is Token => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Token_possibleTypes.includes(obj.__typename)
}

const AmountInOneDay_possibleTypes = ['AmountInOneDay']
export const isAmountInOneDay = (obj: { __typename: String }): obj is AmountInOneDay => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return AmountInOneDay_possibleTypes.includes(obj.__typename)
}

const Action_possibleTypes = ['Action']
export const isAction = (obj: { __typename: String }): obj is Action => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Action_possibleTypes.includes(obj.__typename)
}

const Stats_possibleTypes = ['Stats']
export const isStats = (obj: { __typename: String }): obj is Stats => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Stats_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  exchange: (args: {
    exchange: String
  }) => ExchangePromiseChain & {
    execute: (request: ExchangeRequest, defaultValue?: Exchange | null) => Promise<Exchange | null>
  }
  exchanges: (args: {
    pagination: Pagination
  }) => { execute: (request: ExchangeRequest, defaultValue?: (Exchange | null)[]) => Promise<(Exchange | null)[]> }
  tipHeight: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  volumes: (args: {
    days: Int
  }) => {
    execute: (request: AmountInOneDayRequest, defaultValue?: (AmountInOneDay | null)[]) => Promise<(AmountInOneDay | null)[]>
  }
  liquidities: (args: {
    days: Int
  }) => {
    execute: (request: AmountInOneDayRequest, defaultValue?: (AmountInOneDay | null)[]) => Promise<(AmountInOneDay | null)[]>
  }
  tokenBalances: (args: {
    days: Int
  }) => {
    execute: (request: AmountInOneDayRequest, defaultValue?: (AmountInOneDay | null)[]) => Promise<(AmountInOneDay | null)[]>
  }
  volumesOfExchange: (args: {
    exchange: String
    days: Int
  }) => {
    execute: (request: AmountInOneDayRequest, defaultValue?: (AmountInOneDay | null)[]) => Promise<(AmountInOneDay | null)[]>
  }
  liquiditiesOfExchange: (args: {
    exchange: String
    days: Int
  }) => {
    execute: (request: AmountInOneDayRequest, defaultValue?: (AmountInOneDay | null)[]) => Promise<(AmountInOneDay | null)[]>
  }
  tokenBalancesOfExchange: (args: {
    exchange: String
    days: Int
  }) => {
    execute: (request: AmountInOneDayRequest, defaultValue?: (AmountInOneDay | null)[]) => Promise<(AmountInOneDay | null)[]>
  }
  actionsOfExchange: (args: {
    exchange: String
    type: ActionType
    pagination: Pagination
  }) => { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Promise<(Action | null)[]> }
  numOfPairs: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  stats: (args: {
    hours: Int
  }) => StatsPromiseChain & { execute: (request: StatsRequest, defaultValue?: Stats) => Promise<Stats> }
  actions: (args: {
    type: ActionType
    pagination: Pagination
  }) => { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Promise<(Action | null)[]> }
}

export interface QueryObservableChain {
  exchange: (args: {
    exchange: String
  }) => ExchangeObservableChain & {
    execute: (request: ExchangeRequest, defaultValue?: Exchange | null) => Observable<Exchange | null>
  }
  exchanges: (args: {
    pagination: Pagination
  }) => { execute: (request: ExchangeRequest, defaultValue?: (Exchange | null)[]) => Observable<(Exchange | null)[]> }
  tipHeight: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  volumes: (args: {
    days: Int
  }) => {
    execute: (
      request: AmountInOneDayRequest,
      defaultValue?: (AmountInOneDay | null)[],
    ) => Observable<(AmountInOneDay | null)[]>
  }
  liquidities: (args: {
    days: Int
  }) => {
    execute: (
      request: AmountInOneDayRequest,
      defaultValue?: (AmountInOneDay | null)[],
    ) => Observable<(AmountInOneDay | null)[]>
  }
  tokenBalances: (args: {
    days: Int
  }) => {
    execute: (
      request: AmountInOneDayRequest,
      defaultValue?: (AmountInOneDay | null)[],
    ) => Observable<(AmountInOneDay | null)[]>
  }
  volumesOfExchange: (args: {
    exchange: String
    days: Int
  }) => {
    execute: (
      request: AmountInOneDayRequest,
      defaultValue?: (AmountInOneDay | null)[],
    ) => Observable<(AmountInOneDay | null)[]>
  }
  liquiditiesOfExchange: (args: {
    exchange: String
    days: Int
  }) => {
    execute: (
      request: AmountInOneDayRequest,
      defaultValue?: (AmountInOneDay | null)[],
    ) => Observable<(AmountInOneDay | null)[]>
  }
  tokenBalancesOfExchange: (args: {
    exchange: String
    days: Int
  }) => {
    execute: (
      request: AmountInOneDayRequest,
      defaultValue?: (AmountInOneDay | null)[],
    ) => Observable<(AmountInOneDay | null)[]>
  }
  actionsOfExchange: (args: {
    exchange: String
    type: ActionType
    pagination: Pagination
  }) => { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Observable<(Action | null)[]> }
  numOfPairs: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  stats: (args: {
    hours: Int
  }) => StatsObservableChain & { execute: (request: StatsRequest, defaultValue?: Stats) => Observable<Stats> }
  actions: (args: {
    type: ActionType
    pagination: Pagination
  }) => { execute: (request: ActionRequest, defaultValue?: (Action | null)[]) => Observable<(Action | null)[]> }
}

export interface ExchangePromiseChain {
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  token: TokenPromiseChain & { execute: (request: TokenRequest, defaultValue?: Token) => Promise<Token> }
  supply: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  volumeInPast24Hours: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  volumeInPast48Hours: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  volumeInPast7Days: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  balanceOfToken: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  balanceOfToken24HoursAgo: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  balanceOfIOTX: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  balanceOfIOTX24HoursAgo: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ExchangeObservableChain {
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  token: TokenObservableChain & { execute: (request: TokenRequest, defaultValue?: Token) => Observable<Token> }
  supply: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  volumeInPast24Hours: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  volumeInPast48Hours: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  volumeInPast7Days: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  balanceOfToken: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  balanceOfToken24HoursAgo: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  balanceOfIOTX: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  balanceOfIOTX24HoursAgo: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface TokenPromiseChain {
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  decimals: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  symbol: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface TokenObservableChain {
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  decimals: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  symbol: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface AmountInOneDayPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  date: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface AmountInOneDayObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  date: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface ActionPromiseChain {
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  type: { execute: (request?: boolean | number, defaultValue?: ActionType) => Promise<ActionType> }
  exchange: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  account: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  iotxAmount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  tokenAmount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  time: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ActionObservableChain {
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  type: { execute: (request?: boolean | number, defaultValue?: ActionType) => Observable<ActionType> }
  exchange: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  account: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  iotxAmount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  tokenAmount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  time: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface StatsPromiseChain {
  numOfTransations: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  volume: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface StatsObservableChain {
  numOfTransations: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  volume: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}
