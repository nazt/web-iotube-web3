import { Observable } from 'graphql-typed-client'

export interface Query {
  /** get chain metadata */
  chainMeta: ChainMeta
  /** get the address detail of an address */
  getAccount: GetAccountResponse
  /** get block metadata(s) by: */
  getBlockMetas: GetBlockMetasResponse
  /** get server meta data by: */
  getServerMeta: GetServerMetaResponse
  /** suggest gas price */
  suggestGasPrice: SuggestGasPriceResponse
  /** get receipt by action Hash */
  getReceiptByAction: GetReceiptByActionResponse
  /** get action(s) by: */
  getActions: GetActionsResponse
  /** read contract */
  readContract: ReadContractResponse
  /** sendAction */
  sendAction: SendActionResponse
  /** read state */
  readState: ReadStateResponse
  /** estimate gas for action */
  estimateGasForAction: EstimateGasForActionResponse
  /** get epoch meta */
  getEpochMeta: GetEpochMetaResponse
  health: String
  /** Total supply for the native IOTX token */
  totalSupply: String
  fetchCoinPrice: CoinPrice
  fetchVersionInfo: VersionInfo
  getSolcVersions: SolcVersion[]
  compileSolidity: Contract[]
  addressMeta: AddressMeta
  addressMetas: AddressMeta[]
  tokenMetadata: TokenMetadata[]
  __typename: 'Query'
}

