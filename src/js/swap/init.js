import {getWeb3Modal, getAccountConnect} from "./modules/account";
import {getTokenData} from "./modules/tokens";
import {getAllowance, setApprove} from "./modules/allowance";
import {useSwap} from "./modules/swapAction";
const {getTradeData} = require('./modules/trades');



export const startSwap = useSwap;
export const startApprove = setApprove;
export async function getSwapData(w3provider,firstToken, secondToken, tolerance = 500, time = 30)
{
    const accountData = await getAccountConnect(w3provider);
    const firstTokenData = await getTokenData(firstToken, accountData);
    const secondTokenData = await getTokenData(secondToken, accountData);
    const tradeData = await getTradeData(firstTokenData, secondTokenData, accountData, tolerance );
    const allowance = await getAllowance(firstTokenData, accountData);
    return {accountData, tradeData, allowance}
}

window.web3Modal = getWeb3Modal;
window.getSwapData = getSwapData;
window.startApprove = startApprove;
window.startSwap = startSwap;





