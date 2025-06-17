import { PublicKey, SendOptions, Transaction } from "@solana/web3.js"

type DisplayEncoding = "utf8" | "hex";

type PhantomEvent = "connect" | "disconnect" | "accountChanged";

type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signAndSendTransaction"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomSignAndSendTransactionResult {
  signature: string;
  publicKey: PublicKey;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction,
    opts?: SendOptions
  ) => Promise<PhantomSignAndSendTransactionResult>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Array<Transaction>) => Promise<Array<Transaction>>;
  signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise<unknown>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: unknown) => void) => void;
  request: (method: PhantomRequestMethod, params: unknown) => Promise<unknown>;
}

export type Status = "success" | "warning" | "error" | "info";

export interface TLog {
  status: Status;
  method?: PhantomRequestMethod | Extract<PhantomEvent, "accountChanged">;
  message: string;
  messageTwo?: string;
}