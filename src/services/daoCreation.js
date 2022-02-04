import deployContractABI from "./deployContractAbi";
import daoLaunchABI from "./daoLaunchAbi";
import WalletService from "./wallet";

//let parentContract = "0xd12Ed91375eBc57D3c8A7C8992008d580C64e924"; // rinkeby
//let parentContract = "0x24Ef0857EAB70cf8842c6E9221b38260cac83BE1"; // matic , old one without symbol
const parentContract = "0xC6d352c5383365c676F4eaF9Af3596896fAB67D3";

export default class DaoCreationService {
    //Contract used to deploy the token contract

    static async getDaoAddress(cb) {
        const web3service = WalletService.getWeb3Object();
        window.contract = await new web3service.eth.Contract(deployContractABI, parentContract);
        const tokenAddress = await window.contract.methods.getContract().call({ from: window.ethereum.selectedAddress });
        window.dao.tokenAddress = tokenAddress[tokenAddress.length - 1];
        await this.mintToken(window.dao.tokenAddress, cb);
    };

    static async deployDao(name, symbol, description, totalSupply, cb) {
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
                .once('sending', function (payload) { console.log(payload) })
                .once('sent', function (payload) { console.log(payload) })
                .once('transactionHash', function (hash) { console.log(hash) })
                .once('receipt', function (receipt) { console.log(receipt) })
                .on('confirmation', function (confNumber, receipt, latestBlockHash) { console.log(latestBlockHash) })
                .on('error', function (error) { console.log(error) })
                .then(async function (receipt) {
                    alert("Receipt generated" + receipt);
                    await me.getDaoAddress(cb);
                });
            alert("Wohoo! Setting up your DAO for deployment now")
        } catch (error) {
        }

    }

    static async mintToken(tokenContract, cb) {
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
            const txHash = web3service.eth.sendTransaction(transactionParameters)
                .once('sending', function (payload) { console.log(payload) })
                .once('sent', function (payload) { console.log(payload) })
                .once('transactionHash', function (hash) { console.log(hash) })
                .once('receipt', function (receipt) { console.log(receipt) })
                .on('confirmation', function (confNumber, receipt, latestBlockHash) { console.log(latestBlockHash) })
                .on('error', function (error) { console.log(error) })
                .then(async function (receipt) {
                    console.log("minted");
                    cb();

                });

        } catch (error) {
        }

    }

    static async getDaoMetadata(tokenContract) {
        const web3service = WalletService.getWeb3Object();
        window.contract = await new web3service.eth.Contract(daoLaunchABI, tokenContract);
        //This will retun the latest DAO deployed by the user
        const daoMetadata = await window.contract.methods.getMetadata().call({ from: window.ethereum.selectedAddress });
        //metadata returned is -- name, symbol, description, balance
        return daoMetadata;
    };

    static async getAllDaos() {

        const web3service = WalletService.getWeb3Object();
        window.contract = await new web3service.eth.Contract(deployContractABI, parentContract);
        const allDaos = await window.contract.methods.getAllContracts().call({ from: window.ethereum.selectedAddress });

        return allDaos;
    };

    static async getAllDaosWithMetadata() {
        let allDao = await this.getAllDaos();

        let data = [];


        for (let i = 0; i < allDao.length; i++) {
            const m = await this.getDaoMetadata(allDao[i].contractAddress);

            const d = { dao: allDao[i], meta: m };
            data.push(d);

        }

        return data;
    }


}