export interface ChainMeta {
  height: String
  numActions: String
  tps: String
  epoch: Epoch
  __typename: 'ChainMeta'
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

export interface Epoch {
  num: Int
  height: Int
  gravityChainStartHeight: Int
  __typename: 'Epoch'
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

export interface GetAccountResponse {
  accountMeta: AccountMeta
  __typename: 'GetAccountResponse'
}

/** meta data describing the account */
export interface AccountMeta {
  /** iotex address */
  address: String
  balance: String
  nonce: Int
  pendingNonce: Int
  numActions: Int
  __typename: 'AccountMeta'
}

export interface GetBlockMetasResponse {
  blkMetas: BlockMeta[]
  __typename: 'GetBlockMetasResponse'
}

/** Properties of an blockMeta */
export interface BlockMeta {
  hash: String
  height: Int
  timestamp: Timestamp
  numActions: Int
  producerAddress: String
  transferAmount: String
  txRoot: String
  receiptRoot: String
  deltaStateDigest: String
  __typename: 'BlockMeta'
}

export interface Timestamp {
  seconds: Int
  nanos: Int
  __typename: 'Timestamp'
}

export interface GetServerMetaResponse {
  serverMeta: ServerMeta
  __typename: 'GetServerMetaResponse'
}

/** Server meta data */
export interface ServerMeta {
  packageVersion: String
  packageCommitID: String
  gitStatus: String
  goVersion: String
  buildTime: String
  __typename: 'ServerMeta'
}

export interface SuggestGasPriceResponse {
  gasPrice: Int
  __typename: 'SuggestGasPriceResponse'
}

export interface GetReceiptByActionResponse {
  receiptInfo: ReceiptInfo | null
  __typename: 'GetReceiptByActionResponse'
}

export interface ReceiptInfo {
  receipt: Receipt | null
  blkHash: String
  __typename: 'ReceiptInfo'
}

/** Properties of an Receipt */
export interface Receipt {
  status: ReceiptStatus
  blkHeight: Int
  actHash: Buffer
  gasConsumed: Int
  contractAddress: String
  logs: Log[] | null
  __typename: 'Receipt'
}

export enum ReceiptStatus {
  Failure = 'Failure',
  Success = 'Success',
  ErrUnknown = 'ErrUnknown',
  ErrOutOfGas = 'ErrOutOfGas',
  ErrCodeStoreOutOfGas = 'ErrCodeStoreOutOfGas',
  ErrDepth = 'ErrDepth',
  ErrContractAddressCollision = 'ErrContractAddressCollision',
  ErrNoCompatibleInterpreter = 'ErrNoCompatibleInterpreter',
  ErrExecutionReverted = 'ErrExecutionReverted',
  ErrMaxCodeSizeExceeded = 'ErrMaxCodeSizeExceeded',
  ErrWriteProtection = 'ErrWriteProtection',
  ErrLoadAccount = 'ErrLoadAccount',
  ErrNotEnoughBalance = 'ErrNotEnoughBalance',
  ErrInvalidBucketIndex = 'ErrInvalidBucketIndex',
  ErrUnauthorizedOperator = 'ErrUnauthorizedOperator',
  ErrInvalidBucketType = 'ErrInvalidBucketType',
  ErrCandidateNotExist = 'ErrCandidateNotExist',
  ErrReduceDurationBeforeMaturity = 'ErrReduceDurationBeforeMaturity',
  ErrUnstakeBeforeMaturity = 'ErrUnstakeBeforeMaturity',
  ErrWithdrawBeforeUnstake = 'ErrWithdrawBeforeUnstake',
  ErrWithdrawBeforeMaturity = 'ErrWithdrawBeforeMaturity',
  ErrCandidateAlreadyExist = 'ErrCandidateAlreadyExist',
  ErrCandidateConflict = 'ErrCandidateConflict',
}

/** JS Buffer or Uint8Array */
export type Buffer = any

/** Properties of an Log */
export interface Log {
  /** iotex address */
  contractAddress: String
  topics: Buffer[]
  data: Buffer
  blkHeight: Int
  actHash: Buffer
  index: Int
  __typename: 'Log'
}

/** The BigNumber scalar type represents numeric values with precision as in https://github.com/MikeMcl/bignumber.js/ */
export type BigNumber = any

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

export interface GetActionsResponse {
  actionInfo: ActionInfo[] | null
  __typename: 'GetActionsResponse'
}

export interface ActionInfo {
  action: Action
  actHash: String
  blkHash: String
  timestamp: Timestamp
  __typename: 'ActionInfo'
}

export interface Action {
  core: ActionCore
  senderPubKey: Buffer
  signature: Buffer
  __typename: 'Action'
}

export interface ActionCore {
  version: Int
  nonce: BigNumber
  gasLimit: BigNumber
  gasPrice: String
  transfer: Transfer | null
  execution: Execution | null
  startSubChain: StartSubChain | null
  stopSubChain: StopSubChain | null
  putBlock: PutBlock | null
  createDeposit: CreateDeposit | null
  settleDeposit: SettleDeposit | null
  createPlumChain: CreatePlumChain | null
  terminatePlumChain: TerminatePlumChain | null
  plumPutBlock: PlumPutBlock | null
  plumCreateDeposit: PlumCreateDeposit | null
  plumStartExit: PlumStartExit | null
  plumChallengeExit: PlumChallengeExit | null
  plumResponseChallengeExit: PlumResponseChallengeExit | null
  plumFinalizeExit: PlumFinalizeExit | null
  plumSettleDeposit: PlumSettleDeposit | null
  plumTransfer: PlumTransfer | null
  depositToRewardingFund: DepositToRewardingFund | null
  claimFromRewardingFund: ClaimFromRewardingFund | null
  grantReward: GrantReward | null
  putPollResult: PutPollResult | null
  stakeCreate: StakeCreate | null
  stakeUnstake: StakeReclaim | null
  stakeWithdraw: StakeReclaim | null
  stakeAddDeposit: StakeAddDeposit | null
  stakeRestake: StakeRestake | null
  stakeChangeCandidate: StakeChangeCandidate | null
  stakeTransferOwnership: StakeTransferOwnership | null
  candidateRegister: CandidateRegister | null
  candidateUpdate: CandidateBasicInfo | null
  __typename: 'ActionCore'
}

export interface Transfer {
  amount: String
  recipient: String
  payload: Buffer
  __typename: 'Transfer'
}

export interface Execution {
  amount: String
  contract: String
  data: Buffer
  __typename: 'Execution'
}

export interface StartSubChain {
  chainID: Int
  securityDeposit: Buffer
  operationDeposit: Buffer
  startHeight: Int
  parentHeightOffset: Int
  __typename: 'StartSubChain'
}

export interface StopSubChain {
  chainID: Int
  stopHeight: Int
  subChainAddress: String
  __typename: 'StopSubChain'
}

export interface PutBlock {
  subChainAddress: String
  height: Int
  roots: MerkleRoot[]
  __typename: 'PutBlock'
}

export interface MerkleRoot {
  name: String
  value: Buffer
  __typename: 'MerkleRoot'
}

export interface CreateDeposit {
  chainID: Int
  amount: Buffer
  recipient: String
  __typename: 'CreateDeposit'
}

export interface SettleDeposit {
  amount: Buffer
  recipient: String
  index: Int
  __typename: 'SettleDeposit'
}

export interface CreatePlumChain {
  TBD: Boolean | null
  __typename: 'CreatePlumChain'
}

export interface TerminatePlumChain {
  subChainAddress: String
  __typename: 'TerminatePlumChain'
}

export interface PlumPutBlock {
  subChainAddress: String
  height: Int
  roots: Map
  __typename: 'PlumPutBlock'
}

/** scalar type of map buffer */
export type Map = any

export interface PlumCreateDeposit {
  subChainAddress: String
  amount: Buffer
  recipient: String
  __typename: 'PlumCreateDeposit'
}

export interface PlumStartExit {
  subChainAddress: String
  previousTransfer: Buffer
  previousTransferBlockProof: Buffer
  previousTransferBlockHeight: Int
  exitTransfer: Buffer
  exitTransferBlockProof: Buffer
  exitTransferBlockHeight: Int
  __typename: 'PlumStartExit'
}

export interface PlumChallengeExit {
  subChainAddress: String
  coinID: Int
  challengeTransfer: Buffer
  challengeTransferBlockProof: Buffer
  challengeTransferBlockHeight: Int
  __typename: 'PlumChallengeExit'
}

export interface PlumResponseChallengeExit {
  subChainAddress: String
  coinID: Int
  challengeTransfer: Buffer
  responseTransfer: Buffer
  responseTransferBlockProof: Buffer
  previousTransferBlockHeight: Int
  __typename: 'PlumResponseChallengeExit'
}

export interface PlumFinalizeExit {
  subChainAddress: String
  coinID: Int
  __typename: 'PlumFinalizeExit'
}

export interface PlumSettleDeposit {
  coinID: Int
  __typename: 'PlumSettleDeposit'
}

export interface PlumTransfer {
  coinID: Int
  denomination: Buffer
  owner: String
  recipient: String
  __typename: 'PlumTransfer'
}

export interface DepositToRewardingFund {
  amount: String
  data: Buffer
  __typename: 'DepositToRewardingFund'
}

export interface ClaimFromRewardingFund {
  amount: String
  data: Buffer
  __typename: 'ClaimFromRewardingFund'
}

export interface GrantReward {
  type: RewardType
  height: String
  __typename: 'GrantReward'
}

export enum RewardType {
  BlockReward = 'BlockReward',
  EpochReward = 'EpochReward',
}

export interface PutPollResult {
  height: String
  candidates: CandidateList | null
  __typename: 'PutPollResult'
}

export interface CandidateList {
  candidates: Candidate[]
  __typename: 'CandidateList'
}

export interface Candidate {
  address: String
  votes: Buffer | null
  pubKey: Buffer | null
  rewardAddress: String
  __typename: 'Candidate'
}

export interface StakeCreate {
  candidateName: String
  stakedAmount: String
  stakedDuration: Int
  autoStake: Boolean
  payload: Buffer
  __typename: 'StakeCreate'
}

export interface StakeReclaim {
  bucketIndex: Int
  payload: Buffer
  __typename: 'StakeReclaim'
}

export interface StakeAddDeposit {
  amount: String
  bucketIndex: Int
  payload: Buffer
  __typename: 'StakeAddDeposit'
}

export interface StakeRestake {
  bucketIndex: Int
  stakedDuration: Int
  autoStake: Boolean
  payload: Buffer
  __typename: 'StakeRestake'
}

export interface StakeChangeCandidate {
  bucketIndex: Int
  candidateName: String
  payload: Buffer
  __typename: 'StakeChangeCandidate'
}

export interface StakeTransferOwnership {
  bucketIndex: Int
  voterAddress: String
  payload: Buffer
  __typename: 'StakeTransferOwnership'
}

export interface CandidateRegister {
  candidate: CandidateBasicInfo
  ownerAddress: String
  stakedAmount: String
  stakedDuration: Int
  autoStake: Boolean
  payload: Buffer
  __typename: 'CandidateRegister'
}

export interface CandidateBasicInfo {
  name: String
  operatorAddress: String
  rewardAddress: String
  __typename: 'CandidateBasicInfo'
}

export interface ReadContractResponse {
  data: String
  __typename: 'ReadContractResponse'
}

export interface SendActionResponse {
  actionHash: Boolean | null
  __typename: 'SendActionResponse'
}

export interface ReadStateResponse {
  data: Buffer
  __typename: 'ReadStateResponse'
}

/** Properties of a EstimateGasForActionResponse */
export interface EstimateGasForActionResponse {
  gas: String
  __typename: 'EstimateGasForActionResponse'
}

/** Properties of a GetEpochMetaResponse */
export interface GetEpochMetaResponse {
  /** GetEpochMetaResponse epochData */
  epochData: Epoch
  /** GetEpochMetaResponse totalBlocks */
  totalBlocks: Int
  /** GetEpochMetaResponse blockProducersInfo */
  blockProducersInfo: BlockProducerInfo[]
  __typename: 'GetEpochMetaResponse'
}

/** Properties of a BlockProducerInfo */
export interface BlockProducerInfo {
  /** BlockProducerInfo address */
  address: String
  /** BlockProducerInfo votes */
  votes: String
  /** BlockProducerInfo active */
  active: Boolean
  /** BlockProducerInfo production */
  production: Int
  __typename: 'BlockProducerInfo'
}

/** IOTX price information from coinmarketcap */
export interface CoinPrice {
  priceUsd: String
  marketCapUsd: String
  __typename: 'CoinPrice'
}

export interface VersionInfo {
  explorerVersion: String
  iotexCoreVersion: String | null
  __typename: 'VersionInfo'
}

export interface SolcVersion {
  name: String
  version: String
  __typename: 'SolcVersion'
}

export interface Contract {
  name: String
  abi: String
  bytecode: String
  __typename: 'Contract'
}

export interface AddressMeta {
  name: String
  __typename: 'AddressMeta'
}

export enum ProviderType {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

export enum TokenType {
  xrc20 = 'xrc20',
  xrc721 = 'xrc721',
}

export interface TokenMetadata {
  name: String
  address: String
  logo: String
  type: String
  symbol: String | null
  image_urls: String[] | null
  __typename: 'TokenMetadata'
}

export interface Mutation {
  addSubscription: SendGridInfo
  __typename: 'Mutation'
}

export interface SendGridInfo {
  isSubscribeSuccess: Boolean
  __typename: 'SendGridInfo'
}

export interface SetReward {
  amount: Buffer
  data: Buffer
  type: Int
  __typename: 'SetReward'
}

export interface SolcResult {
  contracts: Contract[]
  __typename: 'SolcResult'
}

export interface QueryRequest {
  /** get chain metadata */
  chainMeta?: ChainMetaRequest
  /** get the address detail of an address */
  getAccount?: [
    {
      /** iotex address */
      address: String
    },
    GetAccountResponseRequest,
  ]
  /** get block metadata(s) by: */
  getBlockMetas?:
    | [
        {
          /** start index and block count */
          byIndex?: GetBlockMetasByIndexRequest | null
          /** block hash */
          byHash?: GetBlockMetasByHashRequest | null
        },
        GetBlockMetasResponseRequest,
      ]
    | GetBlockMetasResponseRequest
  /** get server meta data by: */
  getServerMeta?: GetServerMetaResponseRequest
  /** suggest gas price */
  suggestGasPrice?: SuggestGasPriceResponseRequest
  /** get receipt by action Hash */
  getReceiptByAction?: [
    {
      /** action Hash */
      actionHash: String
    },
    GetReceiptByActionResponseRequest,
  ]
  /** get action(s) by: */
  getActions?:
    | [
        {
          /** start index and action count */
          byIndex?: GetActionsByIndexRequest | null
          /** address with start index and action count */
          byAddr?: GetActionsByAddressRequest | null
          /** action hash */
          byHash?: GetActionsByHashRequest | null
          byBlk?: GetActionsByBlockRequest | null
        },
        GetActionsResponseRequest,
      ]
    | GetActionsResponseRequest
  /** read contract */
  readContract?: [{ execution: ExecutionInput; callerAddress: String }, ReadContractResponseRequest]
  /** sendAction */
  sendAction?: [{ action: ActionInput }, SendActionResponseRequest]
  /** read state */
  readState?: [{ protocolID: Buffer; methodName: Buffer; arguments: Buffer[]; height: String }, ReadStateResponseRequest]
  /** estimate gas for action */
  estimateGasForAction?: [{ action: ActionInput }, EstimateGasForActionResponseRequest]
  /** get epoch meta */
  getEpochMeta?: [{ epochNumber: Int }, GetEpochMetaResponseRequest]
  health?: boolean | number
  /** Total supply for the native IOTX token */
  totalSupply?: boolean | number
  fetchCoinPrice?: CoinPriceRequest
  fetchVersionInfo?: VersionInfoRequest
  getSolcVersions?: SolcVersionRequest
  compileSolidity?: [{ source: String; version: String }, ContractRequest]
  addressMeta?: [{ address: String }, AddressMetaRequest]
  addressMetas?: AddressMetaRequest
  tokenMetadata?: [{ provider: ProviderType; type?: TokenType | null }, TokenMetadataRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ChainMetaRequest {
  height?: boolean | number
  numActions?: boolean | number
  tps?: boolean | number
  epoch?: EpochRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface EpochRequest {
  num?: boolean | number
  height?: boolean | number
  gravityChainStartHeight?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface GetAccountResponseRequest {
  accountMeta?: AccountMetaRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** meta data describing the account */
export interface AccountMetaRequest {
  /** iotex address */
  address?: boolean | number
  balance?: boolean | number
  nonce?: boolean | number
  pendingNonce?: boolean | number
  numActions?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface GetBlockMetasByIndexRequest {
  start: Int
  count: Int
}

export interface GetBlockMetasByHashRequest {
  blkHash: String
}

export interface GetBlockMetasResponseRequest {
  blkMetas?: BlockMetaRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Properties of an blockMeta */
export interface BlockMetaRequest {
  hash?: boolean | number
  height?: boolean | number
  timestamp?: TimestampRequest
  numActions?: boolean | number
  producerAddress?: boolean | number
  transferAmount?: boolean | number
  txRoot?: boolean | number
  receiptRoot?: boolean | number
  deltaStateDigest?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TimestampRequest {
  seconds?: boolean | number
  nanos?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface GetServerMetaResponseRequest {
  serverMeta?: ServerMetaRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Server meta data */
export interface ServerMetaRequest {
  packageVersion?: boolean | number
  packageCommitID?: boolean | number
  gitStatus?: boolean | number
  goVersion?: boolean | number
  buildTime?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SuggestGasPriceResponseRequest {
  gasPrice?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface GetReceiptByActionResponseRequest {
  receiptInfo?: ReceiptInfoRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ReceiptInfoRequest {
  receipt?: ReceiptRequest
  blkHash?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Properties of an Receipt */
export interface ReceiptRequest {
  status?: boolean | number
  blkHeight?: boolean | number
  actHash?: boolean | number
  gasConsumed?: boolean | number
  contractAddress?: boolean | number
  logs?: LogRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Properties of an Log */
export interface LogRequest {
  /** iotex address */
  contractAddress?: boolean | number
  topics?: boolean | number
  data?: boolean | number
  blkHeight?: boolean | number
  actHash?: boolean | number
  index?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface GetActionsByIndexRequest {
  start: BigNumber
  count: BigNumber
}

export interface GetActionsByAddressRequest {
  /** iotex address */
  address: String
  start: BigNumber
  count: BigNumber
}

export interface GetActionsByHashRequest {
  actionHash: String
  checkingPending: Boolean
}

export interface GetActionsByBlockRequest {
  blkHash: String
  start: Int
  count: Int
}

export interface GetActionsResponseRequest {
  actionInfo?: ActionInfoRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ActionInfoRequest {
  action?: ActionRequest
  actHash?: boolean | number
  blkHash?: boolean | number
  timestamp?: TimestampRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ActionRequest {
  core?: ActionCoreRequest
  senderPubKey?: boolean | number
  signature?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ActionCoreRequest {
  version?: boolean | number
  nonce?: boolean | number
  gasLimit?: boolean | number
  gasPrice?: boolean | number
  transfer?: TransferRequest
  execution?: ExecutionRequest
  startSubChain?: StartSubChainRequest
  stopSubChain?: StopSubChainRequest
  putBlock?: PutBlockRequest
  createDeposit?: CreateDepositRequest
  settleDeposit?: SettleDepositRequest
  createPlumChain?: CreatePlumChainRequest
  terminatePlumChain?: TerminatePlumChainRequest
  plumPutBlock?: PlumPutBlockRequest
  plumCreateDeposit?: PlumCreateDepositRequest
  plumStartExit?: PlumStartExitRequest
  plumChallengeExit?: PlumChallengeExitRequest
  plumResponseChallengeExit?: PlumResponseChallengeExitRequest
  plumFinalizeExit?: PlumFinalizeExitRequest
  plumSettleDeposit?: PlumSettleDepositRequest
  plumTransfer?: PlumTransferRequest
  depositToRewardingFund?: DepositToRewardingFundRequest
  claimFromRewardingFund?: ClaimFromRewardingFundRequest
  grantReward?: GrantRewardRequest
  putPollResult?: PutPollResultRequest
  stakeCreate?: StakeCreateRequest
  stakeUnstake?: StakeReclaimRequest
  stakeWithdraw?: StakeReclaimRequest
  stakeAddDeposit?: StakeAddDepositRequest
  stakeRestake?: StakeRestakeRequest
  stakeChangeCandidate?: StakeChangeCandidateRequest
  stakeTransferOwnership?: StakeTransferOwnershipRequest
  candidateRegister?: CandidateRegisterRequest
  candidateUpdate?: CandidateBasicInfoRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TransferRequest {
  amount?: boolean | number
  recipient?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ExecutionRequest {
  amount?: boolean | number
  contract?: boolean | number
  data?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StartSubChainRequest {
  chainID?: boolean | number
  securityDeposit?: boolean | number
  operationDeposit?: boolean | number
  startHeight?: boolean | number
  parentHeightOffset?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StopSubChainRequest {
  chainID?: boolean | number
  stopHeight?: boolean | number
  subChainAddress?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PutBlockRequest {
  subChainAddress?: boolean | number
  height?: boolean | number
  roots?: MerkleRootRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MerkleRootRequest {
  name?: boolean | number
  value?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CreateDepositRequest {
  chainID?: boolean | number
  amount?: boolean | number
  recipient?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SettleDepositRequest {
  amount?: boolean | number
  recipient?: boolean | number
  index?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CreatePlumChainRequest {
  TBD?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TerminatePlumChainRequest {
  subChainAddress?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumPutBlockRequest {
  subChainAddress?: boolean | number
  height?: boolean | number
  roots?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumCreateDepositRequest {
  subChainAddress?: boolean | number
  amount?: boolean | number
  recipient?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumStartExitRequest {
  subChainAddress?: boolean | number
  previousTransfer?: boolean | number
  previousTransferBlockProof?: boolean | number
  previousTransferBlockHeight?: boolean | number
  exitTransfer?: boolean | number
  exitTransferBlockProof?: boolean | number
  exitTransferBlockHeight?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumChallengeExitRequest {
  subChainAddress?: boolean | number
  coinID?: boolean | number
  challengeTransfer?: boolean | number
  challengeTransferBlockProof?: boolean | number
  challengeTransferBlockHeight?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumResponseChallengeExitRequest {
  subChainAddress?: boolean | number
  coinID?: boolean | number
  challengeTransfer?: boolean | number
  responseTransfer?: boolean | number
  responseTransferBlockProof?: boolean | number
  previousTransferBlockHeight?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumFinalizeExitRequest {
  subChainAddress?: boolean | number
  coinID?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumSettleDepositRequest {
  coinID?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PlumTransferRequest {
  coinID?: boolean | number
  denomination?: boolean | number
  owner?: boolean | number
  recipient?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface DepositToRewardingFundRequest {
  amount?: boolean | number
  data?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ClaimFromRewardingFundRequest {
  amount?: boolean | number
  data?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface GrantRewardRequest {
  type?: boolean | number
  height?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PutPollResultRequest {
  height?: boolean | number
  candidates?: CandidateListRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CandidateListRequest {
  candidates?: CandidateRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CandidateRequest {
  address?: boolean | number
  votes?: boolean | number
  pubKey?: boolean | number
  rewardAddress?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StakeCreateRequest {
  candidateName?: boolean | number
  stakedAmount?: boolean | number
  stakedDuration?: boolean | number
  autoStake?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StakeReclaimRequest {
  bucketIndex?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StakeAddDepositRequest {
  amount?: boolean | number
  bucketIndex?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StakeRestakeRequest {
  bucketIndex?: boolean | number
  stakedDuration?: boolean | number
  autoStake?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StakeChangeCandidateRequest {
  bucketIndex?: boolean | number
  candidateName?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface StakeTransferOwnershipRequest {
  bucketIndex?: boolean | number
  voterAddress?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CandidateRegisterRequest {
  candidate?: CandidateBasicInfoRequest
  ownerAddress?: boolean | number
  stakedAmount?: boolean | number
  stakedDuration?: boolean | number
  autoStake?: boolean | number
  payload?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CandidateBasicInfoRequest {
  name?: boolean | number
  operatorAddress?: boolean | number
  rewardAddress?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ExecutionInput {
  amount: String
  contract: String
  data: Buffer
}

export interface ReadContractResponseRequest {
  data?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ActionInput {
  core: ActionCoreInput
  senderPubKey: Buffer
  signature: Buffer
}

export interface ActionCoreInput {
  version: Int
  nonce: BigNumber
  gasLimit: BigNumber
  gasPrice: String
  transfer?: TransferInput | null
  execution?: ExecutionInput | null
  startSubChain?: StartSubChainInput | null
  stopSubChain?: StopSubChainInput | null
  putBlock?: PutBlockInput | null
  createDeposit?: CreateDepositInput | null
  settleDeposit?: SettleDepositInput | null
  createPlumChain?: CreatePlumChainInput | null
  terminatePlumChain?: TerminatePlumChainInput | null
  plumPutBlock?: PlumPutBlockInput | null
  plumCreateDeposit?: PlumCreateDepositInput | null
  plumStartExit?: PlumStartExitInput | null
  plumChallengeExit?: PlumChallengeExitInput | null
  plumResponseChallengeExit?: PlumResponseChallengeExitInput | null
  plumFinalizeExit?: PlumFinalizeExitInput | null
  plumSettleDeposit?: PlumSettleDepositInput | null
  plumTransfer?: PlumTransferInput | null
  depositToRewardingFund?: DepositToRewardingFundInput | null
  claimFromRewardingFund?: ClaimFromRewardingFundInput | null
  grantReward?: GrantRewardInput | null
  putPollResult?: PutPollResultInput | null
  stakeCreate?: StakeCreateInput | null
  stakeUnstake?: StakeReclaimInput | null
  stakeWithdraw?: StakeReclaimInput | null
  stakeAddDeposit?: StakeAddDepositInput | null
  stakeRestake?: StakeRestakeInput | null
  stakeChangeCandidate?: StakeChangeCandidateInput | null
  stakeTransferOwnership?: StakeTransferOwnershipInput | null
  candidateRegister?: CandidateRegisterInput | null
  candidateUpdate?: CandidateBasicInfoInput | null
}

export interface TransferInput {
  amount: String
  recipient: String
  payload: Buffer
}

export interface StartSubChainInput {
  chainID: Int
  securityDeposit: Buffer
  operationDeposit: Buffer
  startHeight: Int
  parentHeightOffset: Int
}

export interface StopSubChainInput {
  chainID: Int
  stopHeight: Int
  subChainAddress: String
}

export interface PutBlockInput {
  subChainAddress: String
  height: Int
  roots: MerkleRootInput[]
}

export interface MerkleRootInput {
  name: String
  value: Buffer
}

export interface CreateDepositInput {
  chainID: Int
  amount: Buffer
  recipient: String
}

export interface SettleDepositInput {
  amount: Buffer
  recipient: String
  index: Int
}

export interface CreatePlumChainInput {
  TBD?: Boolean | null
}

export interface TerminatePlumChainInput {
  subChainAddress: String
}

export interface PlumPutBlockInput {
  subChainAddress: String
  height: Int
  roots: Map
}

export interface PlumCreateDepositInput {
  subChainAddress: String
  amount: Buffer
  recipient: String
}

export interface PlumStartExitInput {
  subChainAddress: String
  previousTransfer: Buffer
  previousTransferBlockProof: Buffer
  previousTransferBlockHeight: Int
  exitTransfer: Buffer
  exitTransferBlockProof: Buffer
  exitTransferBlockHeight: Int
}

export interface PlumChallengeExitInput {
  subChainAddress: String
  coinID: Int
  challengeTransfer: Buffer
  challengeTransferBlockProof: Buffer
  challengeTransferBlockHeight: Int
}

export interface PlumResponseChallengeExitInput {
  subChainAddress: String
  coinID: Int
  challengeTransfer: Buffer
  responseTransfer: Buffer
  responseTransferBlockProof: Buffer
  previousTransferBlockHeight: Int
}

export interface PlumFinalizeExitInput {
  subChainAddress: String
  coinID: Int
}

export interface PlumSettleDepositInput {
  coinID: Int
}

export interface PlumTransferInput {
  coinID: Int
  denomination: Buffer
  owner: String
  recipient: String
}

export interface DepositToRewardingFundInput {
  amount: String
  data: Buffer
}

export interface ClaimFromRewardingFundInput {
  amount: String
  data: Buffer
}

export interface GrantRewardInput {
  type: RewardType
  height: String
}

export interface PutPollResultInput {
  height: String
  candidates?: CandidateListInput | null
}

export interface CandidateListInput {
  candidates: CandidateInput[]
}

export interface CandidateInput {
  address: String
  votes?: Buffer | null
  pubKey?: Buffer | null
  rewardAddress: String
}

export interface StakeCreateInput {
  candidateName: String
  stakedAmount: String
  stakedDuration: Int
  autoStake: Boolean
  payload: Buffer
}

export interface StakeReclaimInput {
  bucketIndex: Int
  payload: Buffer
}

export interface StakeAddDepositInput {
  amount: String
  bucketIndex: Int
  payload: Buffer
}

export interface StakeRestakeInput {
  bucketIndex: Int
  stakedDuration: Int
  autoStake: Boolean
  payload: Buffer
}

export interface StakeChangeCandidateInput {
  bucketIndex: Int
  candidateName: String
  payload: Buffer
}

export interface StakeTransferOwnershipInput {
  bucketIndex: Int
  voterAddress: String
  payload: Buffer
}

export interface CandidateRegisterInput {
  candidate: CandidateBasicInfoInput
  ownerAddress: String
  stakedAmount: String
  stakedDuration: Int
  autoStake: Boolean
  payload: Buffer
}

export interface CandidateBasicInfoInput {
  name: String
  operatorAddress: String
  rewardAddress: String
}

export interface SendActionResponseRequest {
  actionHash?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ReadStateResponseRequest {
  data?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Properties of a EstimateGasForActionResponse */
export interface EstimateGasForActionResponseRequest {
  gas?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Properties of a GetEpochMetaResponse */
export interface GetEpochMetaResponseRequest {
  /** GetEpochMetaResponse epochData */
  epochData?: EpochRequest
  /** GetEpochMetaResponse totalBlocks */
  totalBlocks?: boolean | number
  /** GetEpochMetaResponse blockProducersInfo */
  blockProducersInfo?: BlockProducerInfoRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Properties of a BlockProducerInfo */
export interface BlockProducerInfoRequest {
  /** BlockProducerInfo address */
  address?: boolean | number
  /** BlockProducerInfo votes */
  votes?: boolean | number
  /** BlockProducerInfo active */
  active?: boolean | number
  /** BlockProducerInfo production */
  production?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** IOTX price information from coinmarketcap */
export interface CoinPriceRequest {
  priceUsd?: boolean | number
  marketCapUsd?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface VersionInfoRequest {
  explorerVersion?: boolean | number
  iotexCoreVersion?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SolcVersionRequest {
  name?: boolean | number
  version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ContractRequest {
  name?: boolean | number
  abi?: boolean | number
  bytecode?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AddressMetaRequest {
  name?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenMetadataRequest {
  name?: boolean | number
  address?: boolean | number
  logo?: boolean | number
  type?: boolean | number
  symbol?: boolean | number
  image_urls?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationRequest {
  addSubscription?: [{ email: String }, SendGridInfoRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SendGridInfoRequest {
  isSubscribeSuccess?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SetRewardRequest {
  amount?: boolean | number
  data?: boolean | number
  type?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SolcResultRequest {
  contracts?: ContractRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TimestampInput {
  seconds: Int
  nanos: Int
}

export interface GetUnconfirmedActionsByAddressRequest {
  /** iotex address */
  address: String
  start: Int
  count: Int
}

export interface SetRewardInput {
  amount: Buffer
  data: Buffer
  type: Int
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const ChainMeta_possibleTypes = ['ChainMeta']
export const isChainMeta = (obj: { __typename: String }): obj is ChainMeta => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ChainMeta_possibleTypes.includes(obj.__typename)
}

const Epoch_possibleTypes = ['Epoch']
export const isEpoch = (obj: { __typename: String }): obj is Epoch => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Epoch_possibleTypes.includes(obj.__typename)
}

const GetAccountResponse_possibleTypes = ['GetAccountResponse']
export const isGetAccountResponse = (obj: { __typename: String }): obj is GetAccountResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return GetAccountResponse_possibleTypes.includes(obj.__typename)
}

const AccountMeta_possibleTypes = ['AccountMeta']
export const isAccountMeta = (obj: { __typename: String }): obj is AccountMeta => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return AccountMeta_possibleTypes.includes(obj.__typename)
}

const GetBlockMetasResponse_possibleTypes = ['GetBlockMetasResponse']
export const isGetBlockMetasResponse = (obj: { __typename: String }): obj is GetBlockMetasResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return GetBlockMetasResponse_possibleTypes.includes(obj.__typename)
}

const BlockMeta_possibleTypes = ['BlockMeta']
export const isBlockMeta = (obj: { __typename: String }): obj is BlockMeta => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return BlockMeta_possibleTypes.includes(obj.__typename)
}

const Timestamp_possibleTypes = ['Timestamp']
export const isTimestamp = (obj: { __typename: String }): obj is Timestamp => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Timestamp_possibleTypes.includes(obj.__typename)
}

const GetServerMetaResponse_possibleTypes = ['GetServerMetaResponse']
export const isGetServerMetaResponse = (obj: { __typename: String }): obj is GetServerMetaResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return GetServerMetaResponse_possibleTypes.includes(obj.__typename)
}

const ServerMeta_possibleTypes = ['ServerMeta']
export const isServerMeta = (obj: { __typename: String }): obj is ServerMeta => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ServerMeta_possibleTypes.includes(obj.__typename)
}

const SuggestGasPriceResponse_possibleTypes = ['SuggestGasPriceResponse']
export const isSuggestGasPriceResponse = (obj: { __typename: String }): obj is SuggestGasPriceResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return SuggestGasPriceResponse_possibleTypes.includes(obj.__typename)
}

const GetReceiptByActionResponse_possibleTypes = ['GetReceiptByActionResponse']
export const isGetReceiptByActionResponse = (obj: { __typename: String }): obj is GetReceiptByActionResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return GetReceiptByActionResponse_possibleTypes.includes(obj.__typename)
}

const ReceiptInfo_possibleTypes = ['ReceiptInfo']
export const isReceiptInfo = (obj: { __typename: String }): obj is ReceiptInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ReceiptInfo_possibleTypes.includes(obj.__typename)
}

const Receipt_possibleTypes = ['Receipt']
export const isReceipt = (obj: { __typename: String }): obj is Receipt => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Receipt_possibleTypes.includes(obj.__typename)
}

const Log_possibleTypes = ['Log']
export const isLog = (obj: { __typename: String }): obj is Log => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Log_possibleTypes.includes(obj.__typename)
}

const GetActionsResponse_possibleTypes = ['GetActionsResponse']
export const isGetActionsResponse = (obj: { __typename: String }): obj is GetActionsResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return GetActionsResponse_possibleTypes.includes(obj.__typename)
}

const ActionInfo_possibleTypes = ['ActionInfo']
export const isActionInfo = (obj: { __typename: String }): obj is ActionInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ActionInfo_possibleTypes.includes(obj.__typename)
}

const Action_possibleTypes = ['Action']
export const isAction = (obj: { __typename: String }): obj is Action => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Action_possibleTypes.includes(obj.__typename)
}

const ActionCore_possibleTypes = ['ActionCore']
export const isActionCore = (obj: { __typename: String }): obj is ActionCore => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ActionCore_possibleTypes.includes(obj.__typename)
}

const Transfer_possibleTypes = ['Transfer']
export const isTransfer = (obj: { __typename: String }): obj is Transfer => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Transfer_possibleTypes.includes(obj.__typename)
}

const Execution_possibleTypes = ['Execution']
export const isExecution = (obj: { __typename: String }): obj is Execution => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Execution_possibleTypes.includes(obj.__typename)
}

const StartSubChain_possibleTypes = ['StartSubChain']
export const isStartSubChain = (obj: { __typename: String }): obj is StartSubChain => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StartSubChain_possibleTypes.includes(obj.__typename)
}

const StopSubChain_possibleTypes = ['StopSubChain']
export const isStopSubChain = (obj: { __typename: String }): obj is StopSubChain => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StopSubChain_possibleTypes.includes(obj.__typename)
}

const PutBlock_possibleTypes = ['PutBlock']
export const isPutBlock = (obj: { __typename: String }): obj is PutBlock => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PutBlock_possibleTypes.includes(obj.__typename)
}

const MerkleRoot_possibleTypes = ['MerkleRoot']
export const isMerkleRoot = (obj: { __typename: String }): obj is MerkleRoot => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MerkleRoot_possibleTypes.includes(obj.__typename)
}

const CreateDeposit_possibleTypes = ['CreateDeposit']
export const isCreateDeposit = (obj: { __typename: String }): obj is CreateDeposit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CreateDeposit_possibleTypes.includes(obj.__typename)
}

const SettleDeposit_possibleTypes = ['SettleDeposit']
export const isSettleDeposit = (obj: { __typename: String }): obj is SettleDeposit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return SettleDeposit_possibleTypes.includes(obj.__typename)
}

const CreatePlumChain_possibleTypes = ['CreatePlumChain']
export const isCreatePlumChain = (obj: { __typename: String }): obj is CreatePlumChain => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CreatePlumChain_possibleTypes.includes(obj.__typename)
}

const TerminatePlumChain_possibleTypes = ['TerminatePlumChain']
export const isTerminatePlumChain = (obj: { __typename: String }): obj is TerminatePlumChain => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TerminatePlumChain_possibleTypes.includes(obj.__typename)
}

const PlumPutBlock_possibleTypes = ['PlumPutBlock']
export const isPlumPutBlock = (obj: { __typename: String }): obj is PlumPutBlock => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumPutBlock_possibleTypes.includes(obj.__typename)
}

const PlumCreateDeposit_possibleTypes = ['PlumCreateDeposit']
export const isPlumCreateDeposit = (obj: { __typename: String }): obj is PlumCreateDeposit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumCreateDeposit_possibleTypes.includes(obj.__typename)
}

const PlumStartExit_possibleTypes = ['PlumStartExit']
export const isPlumStartExit = (obj: { __typename: String }): obj is PlumStartExit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumStartExit_possibleTypes.includes(obj.__typename)
}

const PlumChallengeExit_possibleTypes = ['PlumChallengeExit']
export const isPlumChallengeExit = (obj: { __typename: String }): obj is PlumChallengeExit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumChallengeExit_possibleTypes.includes(obj.__typename)
}

const PlumResponseChallengeExit_possibleTypes = ['PlumResponseChallengeExit']
export const isPlumResponseChallengeExit = (obj: { __typename: String }): obj is PlumResponseChallengeExit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumResponseChallengeExit_possibleTypes.includes(obj.__typename)
}

const PlumFinalizeExit_possibleTypes = ['PlumFinalizeExit']
export const isPlumFinalizeExit = (obj: { __typename: String }): obj is PlumFinalizeExit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumFinalizeExit_possibleTypes.includes(obj.__typename)
}

const PlumSettleDeposit_possibleTypes = ['PlumSettleDeposit']
export const isPlumSettleDeposit = (obj: { __typename: String }): obj is PlumSettleDeposit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumSettleDeposit_possibleTypes.includes(obj.__typename)
}

const PlumTransfer_possibleTypes = ['PlumTransfer']
export const isPlumTransfer = (obj: { __typename: String }): obj is PlumTransfer => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PlumTransfer_possibleTypes.includes(obj.__typename)
}

const DepositToRewardingFund_possibleTypes = ['DepositToRewardingFund']
export const isDepositToRewardingFund = (obj: { __typename: String }): obj is DepositToRewardingFund => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return DepositToRewardingFund_possibleTypes.includes(obj.__typename)
}

const ClaimFromRewardingFund_possibleTypes = ['ClaimFromRewardingFund']
export const isClaimFromRewardingFund = (obj: { __typename: String }): obj is ClaimFromRewardingFund => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ClaimFromRewardingFund_possibleTypes.includes(obj.__typename)
}

const GrantReward_possibleTypes = ['GrantReward']
export const isGrantReward = (obj: { __typename: String }): obj is GrantReward => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return GrantReward_possibleTypes.includes(obj.__typename)
}

const PutPollResult_possibleTypes = ['PutPollResult']
export const isPutPollResult = (obj: { __typename: String }): obj is PutPollResult => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PutPollResult_possibleTypes.includes(obj.__typename)
}

const CandidateList_possibleTypes = ['CandidateList']
export const isCandidateList = (obj: { __typename: String }): obj is CandidateList => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CandidateList_possibleTypes.includes(obj.__typename)
}

const Candidate_possibleTypes = ['Candidate']
export const isCandidate = (obj: { __typename: String }): obj is Candidate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Candidate_possibleTypes.includes(obj.__typename)
}

const StakeCreate_possibleTypes = ['StakeCreate']
export const isStakeCreate = (obj: { __typename: String }): obj is StakeCreate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StakeCreate_possibleTypes.includes(obj.__typename)
}

const StakeReclaim_possibleTypes = ['StakeReclaim']
export const isStakeReclaim = (obj: { __typename: String }): obj is StakeReclaim => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StakeReclaim_possibleTypes.includes(obj.__typename)
}

const StakeAddDeposit_possibleTypes = ['StakeAddDeposit']
export const isStakeAddDeposit = (obj: { __typename: String }): obj is StakeAddDeposit => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StakeAddDeposit_possibleTypes.includes(obj.__typename)
}

const StakeRestake_possibleTypes = ['StakeRestake']
export const isStakeRestake = (obj: { __typename: String }): obj is StakeRestake => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StakeRestake_possibleTypes.includes(obj.__typename)
}

const StakeChangeCandidate_possibleTypes = ['StakeChangeCandidate']
export const isStakeChangeCandidate = (obj: { __typename: String }): obj is StakeChangeCandidate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StakeChangeCandidate_possibleTypes.includes(obj.__typename)
}

const StakeTransferOwnership_possibleTypes = ['StakeTransferOwnership']
export const isStakeTransferOwnership = (obj: { __typename: String }): obj is StakeTransferOwnership => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return StakeTransferOwnership_possibleTypes.includes(obj.__typename)
}

const CandidateRegister_possibleTypes = ['CandidateRegister']
export const isCandidateRegister = (obj: { __typename: String }): obj is CandidateRegister => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CandidateRegister_possibleTypes.includes(obj.__typename)
}

const CandidateBasicInfo_possibleTypes = ['CandidateBasicInfo']
export const isCandidateBasicInfo = (obj: { __typename: String }): obj is CandidateBasicInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CandidateBasicInfo_possibleTypes.includes(obj.__typename)
}

const ReadContractResponse_possibleTypes = ['ReadContractResponse']
export const isReadContractResponse = (obj: { __typename: String }): obj is ReadContractResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ReadContractResponse_possibleTypes.includes(obj.__typename)
}

const SendActionResponse_possibleTypes = ['SendActionResponse']
export const isSendActionResponse = (obj: { __typename: String }): obj is SendActionResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return SendActionResponse_possibleTypes.includes(obj.__typename)
}

const ReadStateResponse_possibleTypes = ['ReadStateResponse']
export const isReadStateResponse = (obj: { __typename: String }): obj is ReadStateResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ReadStateResponse_possibleTypes.includes(obj.__typename)
}

const EstimateGasForActionResponse_possibleTypes = ['EstimateGasForActionResponse']
export const isEstimateGasForActionResponse = (obj: { __typename: String }): obj is EstimateGasForActionResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return EstimateGasForActionResponse_possibleTypes.includes(obj.__typename)
}

const GetEpochMetaResponse_possibleTypes = ['GetEpochMetaResponse']
export const isGetEpochMetaResponse = (obj: { __typename: String }): obj is GetEpochMetaResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return GetEpochMetaResponse_possibleTypes.includes(obj.__typename)
}

const BlockProducerInfo_possibleTypes = ['BlockProducerInfo']
export const isBlockProducerInfo = (obj: { __typename: String }): obj is BlockProducerInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return BlockProducerInfo_possibleTypes.includes(obj.__typename)
}

const CoinPrice_possibleTypes = ['CoinPrice']
export const isCoinPrice = (obj: { __typename: String }): obj is CoinPrice => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CoinPrice_possibleTypes.includes(obj.__typename)
}

const VersionInfo_possibleTypes = ['VersionInfo']
export const isVersionInfo = (obj: { __typename: String }): obj is VersionInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return VersionInfo_possibleTypes.includes(obj.__typename)
}

const SolcVersion_possibleTypes = ['SolcVersion']
export const isSolcVersion = (obj: { __typename: String }): obj is SolcVersion => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return SolcVersion_possibleTypes.includes(obj.__typename)
}

const Contract_possibleTypes = ['Contract']
export const isContract = (obj: { __typename: String }): obj is Contract => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Contract_possibleTypes.includes(obj.__typename)
}

const AddressMeta_possibleTypes = ['AddressMeta']
export const isAddressMeta = (obj: { __typename: String }): obj is AddressMeta => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return AddressMeta_possibleTypes.includes(obj.__typename)
}

const TokenMetadata_possibleTypes = ['TokenMetadata']
export const isTokenMetadata = (obj: { __typename: String }): obj is TokenMetadata => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenMetadata_possibleTypes.includes(obj.__typename)
}

const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj: { __typename: String }): obj is Mutation => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Mutation_possibleTypes.includes(obj.__typename)
}

const SendGridInfo_possibleTypes = ['SendGridInfo']
export const isSendGridInfo = (obj: { __typename: String }): obj is SendGridInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return SendGridInfo_possibleTypes.includes(obj.__typename)
}

const SetReward_possibleTypes = ['SetReward']
export const isSetReward = (obj: { __typename: String }): obj is SetReward => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return SetReward_possibleTypes.includes(obj.__typename)
}

const SolcResult_possibleTypes = ['SolcResult']
export const isSolcResult = (obj: { __typename: String }): obj is SolcResult => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return SolcResult_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  /** get chain metadata */
  chainMeta: ChainMetaPromiseChain & { execute: (request: ChainMetaRequest, defaultValue?: ChainMeta) => Promise<ChainMeta> }
  /** get the address detail of an address */
  getAccount: (args: {
    /** iotex address */
    address: String
  }) => GetAccountResponsePromiseChain & {
    execute: (request: GetAccountResponseRequest, defaultValue?: GetAccountResponse) => Promise<GetAccountResponse>
  }
  /** get block metadata(s) by: */
  getBlockMetas: ((args?: {
    /** start index and block count */
    byIndex?: GetBlockMetasByIndexRequest | null
    /** block hash */
    byHash?: GetBlockMetasByHashRequest | null
  }) => GetBlockMetasResponsePromiseChain & {
    execute: (request: GetBlockMetasResponseRequest, defaultValue?: GetBlockMetasResponse) => Promise<GetBlockMetasResponse>
  }) &
    (GetBlockMetasResponsePromiseChain & {
      execute: (
        request: GetBlockMetasResponseRequest,
        defaultValue?: GetBlockMetasResponse,
      ) => Promise<GetBlockMetasResponse>
    })
  /** get server meta data by: */
  getServerMeta: GetServerMetaResponsePromiseChain & {
    execute: (request: GetServerMetaResponseRequest, defaultValue?: GetServerMetaResponse) => Promise<GetServerMetaResponse>
  }
  /** suggest gas price */
  suggestGasPrice: SuggestGasPriceResponsePromiseChain & {
    execute: (
      request: SuggestGasPriceResponseRequest,
      defaultValue?: SuggestGasPriceResponse,
    ) => Promise<SuggestGasPriceResponse>
  }
  /** get receipt by action Hash */
  getReceiptByAction: (args: {
    /** action Hash */
    actionHash: String
  }) => GetReceiptByActionResponsePromiseChain & {
    execute: (
      request: GetReceiptByActionResponseRequest,
      defaultValue?: GetReceiptByActionResponse,
    ) => Promise<GetReceiptByActionResponse>
  }
  /** get action(s) by: */
  getActions: ((args?: {
    /** start index and action count */
    byIndex?: GetActionsByIndexRequest | null
    /** address with start index and action count */
    byAddr?: GetActionsByAddressRequest | null
    /** action hash */
    byHash?: GetActionsByHashRequest | null
    byBlk?: GetActionsByBlockRequest | null
  }) => GetActionsResponsePromiseChain & {
    execute: (request: GetActionsResponseRequest, defaultValue?: GetActionsResponse) => Promise<GetActionsResponse>
  }) &
    (GetActionsResponsePromiseChain & {
      execute: (request: GetActionsResponseRequest, defaultValue?: GetActionsResponse) => Promise<GetActionsResponse>
    })
  /** read contract */
  readContract: (args: {
    execution: ExecutionInput
    callerAddress: String
  }) => ReadContractResponsePromiseChain & {
    execute: (request: ReadContractResponseRequest, defaultValue?: ReadContractResponse) => Promise<ReadContractResponse>
  }
  /** sendAction */
  sendAction: (args: {
    action: ActionInput
  }) => SendActionResponsePromiseChain & {
    execute: (request: SendActionResponseRequest, defaultValue?: SendActionResponse) => Promise<SendActionResponse>
  }
  /** read state */
  readState: (args: {
    protocolID: Buffer
    methodName: Buffer
    arguments: Buffer[]
    height: String
  }) => ReadStateResponsePromiseChain & {
    execute: (request: ReadStateResponseRequest, defaultValue?: ReadStateResponse) => Promise<ReadStateResponse>
  }
  /** estimate gas for action */
  estimateGasForAction: (args: {
    action: ActionInput
  }) => EstimateGasForActionResponsePromiseChain & {
    execute: (
      request: EstimateGasForActionResponseRequest,
      defaultValue?: EstimateGasForActionResponse,
    ) => Promise<EstimateGasForActionResponse>
  }
  /** get epoch meta */
  getEpochMeta: (args: {
    epochNumber: Int
  }) => GetEpochMetaResponsePromiseChain & {
    execute: (request: GetEpochMetaResponseRequest, defaultValue?: GetEpochMetaResponse) => Promise<GetEpochMetaResponse>
  }
  health: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  /** Total supply for the native IOTX token */
  totalSupply: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  fetchCoinPrice: CoinPricePromiseChain & {
    execute: (request: CoinPriceRequest, defaultValue?: CoinPrice) => Promise<CoinPrice>
  }
  fetchVersionInfo: VersionInfoPromiseChain & {
    execute: (request: VersionInfoRequest, defaultValue?: VersionInfo) => Promise<VersionInfo>
  }
  getSolcVersions: { execute: (request: SolcVersionRequest, defaultValue?: SolcVersion[]) => Promise<SolcVersion[]> }
  compileSolidity: (args: {
    source: String
    version: String
  }) => { execute: (request: ContractRequest, defaultValue?: Contract[]) => Promise<Contract[]> }
  addressMeta: (args: {
    address: String
  }) => AddressMetaPromiseChain & {
    execute: (request: AddressMetaRequest, defaultValue?: AddressMeta) => Promise<AddressMeta>
  }
  addressMetas: { execute: (request: AddressMetaRequest, defaultValue?: AddressMeta[]) => Promise<AddressMeta[]> }
  tokenMetadata: (args: {
    provider: ProviderType
    type?: TokenType | null
  }) => { execute: (request: TokenMetadataRequest, defaultValue?: TokenMetadata[]) => Promise<TokenMetadata[]> }
}

export interface QueryObservableChain {
  /** get chain metadata */
  chainMeta: ChainMetaObservableChain & {
    execute: (request: ChainMetaRequest, defaultValue?: ChainMeta) => Observable<ChainMeta>
  }
  /** get the address detail of an address */
  getAccount: (args: {
    /** iotex address */
    address: String
  }) => GetAccountResponseObservableChain & {
    execute: (request: GetAccountResponseRequest, defaultValue?: GetAccountResponse) => Observable<GetAccountResponse>
  }
  /** get block metadata(s) by: */
  getBlockMetas: ((args?: {
    /** start index and block count */
    byIndex?: GetBlockMetasByIndexRequest | null
    /** block hash */
    byHash?: GetBlockMetasByHashRequest | null
  }) => GetBlockMetasResponseObservableChain & {
    execute: (
      request: GetBlockMetasResponseRequest,
      defaultValue?: GetBlockMetasResponse,
    ) => Observable<GetBlockMetasResponse>
  }) &
    (GetBlockMetasResponseObservableChain & {
      execute: (
        request: GetBlockMetasResponseRequest,
        defaultValue?: GetBlockMetasResponse,
      ) => Observable<GetBlockMetasResponse>
    })
  /** get server meta data by: */
  getServerMeta: GetServerMetaResponseObservableChain & {
    execute: (
      request: GetServerMetaResponseRequest,
      defaultValue?: GetServerMetaResponse,
    ) => Observable<GetServerMetaResponse>
  }
  /** suggest gas price */
  suggestGasPrice: SuggestGasPriceResponseObservableChain & {
    execute: (
      request: SuggestGasPriceResponseRequest,
      defaultValue?: SuggestGasPriceResponse,
    ) => Observable<SuggestGasPriceResponse>
  }
  /** get receipt by action Hash */
  getReceiptByAction: (args: {
    /** action Hash */
    actionHash: String
  }) => GetReceiptByActionResponseObservableChain & {
    execute: (
      request: GetReceiptByActionResponseRequest,
      defaultValue?: GetReceiptByActionResponse,
    ) => Observable<GetReceiptByActionResponse>
  }
  /** get action(s) by: */
  getActions: ((args?: {
    /** start index and action count */
    byIndex?: GetActionsByIndexRequest | null
    /** address with start index and action count */
    byAddr?: GetActionsByAddressRequest | null
    /** action hash */
    byHash?: GetActionsByHashRequest | null
    byBlk?: GetActionsByBlockRequest | null
  }) => GetActionsResponseObservableChain & {
    execute: (request: GetActionsResponseRequest, defaultValue?: GetActionsResponse) => Observable<GetActionsResponse>
  }) &
    (GetActionsResponseObservableChain & {
      execute: (request: GetActionsResponseRequest, defaultValue?: GetActionsResponse) => Observable<GetActionsResponse>
    })
  /** read contract */
  readContract: (args: {
    execution: ExecutionInput
    callerAddress: String
  }) => ReadContractResponseObservableChain & {
    execute: (request: ReadContractResponseRequest, defaultValue?: ReadContractResponse) => Observable<ReadContractResponse>
  }
  /** sendAction */
  sendAction: (args: {
    action: ActionInput
  }) => SendActionResponseObservableChain & {
    execute: (request: SendActionResponseRequest, defaultValue?: SendActionResponse) => Observable<SendActionResponse>
  }
  /** read state */
  readState: (args: {
    protocolID: Buffer
    methodName: Buffer
    arguments: Buffer[]
    height: String
  }) => ReadStateResponseObservableChain & {
    execute: (request: ReadStateResponseRequest, defaultValue?: ReadStateResponse) => Observable<ReadStateResponse>
  }
  /** estimate gas for action */
  estimateGasForAction: (args: {
    action: ActionInput
  }) => EstimateGasForActionResponseObservableChain & {
    execute: (
      request: EstimateGasForActionResponseRequest,
      defaultValue?: EstimateGasForActionResponse,
    ) => Observable<EstimateGasForActionResponse>
  }
  /** get epoch meta */
  getEpochMeta: (args: {
    epochNumber: Int
  }) => GetEpochMetaResponseObservableChain & {
    execute: (request: GetEpochMetaResponseRequest, defaultValue?: GetEpochMetaResponse) => Observable<GetEpochMetaResponse>
  }
  health: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  /** Total supply for the native IOTX token */
  totalSupply: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  fetchCoinPrice: CoinPriceObservableChain & {
    execute: (request: CoinPriceRequest, defaultValue?: CoinPrice) => Observable<CoinPrice>
  }
  fetchVersionInfo: VersionInfoObservableChain & {
    execute: (request: VersionInfoRequest, defaultValue?: VersionInfo) => Observable<VersionInfo>
  }
  getSolcVersions: { execute: (request: SolcVersionRequest, defaultValue?: SolcVersion[]) => Observable<SolcVersion[]> }
  compileSolidity: (args: {
    source: String
    version: String
  }) => { execute: (request: ContractRequest, defaultValue?: Contract[]) => Observable<Contract[]> }
  addressMeta: (args: {
    address: String
  }) => AddressMetaObservableChain & {
    execute: (request: AddressMetaRequest, defaultValue?: AddressMeta) => Observable<AddressMeta>
  }
  addressMetas: { execute: (request: AddressMetaRequest, defaultValue?: AddressMeta[]) => Observable<AddressMeta[]> }
  tokenMetadata: (args: {
    provider: ProviderType
    type?: TokenType | null
  }) => { execute: (request: TokenMetadataRequest, defaultValue?: TokenMetadata[]) => Observable<TokenMetadata[]> }
}

export interface ChainMetaPromiseChain {
  height: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  numActions: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  tps: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  epoch: EpochPromiseChain & { execute: (request: EpochRequest, defaultValue?: Epoch) => Promise<Epoch> }
}

export interface ChainMetaObservableChain {
  height: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  numActions: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  tps: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  epoch: EpochObservableChain & { execute: (request: EpochRequest, defaultValue?: Epoch) => Observable<Epoch> }
}

export interface EpochPromiseChain {
  num: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  gravityChainStartHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface EpochObservableChain {
  num: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  gravityChainStartHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface GetAccountResponsePromiseChain {
  accountMeta: AccountMetaPromiseChain & {
    execute: (request: AccountMetaRequest, defaultValue?: AccountMeta) => Promise<AccountMeta>
  }
}

export interface GetAccountResponseObservableChain {
  accountMeta: AccountMetaObservableChain & {
    execute: (request: AccountMetaRequest, defaultValue?: AccountMeta) => Observable<AccountMeta>
  }
}

/** meta data describing the account */
export interface AccountMetaPromiseChain {
  /** iotex address */
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  balance: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  nonce: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  pendingNonce: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  numActions: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

/** meta data describing the account */
export interface AccountMetaObservableChain {
  /** iotex address */
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  balance: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  nonce: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  pendingNonce: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  numActions: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface GetBlockMetasResponsePromiseChain {
  blkMetas: { execute: (request: BlockMetaRequest, defaultValue?: BlockMeta[]) => Promise<BlockMeta[]> }
}

export interface GetBlockMetasResponseObservableChain {
  blkMetas: { execute: (request: BlockMetaRequest, defaultValue?: BlockMeta[]) => Observable<BlockMeta[]> }
}

/** Properties of an blockMeta */
export interface BlockMetaPromiseChain {
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  timestamp: TimestampPromiseChain & { execute: (request: TimestampRequest, defaultValue?: Timestamp) => Promise<Timestamp> }
  numActions: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  producerAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  transferAmount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  txRoot: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  receiptRoot: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  deltaStateDigest: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

/** Properties of an blockMeta */
export interface BlockMetaObservableChain {
  hash: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  timestamp: TimestampObservableChain & {
    execute: (request: TimestampRequest, defaultValue?: Timestamp) => Observable<Timestamp>
  }
  numActions: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  producerAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  transferAmount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  txRoot: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  receiptRoot: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  deltaStateDigest: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface TimestampPromiseChain {
  seconds: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  nanos: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface TimestampObservableChain {
  seconds: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  nanos: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface GetServerMetaResponsePromiseChain {
  serverMeta: ServerMetaPromiseChain & {
    execute: (request: ServerMetaRequest, defaultValue?: ServerMeta) => Promise<ServerMeta>
  }
}

export interface GetServerMetaResponseObservableChain {
  serverMeta: ServerMetaObservableChain & {
    execute: (request: ServerMetaRequest, defaultValue?: ServerMeta) => Observable<ServerMeta>
  }
}

/** Server meta data */
export interface ServerMetaPromiseChain {
  packageVersion: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  packageCommitID: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  gitStatus: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  goVersion: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  buildTime: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

/** Server meta data */
export interface ServerMetaObservableChain {
  packageVersion: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  packageCommitID: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  gitStatus: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  goVersion: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  buildTime: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface SuggestGasPriceResponsePromiseChain {
  gasPrice: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface SuggestGasPriceResponseObservableChain {
  gasPrice: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface GetReceiptByActionResponsePromiseChain {
  receiptInfo: ReceiptInfoPromiseChain & {
    execute: (request: ReceiptInfoRequest, defaultValue?: ReceiptInfo | null) => Promise<ReceiptInfo | null>
  }
}

export interface GetReceiptByActionResponseObservableChain {
  receiptInfo: ReceiptInfoObservableChain & {
    execute: (request: ReceiptInfoRequest, defaultValue?: ReceiptInfo | null) => Observable<ReceiptInfo | null>
  }
}

export interface ReceiptInfoPromiseChain {
  receipt: ReceiptPromiseChain & {
    execute: (request: ReceiptRequest, defaultValue?: Receipt | null) => Promise<Receipt | null>
  }
  blkHash: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ReceiptInfoObservableChain {
  receipt: ReceiptObservableChain & {
    execute: (request: ReceiptRequest, defaultValue?: Receipt | null) => Observable<Receipt | null>
  }
  blkHash: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

/** Properties of an Receipt */
export interface ReceiptPromiseChain {
  status: { execute: (request?: boolean | number, defaultValue?: ReceiptStatus) => Promise<ReceiptStatus> }
  blkHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  actHash: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  gasConsumed: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  contractAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  logs: { execute: (request: LogRequest, defaultValue?: Log[] | null) => Promise<Log[] | null> }
}

/** Properties of an Receipt */
export interface ReceiptObservableChain {
  status: { execute: (request?: boolean | number, defaultValue?: ReceiptStatus) => Observable<ReceiptStatus> }
  blkHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  actHash: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  gasConsumed: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  contractAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  logs: { execute: (request: LogRequest, defaultValue?: Log[] | null) => Observable<Log[] | null> }
}

/** Properties of an Log */
export interface LogPromiseChain {
  /** iotex address */
  contractAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  topics: { execute: (request?: boolean | number, defaultValue?: Buffer[]) => Promise<Buffer[]> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  blkHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  actHash: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  index: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

/** Properties of an Log */
export interface LogObservableChain {
  /** iotex address */
  contractAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  topics: { execute: (request?: boolean | number, defaultValue?: Buffer[]) => Observable<Buffer[]> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  blkHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  actHash: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  index: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface GetActionsResponsePromiseChain {
  actionInfo: { execute: (request: ActionInfoRequest, defaultValue?: ActionInfo[] | null) => Promise<ActionInfo[] | null> }
}

export interface GetActionsResponseObservableChain {
  actionInfo: {
    execute: (request: ActionInfoRequest, defaultValue?: ActionInfo[] | null) => Observable<ActionInfo[] | null>
  }
}

export interface ActionInfoPromiseChain {
  action: ActionPromiseChain & { execute: (request: ActionRequest, defaultValue?: Action) => Promise<Action> }
  actHash: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  blkHash: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  timestamp: TimestampPromiseChain & { execute: (request: TimestampRequest, defaultValue?: Timestamp) => Promise<Timestamp> }
}

export interface ActionInfoObservableChain {
  action: ActionObservableChain & { execute: (request: ActionRequest, defaultValue?: Action) => Observable<Action> }
  actHash: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  blkHash: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  timestamp: TimestampObservableChain & {
    execute: (request: TimestampRequest, defaultValue?: Timestamp) => Observable<Timestamp>
  }
}

export interface ActionPromiseChain {
  core: ActionCorePromiseChain & { execute: (request: ActionCoreRequest, defaultValue?: ActionCore) => Promise<ActionCore> }
  senderPubKey: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  signature: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface ActionObservableChain {
  core: ActionCoreObservableChain & {
    execute: (request: ActionCoreRequest, defaultValue?: ActionCore) => Observable<ActionCore>
  }
  senderPubKey: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  signature: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface ActionCorePromiseChain {
  version: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  nonce: { execute: (request?: boolean | number, defaultValue?: BigNumber) => Promise<BigNumber> }
  gasLimit: { execute: (request?: boolean | number, defaultValue?: BigNumber) => Promise<BigNumber> }
  gasPrice: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  transfer: TransferPromiseChain & {
    execute: (request: TransferRequest, defaultValue?: Transfer | null) => Promise<Transfer | null>
  }
  execution: ExecutionPromiseChain & {
    execute: (request: ExecutionRequest, defaultValue?: Execution | null) => Promise<Execution | null>
  }
  startSubChain: StartSubChainPromiseChain & {
    execute: (request: StartSubChainRequest, defaultValue?: StartSubChain | null) => Promise<StartSubChain | null>
  }
  stopSubChain: StopSubChainPromiseChain & {
    execute: (request: StopSubChainRequest, defaultValue?: StopSubChain | null) => Promise<StopSubChain | null>
  }
  putBlock: PutBlockPromiseChain & {
    execute: (request: PutBlockRequest, defaultValue?: PutBlock | null) => Promise<PutBlock | null>
  }
  createDeposit: CreateDepositPromiseChain & {
    execute: (request: CreateDepositRequest, defaultValue?: CreateDeposit | null) => Promise<CreateDeposit | null>
  }
  settleDeposit: SettleDepositPromiseChain & {
    execute: (request: SettleDepositRequest, defaultValue?: SettleDeposit | null) => Promise<SettleDeposit | null>
  }
  createPlumChain: CreatePlumChainPromiseChain & {
    execute: (request: CreatePlumChainRequest, defaultValue?: CreatePlumChain | null) => Promise<CreatePlumChain | null>
  }
  terminatePlumChain: TerminatePlumChainPromiseChain & {
    execute: (
      request: TerminatePlumChainRequest,
      defaultValue?: TerminatePlumChain | null,
    ) => Promise<TerminatePlumChain | null>
  }
  plumPutBlock: PlumPutBlockPromiseChain & {
    execute: (request: PlumPutBlockRequest, defaultValue?: PlumPutBlock | null) => Promise<PlumPutBlock | null>
  }
  plumCreateDeposit: PlumCreateDepositPromiseChain & {
    execute: (
      request: PlumCreateDepositRequest,
      defaultValue?: PlumCreateDeposit | null,
    ) => Promise<PlumCreateDeposit | null>
  }
  plumStartExit: PlumStartExitPromiseChain & {
    execute: (request: PlumStartExitRequest, defaultValue?: PlumStartExit | null) => Promise<PlumStartExit | null>
  }
  plumChallengeExit: PlumChallengeExitPromiseChain & {
    execute: (
      request: PlumChallengeExitRequest,
      defaultValue?: PlumChallengeExit | null,
    ) => Promise<PlumChallengeExit | null>
  }
  plumResponseChallengeExit: PlumResponseChallengeExitPromiseChain & {
    execute: (
      request: PlumResponseChallengeExitRequest,
      defaultValue?: PlumResponseChallengeExit | null,
    ) => Promise<PlumResponseChallengeExit | null>
  }
  plumFinalizeExit: PlumFinalizeExitPromiseChain & {
    execute: (request: PlumFinalizeExitRequest, defaultValue?: PlumFinalizeExit | null) => Promise<PlumFinalizeExit | null>
  }
  plumSettleDeposit: PlumSettleDepositPromiseChain & {
    execute: (
      request: PlumSettleDepositRequest,
      defaultValue?: PlumSettleDeposit | null,
    ) => Promise<PlumSettleDeposit | null>
  }
  plumTransfer: PlumTransferPromiseChain & {
    execute: (request: PlumTransferRequest, defaultValue?: PlumTransfer | null) => Promise<PlumTransfer | null>
  }
  depositToRewardingFund: DepositToRewardingFundPromiseChain & {
    execute: (
      request: DepositToRewardingFundRequest,
      defaultValue?: DepositToRewardingFund | null,
    ) => Promise<DepositToRewardingFund | null>
  }
  claimFromRewardingFund: ClaimFromRewardingFundPromiseChain & {
    execute: (
      request: ClaimFromRewardingFundRequest,
      defaultValue?: ClaimFromRewardingFund | null,
    ) => Promise<ClaimFromRewardingFund | null>
  }
  grantReward: GrantRewardPromiseChain & {
    execute: (request: GrantRewardRequest, defaultValue?: GrantReward | null) => Promise<GrantReward | null>
  }
  putPollResult: PutPollResultPromiseChain & {
    execute: (request: PutPollResultRequest, defaultValue?: PutPollResult | null) => Promise<PutPollResult | null>
  }
  stakeCreate: StakeCreatePromiseChain & {
    execute: (request: StakeCreateRequest, defaultValue?: StakeCreate | null) => Promise<StakeCreate | null>
  }
  stakeUnstake: StakeReclaimPromiseChain & {
    execute: (request: StakeReclaimRequest, defaultValue?: StakeReclaim | null) => Promise<StakeReclaim | null>
  }
  stakeWithdraw: StakeReclaimPromiseChain & {
    execute: (request: StakeReclaimRequest, defaultValue?: StakeReclaim | null) => Promise<StakeReclaim | null>
  }
  stakeAddDeposit: StakeAddDepositPromiseChain & {
    execute: (request: StakeAddDepositRequest, defaultValue?: StakeAddDeposit | null) => Promise<StakeAddDeposit | null>
  }
  stakeRestake: StakeRestakePromiseChain & {
    execute: (request: StakeRestakeRequest, defaultValue?: StakeRestake | null) => Promise<StakeRestake | null>
  }
  stakeChangeCandidate: StakeChangeCandidatePromiseChain & {
    execute: (
      request: StakeChangeCandidateRequest,
      defaultValue?: StakeChangeCandidate | null,
    ) => Promise<StakeChangeCandidate | null>
  }
  stakeTransferOwnership: StakeTransferOwnershipPromiseChain & {
    execute: (
      request: StakeTransferOwnershipRequest,
      defaultValue?: StakeTransferOwnership | null,
    ) => Promise<StakeTransferOwnership | null>
  }
  candidateRegister: CandidateRegisterPromiseChain & {
    execute: (
      request: CandidateRegisterRequest,
      defaultValue?: CandidateRegister | null,
    ) => Promise<CandidateRegister | null>
  }
  candidateUpdate: CandidateBasicInfoPromiseChain & {
    execute: (
      request: CandidateBasicInfoRequest,
      defaultValue?: CandidateBasicInfo | null,
    ) => Promise<CandidateBasicInfo | null>
  }
}

export interface ActionCoreObservableChain {
  version: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  nonce: { execute: (request?: boolean | number, defaultValue?: BigNumber) => Observable<BigNumber> }
  gasLimit: { execute: (request?: boolean | number, defaultValue?: BigNumber) => Observable<BigNumber> }
  gasPrice: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  transfer: TransferObservableChain & {
    execute: (request: TransferRequest, defaultValue?: Transfer | null) => Observable<Transfer | null>
  }
  execution: ExecutionObservableChain & {
    execute: (request: ExecutionRequest, defaultValue?: Execution | null) => Observable<Execution | null>
  }
  startSubChain: StartSubChainObservableChain & {
    execute: (request: StartSubChainRequest, defaultValue?: StartSubChain | null) => Observable<StartSubChain | null>
  }
  stopSubChain: StopSubChainObservableChain & {
    execute: (request: StopSubChainRequest, defaultValue?: StopSubChain | null) => Observable<StopSubChain | null>
  }
  putBlock: PutBlockObservableChain & {
    execute: (request: PutBlockRequest, defaultValue?: PutBlock | null) => Observable<PutBlock | null>
  }
  createDeposit: CreateDepositObservableChain & {
    execute: (request: CreateDepositRequest, defaultValue?: CreateDeposit | null) => Observable<CreateDeposit | null>
  }
  settleDeposit: SettleDepositObservableChain & {
    execute: (request: SettleDepositRequest, defaultValue?: SettleDeposit | null) => Observable<SettleDeposit | null>
  }
  createPlumChain: CreatePlumChainObservableChain & {
    execute: (request: CreatePlumChainRequest, defaultValue?: CreatePlumChain | null) => Observable<CreatePlumChain | null>
  }
  terminatePlumChain: TerminatePlumChainObservableChain & {
    execute: (
      request: TerminatePlumChainRequest,
      defaultValue?: TerminatePlumChain | null,
    ) => Observable<TerminatePlumChain | null>
  }
  plumPutBlock: PlumPutBlockObservableChain & {
    execute: (request: PlumPutBlockRequest, defaultValue?: PlumPutBlock | null) => Observable<PlumPutBlock | null>
  }
  plumCreateDeposit: PlumCreateDepositObservableChain & {
    execute: (
      request: PlumCreateDepositRequest,
      defaultValue?: PlumCreateDeposit | null,
    ) => Observable<PlumCreateDeposit | null>
  }
  plumStartExit: PlumStartExitObservableChain & {
    execute: (request: PlumStartExitRequest, defaultValue?: PlumStartExit | null) => Observable<PlumStartExit | null>
  }
  plumChallengeExit: PlumChallengeExitObservableChain & {
    execute: (
      request: PlumChallengeExitRequest,
      defaultValue?: PlumChallengeExit | null,
    ) => Observable<PlumChallengeExit | null>
  }
  plumResponseChallengeExit: PlumResponseChallengeExitObservableChain & {
    execute: (
      request: PlumResponseChallengeExitRequest,
      defaultValue?: PlumResponseChallengeExit | null,
    ) => Observable<PlumResponseChallengeExit | null>
  }
  plumFinalizeExit: PlumFinalizeExitObservableChain & {
    execute: (
      request: PlumFinalizeExitRequest,
      defaultValue?: PlumFinalizeExit | null,
    ) => Observable<PlumFinalizeExit | null>
  }
  plumSettleDeposit: PlumSettleDepositObservableChain & {
    execute: (
      request: PlumSettleDepositRequest,
      defaultValue?: PlumSettleDeposit | null,
    ) => Observable<PlumSettleDeposit | null>
  }
  plumTransfer: PlumTransferObservableChain & {
    execute: (request: PlumTransferRequest, defaultValue?: PlumTransfer | null) => Observable<PlumTransfer | null>
  }
  depositToRewardingFund: DepositToRewardingFundObservableChain & {
    execute: (
      request: DepositToRewardingFundRequest,
      defaultValue?: DepositToRewardingFund | null,
    ) => Observable<DepositToRewardingFund | null>
  }
  claimFromRewardingFund: ClaimFromRewardingFundObservableChain & {
    execute: (
      request: ClaimFromRewardingFundRequest,
      defaultValue?: ClaimFromRewardingFund | null,
    ) => Observable<ClaimFromRewardingFund | null>
  }
  grantReward: GrantRewardObservableChain & {
    execute: (request: GrantRewardRequest, defaultValue?: GrantReward | null) => Observable<GrantReward | null>
  }
  putPollResult: PutPollResultObservableChain & {
    execute: (request: PutPollResultRequest, defaultValue?: PutPollResult | null) => Observable<PutPollResult | null>
  }
  stakeCreate: StakeCreateObservableChain & {
    execute: (request: StakeCreateRequest, defaultValue?: StakeCreate | null) => Observable<StakeCreate | null>
  }
  stakeUnstake: StakeReclaimObservableChain & {
    execute: (request: StakeReclaimRequest, defaultValue?: StakeReclaim | null) => Observable<StakeReclaim | null>
  }
  stakeWithdraw: StakeReclaimObservableChain & {
    execute: (request: StakeReclaimRequest, defaultValue?: StakeReclaim | null) => Observable<StakeReclaim | null>
  }
  stakeAddDeposit: StakeAddDepositObservableChain & {
    execute: (request: StakeAddDepositRequest, defaultValue?: StakeAddDeposit | null) => Observable<StakeAddDeposit | null>
  }
  stakeRestake: StakeRestakeObservableChain & {
    execute: (request: StakeRestakeRequest, defaultValue?: StakeRestake | null) => Observable<StakeRestake | null>
  }
  stakeChangeCandidate: StakeChangeCandidateObservableChain & {
    execute: (
      request: StakeChangeCandidateRequest,
      defaultValue?: StakeChangeCandidate | null,
    ) => Observable<StakeChangeCandidate | null>
  }
  stakeTransferOwnership: StakeTransferOwnershipObservableChain & {
    execute: (
      request: StakeTransferOwnershipRequest,
      defaultValue?: StakeTransferOwnership | null,
    ) => Observable<StakeTransferOwnership | null>
  }
  candidateRegister: CandidateRegisterObservableChain & {
    execute: (
      request: CandidateRegisterRequest,
      defaultValue?: CandidateRegister | null,
    ) => Observable<CandidateRegister | null>
  }
  candidateUpdate: CandidateBasicInfoObservableChain & {
    execute: (
      request: CandidateBasicInfoRequest,
      defaultValue?: CandidateBasicInfo | null,
    ) => Observable<CandidateBasicInfo | null>
  }
}

export interface TransferPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface TransferObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface ExecutionPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  contract: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface ExecutionObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  contract: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface StartSubChainPromiseChain {
  chainID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  securityDeposit: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  operationDeposit: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  startHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  parentHeightOffset: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface StartSubChainObservableChain {
  chainID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  securityDeposit: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  operationDeposit: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  startHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  parentHeightOffset: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface StopSubChainPromiseChain {
  chainID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  stopHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface StopSubChainObservableChain {
  chainID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  stopHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface PutBlockPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  roots: { execute: (request: MerkleRootRequest, defaultValue?: MerkleRoot[]) => Promise<MerkleRoot[]> }
}

export interface PutBlockObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  roots: { execute: (request: MerkleRootRequest, defaultValue?: MerkleRoot[]) => Observable<MerkleRoot[]> }
}

export interface MerkleRootPromiseChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  value: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface MerkleRootObservableChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  value: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface CreateDepositPromiseChain {
  chainID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface CreateDepositObservableChain {
  chainID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface SettleDepositPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  index: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface SettleDepositObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  index: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface CreatePlumChainPromiseChain {
  TBD: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
}

export interface CreatePlumChainObservableChain {
  TBD: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
}

export interface TerminatePlumChainPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface TerminatePlumChainObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface PlumPutBlockPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  roots: { execute: (request?: boolean | number, defaultValue?: Map) => Promise<Map> }
}

export interface PlumPutBlockObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  height: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  roots: { execute: (request?: boolean | number, defaultValue?: Map) => Observable<Map> }
}

export interface PlumCreateDepositPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface PlumCreateDepositObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface PlumStartExitPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  previousTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  previousTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  previousTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  exitTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  exitTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  exitTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface PlumStartExitObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  previousTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  previousTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  previousTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  exitTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  exitTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  exitTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface PlumChallengeExitPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  challengeTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  challengeTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  challengeTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface PlumChallengeExitObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  challengeTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  challengeTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  challengeTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface PlumResponseChallengeExitPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  challengeTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  responseTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  responseTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  previousTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface PlumResponseChallengeExitObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  challengeTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  responseTransfer: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  responseTransferBlockProof: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  previousTransferBlockHeight: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface PlumFinalizeExitPromiseChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface PlumFinalizeExitObservableChain {
  subChainAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface PlumSettleDepositPromiseChain {
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface PlumSettleDepositObservableChain {
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface PlumTransferPromiseChain {
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  denomination: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  owner: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface PlumTransferObservableChain {
  coinID: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  denomination: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  owner: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  recipient: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface DepositToRewardingFundPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface DepositToRewardingFundObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface ClaimFromRewardingFundPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface ClaimFromRewardingFundObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface GrantRewardPromiseChain {
  type: { execute: (request?: boolean | number, defaultValue?: RewardType) => Promise<RewardType> }
  height: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface GrantRewardObservableChain {
  type: { execute: (request?: boolean | number, defaultValue?: RewardType) => Observable<RewardType> }
  height: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface PutPollResultPromiseChain {
  height: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  candidates: CandidateListPromiseChain & {
    execute: (request: CandidateListRequest, defaultValue?: CandidateList | null) => Promise<CandidateList | null>
  }
}

export interface PutPollResultObservableChain {
  height: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  candidates: CandidateListObservableChain & {
    execute: (request: CandidateListRequest, defaultValue?: CandidateList | null) => Observable<CandidateList | null>
  }
}

export interface CandidateListPromiseChain {
  candidates: { execute: (request: CandidateRequest, defaultValue?: Candidate[]) => Promise<Candidate[]> }
}

export interface CandidateListObservableChain {
  candidates: { execute: (request: CandidateRequest, defaultValue?: Candidate[]) => Observable<Candidate[]> }
}

export interface CandidatePromiseChain {
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  votes: { execute: (request?: boolean | number, defaultValue?: Buffer | null) => Promise<Buffer | null> }
  pubKey: { execute: (request?: boolean | number, defaultValue?: Buffer | null) => Promise<Buffer | null> }
  rewardAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface CandidateObservableChain {
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  votes: { execute: (request?: boolean | number, defaultValue?: Buffer | null) => Observable<Buffer | null> }
  pubKey: { execute: (request?: boolean | number, defaultValue?: Buffer | null) => Observable<Buffer | null> }
  rewardAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface StakeCreatePromiseChain {
  candidateName: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  stakedAmount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  stakedDuration: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  autoStake: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface StakeCreateObservableChain {
  candidateName: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  stakedAmount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  stakedDuration: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  autoStake: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface StakeReclaimPromiseChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface StakeReclaimObservableChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface StakeAddDepositPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface StakeAddDepositObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface StakeRestakePromiseChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  stakedDuration: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  autoStake: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface StakeRestakeObservableChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  stakedDuration: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  autoStake: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface StakeChangeCandidatePromiseChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  candidateName: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface StakeChangeCandidateObservableChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  candidateName: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface StakeTransferOwnershipPromiseChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  voterAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface StakeTransferOwnershipObservableChain {
  bucketIndex: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  voterAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface CandidateRegisterPromiseChain {
  candidate: CandidateBasicInfoPromiseChain & {
    execute: (request: CandidateBasicInfoRequest, defaultValue?: CandidateBasicInfo) => Promise<CandidateBasicInfo>
  }
  ownerAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  stakedAmount: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  stakedDuration: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  autoStake: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface CandidateRegisterObservableChain {
  candidate: CandidateBasicInfoObservableChain & {
    execute: (request: CandidateBasicInfoRequest, defaultValue?: CandidateBasicInfo) => Observable<CandidateBasicInfo>
  }
  ownerAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  stakedAmount: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  stakedDuration: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  autoStake: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  payload: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

export interface CandidateBasicInfoPromiseChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  operatorAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  rewardAddress: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface CandidateBasicInfoObservableChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  operatorAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  rewardAddress: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface ReadContractResponsePromiseChain {
  data: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ReadContractResponseObservableChain {
  data: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface SendActionResponsePromiseChain {
  actionHash: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
}

export interface SendActionResponseObservableChain {
  actionHash: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
}

export interface ReadStateResponsePromiseChain {
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
}

export interface ReadStateResponseObservableChain {
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
}

/** Properties of a EstimateGasForActionResponse */
export interface EstimateGasForActionResponsePromiseChain {
  gas: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

/** Properties of a EstimateGasForActionResponse */
export interface EstimateGasForActionResponseObservableChain {
  gas: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

/** Properties of a GetEpochMetaResponse */
export interface GetEpochMetaResponsePromiseChain {
  /** GetEpochMetaResponse epochData */
  epochData: EpochPromiseChain & { execute: (request: EpochRequest, defaultValue?: Epoch) => Promise<Epoch> }
  /** GetEpochMetaResponse totalBlocks */
  totalBlocks: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  /** GetEpochMetaResponse blockProducersInfo */
  blockProducersInfo: {
    execute: (request: BlockProducerInfoRequest, defaultValue?: BlockProducerInfo[]) => Promise<BlockProducerInfo[]>
  }
}

/** Properties of a GetEpochMetaResponse */
export interface GetEpochMetaResponseObservableChain {
  /** GetEpochMetaResponse epochData */
  epochData: EpochObservableChain & { execute: (request: EpochRequest, defaultValue?: Epoch) => Observable<Epoch> }
  /** GetEpochMetaResponse totalBlocks */
  totalBlocks: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  /** GetEpochMetaResponse blockProducersInfo */
  blockProducersInfo: {
    execute: (request: BlockProducerInfoRequest, defaultValue?: BlockProducerInfo[]) => Observable<BlockProducerInfo[]>
  }
}

/** Properties of a BlockProducerInfo */
export interface BlockProducerInfoPromiseChain {
  /** BlockProducerInfo address */
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  /** BlockProducerInfo votes */
  votes: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  /** BlockProducerInfo active */
  active: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  /** BlockProducerInfo production */
  production: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

/** Properties of a BlockProducerInfo */
export interface BlockProducerInfoObservableChain {
  /** BlockProducerInfo address */
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  /** BlockProducerInfo votes */
  votes: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  /** BlockProducerInfo active */
  active: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  /** BlockProducerInfo production */
  production: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

/** IOTX price information from coinmarketcap */
export interface CoinPricePromiseChain {
  priceUsd: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  marketCapUsd: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

/** IOTX price information from coinmarketcap */
export interface CoinPriceObservableChain {
  priceUsd: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  marketCapUsd: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface VersionInfoPromiseChain {
  explorerVersion: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  iotexCoreVersion: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
}

export interface VersionInfoObservableChain {
  explorerVersion: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  iotexCoreVersion: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
}

export interface SolcVersionPromiseChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  version: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface SolcVersionObservableChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  version: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface ContractPromiseChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  abi: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  bytecode: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ContractObservableChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  abi: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  bytecode: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface AddressMetaPromiseChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface AddressMetaObservableChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface TokenMetadataPromiseChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  address: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  logo: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  type: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  symbol: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  image_urls: { execute: (request?: boolean | number, defaultValue?: String[] | null) => Promise<String[] | null> }
}

export interface TokenMetadataObservableChain {
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  address: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  logo: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  type: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  symbol: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  image_urls: { execute: (request?: boolean | number, defaultValue?: String[] | null) => Observable<String[] | null> }
}

export interface MutationPromiseChain {
  addSubscription: (args: {
    email: String
  }) => SendGridInfoPromiseChain & {
    execute: (request: SendGridInfoRequest, defaultValue?: SendGridInfo) => Promise<SendGridInfo>
  }
}

export interface MutationObservableChain {
  addSubscription: (args: {
    email: String
  }) => SendGridInfoObservableChain & {
    execute: (request: SendGridInfoRequest, defaultValue?: SendGridInfo) => Observable<SendGridInfo>
  }
}

export interface SendGridInfoPromiseChain {
  isSubscribeSuccess: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
}

export interface SendGridInfoObservableChain {
  isSubscribeSuccess: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
}

export interface SetRewardPromiseChain {
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Promise<Buffer> }
  type: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface SetRewardObservableChain {
  amount: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  data: { execute: (request?: boolean | number, defaultValue?: Buffer) => Observable<Buffer> }
  type: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface SolcResultPromiseChain {
  contracts: { execute: (request: ContractRequest, defaultValue?: Contract[]) => Promise<Contract[]> }
}

export interface SolcResultObservableChain {
  contracts: { execute: (request: ContractRequest, defaultValue?: Contract[]) => Observable<Contract[]> }
}
