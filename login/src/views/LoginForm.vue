<template>
  <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    登录
  </h2>
  <Form class="p-4 enter-x" :model="model" ref="loginForm" :rules="rulesRef" @keypress.enter="logion">
    <FormItem ref="username" name="username" class="enter-x" >
      <Input size="large" v-model:value="model.username" placeholder="用户名" class="fix-auto-fill"/>
    </FormItem>
    <FormItem ref="password" name="password"  class="enter-x" >
      <InputPassword size="large" visibilityToggle v-model:value="model.password" placeholder="密码"/>
    </FormItem>
    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click.prevent="logion">
        登陆
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import 'ant-design-vue/dist/antd.min.css'
  import { reactive, ref,getCurrentInstance} from 'vue'
  import { Form, Input, Row, Col, Button } from 'ant-design-vue'
  import axios from "@yue-chip/yue-chip-frontend-core/axios/axios";
  import {Md5} from 'ts-md5';
  const _this:any = getCurrentInstance();
  const ACol = Col
  const ARow = Row
  const FormItem = Form.Item
  const InputPassword = Input.Password
  const prefixCls = 'vben-login'
  const useForm = Form.useForm;

  const model = reactive({
    username: '',
    password: '',
    vCode: "11",
    code: "111"
  })
  const rulesRef = reactive({
    username: [
      {
        required: true,
        message: '请输入账号',
        trigger:'blur'
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger:'blur'
      },
    ],
  });
  function logion() {
    _this.ctx.$refs.loginForm.validate().then(() => {
      const formData = new FormData();
      formData.append('password', Md5.hashStr(model.password));
      formData.append('username', model.username);
      formData.append('grant_type', 'password');
      formData.append('client_id', 'yue-chip-client');
      formData.append('client_secret','yue-chip-client');
      formData.append('vCode', model.vCode);
      formData.append('code',model.code);
      axios.service.post('/upms/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((data)=>{
        if (data.status === 200){
          sessionStorage.setItem("token",data.data.token)
          location.href=window.location.protocol+"//"+window.location.host+"/frame/";
        }
      })
      .catch(obj => {
      })
      .finally(()=>{
      });
      })
    .catch((err: any) => {
    });
  }

</script>
