<template>
    <div class="layout__header" style="height: 40px;">
        <div class="header__left">
            <a-tooltip :title="ismute
                ? '禁用告警声音'
                : '开启告警声音'
                ">
                <a-button class="nav-btn" @click="ispaly" shape="circle">
                    <template #icon>

                        <img src="../../../assets/images/sound.png" style="margin-top: 3px;" v-if="ismute" />
                        <img src="../../../assets/images/mute.png" style="margin-top: 3px;" v-else />

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
                            <template #icon>
                                <EditOutlined></EditOutlined>
                            </template>
                            修改资料
                        </a-menu-item>
                        <a-menu-item key="2" @click="showUpdatePassword()">
                            <template #icon>
                                <FormOutlined></FormOutlined>
                            </template>
                            修改密码
                        </a-menu-item>
                        <a-menu-item key="3" @click="onlineHelp()">
                            <template #icon>
                                <BorderRightOutlined />
                            </template>
                            在线帮助
                        </a-menu-item>
                        <a-menu-item key="4" @click="logout">
                            <template #icon>
                                <PoweroffOutlined></PoweroffOutlined>
                            </template>
                            退出登录
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>

        <a-modal width="800px" v-model:visible="visible" title="修改用户信息" cancelText="取消" okText="保存" :destroyOnClose="true"
            :mask="true" :maskClosable="false" @cancel="cancel" @ok="update">
            <a-form ref="updateUserInfo" :rules="rules" :model="updateModel" :labelCol="{ span: 6, offset: 0 }">
                <a-row>
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
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="邮箱" name="email" ref="email">
                            <a-input placeholder="请输入电子邮箱" v-model:value="updateModel.email" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="证件类型" name="IdCardType" ref="IdCardType">
                            <a-select v-model:value="updateModel.IdCardType">
                                <a-select-option value="0">身份证</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="证书编号" name="certificateNumber" ref="certificateNumber">
                            <a-input placeholder="请输入证书编号" v-model:value="updateModel.certificateNumber" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="身份证号码" name="identificationNumber" ref="identificationNumber">
                            <a-input placeholder="请输入身份证号码" v-model:value="updateModel.identificationNumber" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="所属机构">
                            <a-input v-model:value="updateModel.organizationalName" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="头像">
                            <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                                class="avatar-uploader" :show-upload-list="false" action="/api/common/file/upload"
                                :before-upload="beforeUpload" :headers="headers" @change="handleChange">
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
                        <a-form-item label="其它照片">
                            <a-upload v-model:file-list="otherPhotoUrlList" name="avatar" list-type="picture-card"
                                class="avatar-uploader" :show-upload-list="false" action="/api/common/file/upload"
                                :before-upload="beforeUpload" :headers="headers" @change="handleChange1">
                                <img width="100" height="100" v-if="otherPhotoUrl" :src="otherPhotoUrl" alt="avatar" />
                                <div v-else>
                                    <loading-outlined v-if="otherPhotoLoading"></loading-outlined>
                                    <plus-outlined v-else></plus-outlined>
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>


        <a-modal width="500px" v-model:visible="visibleUpdatePassword" title="修改密码" cancelText="取消" okText="保存"
            :destroyOnClose="true" :mask="true" :maskClosable="false" @cancel="cancelUpdatePassword" @ok="updatePassword">
            <a-form ref="updatePasswordFrom" :rules="rulesUpdatePassword" :model="updateModel"
                :labelCol="{ span: 6, offset: 0 }">
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="新密码" name="password" ref="password">
                            <a-input-password placeholder="请输入新密码" v-model:value="updateModel.password" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="确认密码" name="password1" ref="password1">
                            <a-input-password placeholder="请输入确认密码" v-model:value="updateModel.password1" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
        <a-modal width="500px" v-model:visible="open" title="在线帮助"  :footer="null">
           <a-space :size="20" style="margin-bottom: 20px;">
                <div style="font-size: 16px;font-weight: 500;width: 250px">用户使用手册维保端小程序</div>
                <a-button type="primary"  @click.prevent="look">查看</a-button>
               
                <a-button type="primary"  @click="download">下载</a-button>
           </a-space>   
           <a-space :size="20" style="margin-bottom: 20px;">
                <div style="font-size: 16px;font-weight: 500;width: 250px">用户使用手册pc端</div>
                <a-button type="primary" @click.prevent="look1">查看</a-button>
                <a-button type="primary" @click="download1">下载</a-button>
           </a-space>  
           <a-space :size="20">
                <div style="font-size: 16px;font-weight: 500;width: 250px;">用户使用手册三小场所小程序端</div>
                <a-button type="primary" @click.prevent="look2">查看</a-button>
                <a-button type="primary" @click="download2">下载</a-button>
           </a-space> 
        </a-modal>

    </div>
</template>
  
<script setup lang="ts">
// @ts-nocheck
import { PoweroffOutlined, EditOutlined, FormOutlined, PlusOutlined, LoadingOutlined, BorderRightOutlined} from '@ant-design/icons-vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { FormInstance, message, UploadChangeParam, UploadProps } from "ant-design-vue";
import type { Rule } from 'ant-design-vue/es/form';
import axios from "@yue-chip/yue-chip-frontend-core/axios/axios";
import { Md5 } from 'ts-md5';
const emit = defineEmits(['ispaly'])
const open=ref(false)
const store = useStore()
let updateModel = ref({})
let visible = ref<boolean>(false);
const ismute = ref<boolean>(true)
let visibleUpdatePassword = ref<boolean>(false);
const updateUserInfo = ref<FormInstance>();
const info = ref<any>()
const updatePasswordFrom = ref<FormInstance>();
const fileList = ref([]);
const loading = ref<boolean>(false);
let imageUrl = ref<string>('');
let profilePhoto = ref<string>('');
const otherPhotoUrlList = ref([])
const otherPhotoLoading = ref<boolean>(false);
let otherPhotoUrl = ref<string>('');
let otherPhoto = ref<string>('');
const rules: any = {
    phoneNumber: [{ required: true, message: "请输入联系电话", trigger: 'blur' }],
    name: [{ required: true, message: "请输入姓名", trigger: 'blur' }]
};
const rulesUpdatePassword: any = {
    password: [{ required: true, validator: validatePass, message: "请输入密码", trigger: 'blur' }],
    password1: [{ validator: validatePass2, trigger: 'blur' }]
};

