import { Network } from "../common"

export interface CreateAccountParams {
    mnemonic: string;
    accountNumber: number;
    chainKey: string;
    //near only
    subdomain?: string;
    //temporatory our solution is testenet, so that we'll use it as default
    network?: Network;
}