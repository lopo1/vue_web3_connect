import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'
import './index.css'
import { VueDapp } from "vue-dapp"

createApp(App).use(router).use(VueDapp).mount('#app')
