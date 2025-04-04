import { SELECT_NFT_DISCLOSURE, TRANSFER_NFT_FORMIK } from "@/app/constants"
import { useTransferNFTFormik } from "@/hooks"
import { Spacer, PressableCard, Title, Image } from "@/components"
import { useSingletonHook2, useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { NFTData } from "@/modules/blockchain"
import { PlusIcon } from "lucide-react"
import { useDisclosure } from "react-use-disclosure"

export const NFTSection: FC = () => {
    const formik =
    useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )       
    const collectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionsSwrs
    )
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const collection = collections[formik.values.collectionKey]
    console.log(formik.values.nft)
    const getData = (): NFTData | null => {
        if (!collection) return null
        const collectionSwr = collectionSwrs[formik.values.collectionKey]
        const data = collectionSwr.data?.nfts.find(
            (nft) => nft.nftAddress === formik.values.nft?.nftAddress
        )
        if (!data) return null  
        return data
    }

    const data = getData()

    const { open: openSelectNFTModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SELECT_NFT_DISCLOSURE
    )
    return (
        <div>
            <Title
                classNames={{
                    title: "text-sm",
                    tooltip: "w-[14px] h-[14px]",
                }}
                title="NFT"
                tooltipString="Select the NFT you want to transfer"
            />
            <Spacer y={1.5} />
            {data ? <PressableCard onClick={() => {
                openSelectNFTModal()
            }}>
                <div className="flex gap-1.5">
                    <Image
                        src={data.imageUrl}
                        className="w-20 h-20 border rounded-md object-contain"
                    />
                    <div>
                        <div className="text-sm">{data.name}</div>
                        <div className="text-xs text-muted-foreground">
                            {collection.name}
                        </div>
                    </div>
                </div>
            </PressableCard> : <PressableCard
                onClick={() => {
                    openSelectNFTModal()
                }}
            >
                <div className="h-20 grid place-items-center w-full">
                    <PlusIcon className="w-5 h-5" />
                </div>
            </PressableCard>}
        </div>

    )
}


