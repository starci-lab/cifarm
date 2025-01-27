import {
    mnemonicToSeed as mnemonicToSeedAsync,
    entropyToMnemonic,
} from "bip39"
import { sha256Hash } from "./sha256"

export interface MnemonicToSeedParams {
  mnemonic: string;
  password: string;
  salt?: string;
}

export const stringToMnemonic = (string: string) =>
    entropyToMnemonic(sha256Hash(string, "", "hex").substring(0, 64))

export const mnemonicToSeed = ({ mnemonic, password }: MnemonicToSeedParams) =>
    mnemonicToSeedAsync(
        mnemonic,
        sha256Hash(password, "", "hex").substring(0, 32)
    )
