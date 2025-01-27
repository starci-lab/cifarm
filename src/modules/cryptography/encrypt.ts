
import {
    randomBytes,
    createCipheriv,
    createDecipheriv,
} from "crypto"
import { sha256Hash } from "./sha256"

export interface EncryptParams {
  key: string;
  data: string;
}

export interface EncryptedResult {
  iv: string;
  data: string;
}

export const getHashKey = (key: string) =>
    sha256Hash(key).substring(0, 32)

export const encrypt = ({ key, data }: EncryptParams): EncryptedResult => {
    const iv = randomBytes(16)
    const hashKey = getHashKey(key)
    const cipher = createCipheriv("aes-256-cbc", Buffer.from(hashKey), iv)
    const updatedCipher = cipher.update(data)
    const encrypted = Buffer.concat([updatedCipher, cipher.final()])
    return {
        iv: iv.toString("hex"),
        data: encrypted.toString("hex"),
    }
}

export interface DecryptParams {
  iv: string;
  key: string;
  encryptedData: string;
}

export const decrypt = ({ key, encryptedData, iv }: DecryptParams) => {
    console.log(key, encryptedData, iv)
    const hashKey = getHashKey(key)
    const decipher = createDecipheriv(
        "aes-256-cbc",
        Buffer.from(hashKey),
        Buffer.from(iv, "hex")
    )
    let decrypted = decipher.update(Buffer.from(encryptedData, "hex"))
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}
