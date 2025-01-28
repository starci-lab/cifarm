import { Network } from "@/config"
import {
    GetNftsByOwnerAddressParams,
    _getNftsByOwnerAddress,
} from "./get-nfts-by-owner-address"
import { IpfsService } from "./ipfs"

export interface BlockchainNftServiceConstructorParams {
  nftCollectionId: string;
  chainKey: string;
  network?: Network;
}

export class BlockchainNftService {
    private ipfsService: IpfsService
    constructor(private readonly params: BlockchainNftServiceConstructorParams) {
        params.network = params.network || Network.Testnet
        this.ipfsService = new IpfsService()
    }

    public getNftsByOwnerAddress({
        accountAddress,
        skip,
        take,
    }: Pick<GetNftsByOwnerAddressParams, "accountAddress" | "skip" | "take">) {
        return _getNftsByOwnerAddress(
            {
                accountAddress,
                skip,
                take,
                chainKey: this.params.chainKey,
                network: this.params.network,
                nftCollectionId: this.params.nftCollectionId,
            },
            {
                ipfsService: this.ipfsService,
            }
        )
    }
}

export * from "./common"
export * from "./get-nfts-by-owner-address"
