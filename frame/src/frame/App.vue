<template>
  <a-layout class="layout">
    <a-layout-sider width="256">
      <layout-menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <layout-header />
      </a-layout-header>
      <a-layout-content class="container">
        <layout-content />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import layoutMenu from './components/menu/menu.vue'
import layoutHeader from "./components/header/header.vue";
import layoutContent from "./components/content/content.vue"
import { notification } from 'ant-design-vue';
import { useWebSocketStore } from './store/websocket';
import { storeToRefs } from 'pinia'
import { watch ,onMounted} from 'vue';
const webSocketStore = useWebSocketStore()
const { wsMessage } = storeToRefs(webSocketStore)

watch(wsMessage,()=>{
  try{
    notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    style: {
      width: '400px',
      marginLeft: `${335 - 600}px`,
    },
    class: 'notification-custom-class',
  });
  }catch(err){

  }
})
onMounted(()=>{
  webSocketStore.connect()
 
})
/* const ws = new WebSocket('ws://192.168.31.111/api/security/websocket/96eb6bf3-bf20-42e7-af33-24fd18bb9cbc');
  
  onMounted(()=>{
    ws.onopen = function(e){
    console.log('链接成功',e);
    ws.send('1111');
  }
  }) */
</script>
<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
<style lang="scss" scoped>
.layout {
  overflow: hidden;
  height: 100vh;

  & .header {
    background-color: #FFF;
    padding: 0;
  }

  & .container {
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  & .container::-webkit-scrollbar {
    width: 6px;
  }

  & .container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #C1C1C1;
  }

  & .container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
}
</style>
<style lang="scss">
.layout {
  & .ant-layout-sider-children {
    overflow-y: auto;
    overflow-x: hidden;
  }

  & .ant-layout-sider-children::-webkit-scrollbar {
    width: 4px;
  }

  & .ant-layout-sider-children::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #535353;
  }

  & .ant-layout-sider-children::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
}

.notification-custom-class {
  color: red;
}
</style>
