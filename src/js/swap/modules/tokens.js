const {Token, ChainId, WETH} = require('@pancakeswap/sdk');
const {getTokenContract} = require('./contracts')

export async function getTokenData(data, accountData)
{
    const {provider, account, signer} = accountData;
    const token = new Token(
        ChainId.MAINNET,
        data.contract,
        data.decimals,
        data.symbol,
    );

    const contract = getTokenContract(token.address, signer);
    const balance = token.address !== WETH[ChainId.MAINNET].address ? await contract.balanceOf(account) : await provider.getBalance(account);
    return {token, balance, amount : data.amount, logo:data.logo}
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