import bs58 from "bs58"
import nacl from "tweetnacl"
import { Buffer } from "buffer"

export interface DecryptPhantomDataParams {
    sharedSecret?: Uint8Array
    encryptedData: string
    nonce: Uint8Array
}

export const decryptPhantomData = async <T>({
    sharedSecret,
    encryptedData,
    nonce,
}: DecryptPhantomDataParams): Promise<T> => {
    if (!sharedSecret) {
        throw new Error("Shared secret is required")
    }
    // Decode the base58 encoded values
    const encryptedBytes = bs58.decode(encryptedData)
    // Decrypt the data
    const decryptedData = nacl.box.open.after(encryptedBytes, nonce, sharedSecret)
    // if the data is not decrypted, we throw an error
    if (!decryptedData) {
        throw new Error("Failed to decrypt data")
    }
    // Convert the decrypted Uint8Array to string
    return JSON.parse(Buffer.from(decryptedData).toString("utf8")) as T
}

export interface EncryptPhantomDataParams<T> {
    data: T
    sharedSecret: Uint8Array
}

export interface EncryptedPhantomDataResult {
    encryptedData: Uint8Array
    nonce: Uint8Array
}

export const encryptPhantomData = async <T>({
    data,
    sharedSecret,
}: EncryptPhantomDataParams<T>): Promise<EncryptedPhantomDataResult> => {
    const nonce = nacl.randomBytes(24)
    const dataBytes = Buffer.from(JSON.stringify(data))
    const encryptedData = nacl.box.after(dataBytes, nonce, sharedSecret)
    return {
        encryptedData,
        nonce,
    }
}   