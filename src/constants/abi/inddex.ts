import { Interface } from '@ethersproject/abi'
import MULTICALL2_ABI from './Multicall.json'
// import ERC20 from './ERC20.json'

const ERC20Interface = new Interface(MULTICALL2_ABI)

export { MULTICALL2_ABI,  ERC20Interface }