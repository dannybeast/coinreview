const {Token, ChainId, WETH, ETHER, TokenAmount, CurrencyAmount, JSBI} = require('@pancakeswap/sdk');
const {BigNumber} = require('ethers')
const {getTokenContract} = require('./contracts')


export async function useCurrency(token)
{
    const isBNB = token.address.toLowerCase()===WETH[ChainId.MAINNET].address.toLowerCase();
    return isBNB ? ETHER : token
}

export function tryParseAmount(value, currency) {

    if (!value || !currency) {
        return undefined
    }
    try {
        const typedValueParsed = parseUnits(value, currency.decimals).toString()
        if (typedValueParsed !== '0') {
            return currency instanceof Token
                ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
                : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
        }
    } catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.error(`Failed to parse input amount: "${value}"`, error)
    }
    // necessary for all paths to return a value
    return undefined
}

export async function getTokenData(data, accountData)
{
    const {provider, account, signer, chainId} = accountData;

    if (chainId!==ChainId.MAINNET) throw 'Wrong network';

    const isBNB = data.contract.toLowerCase()===WETH[ChainId.MAINNET].address.toLowerCase();

    const token = new Token(
        ChainId.MAINNET,
        data.contract,
        data.decimals,
        data.symbol,
    );

    let balance = await provider.getBalance(account);

    if (!isBNB)
    {
        const contract = getTokenContract(token.address, signer);
        balance = await contract.balanceOf(account);
    }


    return {token, balance, amount : data.amount, logo:data.logo}
}


export function parseFixed(value, decimals) {

    if (decimals == null) { decimals = 0; }
    const multiplier = getMultiplier(decimals);

    if (typeof(value) !== "string" || !value.match(/^-?[0-9.]+$/)) {
        throw new Error("invalid decimal value", "value", value);
    }

    // Is it negative?
    const negative = (value.substring(0, 1) === "-");
    if (negative) { value = value.substring(1); }

    if (value === ".") {
        throw new Error("missing value", "value", value);
    }

    // Split it into a whole and fractional part
    const comps = value.split(".");
    if (comps.length > 2) {
        throw new Error("too many decimal points", "value", value);
    }

    let whole = comps[0], fraction = comps[1];
    if (!whole) { whole = "0"; }
    if (!fraction) { fraction = "0"; }

    // Trim trailing zeros
    while (fraction[fraction.length - 1] === "0") {
        fraction = fraction.substring(0, fraction.length - 1);
    }

    // Check the fraction doesn't exceed our decimals size
    if (fraction.length > multiplier.length - 1) {
        throw new Error("fractional component exceeds decimals", "underflow", "parseFixed");
    }

    // If decimals is 0, we have an empty string for fraction
    if (fraction === "") { fraction = "0"; }

    // Fully pad the string with zeros to get to wei
    while (fraction.length < multiplier.length - 1) { fraction += "0"; }

    const wholeValue = BigNumber.from(whole);
    const fractionValue = BigNumber.from(fraction);

    let wei = (wholeValue.mul(multiplier)).add(fractionValue);

    if (negative) { wei = wei.mul(NegativeOne); }

    return wei;
}

const names = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "szabo",
    "finney",
    "ether",
];

export function parseUnits(value, unitName) {
    if (typeof(value) !== "string") {
        throw new Error("value must be a string", "value", value);
    }
    if (typeof(unitName) === "string") {
        const index = names.indexOf(unitName);
        if (index !== -1) { unitName = 3 * index; }
    }
    return parseFixed(value, (unitName != null) ? unitName: 18);
}

// Constant to pull zeros from for multipliers
let zeros = "0";
while (zeros.length < 256) { zeros += zeros; }

// Returns a string "1" followed by decimal "0"s
function getMultiplier(decimals) {

    if (typeof(decimals) !== "number") {
        try {
            decimals = BigNumber.from(decimals).toNumber();
        } catch (e) { }
    }

    if (typeof(decimals) === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
        return ("1" + zeros.substring(0, decimals));
    }

     throw new Error("invalid decimal size", "decimals", decimals);
}

export const mainnetTokens = [
    new Token(
        ChainId.MAINNET,
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        18,
        'BNB',
        'Wrapped BNB',
        'https://www.binance.com/',
    ),
    new Token(
        ChainId.MAINNET,
        '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        18,
        'CAKE',
        'PancakeSwap  Token',
        'https://pancakeswap.finance/',
    ),
    new Token(
        ChainId.MAINNET,
        '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        18,
        'BUSD',
        'Binance USD',
        'https://www.paxos.com/busd/',
    ),
    new Token(
        ChainId.MAINNET,
        '0x55d398326f99059fF775485246999027B3197955',
        18,
        'USDT',
        'Tether USD',
        'https://tether.to/',
    ),
    new Token(
        ChainId.MAINNET,
        '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
        18,
        'BTCB',
        'Binance BTC',
        'https://bitcoin.org/',
    ),
    new Token(
        ChainId.MAINNET,
        '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
        18,
        'UST',
        'Wrapped UST  Token',
        'https://mirror.finance/',
    ),
    new Token(
        ChainId.MAINNET,
        '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        18,
        'ETH',
        'Binance-Peg Ethereum  Token',
        'https://ethereum.org/en/',
    ),
    new Token(
        ChainId.MAINNET,
        '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        18,
        'USDC',
        'Binance-Peg USD Coin',
        'https://www.centre.io/usdc',
    ),
];