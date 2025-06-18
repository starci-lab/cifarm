import { TokenKey } from "@/types"
import { AbstractSchema } from "./abstract"

export interface BulkProduct {
    productId: string;
    quantity: number;
  }
  
export interface BulkSchema extends AbstractSchema {
    bulkName: string;
    description: string;
    products: Array<BulkProduct>;
    maxPaidAmount: number;
    maxPaidPercentage: number;
    tokenKey: TokenKey;
    tCIFARM: number;
  }