// Js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Css
import "./assets/css/index.scss"
const app = createApp(App)
app.use(store)
app.use(router)

app.mount("#app")

// derar