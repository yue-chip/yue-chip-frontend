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
    <a-menu-item key="1">
      <template #icon>
        <MailOutlined />
      </template>
      Navigation One
    </a-menu-item>
    <a-menu-item key="2">
      <template #icon>
        <CalendarOutlined />
      </template>
      Navigation Two
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>Navigation Three</template>
      <a-menu-item key="3">Option 3</a-menu-item>
      <a-menu-item key="4">Option 4</a-menu-item>
      <a-sub-menu key="sub1-2" title="Submenu">
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>Navigation Four</template>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script setup lang="ts">
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