import {getTokenContract, PANCAKE_ROUTER} from "./contracts";
const {JSBI} = require("@pancakeswap/sdk");


const {WETH, ChainId} = require("@pancakeswap/sdk");
export const getAllowance = async (firstTokenData, accountData) => {

    let allowance = 100*10**18;
    if (firstTokenData.token.address !== WETH[ChainId.MAINNET].address) {
        const {signer, account} = accountData;
        const contract = getTokenContract(firstTokenData.token.address, signer);
        allowance = await contract.allowance(account, PANCAKE_ROUTER);
        allowance = allowance.toString()
    }
    return allowance;
}

export const setApprove = async (firstTokenData, accountData) => {
    const {signer} = accountData;
    const contract = getTokenContract(firstTokenData.token.address, signer);
    try {
        await contract.approve(PANCAKE_ROUTER, JSBI.BigInt(21000000 * 10 ** firstTokenData.token.decimals).toString());
        return true;
    } catch (err) {
        throw err;
    }
}