<template>
  <div class="login_bg">
    <!-- <div class="top">
      <img src="../assets/logo.png" alt="">
      <div>金湾区消防安全监测预警联动处置平台</div>
    </div> -->
    <Row style="margin-top: 15%;" :justify="width < 800 && width > 574 ? 'center' : 'start'">
      <Col :offset="width < 800 ? 2 : 15" :xs="12" :lg="8" :md="12" :sm="18">
      <div class="loginbox">
        <LoginForm />
      </div>
      </Col>
    </Row>

  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import LoginForm from './LoginForm.vue'
import { Form, Input, Row, Col, Button, message, ConfigProvider } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
const prefixCls = 'vben-login'

const width = ref(window.innerWidth);

watchEffect(() => {
  //console.log(`当前窗口宽度为：${width.value}px`);
  // 在这里可以根据窗口宽度做一些响应式的操作
});

window.addEventListener('resize', () => {
  width.value = window.innerWidth;
});
</script>
<style lang="less" scoped>
.login_bg {
  background-image: url('../assets/gfg.png');
  border-top: 1px solid #fff;
  /*  width: 100%;
  height: 1080px; */
  background-size: cover;
  height: 100%;

  .top {
    width: 100%;
    background-color: #ffffff;
    height: 60px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    img{
      width: 42px;
      height: 42px;
      margin-left: 25px;
      margin-right: 20px;
    }
  }

  .loginbox {
    width: 450px;
    height: 450px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
  }


}
</style>