function validatePass(_rule: Rule, value: string) {
    if (value && value === '') {
        return Promise.reject('请输入密码');
    } else {
        if (updateModel.value.password1 && updateModel.value.password1 && updateModel.value.password1 !== '') {
            updatePasswordFrom.value.validateFields('password1');
        }
        return Promise.resolve();
    }
};
function validatePass2(_rule: Rule, value: string) {
    if (!value || value === '') {
        return Promise.reject('请输入确认密码');
    }
    if (value && value !== '' && value !== updateModel.value.password) {
        return Promise.reject("两次输入的密码不一致!");
    }
    return Promise.resolve();
};

onMounted(() => {
    loadUserInfo();
});

function loadUserInfo() {
    axios.axiosGet("/upms/console/current/user/details", { params: {} },
        (data: any) => {
            if (data.status === 200) {
                profilePhoto.value = "/api/file" + data.data.profilePhotoUrl;
                localStorage.setItem('organizationalId', data.data.organizationalId)
                localStorage.setItem('userId', data.data.id)
                localStorage.setItem('bigScreenName', data.data.bigScreenName)
                store.commit('institutionName', data.data.tenantAbbreviation);
                document.title = data.data.tenantAbbreviation;
                info.value = data.data
            }
        }, null, null)
}


function showUpdateInfo() {
    axios.axiosGet("/upms/console/current/user/details", { params: {} },
        (data: any) => {
            if (data.status === 200) {
                updateModel.value = data.data;
                imageUrl.value = "/api/file" + data.data.profilePhotoUrl;
                visible.value = true;
            }
        }, null, null)
}

function showUpdatePassword() {
    visibleUpdatePassword.value = true;
}

function cancel() {
    visible.value = false;
    updateModel.value = {};
    fileList.value = [];
    imageUrl.value = "";
}

function cancelUpdatePassword() {
    visibleUpdatePassword.value = false;
    updateModel.value = {};
}

function update() {
    updateUserInfo.value.validateFields().then(() => {
        axios.axiosPut("/upms/console/user/update", updateModel.value,
            (data: any) => {
                if (data.status === 200) {
                    // cancel();

                    message.info(data.message);
                    visible.value = false
                    loadUserInfo()
                }
            }, null, null)

    }).catch((err: any) => {
    });
}

function updatePassword() {
    updatePasswordFrom.value.validateFields().then(() => {
        axios.axiosPut("/upms/console/user/update/password", { password: Md5.hashStr(updateModel.value.password) },
            (data: any) => {
                if (data.status === 200) {
                    cancelUpdatePassword();
                    message.info(data.message);
                }
            }, null, null)
    }).catch((err: any) => {
    });
}

function logout() {
    axios.axiosGet("/upms/login/out", { params: {} }, (data: any) => {
        sessionStorage.clear();
        window.location.href = "/";
    }, null, null)
}
let headers = computed(() => {
    const token = sessionStorage.getItem("token");
    return { "Token": token };
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

const handleChange1 = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
        otherPhotoLoading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        if (info.file.response.status === 200) {
            const data = info.file.response.data;
            updateModel.value.otherPhotoId = data[0].id;
            // profilePhoto.value = "/api"+data[0].url;
            getBase64(info.file.originFileObj, (base64Url: string) => {
                otherPhotoUrl.value = base64Url;
                otherPhotoLoading.value = false;
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
const onlineHelp=()=>{
    open.value=true
}
const openFile=()=>{
    
}
const look=()=>{
    window.open('/static/text.pdf?corp_id=test',)
}
const download=()=>{
    const a = document.createElement("a"); 
  a.href = "/static/text.pdf"; 
  a.download = "用户使用手册维保端小程序.pdf"; // 设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
  a.style.display = "none"; // 障眼法藏起来a标签
  document.body.appendChild(a); // 将a标签追加到文档对象中
  a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove(); // 一次性的，用完就删除a标签
  return false
}
const look1=()=>{
    window.open('/static/text1.pdf?corp_id=test',)
}

const download1=()=>{
    const a = document.createElement("a"); 
  a.href = "/static/text1.pdf"; 
  a.download = "用户使用手册pc端.pdf"; // 设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
  a.style.display = "none"; // 障眼法藏起来a标签
  document.body.appendChild(a); // 将a标签追加到文档对象中
  a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove(); // 一次性的，用完就删除a标签
  return false
}
const look2=()=>{
    window.open('/static/text2.pdf?corp_id=test',)
}
const download2=()=>{
    const a = document.createElement("a"); 
  a.href = "/static/text2.pdf"; 
  a.download = "用户使用手册三小场所小程序端.pdf"; // 设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
  a.style.display = "none"; // 障眼法藏起来a标签
  document.body.appendChild(a); // 将a标签追加到文档对象中
  a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
  a.remove(); // 一次性的，用完就删除a标签
  return false
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
  