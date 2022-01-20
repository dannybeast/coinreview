import {getFactoryContract} from "./contracts";
import { BigNumber } from '@ethersproject/bignumber'
import {parseUnits} from './utils'


const {Percent, JSBI, Router, TradeType} = require("@pancakeswap/sdk");

export async function useSwap(
    trade,
    tolerance,
    time,
    accountData,
    speed = '7',
    slipIncrease = 0
) {

    const {account} = accountData;

    const deadline = Math.floor(Date.now() / 1000) + 60 * time;

    const minSlip = 10+slipIncrease;
    const maxSlip = 10000;
    //console.log('tolerance-sended '+tolerance);

    let slipAmount = tolerance==='auto' ? minSlip : tolerance;

    //console.log('tolerance '+slipAmount);

    let allowedSlippage =  new Percent(JSBI.BigInt(slipAmount), JSBI.BigInt(maxSlip));

    const gasPrice = parseUnits(speed, 'gwei').toString();
    const swapCalls = useSwapCallArguments(trade, allowedSlippage, accountData, deadline);
    console.log(swapCalls);

    const estimatedCalls = await Promise.all(
        swapCalls.map((call) => {
            const {
                parameters: {methodName, args, value},
                contract,
            } = call
            const options = !value || isZero(value) ? {} : {value}

            return contract.estimateGas[methodName](...args, options)
                .then((gasEstimate) => {
                    return {
                        call,
                        gasEstimate,
                    }
                })
                .catch((gasError) => {
                    console.error('Gas estimate failed, trying eth_call to extract error', call)

                    return contract.callStatic[methodName](...args, options)
                        .then((result) => {
                            console.error('Unexpected successful call after failed estimate gas', call, gasError, result)
                            return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
                        })
                        .catch((callError) => {
                            console.log(callError);
                            const reason = callError.reason || callError.data.message || callError.message
                            const errorMessage = `The transaction cannot succeed due to error: ${
                                reason ?? 'Unknown error, check the logs'
                            }.`

                            return { call, error: new Error(errorMessage) }
                        })
                })
        }),
    )
    const successfulEstimation = estimatedCalls.find(
        (el, ix, list) =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
    )

    if (!successfulEstimation) {


        const errorCalls = estimatedCalls.filter((call) => 'error' in call)
        if (errorCalls.length > 0)
        {

            if (tolerance==='auto'&&minSlip<maxSlip)
            {
                return await useSwap(trade, tolerance, time, accountData, speed, minSlip);
            }
            throw errorCalls[errorCalls.length - 1].error

        }
        throw new Error('Unexpected error. Please contact support: none of the calls threw an error')
    }


    const {
        call: {
            contract,
            parameters: {methodName, args, value},
        },
        gasEstimate,
    } = successfulEstimation

    return contract[methodName](...args, {
        gasLimit: calculateGasMargin(gasEstimate),
        gasPrice,
        ...(value && !isZero(value) ? {value, from: account} : {from: account}),
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error!==null&&error.code === 4001) {
                throw 'Transaction rejected.'
            } else {
                // otherwise, the error was unexpected and we need to convey that
                console.error(`Swap failed`, error, methodName, args, value)
                throw `Swap failed: ${error.message}`
            }
        })
}


function useSwapCallArguments(
    trade,
    allowedSlippage,
    accountData,
    deadline// the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) {
    const {account, signer} = accountData;
    const contract = getFactoryContract(signer)
    let swapMethods = []

    swapMethods.push(
        Router.swapCallParameters(trade, {
            feeOnTransfer: false,
            allowedSlippage: allowedSlippage,
            recipient:account,
            deadline:  JSBI.BigInt(deadline),
        }),
    )
    if (trade.tradeType === TradeType.EXACT_INPUT) {
        swapMethods.push(
            Router.swapCallParameters(trade, {
                feeOnTransfer: true,
                allowedSlippage: allowedSlippage,
                recipient:account,
                deadline:  JSBI.BigInt(deadline),
            }),
        )
    }

    return swapMethods.map((parameters) => ({parameters, contract}));
}

// add 10%
 function calculateGasMargin(value) {
    return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}


function isZero(hexNumberString) {
    return /^0x0*$/.test(hexNumberString)
}
