<template>
    <a-config-provider :theme="{
        token: {
            colorPrimary: '#475ff5',

        },
    }" hash-priority="high">
        <a-layout class="layout">
            <a-layout-header class="header" style="height: 50px;">
                <layout-header @ispaly="ispaly" />
            </a-layout-header>
            <a-layout>
                <a-layout-sider width="230" style="background: #ffffff;">
                    <layout-menu />
                </a-layout-sider>
                <a-layout-content class="container">
                    <layout-content />
                </a-layout-content>
            </a-layout>
            <audio :muted="!ismute" class="audio" src="/static/y1054.mp3" type="audio/mpeg" loop>
            </audio>
        </a-layout>
    </a-config-provider>
</template>

<script setup lang="ts">
import layoutMenu from './components/menu/menu.vue'
import layoutHeader from "./components/header/header.vue";
import layoutContent from "./components/content/content.vue"
import { notification, Button } from 'ant-design-vue';
import { useWebSocketStore } from './store/websocket';
import { storeToRefs } from 'pinia'
import { watch, onMounted, h, ref } from 'vue';
const ismute = ref<boolean>(true)
const webSocketStore = useWebSocketStore()
const { wsMessage } = storeToRefs(webSocketStore)

watch(wsMessage, () => {
    try {
        const msgObj = JSON.parse(wsMessage.value)
        console.log(JSON.parse(wsMessage.value), 111);
        const audio: any = document.querySelector('.audio')
        const key = `open${Date.now()}`;
        audio.play()
        const alarmEvent = msgObj.alarmEvent
        const device = msgObj.device
        notification.open({
            message: '新的警告',
            description:
                `告警内容: ${alarmEvent.content}` + '\n' + `告警设备: ${device.name}` + '\n' + `告警时间:${alarmEvent.alarmDate}` + '\n' + `地址:${alarmEvent.address}`,
            duration: 0,
            btn: () =>
                h(
                    Button,
                    {
                        type: 'primary',
                        size: 'small',
                        danger: true,
                        //  @ts-ignore
                        onClick: () => {
                            const hostname = window.location.hostname;
                            const protocol = window.location.protocol;
                            window.location.href = `${protocol}//${hostname}/alarm/#/alarminfo?id=${alarmEvent.id}`, audio.pause(),
                                notification.close(key)
                        }
                    },
                    { default: () => '查看警告' },
                ),
            // key,
            onClose: () => { audio.pause(), close },
            style: {
                width: '400px',
                marginLeft: `${335 - 600}px`,
            },
            class: 'notification-custom-class',
        });
    } catch (err) {

    }
})
const ispaly = (e: boolean) => {
    ismute.value = e



}
/* const openNotification = () => {
  const key = `open${Date.now()}`;
  const audio: any = document.querySelector('.audio')
  audio.play()
  notification.open({
    message: 'Notification Title',
    description:
      'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
    btn: () =>
      h(
        Button,
        {
          type: 'primary',
          size: 'small',
          onClick: () => { notification.close('key'), audio.pause() }
        },
        { default: () => 'Confirm' },
      ),
    key,
    onClose: () => audio.pause(),
  });
};
 */
onMounted(() => {
    webSocketStore.connect()

    // openNotification()
})

onMounted(() => { })

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
    color: #fff;
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
        background: #f2f4f3;
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
        background: #012755 ;
    }

    & .ant-layout-sider-children::-webkit-scrollbar {
        width: 4px;
    }

    & .ant-layout-sider-children::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px #d8d8d8;
        background: #d8d8d8;
    }

    & .ant-layout-sider-children::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #d8d8d8;
        background: #ededed;
    }
}

.notification-custom-class {
    color: red;
}

.ant-notification {
    white-space: pre-wrap !important;
}

</style>
