import "virtual:windi.css";
import App from './App.vue'
// @ts-ignore
import { createApp } from 'vue'
import { router, setupRouter } from './router'
import 'ant-design-vue/dist/antd.css'
async function bootstrap() {
  const app = createApp(App)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
