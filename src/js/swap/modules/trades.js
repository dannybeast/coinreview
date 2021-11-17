const {Pair, TokenAmount, Trade, Percent, JSBI, currencyEquals} = require("@pancakeswap/sdk");
const {mainnetTokens, tryParseAmount, useCurrency} = require("./tokens");
const {getPairContract} = require("./contracts");


export async function getTradeData(firstTokenData, secondTokenData, accountData, tolerance = 500) {

    const {signer} = accountData;
    let price = 0;
    let trade = null;
    let priceImpactWithoutFeePercent = 0;
    let realizedLPFeeAmount = 0;
    let amountOutMin = 0;

    if (firstTokenData.amount > 0 || secondTokenData.amount > 0) {
        if (firstTokenData.amount > 0)
        {
            trade = await getBestTrade(firstTokenData, secondTokenData, tolerance, signer);

        }
        else
        {
            const tradeAbort = await getBestTrade(secondTokenData, firstTokenData, tolerance, signer);
            const priceAbort = tradeAbort.executionPrice.toSignificant(18);
            firstTokenData.amount = secondTokenData.amount*priceAbort;
            trade = await getBestTrade(firstTokenData, secondTokenData, tolerance, signer);
        }

        price = trade.executionPrice.toSignificant(18);
        secondTokenData.amount = secondTokenData.amount*price;
        const priceImpact = getPriceImpact(trade);
        priceImpactWithoutFeePercent = priceImpact.priceImpactWithoutFeePercent;
        realizedLPFeeAmount = priceImpact.realizedLPFeeAmount
        const slippageTolerance = new Percent(JSBI.BigInt(tolerance), JSBI.BigInt(10000));
        amountOutMin = trade.minimumAmountOut(slippageTolerance).raw

    }
    return {trade,priceImpactWithoutFeePercent, realizedLPFeeAmount, price,amountOutMin ,firstTokenData, secondTokenData}
}
function getPriceImpact(trade)
{
    const BASE_FEE = new Percent(JSBI.BigInt(25), JSBI.BigInt(10000))
    const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(10000), JSBI.BigInt(10000));
    const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE);
    const realizedLPFee = ONE_HUNDRED_PERCENT.subtract(trade.route.pairs.reduce((currentFee) => currentFee.multiply(INPUT_FRACTION_AFTER_FEE), ONE_HUNDRED_PERCENT));
    // remove lp fees from price impact
    const priceImpactWithoutFeeFraction = trade && realizedLPFee ? trade.priceImpact.subtract(realizedLPFee) : undefined
    // the x*y=k impact
    const priceImpactWithoutFeePercent = priceImpactWithoutFeeFraction
        ? new Percent(priceImpactWithoutFeeFraction?.numerator, priceImpactWithoutFeeFraction?.denominator)
        : undefined
    // the amount ofthe input that accrues to LPs
    let realizedLPFeeAmount =
        realizedLPFee &&
        trade &&
        (trade.inputAmount instanceof TokenAmount
            ? new TokenAmount(trade.inputAmount.token, realizedLPFee.multiply(trade.inputAmount.raw).quotient)
            : CurrencyAmount.ether(realizedLPFee.multiply(trade.inputAmount.raw).quotient));

    realizedLPFeeAmount = realizedLPFeeAmount.toSignificant(6);
    return {priceImpactWithoutFeePercent, realizedLPFeeAmount}
}

async function getBestTrade(firstTokenData, secondTokenData,tolerance, signer)
{

    const TokenFirst = firstTokenData.token;
    const TokenSecond = secondTokenData.token;

    let bases = mainnetTokens;
    const basePairs = bases.flatMap((base) => bases.map((otherBase) => [base, otherBase]));
    const allPairCombinations = [
        [TokenFirst, TokenSecond],
        ...bases.map((base) => [TokenFirst, base]),
        ...bases.map((base) => [TokenSecond, base]),
        ...basePairs,
    ]
        .filter((tokens) => Boolean(tokens[0] && tokens[1]))
        .filter(([t0, t1]) => t0.address !== t1.address);


    const pairAddresses = allPairCombinations.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && tokenA.address!==tokenB.address ? Pair.getAddress(tokenA, tokenB) : undefined
    });

    const results =await Promise.all( pairAddresses.map(async (address) => {
        let pairContract = getPairContract(address, signer);
        try
        {
            let result = await pairContract.getReserves();
            return {
                result
            }
        }
        catch (err){}
    }));

    const allPairs = results.map((result, i)=>{

        if(result===undefined) return [0,null];

        const tokenA = allPairCombinations[i][0];
        const tokenB = allPairCombinations[i][1];

        if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [3, null]
        const reserve0 = result.result.reserve0;
        const reserve1 = result.result.reserve1;
        const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
        return [
            2,
            new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString())),
        ]

    });

    const allowedPairs = Object.values(
        allPairs
            // filter out invalid pairs
            .filter((result) => Boolean(result[0] === 2 && result[1]))
            // filter out duplicated pairs
            .reduce((memo, [, curr]) => {
                memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
                return memo
            }, {}),
    )
    const currencyIn = await useCurrency(firstTokenData.token);
    // console.log(currencyIn);
    const currencyOut = await useCurrency(secondTokenData.token);
    // console.log(currencyOut);
    const currencyAmountIn = tryParseAmount(firstTokenData.amount, currencyIn);
    // console.log(currencyAmountIn);

    let bestTradeSoFar = null
    for (let i = 1; i <= 3; i++) {
        const currentTrade = Trade.bestTradeExactIn(allowedPairs,currencyAmountIn, currencyOut,  { maxHops: i, maxNumResults: 1 })[0] ?? null;
        if (isTradeBetter(bestTradeSoFar, currentTrade,
            new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
        )) {
            bestTradeSoFar = currentTrade
        }
    }

    return bestTradeSoFar;
}

async function isTradeBetter(tradeA, tradeB,minimumDelta = new Percent('0'),
) {
    if (tradeA && !tradeB) return false
    if (tradeB && !tradeA) return true
    if (!tradeA || !tradeB) return undefined

    if (
        tradeA.tradeType !== tradeB.tradeType ||
        !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
        !currencyEquals(tradeB.outputAmount.currency, tradeB.outputAmount.currency)
    ) {
        throw new Error('Trades are not comparable')
    }

    if (minimumDelta.equalTo(new Percent('0'))) {
        return tradeA.executionPrice.lessThan(tradeB.executionPrice)
    }
    return tradeA.executionPrice.raw.multiply(minimumDelta.add(new Percent('100'))).lessThan(tradeB.executionPrice)
}