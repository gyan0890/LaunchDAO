import deployContractABI from "./deployContractAbi";
import daoLaunchABI from "./daoLaunchAbi";
import web3 from "web3";
import WalletService from "./wallet";

let parentContract = "0xd12Ed91375eBc57D3c8A7C8992008d580C64e924";

export default class DaoCreationService {
    //Contract used to deploy the token contract

    static async getDaoAddress() {
        debugger;
        const web3service = WalletService.getWeb3Object();
        debugger;
        window.contract = await new web3service.eth.Contract(deployContractABI, parentContract);
        debugger;
        const tokenAddress =  await window.contract.methods.getContract().call({from: window.ethereum.selectedAddress});
        window.dao.tokenAddress = tokenAddress;
        await this.mintToken(tokenAddress);
    };

    static async deployDao(name, symbol, description, totalSupply) {
        debugger;
        const web3service = WalletService.getWeb3Object();
        window.contract = await new web3service.eth.Contract(deployContractABI, parentContract);
        const transactionParameters = {
            to: parentContract, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            data: window.contract.methods
                .deploy(name, symbol, description, totalSupply)
                .encodeABI(),
        };

        try {
            // const txHash = await window.ethereum.request({
            //     method: "eth_sendTransaction",
            //     params: [transactionParameters],
            // })
            const me = this;
            web3service.eth.sendTransaction(transactionParameters)
            .once('sending', function(payload){ console.log(payload) })
            .once('sent', function(payload){ console.log(payload) })
            .once('transactionHash', function(hash){ console.log(hash) })
            .once('receipt', function(receipt){ console.log(receipt) })
            .on('confirmation', function(confNumber, receipt, latestBlockHash){ console.log(latestBlockHash) })
            .on('error', function(error){ console.log(error) })
            .then(async function(receipt){
                alert("Receipt generated" + receipt);
                await me.getDaoAddress();
                debugger;
            });
            alert("Wohoo! Setting up your DAO for deployment now")
        } catch (error) {
            debugger;
        }

    }

    static async mintToken(tokenContract) {
        debugger;
        const web3service = WalletService.getWeb3Object();
        window.contract = await new web3service.eth.Contract(daoLaunchABI, tokenContract);
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
        debugger;
        const web3service = WalletService.getWeb3Object();
        window.contract = await new web3service.eth.Contract(daoLaunchABI, tokenContract);
        //This will retun the latest DAO deployed by the user
        const daoMetadata =  await window.contract.methods.getMetadata().call({from: window.ethereum.selectedAddress});
        return daoMetadata;
    };


}
