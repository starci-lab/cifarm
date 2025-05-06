import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { signInWithPopup, UserCredential } from "firebase/auth"
import { auth, googleProvider } from "@/modules/firebase"

export const useFirebaseAuthSwrMutation = (): UseSWRMutation<
    UserCredential
> => {
    const swrMutation = useSWRMutation(
        "FIREBASE_AUTH",
        async () => {
            return await signInWithPopup(auth, googleProvider)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
