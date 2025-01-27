import { ChainKey, createAccount } from "@/modules/blockchain"
import { getSessionCookieMaxAge, SESSION_COOKIE_NAME } from "@/modules/cookie"
import { encrypt, stringToMnemonic } from "@/modules/cryptography"
import { Account, CurrentAccount, SessionDbKey, sessionDb } from "@/modules/dexie"
import { serialize } from "@/modules/serialization"
import { setMnemonic, setPin, triggerLoadAccounts, useAppDispatch, useAppSelector } from "@/redux"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookie from "js-cookie"
import { useForm, SubmitHandler } from "react-hook-form"
import { z, ZodType } from "zod"

export interface CreatePINFormInputs {
  pin: string;
}

const Schema: ZodType<CreatePINFormInputs> = z.object({
    pin: z
        .string()
        .regex(/^\d{6}$/, {
            message: "PIN must contain only numeric digits and 6 characters",
        })
        .nonempty("PIN is required"),
})

export const useCreatePinForm = () => {
    const network = useAppSelector(
        (state) => state.sessionReducer.network
    )
    const form = useForm<CreatePINFormInputs>({
        resolver: zodResolver(Schema),
    })
    const username = useAppSelector(
        (state) => state.sessionReducer.telegram.username
    )
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<CreatePINFormInputs> = async (data) => {
    // create mnemonic based on pin
        const mnemonic = stringToMnemonic(username + data.pin)
        // put mnemonic to key-value store in IndexedDB
        await sessionDb.keyValueStore.put({
            key: SessionDbKey.Mnemonic,
            value: serialize(encrypt({
                data: mnemonic,
                key: data.pin,
            })),
        })
        //start with index 0 for each chain
        const promises: Array<Promise<void>> = []
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
                        found.privateKey = serialize(encrypt({
                            data: created.privateKey,
                            key: data.pin,
                        }))
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
                        privateKey: serialize(encrypt({
                            data: created.privateKey,
                            key: data.pin,
                        })),
                        username,
                        imageUrl: "/logo.png",
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
            //add session timeout to key-value store in IndexedDB
            Cookie.set(SESSION_COOKIE_NAME, serialize({
                pin: data.pin,
            }), {
                expires: getSessionCookieMaxAge(),
            })
            //dispatch to set pin
            dispatch(setPin(data.pin))
            //dispatch to set mnemonic
            dispatch(setMnemonic(mnemonic))
            //dispatch to all useEffects to update changes with key `loadAccountsKey`
            dispatch(triggerLoadAccounts())
        }
    }

    return { form, onSubmit }
}
