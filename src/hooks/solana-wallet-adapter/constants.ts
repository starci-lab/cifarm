import { WalletName } from "@/modules/blockchain"

export interface SolanaWallet {
    walletName: WalletName
    name: string
    imageUrl: string
}

export const solanaWallets: Array<SolanaWallet> = [
    {
        walletName: WalletName.Phantom,
        name: "Phantom",
        imageUrl: "/phantom.png",
    },
    {
        walletName: WalletName.Solflare,
        name: "Solflare",   
        imageUrl: "/solflare.png",
    },
    {
        walletName: WalletName.Backpack,
        name: "Backpack",
        imageUrl: "/backpack.png",
    },
]