<template>
  <div class="menu__logo">
    <div class="menu__logo-icon">
      <img src="../../../assets/images/logo.svg" />
    </div>
    <span>粤芯科技管理平台</span>
  </div>
  <a-menu
      mode="inline"
      theme="dark"
  >
    <a-sub-menu v-for="resource in resources" :key="resource.id">
<!--      <template #icon>-->
<!--        <MailOutlined />-->
<!--      </template>-->
      <template #title>{{ resource.name }}</template>
      <a-menu-item @click="showMenu(children.name,children.url,children.id)" v-for="children in resource.children" :key="children.id">{{ children.name }}</a-menu-item>
    </a-sub-menu>

  </a-menu>

</template>
<script setup lang="ts">
  import { onMounted,reactive,ref} from 'vue'
  import { useStore } from 'vuex'
  import axios from "@yue-chip/yue-chip-frontend-core/axios/axios";

  const store = useStore()
  let resources = ref();

  onMounted(() => {
    axios.axiosGet("/yue-chip-upms-serve/upms/console/currentUser/permissions",{},(data:any)=>{
      resources.value = data.data;
    },null)
  })

  function showMenu(name:string,url:string,id:string){
    store.commit('addMenu',{"title":name,"url":url,"key":id});
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