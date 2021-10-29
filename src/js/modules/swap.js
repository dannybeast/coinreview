//const UNISWAP = require("@uniswap/sdk");
const pancakeswap = require("@pancakeswap/sdk");
//const apeswap = require("apeswap-sdk");

const {
  pack,
  keccak256,
  sha256
} = require("@ethersproject/solidity");
const {
  getAddress,
  isAddress,
  getIcapAddress,
  getContractAddress,
  getCreate2Address
} = require("@ethersproject/address");



// libs
window.UNISWAP = UNISWAP
window.pancakeswap = pancakeswap
window.apeswap = apeswap

// @ethersproject/solidity
window.ethersprojectSoliditypack = {}
window.ethersprojectSoliditypack.pack = pack
window.ethersprojectSoliditypack.keccak256 = keccak256
window.ethersprojectSoliditypack.sha256 = sha256

// @ethersproject/address
window.ethersprojectAddress = {}
window.ethersprojectAddress.getAddress = getAddress
window.ethersprojectAddress.isAddress = isAddress
window.ethersprojectAddress.getIcapAddress = getIcapAddress
window.ethersprojectAddress.getContractAddress = getContractAddress
window.ethersprojectAddress.getCreate2Address = getCreate2Address
//