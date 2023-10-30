// @ts-ignore
import { createApp } from 'vue'
import {createPinia} from 'pinia';
import App from './App.vue'
import store from './store'
const app = createApp(App);
app.use(createPinia())
app.use(store).mount('#app')
