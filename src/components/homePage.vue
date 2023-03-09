<script setup>
    import  { ElRow,ElCol,ElButton,ElDrawer, ElMessage } from 'element-plus';
    import loadBase from './loadBase.vue';
    import { mainStore } from '../store';
    import { ref,defineEmits } from 'vue';
    const store = mainStore();
    let emits = defineEmits(['showStuInfo','ManageStayStatus','clearData']);
    
    let btnDisabled = ref(true);
    if(localStorage.getItem('data')) {
        btnDisabled.value = false;
    }

    let handleClickClearData = () => {
        window.localStorage.clear();
        btnDisabled.value = true;
        ElMessage.success('所有的数据都清除啦~');
        emits('clearData');
    }

    let defaultHint = '没有学生信息没法工作呀~先导入班级学生的信息吧~';
    let importHint = ref(defaultHint);
    let showImport = ref(false);
    let handleClickImportClass = () => {
        if(localStorage.getItem('data')) {
            importHint.value = '小渣渣们长大了，该换另一茬了吗？';
        } else {
            importHint.value = defaultHint;
        }
        showImport.value = true;
    }
    let handleImportSuccess = () => {
        showImport.value = false;
        btnDisabled.value = false;
    }

    let handleClickShowStuInfo = () => {
        emits('showStuInfo');
    }
    let handleClickManageStay = status => {
        emits('ManageStayStatus');
        store.stayFlag = status;
    }
</script>

<template>
    <el-row class="row">
        <el-col :span="24">
            <el-button size="large" type="primary" @click="handleClickShowStuInfo" :disabled="btnDisabled">查看学生信息</el-button>
        </el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="12">
            <el-button size="large" type="primary" @click="handleClickManageStay(true)" :disabled="btnDisabled">谁要留宿</el-button>
        </el-col>
        <el-col :span="12">
            <el-button size="large" type="primary" @click="handleClickManageStay(false)" :disabled="btnDisabled">谁不留宿</el-button>
        </el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="24">
            <el-button size="large" type="warning" @click="handleClickImportClass">重新导入班级信息</el-button>
        </el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="24">
            <el-button size="large" type="warning" @click="handleClickClearData" :disabled="btnDisabled">清除班级数据</el-button>
        </el-col>
    </el-row>
    <el-drawer direction="btt" v-model="showImport">
        <load-base :hint="importHint" @success="handleImportSuccess"></load-base>
    </el-drawer>
</template>

<style scoped>
    .row {
        margin-bottom: 20px;
    }
</style>