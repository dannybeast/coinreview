const ethers = require('ethers');
import { abi as IUniswapV2Router02ABI } from './IUniswapV2Router02.json'
export const PANCAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
export function getTokenContract(address, signer)
{
    return new ethers.Contract(address, [
        'function approve(address _spender, uint256 _value) public returns (bool success)',
        'function balanceOf(address account) external view returns (uint256)',
        'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',
        'function approve(address _spender, uint256 _value) public returns (bool success)'
    ], signer)
}
export function getPairContract(address, signer)
{
    return new ethers.Contract(address, [
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
    ], signer)
}

export function getFactoryContract(signer)
{
    return new ethers.Contract(PANCAKE_ROUTER, IUniswapV2Router02ABI, signer)
}

