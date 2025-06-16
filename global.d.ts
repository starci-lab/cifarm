//phaser plugin
import "phaser"
import GesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js"
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"
import { PublicKey } from "@solana/web3.js"
import { Transaction } from "@solana/web3.js"

declare module "phaser" {
  interface Scene {
    rexGestures: GesturesPlugin;
    rexUI: RexUIPlugin;
  }
}


declare global {
  interface Window {
    google: {
      accounts: {
        id: IdConfiguration;
      };
      oauth2: IdConfiguration;
    };
    phantom: {
      solana: PhantomProvider
    };
  }
}

// Define the expected structure of the Google login response
interface GoogleLoginResponse {
  credential: string; // JWT token
  clientId: string;   // Client ID used in the Google login
}

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