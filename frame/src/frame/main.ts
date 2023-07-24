// @ts-ignore
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import {Menu,MenuItem,SubMenu,Dropdown,Tabs,TabPane,message,Layout,LayoutSider} from "ant-design-vue"
const app = createApp(App);
app.use(Menu)
  .use(MenuItem)
  .use(SubMenu)
  .use(Dropdown)
  .use(Tabs)
  .use(TabPane)
  .use(Layout)
  .use(LayoutSider)
  .use(store).mount('#app')
app.config.globalProperties.$message = message;
