import { Card, CardContent, Image, ExtendedButton, Spacer } from "@/components"
import React, { FC } from "react"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import {
    QUERY_STATIC_SWR_MUTATION,
    SELECT_NFT_DISCLOSURE,
    TRANSFER_NFT_FORMIK,
} from "@/app/constants"
import { useTransferNFTFormik } from "@/hooks/formiks"
import { useGraphQLQueryStaticSwr } from "@/hooks"
interface NFTProps {
//   nft: ExtendedNFTData;
    nft: {
        name: string
        collectionKey: string
        nft: {
            name: string
            image: string
            traits: string[]
        }
    }
}
export const NFT: FC<NFTProps> = ({ nft }) => {
    const { close } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SELECT_NFT_DISCLOSURE
    )
    const formik =
    useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    // const collections = useAppSelector(
    //     (state) => state.sessionReducer.nftCollections
    // )
    // if (!collections || !staticSwr.data) return null
    // const image = getNFTImage({
    //     collectionKey: nft.collectionKey,
    //     nft,
    //     collections,
    //     staticData: staticSwr.data.data,
    // })
    return (
        <Card>
            <CardContent className="p-3">
                <div>
                    <div className="flex gap-3">
                        {/* <Image
                            src={image}
                            alt={nft.name}
                            className="w-20 h-20 aspect-square object-contain rounded-md border"
                        /> */}
                        <div className="flex gap-2 flex-col">
                            <div className="text-sm">{nft.name}</div>
                            <div className="flex gap-2">
                                {/* <TraitDropdown traits={nft.traits} /> */}
                                <ExtendedButton variant="outline" className="w-full">
                  View
                                </ExtendedButton>
                            </div>
                        </div>
                    </div>
                    <Spacer y={3} />
                    <ExtendedButton
                        className="w-full"
                        onClick={() => {
                            formik.setFieldValue("collectionKey", nft.collectionKey)
                            formik.setFieldValue("nft", nft)
                            close()
                        }}
                    >
            Select
                    </ExtendedButton>
                </div>
            </CardContent>
        </Card>
    )
}
