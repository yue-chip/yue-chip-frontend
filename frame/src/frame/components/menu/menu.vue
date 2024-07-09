<template>
   <!--  <div class="menu__logo">
        <div class="menu__logo-icon">
            <img src="../../../assets/images/logo.png" />
        </div>
        <span style="color: #333;font-weight: 500;">{{ store.state.institutionName }}</span>
    </div> -->
    <a-config-provider :theme="{
        token: {
            colorPrimary: '#f6001f',

        },
    }" hash-priority="high">
    <a-menu style="background: #012755 !important;" mode="inline" theme="dark" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys"
        @openChange="onOpenChange">
        <template v-for="resource in resources" :key="resource.id">
            <template v-if="resource.children">
                <a-sub-menu :key="resource.id">

                    <template #title>{{ resource.name }}</template>
                    <a-menu-item @click="showMenu(children.name, children.url, children.id)"
                        v-for="children in resource.children" :key="children.id">{{ children.name }}
                    </a-menu-item>
                </a-sub-menu>
            </template>
            <template v-else>
                <a-menu-item :key="resource.id" @click="showMenu(resource.name, resource.url, resource.id)">
                    {{ resource.name }}
                </a-menu-item>
            </template>
        </template>
    </a-menu>
    </a-config-provider>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import axios from "@yue-chip/yue-chip-frontend-core/axios/axios";
const store = useStore()
let resources = ref();
const openKeys = ref<any>([""]);
const selectedKeys = ref(['']);
const router = useRouter()
const list = ref<string[]>([])
onMounted(() => {
    axios.axiosGet("/upms/console/currentUser/permissions", {}, (data: any) => {
        resources.value = data.data;
        initShowMenu(data.data, 0);
        resources.value.forEach((item: any) => {
            list.value.push(item.id)
        });
    }, null, null)
})

function initShowMenu(menu: any, parentId: any) {

    menu.forEach(function (item: any) {
        if (item.type.name === 'MENU' && item.url) {
            if (!store.state.activeKey) {
                showMenu(item.name, item.url, item.id);
                selectedKeys.value[0] = item.id;
                openKeys.value[0] = parentId;
                return;
            }
        }
        if (!store.state.activeKey && item.children) {
            initShowMenu(item.children, item.id);
        }
    })
}

function showMenu(name: string, url: string, id: string) {
    console.log(store.state.activeKey);
    console.log(selectedKeys.value);

    if (url == '/visualization/') {
        window.open(url)
    } else {
        store.commit('addMenu', { "title": name, "url": url + "?_t=" + new Date().getTime(), "key": id });
    }
}
const onOpenChange = (e: string[]) => {
    console.log(e)
    console.log(resources.value);
    //const list: string[] = []
    console.log(list.value);
    /* resources.value.forEach((item:any) => {
        list.push(item.id)
    }); */


    const latestOpenKey: any = e.find((key: string) => selectedKeys.value.indexOf(key) === -1);
    console.log(latestOpenKey);

    //openKeys.value = [latestOpenKey];
    /*     console.log(list.value.indexOf(latestOpenKey) == -1);
        console.log(latestOpenKey);
        
    
    
        if (list.value.indexOf(latestOpenKey) == -1) {
            openKeys.value = openKeys;
            console.log(openKeys.value);
            
        } else {
            openKeys.value = latestOpenKey ? [latestOpenKey] : [];
        }  */

    /* console.log(e);
    openKeys.value=[""] */

}
watch(() => store.state.activeKey, () => {
    console.log(store.state.activeKey);
    selectedKeys.value = [store.state.activeKey];



})
</script>
<style lang="less" scoped>
:deep(.ant-menu-item-selected){
    color: #fff !important;
}

:deep(.ant-menu-sub){
    background-color: #012755 !important;
}
:deep(:where(.css-dev-only-do-not-override-1p88qvr).ant-menu ){
    background: #012755 !important;
}
:deep(.ant-menu-dark) {
  background: #012755 !important;
}
</style>
