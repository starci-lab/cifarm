import { valuesWithKey } from "@/modules/common"
import { useAppSelector } from "@/redux"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from "@heroui/react"
import React, { useMemo, useState } from "react"
import { Token } from "./Token"
import { ScrollableList } from "@/components/ScrollableList"
import { FilterBar } from "@/components"
import { SELECT_TOKEN_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"

export const SelectTokenModal = () => {
    const { isOpen, onOpenChange, onClose } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_TOKEN_DISCLOSURE)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const [searchString, setSearchString] = useState("")

    const filteredTokensArray = useMemo(() => {
        return tokensArray.filter((token) =>
            token.name.toLowerCase().includes(searchString.toLowerCase())
        )
    }, [searchString])
    
    return (
        <Modal
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>
                    <div className="text-xl font-bold">Select Token</div>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <FilterBar
                            handleSearchResult={({ searchString }) => {
                                setSearchString(searchString)
                            }}
                            disableDebounce={true}
                        />
                        <Spacer y={4} />
                        <ScrollableList
                            items={filteredTokensArray}
                            contentCallback={(token) => <Token token={token} />}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={onClose}
                        className="text-foreground-400"
                    >
            Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
