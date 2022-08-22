<script setup lang="ts">
import { ref } from 'vue'
import {
    MetaMaskConnector,
    WalletConnectConnector,
    CoinbaseWalletConnector,
    useBoard,
UserRejectedRequestError,
useEthers,
  } from "vue-dapp";

defineProps<{ msg: string }>()

const count = ref(0)


const { open } = useBoard();
const { address, balance, chainId, isActivated } = useEthers();
const infuraId = "2820b69f6e3a4af3817000efafbc0667";
const connectors =[
  new MetaMaskConnector({
    appUrl: "http://localhost:3000",
  }),
  new WalletConnectConnector({
    qrcode: true,
    rpc: {
      1: `https://mainnet.infura.io/v3/${infuraId}`,
      4: `https://rinkeby.infura.io/v3/${infuraId}`,
    },
  }),
  new CoinbaseWalletConnector({
    appName: "Vue Dapp",
    jsonRpcUrl: `https://mainnet.infura.io/v3/${infuraId}`,
  }),
];
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit1
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    
  </div>
  <div>
    <button @click="open">Connect Wallet</button>
    {{address}} {{balance}} {{isActivated}}
    <vd-board :connectors="connectors" dark />
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
