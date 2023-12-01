<template>
  <div class="layout__header" style="height: 40px;">
    <div class="header__left">
      <a-tooltip :title="ismute
          ? '禁用告警声音'
          : '开启告警声音'
          ">
          <a-button class="nav-btn"  @click="ispaly" shape="circle">
            <template #icon>

              <img src="../../../assets/images/sound.png" style="margin-top: 3px;"  v-if="ismute"/>
              <img src="../../../assets/images/mute.png" style="margin-top: 3px;" v-else/>

             <!--  <icon-sound /> -->
            </template>
          </a-button>
        </a-tooltip>
    </div>
    <div class="header__right">
      <a-dropdown :trigger="['click', 'hover']">
        <div class="header__avatar">
          <a-avatar>
            <template #icon>
              <img :src="profilePhoto" />
            </template>
          </a-avatar>
          <div class="header__avatar-name">{{ info?.name }}</div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="showUpdateInfo()">
              <template #icon ><EditOutlined ></EditOutlined ></template>
              修改资料
            </a-menu-item>
            <a-menu-item key="2" @click="showUpdatePassword()">
              <template #icon ><FormOutlined></FormOutlined></template>
              修改密码
            </a-menu-item>
            <a-menu-item key="3" @click="logout">
              <template #icon ><PoweroffOutlined></PoweroffOutlined></template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <a-modal width="800px" v-model:visible="visible" title="修改用户信息" cancelText="取消" okText="保存" :destroyOnClose="true" :mask="true" :maskClosable="false" @cancel="cancel" @ok="update">
      <a-form ref="updateUserInfo" :rules="rules" :model="updateModel" :labelCol="{span: 6,offset:0}" >
        <a-row >
          <a-col :span="12">
            <a-form-item label="姓名" name="name" ref="name">
              <a-input placeholder="请输入姓名" v-model:value="updateModel.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系电话" name="phoneNumber" ref="phoneNumber">
              <a-input placeholder="请输入联系电话" v-model:value="updateModel.phoneNumber" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row >
          <a-col :span="12">
            <a-form-item label="头像" >
              <a-upload
                v-model:file-list="fileList"
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="/api/common/file/upload"
                :before-upload="beforeUpload"
                :headers="headers"
                @change="handleChange"
              >
                <img width="100" height="100" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="12">
          </a-col>
        </a-row>
      </a-form>
    </a-modal>


    <a-modal width="500px" v-model:visible="visibleUpdatePassword" title="修改密码" cancelText="取消" okText="保存" :destroyOnClose="true" :mask="true" :maskClosable="false" @cancel="cancelUpdatePassword" @ok="updatePassword">
      <a-form ref="updatePasswordFrom" :rules="rulesUpdatePassword" :model="updateModel" :labelCol="{span: 6,offset:0}" >
        <a-row >
          <a-col :span="24">
            <a-form-item label="新密码" name="password" ref="password">
              <a-input-password placeholder="请输入新密码" v-model:value="updateModel.password" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row >
          <a-col :span="24">
            <a-form-item label="确认密码" name="password1" ref="password1">
              <a-input-password placeholder="请输入确认密码" v-model:value="updateModel.password1" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { PoweroffOutlined,EditOutlined,FormOutlined ,PlusOutlined, LoadingOutlined,} from '@ant-design/icons-vue';
  import {ref,computed,onMounted} from 'vue'
  import { useStore } from 'vuex'
  import {FormInstance, message} from "ant-design-vue";
  import type { Rule } from 'ant-design-vue/es/form';
  import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
  import axios from "@yue-chip/yue-chip-frontend-core/axios/axios";
  import { Md5 } from 'ts-md5';
  const emit=defineEmits(['ispaly'])
  const store = useStore()
  let updateModel = ref({})
  let visible = ref<boolean>(false);
  const ismute=ref<boolean>(true)
  let visibleUpdatePassword = ref<boolean>(false);
  const updateUserInfo = ref<FormInstance>();
  const info=ref<any>()
  const updatePasswordFrom = ref<FormInstance>();
  const fileList = ref([]);
  const loading = ref<boolean>(false);
  let imageUrl = ref<string>('');
  let profilePhoto = ref<string>('');
  const rules:any={
    phoneNumber:[{required:true,message:"请输入联系电话",trigger:'blur'}],
    name:[{required:true,message:"请输入姓名",trigger:'blur'}]
  };
  const rulesUpdatePassword:any={
    password:[{required:true,validator:validatePass,message:"请输入密码",trigger:'blur'}],
    password1:[{validator:validatePass2,trigger:'blur'}]
  };

  function validatePass(_rule: Rule, value: string){
    if (value && value === '') {
      return Promise.reject('请输入密码');
    } else {
      if (updateModel.value.password1 && updateModel.value.password1 && updateModel.value.password1 !== '') {
        updatePasswordFrom.value.validateFields('password1');
      }
      return Promise.resolve();
    }
  };
  function validatePass2 (_rule: Rule, value: string) {
    if (!value || value==='') {
      return Promise.reject('请输入确认密码');
    }
    if (value && value!=='' && value !== updateModel.value.password) {
      return Promise.reject("两次输入的密码不一致!");
    }
    return Promise.resolve();
  };

  onMounted(() => {
    loadUserInfo();
  });

  function loadUserInfo(){
    axios.axiosGet("/upms/console/current/user/details", {params:{}},
      (data:any)=>{
        if (data.status === 200 ) {
          profilePhoto.value = "/api/file"+data.data.profilePhotoUrl;
          localStorage.setItem('organizationalId',data.data.organizationalId)
          localStorage.setItem('userId',data.data.id)
          localStorage.setItem('bigScreenName',data.data.bigScreenName)
          store.commit('institutionName', data.data.tenantAbbreviation);
          info.value=data.data
        }
      },null,null)
  }


  function showUpdateInfo(){
    axios.axiosGet("/upms/console/current/user/details", {params:{}},
      (data:any)=>{
        if (data.status === 200 ) {
          updateModel.value = data.data;
          imageUrl.value = "/api/file"+data.data.profilePhotoUrl;
          visible.value = true;
        }
      },null,null)
  }

  function showUpdatePassword(){
    visibleUpdatePassword.value=true;
  }

  function cancel(){
    visible.value = false;
    updateModel.value = {};
    fileList.value = [];
    imageUrl.value = "";
  }

  function cancelUpdatePassword(){
    visibleUpdatePassword.value = false;
    updateModel.value = {};
  }

  function update(){
    updateUserInfo.value.validateFields().then(() => {
      axios.axiosPut("/upms/console/user/update",updateModel.value,
        (data:any)=>{
          if (data.status === 200 ) {
            cancel();
            loadProfilePhoto();
            message.info(data.message);
          }
        },null,null)

    }).catch((err: any) => {
    });
  }

  function updatePassword(){
    updatePasswordFrom.value.validateFields().then(() => {
      axios.axiosPut("/upms/console/user/update/password", {password:Md5.hashStr(updateModel.value.password)},
        (data:any)=>{
          if (data.status === 200 ) {
            cancelUpdatePassword();
            message.info(data.message);
          }
        },null,null)
    }).catch((err: any) => {
    });
  }

  function logout(){
    axios.axiosGet("/upms/login/out",{params: {}},(data:any)=>{
      sessionStorage.clear();
      window.location.href="/";
    },null,null)
  }
  let headers = computed(()=>{
    const token = sessionStorage.getItem("token");
    return {"Token":token};
  })

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response.status === 200) {
        const data = info.file.response.data;
        updateModel.value.profilePhotoId = data[0].id;
        // profilePhoto.value = "/api"+data[0].url;
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
      }


    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('upload error');
    }
  };

  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('请上传正确的头像文件(jpeg/png/jpg)!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('请上传小与10MB的图像!');
    }
    return isJpgOrPng && isLt2M;
  };

  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }
  const ispaly = () => {
  ismute.value = !ismute.value
  emit('ispaly', ismute.value)

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
    justify-content: flex-end;
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
