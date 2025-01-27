import { ChainKey, createAccount } from "@/modules/blockchain"
import { sha256Hash, stringToMnemonic } from "@/modules/cryptography"
import { Account, CurrentAccount, SessionDbKey, sessionDb } from "@/modules/dexie"
import { setMnemonic, setPin, triggerLoadAccounts, useAppDispatch, useAppSelector } from "@/redux"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z, ZodType } from "zod"

export interface CreateFormInputs {
  pin: string;
}

const Schema: ZodType<CreateFormInputs> = z.object({
    pin: z
        .string()
        .regex(/^\d{6}$/, {
            message: "PIN must contain only numeric digits and 6 characters",
        })
        .nonempty("PIN is required"),
})

export const useCreateForm = () => {
    const network = useAppSelector(
        (state) => state.authenticationReducer.network
    )
    const form = useForm<CreateFormInputs>({
        resolver: zodResolver(Schema),
    })
    const username = useAppSelector(
        (state) => state.authenticationReducer.telegram.username
    )
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<CreateFormInputs> = async (data) => {
    // create mnemonic based on pin
        const mnemonic = stringToMnemonic(username + data.pin)
        // put mnemonic to key-value store in IndexedDB
        await sessionDb.keyValueStore.put({
            key: SessionDbKey.Mnemonic,
            value: mnemonic,
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
                        found.privateKey = sha256Hash(created.privateKey)
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
