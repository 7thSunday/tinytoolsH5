<script setup>
    import  { ElRow,ElCol,ElButton,ElDrawer, ElMessage } from 'element-plus';
    import loadBase from './loadBase.vue';
    import { mainStore } from '../store';
    import { ref,defineEmits,onMounted } from 'vue';
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

    let hasData = Boolean(localStorage.getItem('data'));
    let defaultHint = '没有学生信息没法工作呀~先导入班级学生的信息吧~';
    let importHint = ref(defaultHint);
    let showImport = ref(false);
    let handleClickImportClass = () => {
        if(hasData) {
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
    onMounted(() => {
        if(!hasData) showImport.value = true;
    })

    let handleClickShowStuInfo = () => {
        emits('showStuInfo');
    }
    let handleClickManageStay = status => {
        emits('ManageStayStatus');
        store.operationFlag = status;
    }
</script>

<template>
    <div class="home-container">
        <el-row class="row">
            <el-col :span="24">
                <el-button size="large" type="primary" @click="handleClickShowStuInfo" :disabled="btnDisabled">查看学生信息</el-button>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="12">
                <el-button size="large" type="primary" @click="handleClickManageStay('stay')" :disabled="btnDisabled">谁要留宿</el-button>
            </el-col>
            <el-col :span="12">
                <el-button size="large" type="primary" @click="handleClickManageStay('leave')" :disabled="btnDisabled">谁不留宿</el-button>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="12">
                <el-button size="large" type="primary" @click="handleClickManageStay('ill')" :disabled="btnDisabled">谁身体不适</el-button>
            </el-col>
            <el-col :span="12">
                <el-button size="large" type="primary" @click="handleClickManageStay('grab')" :disabled="btnDisabled">谁要拿东西</el-button>
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
    </div>
</template>

<style scoped>
    .row {
        margin-bottom: 20px;
    }
    .home-container {
        padding: 15px;
    }
</style>