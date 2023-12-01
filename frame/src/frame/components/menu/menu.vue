<template>
  
    <div class="menu__logo">
      <div class="menu__logo-icon">
        <img src="../../../assets/images/logo.png" />
      </div>
      <span style="color: #333;font-weight: 500;">金湾区消防平台</span>
    </div>
    <a-menu mode="inline" theme="light" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys">
      <template v-for="resource in resources" :key="resource.id">
        <template v-if="resource.children">
          <a-sub-menu :key="resource.id">

            <template #title>{{ resource.name }}</template>
            <a-menu-item @click="showMenu(children.name, children.url, children.id)" v-for="children in resource.children"
              :key="children.id">{{ children.name }}</a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="resource.id" @click="showMenu(resource.name, resource.url, resource.id)">
            {{ resource.name }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>

</template>
<script setup lang="ts">
import { onMounted, reactive, ref, } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import axios from "@yue-chip/yue-chip-frontend-core/axios/axios";
const store = useStore()
let resources = ref();
let openKeys = ref([""]);
let selectedKeys = ref([""]);
const router = useRouter()
onMounted(() => {
  axios.axiosGet("/upms/console/currentUser/permissions", {}, (data: any) => {
    resources.value = data.data;
    initShowMenu(data.data, 0);
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
  if (url == '/visualization/') {
    window.open(url, '_blank');
  } else {
    store.commit('addMenu', { "title": name, "url": url + "?_t=" + new Date().getTime(), "key": id });
  }
}
</script>
<style lang="scss" scoped>
.menu__logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  & .menu__logo-icon {
    width: 32px;
    margin-right: 8px;

    img {
      display: block;
      width: 100%;
    }
  }

  & span {
    display: inline-block;
    font-size: 20px;
    color: #fff;
  }
}

</style>
