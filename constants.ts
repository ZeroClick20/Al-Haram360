import { QueryConfig, PageType, ActionType } from './types';

export const APP_NAME = "DEX Fixer Pro";

export const QUERIES: QueryConfig[] = [
  {
    id: '1',
    slug: 'swap-failed-cannot-estimate-gas',
    rawQuery: 'Swap failed: cannot estimate gas; transaction may fail or may require manual gas limit (UNPREDICTABLE_GAS_LIMIT)',
    pageType: PageType.ERROR_RESOLUTION,
    primaryAction: ActionType.GAS_ESTIMATE,
    seoTitle: 'Fix Swap Failed: Cannot Estimate Gas (UNPREDICTABLE_GAS_LIMIT) | DEX Fixer',
    seoDescription: 'Solve the UNPREDICTABLE_GAS_LIMIT error on Uniswap and PancakeSwap. Calculate correct gas limits manually and fix failed estimates.',
    intent: 'Fix a transaction failing due to gas estimation errors, likely caused by token taxes or network congestion.',
    problemContext: 'This error occurs when the EVM cannot predict the outcome of a transaction, often due to a token having a "fee-on-transfer" mechanism or a contract logic error.',
    relatedIds: ['2', '8', '13']
  },
  {
    id: '2',
    slug: 'unknown-error-internal-json-rpc-error',
    rawQuery: 'Unknown error: "Internal JSON-RPC error." Try increasing your slippage tolerance',
    pageType: PageType.ERROR_RESOLUTION,
    primaryAction: ActionType.SLIPPAGE_ADJUST,
    seoTitle: 'Fix Internal JSON-RPC Error in MetaMask/TrustWallet | Slippage Guide',
    seoDescription: 'Resolve "Internal JSON-RPC error" by optimizing slippage settings. Works for BSC, Polygon, and Ethereum DEX swaps.',
    intent: 'Resolve a generic RPC error that usually masks a revert due to insufficient slippage for tax tokens.',
    problemContext: 'The "Internal JSON-RPC error" is a catch-all message. 90% of the time, it means the transaction reverted because slippage was too low for the token\'s tax settings.',
    relatedIds: ['1', '3', '4']
  },
  {
    id: '3',
    slug: 'pancakerouter-insufficient-output-amount',
    rawQuery: 'Transaction cannot succeed due to error: execution reverted: PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT',
    pageType: PageType.ERROR_RESOLUTION,
    primaryAction: ActionType.SLIPPAGE_ADJUST,
    seoTitle: 'Fix PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT Error | DEX Fixer',
    seoDescription: 'Step-by-step fix for INSUFFICIENT_OUTPUT_AMOUNT on PancakeSwap. Adjust slippage and output minimums to ensure transaction success.',
    intent: 'Fix a revert caused by price impact or slippage constraints being too tight.',
    problemContext: 'This error explicitly means the amount of tokens you would receive is lower than your minimum acceptable amount (calculated by slippage tolerance).',
    relatedIds: ['2', '4', '14']
  },
  {
    id: '4',
    slug: 'swap-failed-higher-slippage',
    rawQuery: 'Swap failed: try using higher than normal slippage',
    pageType: PageType.REAL_TIME_DATA,
    primaryAction: ActionType.SLIPPAGE_ADJUST,
    seoTitle: 'Swap Failed? How to Calculate & Use Higher Slippage',
    seoDescription: 'Calculator to determine the safe "higher than normal" slippage for volatile or taxed tokens to avoid failed swaps.',
    intent: 'Calculate the optimal slippage to avoid overpaying while ensuring the transaction passes.',
    problemContext: 'The DEX UI is explicitly telling you that the market is moving too fast or the token has a tax that requires a wider tolerance window.',
    relatedIds: ['2', '3']
  },
  {
    id: '5',
    slug: 'phantom-wallet-swap-failure',
    rawQuery: 'Phantom wallet swap failure',
    pageType: PageType.NETWORK_TOOL,
    primaryAction: ActionType.SWAP_FIX,
    seoTitle: 'Troubleshoot Phantom Wallet Swap Failures on Solana',
    seoDescription: 'Diagnose and fix Phantom wallet swap errors on Raydium and Jupiter. Check Solana network congestion and rent exempt balance.',
    intent: 'Debug general swap failures specific to the Solana ecosystem and Phantom wallet interface.',
    problemContext: 'Solana swaps often fail due to network congestion (requiring priority fees) or insufficient SOL for rent/gas.',
    relatedIds: ['10', '13']
  },
  {
    id: '6',
    slug: 'web3-python-token-sell-pancakeswap',
    rawQuery: 'Web3 Python token sell pancakeswap slippage',
    pageType: PageType.PROGRAMMATIC_TOOL,
    primaryAction: ActionType.CODE_GEN,
    seoTitle: 'Web3.py Guide: Sell Tokens on PancakeSwap with Slippage',
    seoDescription: 'Generate correct Python Web3.py code to sell tokens on PancakeSwap, handling approval, gas limits, and slippage calculation programmatically.',
    intent: 'Developer looking for code snippets to execute a swap via script.',
    problemContext: 'Developers often struggle with the exact function calls (swapExactTokensForETH) and how to calculate `amountOutMin` manually in Python.',
    relatedIds: ['1', '13']
  },
  {
    id: '7',
    slug: 'failed-transaction-underpriced',
    rawQuery: 'Failed Transaction – underpriced / Replacement transaction underpriced',
    pageType: PageType.NETWORK_TOOL,
    primaryAction: ActionType.GAS_ESTIMATE,
    seoTitle: 'Fix "Replacement transaction underpriced" Error | Nonce Manager',
    seoDescription: 'Learn how to replace stuck transactions and fix "underpriced" errors by correctly incrementing gas fees.',
    intent: 'Unstick a pending transaction or replace a failed attempt with higher gas.',
    problemContext: 'This happens when you try to replace a pending transaction (same nonce) but do not increase the gas price by the required percentage (usually +10%).',
    relatedIds: ['1', '8']
  },
  {
    id: '8',
    slug: 'metamask-swap-high-gas-fees',
    rawQuery: 'Failed MetaMask Swap Charged me $54 in gas is there anything I can do',
    pageType: PageType.ERROR_RESOLUTION,
    primaryAction: ActionType.TX_LOOKUP,
    seoTitle: 'Why Failed MetaMask Swaps Charge Gas & Refund Options',
    seoDescription: 'Understand why you lost gas fees on a failed swap and check if any refund or optimization is possible for future txs.',
    intent: 'User is frustrated by lost funds due to gas on a failed tx and wants explanation/recourse.',
    problemContext: 'Gas is paid to miners to process the computation regardless of success. If it reverts, the work was still done.',
    relatedIds: ['1', '7']
  },
  {
    id: '9',
    slug: 'transaction-reverted-evm-token-sale',
    rawQuery: 'Transaction reverted by the EVM Pancake swap token sale',
    pageType: PageType.ERROR_RESOLUTION,
    primaryAction: ActionType.SWAP_FIX,
    seoTitle: 'Fix EVM Reverts on PancakeSwap Token Sales',
    seoDescription: 'Diagnose EVM execution reverts when selling tokens. Check for honeypots, max sell limits, and trading cooldowns.',
    intent: 'Identify why a specific token cannot be sold, checking for malicious contract code or restrictions.',
    problemContext: 'EVM reverts during sales often indicate anti-whale mechanisms, max transaction limits, or the token being a honeypot (sales disabled).',
    relatedIds: ['2', '3']
  },
  {
    id: '10',
    slug: 'swap-gatetoken-unsupported-pair',
    rawQuery: 'How can I swap gatetoken (error) unsupported pair, low liquidity',
    pageType: PageType.NETWORK_TOOL,
    primaryAction: ActionType.TOKEN_IMPORT,
    seoTitle: 'Swap GateToken (GT) Error: Unsupported Pair & Low Liquidity Fix',
    seoDescription: 'Find the correct bridges and DEX routes for GateToken. Solve unsupported pair errors by finding the right liquidity pools.',
    intent: 'User is trying to swap a specific token (GateToken) on a DEX that might not have a direct pair.',
    problemContext: 'Many CEX tokens like GT have fragmented liquidity on DEXs or require bridging to their native chain before swapping.',
    relatedIds: ['5', '11']
  },
  {
    id: '11',
    slug: 'successful-swap-no-token-received',
    rawQuery: 'Successful swap but didnt received the token in my wallet',
    pageType: PageType.ERROR_RESOLUTION,
    primaryAction: ActionType.TOKEN_IMPORT,
    seoTitle: 'Swapped Tokens Not Showing in Wallet? How to Find Them',
    seoDescription: 'Recover "missing" tokens after a successful swap. Import custom token contract addresses to MetaMask and TrustWallet.',
    intent: 'User panicked because balance didn\'t update. usually needs to import custom token.',
    problemContext: 'The tokens are likely in the wallet, but the UI ignores them until the contract address is manually imported.',
    relatedIds: ['12']
  },
  {
    id: '12',
    slug: 'pending-swap-not-appearing-etherscan',
    rawQuery: 'Pending swap not appearing on Etherscan',
    pageType: PageType.REAL_TIME_DATA,
    primaryAction: ActionType.TX_LOOKUP,
    seoTitle: 'Pending Swap Not on Etherscan? Mempool & Node Status',
    seoDescription: 'Why your transaction is missing from Etherscan. Check local node status and clear pending transaction cache.',
    intent: 'Check if the transaction was actually broadcasted or if it is stuck locally.',
    problemContext: 'If it is not on Etherscan, the node likely dropped it, or the wallet failed to broadcast it. It implies the tx does not exist to the network yet.',
    relatedIds: ['7', '12']
  },
  {
    id: '13',
    slug: 'transaction-reverted-function-selector',
    rawQuery: 'Error: Transaction reverted: function selector was not recognized',
    pageType: PageType.PROGRAMMATIC_TOOL,
    primaryAction: ActionType.CODE_GEN,
    seoTitle: 'Fix "Function Selector Not Recognized" Revert Error',
    seoDescription: 'Debug proxy contract and ABI errors. Resolve function selector mismatches in Solidity and Web3 calls.',
    intent: 'Technical error indicating a mismatch between the call data and the contract ABI/Proxy implementation.',
    problemContext: 'Common when interacting with proxy contracts or using the wrong ABI for a specific implementation logic.',
    relatedIds: ['6', '9']
  },
  {
    id: '14',
    slug: 'transaction-reverted-low-slippage',
    rawQuery: 'Transaction reverted due to low slippage',
    pageType: PageType.ERROR_RESOLUTION,
    primaryAction: ActionType.SLIPPAGE_ADJUST,
    seoTitle: 'Fix Transaction Reverted Due to Low Slippage',
    seoDescription: 'Calculate the exact slippage needed for volatile tokens. Avoid front-running and tax-related reverts.',
    intent: 'Explicit revert reason provided. User needs a calculator to know "how much" slippage is enough.',
    problemContext: 'Straightforward error: the price moved beyond the allowed threshold during block inclusion.',
    relatedIds: ['2', '3', '4']
  }
];

export const NAVIGATION_LINKS = [
  { label: 'Error Fixes', type: PageType.ERROR_RESOLUTION },
  { label: 'Live Data', type: PageType.REAL_TIME_DATA },
  { label: 'Dev Tools', type: PageType.PROGRAMMATIC_TOOL },
  { label: 'Network', type: PageType.NETWORK_TOOL },
];