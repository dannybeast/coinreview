const ethers = require('ethers');
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
    return new ethers.Contract(PANCAKE_ROUTER, [
        'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
        'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapExactTokensForETHSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)',
        'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)'
    ], signer)
}

