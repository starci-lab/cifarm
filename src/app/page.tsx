"use client"

import { Spacer, Button, Image } from "@heroui/react"
import { useRouterWithSearchParams } from "@/hooks"
import { Container } from "@/components"
import React, { FC } from "react"
import { pathConstants } from "@/constants"
import { generateMnemonic } from "bip39"
import {
    Account,
    CurrentAccount,
    sessionDb,
    SessionDbKey,
} from "@/modules/dexie"
import { ChainKey, createAccount, Network } from "@/modules/blockchain"
import { setMnemonic, triggerLoadAccounts } from "@/redux"
import { useDispatch } from "react-redux"
const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const dispatch = useDispatch()
    return (
        <Container centerContent hasPadding>
            <div className="w-full">
                <div className="grid place-items-center gap-4 w-full">
                    <Image radius="full" removeWrapper src="/logo.png" height={150} />
                </div>
                <Spacer y={4} />
                <div className="text-center">
                    <div className="text-4xl font-bold">CiFarm</div>
                    <div className="text-foreground-400 text-sm">
            The leading play-to-earn farming game on Telegram
                    </div>
                </div>
                <Spacer y={9} />
                <div className="grid gap-4 w-full">
                    <Button
                        color="primary"
                        size="lg"
                        onPress={async () => {
                            const mnemonic = generateMnemonic(256)
                            // put mnemonic to key-value store in IndexedDB
                            await sessionDb.keyValueStore.put({
                                key: SessionDbKey.Mnemonic,
                                value: mnemonic,
                            })
                            //start with index 0 for each chain
                            const promises: Array<Promise<void>> = []
                            for (const network of Object.values(Network)) {
                                for (const chainKey of Object.values(ChainKey)) {
                                    promises.push(
                                        (async () => {
                                            const created = await createAccount({
                                                accountNumber: 0,
                                                chainKey,
                                                mnemonic,
                                                network,
                                            })
                                            if (!created) {
                                                throw new Error("Failed to create account")
                                            }
                                            const found = await sessionDb.accounts
                                                .filter(
                                                    (account) =>
                                                        account.chainKey === chainKey &&
                            account.network === network &&
                            account.accountNumber === 0
                                                )
                                                .first()
                                            if (found) {
                                                // we will update the account
                                                found.address = created.address
                                                found.publicKey = created.publicKey
                                                found.privateKey = created.privateKey
                                                await sessionDb.accounts.put(found)
                                                return
                                            }
                                            // create account
                                            const account: Omit<Account, "id"> = {
                                                chainKey,
                                                network,
                                                accountNumber: 0,
                                                address: created.address,
                                                publicKey: created.publicKey,
                                                privateKey: created.privateKey,
                                                username: `${chainKey}-${
                                                    network ? "t-" : "-"
                                                }${created.address.slice(0, 5)}`,
                                            }
                                            const accountId = await sessionDb.accounts.add(account)

                                            // create current account
                                            const currentAccount: Omit<CurrentAccount, "id"> = {
                                                chainKey,
                                                network,
                                                accountId,
                                            }
                                            await sessionDb.currentAccount.put(currentAccount)
                                        })()
                                    )
                                    await Promise.all(promises)
                                    //dispatch to set mnemonic
                                    dispatch(setMnemonic(mnemonic))
                                    //dispatch to all useEffects to update changes with key `loadAccountsKey`
                                    dispatch(triggerLoadAccounts())
                                    router.push(pathConstants.home)
                                }
                            }
                        }}
                    >
            Create new account
                    </Button>
                    <Button
                        color="primary"
                        variant="flat"
                        size="lg"
                        onPress={() => router.push(pathConstants.home)}
                    >
            Import existing account
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Page
