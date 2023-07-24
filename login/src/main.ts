import "virtual:windi.css";
import App from './App.vue'
// @ts-ignore
import { createApp } from 'vue'
import { router, setupRouter } from './router'
import { Form, Input, Row, Col, Button,message} from 'ant-design-vue'
async function bootstrap() {
  const app = createApp(App)

  setupRouter(app)

  app.use(Form)
      .use(Input)
      .use(Row)
      .use(Col)
      .use(Button)
      .mount('#app')
  app.config.globalProperties.$message = message;
}

bootstrap()
