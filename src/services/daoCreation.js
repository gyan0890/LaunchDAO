import DEPLOYCONTRACT from "./deployContractAbi";
import DAOLAUNCH from "./daoLaunchAbi";
import web3 from "web3";
import WalletService from "./wallet";

import * as BN from "bn.js";
export default class DaoCreationService {
    //Contract used to deploy the token contract
    parentContract = "0xd12Ed91375eBc57D3c8A7C8992008d580C64e924";

    static async getDaoAddress() {
        const web3service = WalletService.getWet3Object();
        window.contract = await new web3service.eth.Contract(DEPLOYCONTRACT, parentContract);
        const tokenAddress =  await window.contract.methods.getContract().call();
        window.dao.tokenAddress = tokenAddress;
        mintToken(tokenAddress);
    };

    static async deployToken(name, symbol, description, totalSupply) {
        const web3service = WalletService.getWet3Object();
        window.contract = await new web3service.eth.Contract(DEPLOYCONTRACT, parentContract);
        const transactionParameters = {
            to: parentContract, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            data: window.contract.methods
                .deploy(name, symbol, description, totalSupply)
                .encodeABI(),
        };

        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            });
            alert("Wohoo! Setting up your DAO for deployment now" + txHash)
        } catch (error) {
            debugger;
        }

    }

    static async mintToken(tokenContract) {
        const web3service = WalletService.getWet3Object();
        window.contract = await new web3service.eth.Contract(DAOLAUNCH, tokenContract);
        const transactionParameters = {
            to: tokenContract, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            data: window.contract.methods
                .mintToken()
                .encodeABI(),
        };

        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            });
            alert("Wohoo! Setting up your DAO for deployment now" + txHash)
        } catch (error) {
            debugger;
        }

    }

    static async getDaoMetadata(tokenContract) {
        const web3service = WalletService.getWet3Object();
        window.contract = await new web3service.eth.Contract(DAOLAUNCH, tokenContract);
        //This will retun the latest DAO deployed by the user
        const daoMetadata =  await window.contract.methods.getMetadata().call();
    };


}
