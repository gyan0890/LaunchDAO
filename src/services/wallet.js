import { ethers } from "ethers";
import Web3 from "web3";
import { AppActions } from "../states/actions";

//Service to connect to the wallet
export default class WalletService {

    static async getENS(address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        //console.log("Account:", await signer.getAddress());
        const resolveAddress = await provider.resolveName(address);
        console.log("ENS Address is:", resolveAddress);
        return resolveAddress;

    }
    static async connnectWalletState() {
        const web3 = new Web3(Web3.givenProvider);
        const wallet = await web3.eth.requestAccounts()
        return {
            type: AppActions.SETWALLET,
            payload: wallet[0]
        }
    }


    static getWeb3Object() {
        return new Web3(Web3.givenProvider);
    }

    // static async getENS(address) {
    //     const resolveAddress = await window.dao.provider.getResolver(address);
    //     return resolveAddress;
    // }

}