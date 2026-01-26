import { SimulationResult, ActionType } from '../types';

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateOnChainAction = async (
  action: ActionType,
  params: Record<string, any>
): Promise<SimulationResult> => {
  await delay(1500); // Simulate network latency

  switch (action) {
    case ActionType.GAS_ESTIMATE:
      if (params.tokenSymbol === 'ETH' || !params.isTaxToken) {
        return {
          success: true,
          message: 'Gas limit estimated successfully.',
          data: { estimatedCost: '0.004 ETH', gasUsed: 21000 }
        };
      } else {
        return {
          success: false,
          message: 'Estimate failed due to Fee-On-Transfer. Suggested Manual Limit: 500,000.',
          data: { gasUsed: 500000, estimatedCost: '0.02 ETH' }
        };
      }

    case ActionType.SLIPPAGE_ADJUST:
      const volatility = Math.random() * 10;
      const suggestedSlippage = volatility > 5 ? 12 : 5;
      return {
        success: true,
        message: 'Optimal slippage calculated based on recent volatility.',
        data: { slippage: suggestedSlippage, route: ['BNB', 'CAKE', 'TOKEN'] }
      };

    case ActionType.TX_LOOKUP:
      if (params.txHash && params.txHash.length > 10) {
        return {
          success: true,
          message: 'Transaction found in mempool (Pending).',
          data: { estimatedCost: '0.01 ETH', gasUsed: 150000 }
        };
      }
      return {
        success: false,
        message: 'Transaction hash not found on mainnet nodes.',
      };

    case ActionType.CODE_GEN:
      return {
        success: true,
        message: 'Code snippet generated.',
        data: {
          snippet: `
# Python Web3.py Snippet for Selling with Slippage
contract = w3.eth.contract(address=token_address, abi=abi)
amount_in = w3.to_wei(100, 'ether')
# Calculate min output with ${params.slippage || 12}% slippage
amount_out_min = int(expected_out * (1 - ${params.slippage || 0.12}))

tx = router.functions.swapExactTokensForETHSupportingFeeOnTransferTokens(
    amount_in,
    amount_out_min,
    [token_address, weth_address],
    my_address,
    int(time.time()) + 600
).build_transaction(...)
`
        }
      };
      
    case ActionType.TOKEN_IMPORT:
        return {
            success: true,
            message: 'Token found on chain.',
            data: {
                tokenName: 'Simulated Token (SIM)',
                balance: '1,450.00 SIM'
            }
        }

    default:
      return {
        success: true,
        message: 'Action simulated successfully.',
        data: {}
      };
  }
};