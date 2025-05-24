import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { solanaHttpRpcUrl } from "../rpcs"
import { defaultNetwork } from "../default"
import { Network } from "../common"
import { ChainKey } from "../common"
import { mplCore } from "@metaplex-foundation/mpl-core"
import base58 from "bs58"
import { keypairIdentity } from "@metaplex-foundation/umi"

export interface SignUmiSerializedTxsParams {
  privateKey: string;
  serializedTxs: string | Array<string>;
  network?: Network;
}

export interface SignUmiSerializedTxsResponse {
  serializedTxs: string | Array<string>;
}

export const signUmiSerializedTxs = async ({
    network = defaultNetwork,
    privateKey,
    serializedTxs,
}: SignUmiSerializedTxsParams): Promise<SignUmiSerializedTxsResponse> => {
    const umi = createUmi(
        solanaHttpRpcUrl({ chainKey: ChainKey.Solana, network })
    ).use(mplCore())
    const signer = umi.eddsa.createKeypairFromSecretKey(
        base58.decode(privateKey)
    )
    umi.use(keypairIdentity(signer))
    if (Array.isArray(serializedTxs)) {
        const txs = serializedTxs.map((serializedTx) => {
            const tx = umi.transactions.deserialize(base58.decode(serializedTx))
            return tx
        })
        const signedTxs = await umi.identity.signAllTransactions(txs)
        return {
            serializedTxs: signedTxs.map((signedTx) => {
                return base58.encode(
                    umi.transactions.serialize(signedTx)
                )
            }),
        }
    } else {
        const tx = umi.transactions.deserialize(base58.decode(serializedTxs))
        const signedTx = await umi.identity.signTransaction(
            tx
        )
        return {
            serializedTxs: base58.encode(
                umi.transactions.serialize(signedTx)
            ),
        }
    }
}

