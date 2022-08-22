<script setup lang="ts">
import { defineComponent,ref } from 'vue'
import { formatDecimals} from '../utils'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { MULTICALL2_ABI, MULTICALL2_ADDRESS } from '../constants'
import { useEthers, useEthersHooks ,Web3Provider} from 'vue-dapp'
import { useToken } from '../composables/useToken'
const { signer,provider,address, isActivated } = useEthers()

// let contract = new ethers.Contract(MULTICALL2_ADDRESS, MULTICALL2_ABI, signer as  any);
// const multicall = new Contract(
//     MULTICALL2_ADDRESS,
//     MULTICALL2_ABI,
//     signer,
//     // Ref<Nullable<signer>>,
//   ) 
// const obj  = useEthers()
// const obj  = <Web3Provider> provider;
// obj.provider as Web3Provider
const name = ref('')
const totalSupply = ref(BigInt(0))
const decimals = ref(0)
  const symbol = ref('')
  const balance = ref(BigInt(0))
    const { onActivated, onDeactivated, onChanged } = useEthersHooks()
    onActivated(({ provider, address }) => {
      // console.log(provider, address, balance )
      console.log("===========" )
    })

    const cnstract = async ()=>{
      console.log("====")
      console.log(isActivated)
      console.log(signer.value);
      let contract = new Contract(MULTICALL2_ADDRESS, MULTICALL2_ABI, signer.value?.provider);
      const withSign = contract.connect(signer.value as any);
      const _name = await withSign.name()
      const _totalSupply = await contract.totalSupply()
      decimals.value =  await contract.decimals()
      symbol.value =  await contract.symbol()
      console.log(address.value);
      balance.value =  await contract.balanceOf(address.value)
      console.log(_name)
      name.value = _name
      totalSupply.value = _totalSupply
      const txHash =  await withSign.transfer("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",100)
      console.log(txHash);
      // call(
      //   provider as any,
      //   '0x36E1E1AD30136197c84D048b34Baa5e236326Fc0', // DAI Mainnet
      //   address as any,
      // )
    }
    onDeactivated(() => {
      console.log('deactivated')
    })
    onChanged(() => {
      console.log('change')
    })
</script>

<template>
 <div class="m-4">
      <button
        @click="isActivated ? cnstract() : cnstract()"
        class="btn"
        
      >
        constrct
      </button>
    </div>
  <div
    v-if="isActivated"
    class="flex flex-col justify-center items-center"
  >
  <input ref="input" />
    <p>name: {{ name }}</p>
    <p>totalSupply: {{ formatDecimals(totalSupply,decimals) }}</p>
    <p>decimals: {{ decimals }}</p>
    <p>symbol: {{ symbol }}</p>
    <p>balance: {{ formatDecimals(balance,18) }}</p>
  </div>
</template>