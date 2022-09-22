import { createApp } from "vue"
import App from "./App.vue"
import pinia from '../src/stores/pinia.js'
import router from "./router"
import 'animate.css/animate.min.css'
import { vueAnimateCss } from "animation-vue"


const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vueAnimateCss())

app.mount("#app")
