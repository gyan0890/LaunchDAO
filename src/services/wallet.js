import { ethers } from "ethers";

//Service to connect to the wallet
export default class WalletService {

    static async connectwallet(address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        //console.log("Account:", await signer.getAddress());
        const resolveAddress = await provider.resolveName(address);
        console.log("ENS Address is:", resolveAddress);
        debugger;
        return resolveAddress;

    }

    static async getENS(address) {
        const resolveAddress = await window.dao.provider.getResolver(address);
        return resolveAddress;
    }

}