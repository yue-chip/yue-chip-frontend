<template>
  <a-tabs id="tabs" @change="onChange" v-model:activeKey="store.state.activeKey" :tabBarGutter="10" size="small" hide-add type="editable-card" @edit="onEdit" style="background-color: #fff;border-radius: 10px;">
    <a-tab-pane v-for="pane in store.state.panes" :key="pane.key" :tab="pane.title" >
      <iframe ref="contentIframe" id="contentIframe" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="auto" allowtransparency="true" :src="pane.url"></iframe>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import { useStore } from 'vuex'
const store = useStore()
const newTabIndex = ref(0);
function onEdit(targetKey:any)  {
  store.commit('removeTab',targetKey);
 
};
const onChange=()=>{
    console.log(store.state.activeKey);
    
}
</script>
<style lang="less">
#contentIframe{
  min-height: e("calc(100vh - 114px)");
  background-color: #f2f4f3;
}
</style>
<style lang="less" scoped>
.main__container {
  background-color: #f2f4f3;
  min-height: 280px;
  overflow: hidden;
}
</style>
<style lang="scss">
.tabs__view {
  & .ant-tabs-tab {
    user-select: none;
    padding: 0 16px 0 0 !important;
    & .ant-dropdown-trigger {
      padding-left: 16px;
    }
  }
  & .ant-tabs-bar {
    margin: 0 0 8px 0;
  }
  & .ant-tabs-tab-active {
    font-weight: normal;
    //border-bottom: 1px solid #f0f0f0 !important;
  }
}
:deep(:where(.css-dev-only-do-not-override-1p88qvr).ant-tabs-top >.ant-tabs-nav::before){
    position: absolute;
    right: 0;
    left: 0;
    border-bottom: 0px !important;
    content: '';
}
</style>
