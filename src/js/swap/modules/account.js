const PANCAKESWAP = require("@pancakeswap/sdk");
const ethers = require('ethers');
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

// export async function getAccount() {
//     const provider = new ethers.providers.Web3Provider(window.ethereum,         PANCAKESWAP.ChainId.MAINNET);
//     if (typeof window.ethereum === 'undefined') {
//         alert('MetaMask not installed!');
//         return false;
//     }
//     const accounts = await ethereum.request({method: 'eth_requestAccounts'});
//     const account = accounts[0];
//     const signer = provider.getSigner();
//     return {provider, account, signer};
// }




export async function getAccountConnect(w3provider) {


    // Subscribe to accounts change

    const provider = new ethers.providers.Web3Provider(w3provider);

    const network = await provider.getNetwork();
    const chainId = network.chainId;

    if (chainId!==56)
    {
        throw 'Wrong network';
    }

    const accounts = await provider.listAccounts();
    const account = accounts[0];
    const signer = provider.getSigner();




    return {provider, account, signer};
}



