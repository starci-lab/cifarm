import React, { FC } from "react"
import { AvaButton, Image } from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { CONNECT_MODAL_DISCLOSURE } from "@/singleton"

export const ConnectButton: FC = () => {
    const { open: openConnectModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(CONNECT_MODAL_DISCLOSURE)
    return (
        <AvaButton
            icon={
                // <ImageGroup
                //     classNames={{
                //         imageWrapper: "bg-transparent",
                //     }}
                //     images={[
                //     // "https://docs.somnia.network/~gitbook/image?url=https%3A%2F%2F1813806305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252FXixzx30CXHthiaKhEu1D%252Fsites%252Fsite_m7x2t%252Ficon%252FjdslfIGTxvTkjBH77O7V%252Flogo.png%3Falt%3Dmedia%26token%3Dfbc7ca1b-24b9-4847-ad0c-574ac536eff3&width=32&dpr=4&quality=100&sign=4c1bc3e1&sv=2",
                //     // "/sui.svg",
                //         "/solana.svg",
                //     ]}
                // />
                <Image src="/solana.svg" alt="Solana" className="w-6 h-6" />
            }
            text="Connect"
            onClick={openConnectModal}
        />
    )
}
