import { EphemeralKeyPair } from "@aptos-labs/ts-sdk"

const EphemeralKeyPairEncoding = {
    deserialize: (e: { data: Uint8Array }) => EphemeralKeyPair.fromBytes(e.data),
    serialize: (e: EphemeralKeyPair) => ({
        __type: "EphemeralKeyPair",
        data: e.bcsToBytes(),
    }),
}

export const serialize = (data: unknown): string =>
    JSON.stringify(data, (_, e) => {
        if (typeof e === "bigint") return { __type: "bigint", value: e.toString() }
        if (e instanceof Uint8Array)
            return { __type: "Uint8Array", value: Array.from(e) }
        if (e instanceof EphemeralKeyPair)
            return EphemeralKeyPairEncoding.serialize(e)
        return e
    })

export const deserialize = <EncodedData>(data: string): EncodedData =>
    JSON.parse(data, (_, e) => {
        if (e && e.__type === "bigint") return BigInt(e.value)
        if (e && e.__type === "Uint8Array") return new Uint8Array(e.value)
        if (e && e.__type === "EphemeralKeyPair")
            return EphemeralKeyPairEncoding.deserialize(e)
        return e
    })