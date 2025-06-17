import { SolanaWalletName } from "@/redux"

export interface SolanaWallet {
    walletName: SolanaWalletName
    name: string
    imageUrl: string
}

export const solanaWallets: Array<SolanaWallet> = [
    {
        walletName: SolanaWalletName.Phantom,
        name: "Phantom",
        imageUrl: "/phantom.svg",
    },
    {
        walletName: SolanaWalletName.Solflare,
        name: "Solflare",   
        imageUrl: "/solflare.svg",
    },
    {
        walletName: SolanaWalletName.Backpack,
        name: "Backpack",
        imageUrl: "/backpack.svg",
    },
]