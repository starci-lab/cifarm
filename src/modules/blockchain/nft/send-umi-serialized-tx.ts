import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { solanaHttpRpcUrl } from "../rpcs"
import { defaultNetwork } from "../default"
import { Network } from "../common"
import { ChainKey } from "../common"
import { mplCore } from "@metaplex-foundation/mpl-core"
import base58 from "bs58"
import { keypairIdentity } from "@metaplex-foundation/umi"

export interface SendUmiSerializedTxParams {
  privateKey: string;
  serializedTx: string;
  network?: Network;
}

export interface SendUmiSerializedTxResponse {
  txHash: string;
}

export const sendUmiSerializedTx = async ({
    network = defaultNetwork,

    privateKey,
    serializedTx,
}: SendUmiSerializedTxParams): Promise<SendUmiSerializedTxResponse> => {
    const umi = createUmi(
        solanaHttpRpcUrl({ chainKey: ChainKey.Solana, network })
    ).use(mplCore())
    const signer = umi.eddsa.createKeypairFromSecretKey(
        base58.decode(privateKey)
    )
    umi.use(keypairIdentity(signer))
    const tx = umi.transactions.deserialize(base58.decode(serializedTx))
    // const signedDeserializedCreateAssetTx = await umi.identity.signTransaction(
    //     tx
    // )
    const txHash = await umi.rpc.sendTransaction(tx)
    return { txHash: base58.encode(txHash) }
}
