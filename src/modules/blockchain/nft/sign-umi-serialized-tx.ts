import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { solanaHttpRpcUrl } from "../rpcs"
import { defaultNetwork } from "../default"
import { Network } from "../common"
import { ChainKey } from "../common"
import { mplCore } from "@metaplex-foundation/mpl-core"
import base58 from "bs58"
import { keypairIdentity } from "@metaplex-foundation/umi"

export interface SignUmiSerializedTxParams {
  privateKey: string;
  serializedTx: string;
  network?: Network;
}

export interface SignUmiSerializedTxResponse {
  serializedTx: string;
}

export const signUmiSerializedTx = async ({
    network = defaultNetwork,
    privateKey,
    serializedTx,
}: SignUmiSerializedTxParams): Promise<SignUmiSerializedTxResponse> => {
    const umi = createUmi(
        solanaHttpRpcUrl({ chainKey: ChainKey.Solana, network })
    ).use(mplCore())
    const signer = umi.eddsa.createKeypairFromSecretKey(
        base58.decode(privateKey)
    )
    umi.use(keypairIdentity(signer))
    console.log(serializedTx)
    const tx = umi.transactions.deserialize(base58.decode(serializedTx))
    const signedTx = await umi.identity.signTransaction(
        tx
    )
    return {
        serializedTx: base58.encode(
            umi.transactions.serialize(signedTx)
        ),
    }
}
