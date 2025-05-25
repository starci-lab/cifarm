import {
    Image,
    Spacer,
    Spinner,
    Separator,
    Card,
    CardBody,
} from "@/components"
import React, { FC } from "react"
import { ChainKey, chainKeyMap } from "@/modules/blockchain"
import { useCurrentWallet } from "@mysten/dapp-kit"
import { useWallet } from "@solana/wallet-adapter-react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { CONNECT_DISCLOSURE, NOTIFICATION_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import { useAppDispatch, setNotificationModal, setSelectedChainKey } from "@/redux"
interface DAppCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
  content?: React.ReactNode;
  isLoading?: boolean;
  chainKey?: ChainKey;
}

export const DAppCard: FC<DAppCardProps> = ({
    title,
    description,
    imageUrl,
    onClick,
    content,
    isLoading,
    chainKey = ChainKey.Solana,
}) => {
    const { publicKey } = useWallet()
    const { currentWallet } = useCurrentWallet()
    const { open: openConnectModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(CONNECT_DISCLOSURE)
    const { open: openNotificationModal, close: closeNotificationModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(NOTIFICATION_DISCLOSURE)
    const dispatch = useAppDispatch()
    return (
        <Card
            onClick={() => {
                if (chainKey === ChainKey.Solana && !publicKey) {
                    dispatch(setNotificationModal({
                        title: "No Solana Wallet Connected",
                        message: "Please connect a Solana wallet to continue",
                        buttonText: "Connect",
                        callback: () => {
                            dispatch(setSelectedChainKey(ChainKey.Solana))
                            closeNotificationModal()
                            openConnectModal()
                        },
                    }))
                    openNotificationModal()
                    return
                }
                if (chainKey === ChainKey.Sui && !currentWallet) {
                    dispatch(setNotificationModal({
                        title: "No Sui Wallet Connected",
                        message: "Please connect a Sui wallet to continue",
                        buttonText: "Connect",
                        callback: () => {
                            dispatch(setSelectedChainKey(ChainKey.Sui))
                            closeNotificationModal()
                            openConnectModal()
                        },
                    }))
                    openNotificationModal()
                    return
                }
                if (chainKey === ChainKey.Somnia) {
                    dispatch(setNotificationModal({
                        title: "No Sui Wallet Connected",
                        message: "Please connect a Sui wallet to continue",
                        buttonText: "Connect",
                        callback: () => {
                            openConnectModal()
                        },
                    }))
                    openNotificationModal()
                    return
                }
                onClick()
            }}
            disabled={isLoading}
            className="h-full"
            pressable
        >
            <CardBody className="pb-2 relative w-full">
                <div className="absolute top-4 right-4">
                    {chainKey && <Image src={chainKeyMap.find((chain) => chain.key === chainKey)?.iconUrl || ""} className="w-7 h-7" />}
                </div>  
                <Image src={imageUrl} className="w-32 h-32 object-contain" />
                <Spacer y={4} />
                <div className="flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                        {isLoading && <Spinner />}
                        <div className="text-lg">{title}</div>
                    </div>
                </div>
            </CardBody>
            <Separator />
            <CardBody className="pt-2">
                <div className="text-muted-foreground">{description}</div>
                <Spacer y={2} />
                {content}
            </CardBody>
        </Card>
    )
}
