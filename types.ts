export enum PageType {
  ERROR_RESOLUTION = 'ERROR_RESOLUTION',
  REAL_TIME_DATA = 'REAL_TIME_DATA',
  PROGRAMMATIC_TOOL = 'PROGRAMMATIC_TOOL',
  NETWORK_TOOL = 'NETWORK_TOOL',
}

export enum ActionType {
  SWAP_FIX = 'SWAP_FIX',
  GAS_ESTIMATE = 'GAS_ESTIMATE',
  SLIPPAGE_ADJUST = 'SLIPPAGE_ADJUST',
  TX_LOOKUP = 'TX_LOOKUP',
  TOKEN_IMPORT = 'TOKEN_IMPORT',
  CODE_GEN = 'CODE_GEN',
}

export interface QueryConfig {
  id: string;
  slug: string;
  rawQuery: string;
  pageType: PageType;
  primaryAction: ActionType;
  seoTitle: string;
  seoDescription: string;
  intent: string;
  problemContext: string;
  relatedIds: string[];
}

export interface SimulationResult {
  success: boolean;
  message: string;
  data?: {
    gasUsed?: number;
    estimatedCost?: string;
    slippage?: number;
    route?: string[];
    tokenName?: string;
    balance?: string;
    snippet?: string;
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}
