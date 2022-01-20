import {getWeb3Modal, getAccountConnect} from "./modules/account";
import {getTokenData} from "./modules/tokens";
import {getAllowance, setApprove} from "./modules/allowance";
import {useSwap, getEstimation} from "./modules/swapAction";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const {getTradeData} = require('./modules/trades');



export const startSwap = useSwap;
export const setEstimation = getEstimation;
export const startApprove = setApprove;
export async function getSwapData(accountData,firstToken, secondToken, tolerance = 500, time = 30)
{
    const firstTokenData = await getTokenData(firstToken, accountData);
    const secondTokenData = await getTokenData(secondToken, accountData);
    const tradeData = await getTradeData(firstTokenData, secondTokenData, accountData, tolerance );
    const allowance = await getAllowance(firstTokenData, accountData);
    return {accountData, tradeData, allowance, tolerance, time}
}


window.WalletConnectProvider = WalletConnectProvider;
window.getAccountConnect = getAccountConnect;
window.Web3Modal = Web3Modal;
window.getSwapData = getSwapData;
window.setEstimation = setEstimation;
window.startApprove = startApprove;
window.startSwap = startSwap;







