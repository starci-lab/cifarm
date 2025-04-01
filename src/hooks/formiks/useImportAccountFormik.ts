import { FormikProps, useFormik } from "formik"
import * as Yup from "yup" // Import Yup
import {
    setMnemonic,
    triggerLoadAccounts,
    useAppDispatch,
} from "@/redux"
import { ChainKey, createAccount, Network } from "@/modules/blockchain"
import { sessionDb, SessionDbKey, CurrentAccount, Account } from "@/modules/dexie"

export interface ImportAccountFormikValues {
  mnemonic: string;
}

export const useImportAccountFormik = (): FormikProps<ImportAccountFormikValues> => {
    const dispatch = useAppDispatch()
    const initialValues: ImportAccountFormikValues = {
        mnemonic: "",
    }

    // Yup validation schema
    const validationSchema = Yup.object({
        mnemonic: Yup.string()
            .required("Mnemonic is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema, // Pass Yup validation schema directly
        onSubmit: async ({ mnemonic }) => {
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
        },
    })

    return formik
}
