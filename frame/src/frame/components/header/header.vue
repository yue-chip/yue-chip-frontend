<template>
  <div class="layout__header">
    <div class="header__left">
    </div>
    <div class="header__right">
      <a-dropdown :trigger="['click', 'hover']">
        <div class="header__avatar">
          <a-avatar>
            <template #icon>
              <img src="" />
            </template>
          </a-avatar>
          <div class="header__avatar-name">admin</div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="logout">
              <template #icon ><PoweroffOutlined></PoweroffOutlined></template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {Menu,MenuItem} from "ant-design-vue"
  import { PoweroffOutlined } from '@ant-design/icons-vue';
  function logout(){
    sessionStorage.clear();
    window.location.href="/";
  }
</script>


<style lang="scss" scoped>
.layout__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  font-size: 20px;
  & .header__left {
    display: flex;
    align-items: center;
    flex-grow: 1;
    & .group__tabs {
      width: 500px;
      margin-left: 22px;
      margin-right: 22px;
      flex-grow: 1;
    }
  }

  & .header__right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    & .header__avatar {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      & .header__avatar-name {
        margin-left: 6px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="scss">
.layout__header {
  & .header__left {
    & .ant-tabs-bar {
      margin: 0;
      border: none;
    }
  }
}
</style>
