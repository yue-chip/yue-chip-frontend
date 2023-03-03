<template>
  <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit">
    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
      <iframe ref="contentIframe" id="contentIframe" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true" src="/role/"></iframe>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
const panes = ref([{ title: "Tab1", content: "Content of Tab Pane 1", key: 1 },{ title: "Tab2", content: "Content of Tab Pane 2", key: 2 }]);
const activeKey = ref(panes.value[0].key);
const newTabIndex = ref(0);
function onEdit(targetKey:any)  {
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
// function add(){
//   activeKey.value = `newTab${newTabIndex.value++}`;
//   panes.value.push({
//     title: `New Tab ${activeKey.value}`,
//     content: `Content of new Tab ${activeKey.value}`,
//     key: activeKey.value,
//   });
// };
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