<template>
  <div>
    <ConfigProvider :theme="{
      token: {
        colorPrimary: '#ff9b17',
      },
    }">
      <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-center" style="margin-top: 20px;">
        欢迎登录
      </h2>
     <div class=" text-center   xl:text-center"> WELCOME! </div>
      <Form class="p-4 enter-x" :model="model" ref="loginForm" :rules="rulesRef" @keypress.enter="logion" style="margin-top: 25px;">
        <FormItem ref="username" name="username" class="enter-x">
          <Input size="large" v-model:value="model.username" placeholder="用户名" class="fix-auto-fill" />
        </FormItem>
        <FormItem ref="password" name="password" class="enter-x">
          <InputPassword size="large" visibilityToggle v-model:value="model.password" placeholder="密码" />
        </FormItem>
        <FormItem ref="tenantId" name="tenantId" class="enter-x">
          <Input size="large" v-model:value="model.tenantNumber" placeholder="机构编码" class="fix-auto-fill" />
        </FormItem>
        <FormItem class="enter-x">
          <Button type="primary" size="large" block @click.prevent="logion">
            登陆
          </Button>
        </FormItem>
      </Form>
    </ConfigProvider>
  </div>
</template>
<script lang="ts" setup>

import { reactive, ref } from 'vue'
import axios from "@yue-chip/yue-chip-frontend-core/axios/axios";
import { Form, Input, Row, Col, Button, message ,ConfigProvider} from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
const loginForm = ref<FormInstance>()
import { Md5 } from 'ts-md5';
const ACol = Col
const ARow = Row
const FormItem = Form.Item
const InputPassword = Input.Password
const prefixCls = 'vben-login'
const useForm = Form.useForm;

const model = reactive({
  username: '',
  password: '',
  tenantNumber: '',
  vCode: "11",
  code: "111"
})
const rulesRef = reactive<any>({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
  ],
});
function logion() {
  // @ts-ignore
  loginForm.value.validateFields().then(() => {
    const formData = new FormData();
    formData.append('password', Md5.hashStr(model.password));
    formData.append('username', model.username);
    formData.append('tenantNumber', model.tenantNumber);
    formData.append('grant_type', 'password');
    formData.append('client_id', 'yue-chip-client');
    formData.append('client_secret', 'yue-chip-client');
    formData.append('vCode', model.vCode);
    formData.append('code', model.code);
    axios.service.post('/upms/login1', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((data) => {
      if (data.status === 200) {
        sessionStorage.setItem("token", data.data.token)
        location.href = window.location.protocol + "//" + window.location.host + "/frame/";
      }
    })
      .catch(obj => {
      })
      .finally(() => {
      });
  })
    .catch((err: any) => {
    });
}

</script>
