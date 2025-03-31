"use client"

import { useRouterWithSearchParams } from "@/hooks"
import { Container, EnhancedButton } from "@/components"
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
import Image from "next/image"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const dispatch = useDispatch()

    return (
        <Container centerContent hasPadding>
            <div className="w-full">
                <div className="grid place-items-center gap-4 w-full">
                    <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
                        <Image 
                            src="/logo.png" 
                            alt="CiFarm Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="h-6" />
                <div className="text-center">
                    <div className="text-4xl font-bold">CiFarm</div>
                    <div className="text-muted-foreground text-sm">
                        The leading GameFixDeFi farming game
                    </div>
                </div>
                <div className="h-12" />
                <div className="grid gap-4 w-full">
                    <EnhancedButton
                        size="lg"
                        className="w-full"
                        onClick={async () => {
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
                                }
                            }
                        }}
                    >
                        Create new account
                    </EnhancedButton>
                    <EnhancedButton
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => router.push(pathConstants.import)}
                    >
                        Import existing account
                    </EnhancedButton>
                </div>
            </div>
        </Container>
    )
}

export default Page
