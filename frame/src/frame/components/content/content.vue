<template>
  <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit">
    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" >
      <iframe ref="contentIframe" id="contentIframe" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true" :src="pane.url"></iframe>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import {  ref,getCurrentInstance } from 'vue';
const _this:any = getCurrentInstance();
import { useStore } from 'vuex'
const store = useStore()
const panes = ref(store.state.panes);
const activeKey = ref(store.state.activeKey);
const newTabIndex = ref(0);
function onEdit(targetKey:any)  {
  console.log(activeKey.value)
  let lastIndex = 0;
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  panes.value = panes.value.filter(pane => pane.key !== targetKey);
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key;
    } else {
      activeKey.value = panes.value[0].key;
    }
  }
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