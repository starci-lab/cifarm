import { decrypt, EncryptedResult } from "@/modules/cryptography"
import { SessionDbKey, sessionDb } from "@/modules/dexie"
import { deserialize } from "@/modules/serialization"
import { setMnemonic, setPin, setRetries, triggerLoadAccounts, useAppDispatch, useAppSelector } from "@/redux"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z, ZodType } from "zod"
import { useRouterWithSearchParams } from "../useRouterWithSearchParams"
import { pathConstants } from "@/constants"
import Cookie from "js-cookie"
import { SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from "@/modules/cookie"
import { serialize } from "@/modules/serialization"

export interface EnterPINFormInputs {
  pin: string;
}

const Schema: ZodType<EnterPINFormInputs> = z.object({
    pin: z
        .string()
        .regex(/^\d{6}$/, {
            message: "PIN must contain only numeric digits and 6 characters",
        })
        .nonempty("PIN is required"),
    
})

export const useEnterPinForm = () => {
    const form = useForm<EnterPINFormInputs>({
        resolver: zodResolver(Schema),
    })
    const retries = useAppSelector(
        (state) => state.sessionReducer.retries
    )
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<EnterPINFormInputs> = async (data) => {
        // retrieve mnemonic from key-value store in IndexedDB based on pin
        const encryptedMnemonic = await sessionDb.keyValueStore.get(SessionDbKey.Mnemonic)
        if (!encryptedMnemonic) {
            throw new Error("Mnemonic not found")
        }
        try {
            const { data: encryptedData, iv } = deserialize<EncryptedResult>(encryptedMnemonic.value)
            //decrypt mnemonic
            const mnemonic = decrypt({
                encryptedData,
                iv,
                key: data.pin,
            })
            //add session timeout to key-value store in IndexedDB
            Cookie.set(SESSION_COOKIE_NAME, serialize({
                pin: data.pin,
            }), {
                expires: SESSION_COOKIE_MAX_AGE,
            })
            //dispatch to set mnemonic
            dispatch(setMnemonic(mnemonic))
            //dispatch to set pin
            dispatch(setPin(data.pin))
            //dispatch to all useEffects to update changes with key `loadAccountsKey`
            dispatch(triggerLoadAccounts())
        } catch (error) {
            if (error instanceof Error) {
                //if retries is 4, delete the db session
                if (retries === 4) {
                    await sessionDb.delete({
                        disableAutoOpen: false,
                    })
                    router.push(pathConstants.default)
                }
                //else, just update the retries
                dispatch(setRetries(retries + 1))
                //if error, just update the form with error message
                form.setError("pin", {
                    message: `Invalid PIN. ${4 - retries} retries left`,
                })
            } 
        }
    }

    return {
        form,
        onSubmit,
    }
}
