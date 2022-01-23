import { ethers } from "ethers";

//Service to connect to the wallet
export default class WalletService {

    static async connectwallet() {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
        const resolveAddress = await provider.getResolver("gyanlakshmi.eth");
        console.log("ENS Address is:", resolveAddress);
        debugger;
        return signer;

    }

    // static getWet3Object() {
    //     return new Web3(Web3.givenProvider);
    // }

}