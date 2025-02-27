export enum PartnershipKey {
    HoneycombProtocol = "honeycomb-protocol",
}

export interface Partnership {
    name: string
    description: string
    logo: string
    onPress: () => void
}