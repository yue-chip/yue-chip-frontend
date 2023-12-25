<template>
  <a-tabs id="tabs" @change="onChange" v-model:activeKey="store.state.activeKey" :tabBarGutter="5" size="small" hide-add type="editable-card" @edit="onEdit" style="background-color: #fff;">
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
}
</style>
<style lang="scss" scoped>
.main__container {
  background-color: #FFF;
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
    border-bottom: 1px solid #f0f0f0 !important;
  }
}
</style>
