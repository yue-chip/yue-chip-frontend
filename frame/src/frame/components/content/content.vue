<template>
  <a-tabs v-model:activeKey="store.state.activeKey" size="small" hide-add type="editable-card" @edit="onEdit">
    <a-tab-pane v-for="pane in store.state.panes" :key="pane.key" :tab="pane.title" >
      <iframe ref="contentIframe" id="contentIframe" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true" :src="pane.url"></iframe>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import {  ref,getCurrentInstance,reactive } from 'vue';
import { useStore } from 'vuex'
import {Tabs,TabPane} from "ant-design-vue"
const _this:any = getCurrentInstance();

const store = useStore()
const newTabIndex = ref(0);
function onEdit(targetKey:any)  {
  store.commit('removeTab',targetKey);
};
</script>

<style lang="less">
#content {
  min-height: e("calc(100vh - 142px) ")
}
#contentIframe{
  min-height: e("calc(100vh - 142px)");
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