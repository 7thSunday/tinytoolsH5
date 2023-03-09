<script setup>
    import { ref,defineEmits } from 'vue';
    import { ElCheckboxGroup,ElCheckbox,ElRow,ElIcon,ElRadioGroup,ElRadio,ElButton,ElMessage,ElDrawer,ElInput } from 'element-plus';
    import { CircleClose } from '@element-plus/icons'
    import { mainStore } from '../store';
    import { storeToRefs } from 'pinia';
    const store = mainStore();
    const { stayFlag } = storeToRefs(store);

    let dataString = localStorage.getItem('data');
    let list = JSON.parse(dataString);

    let emits = defineEmits(['close']);
    let handleClickClose = () => {
        emits('close');
    }

    let selected = ref([]);
    let resText = ref('');
    let showResText = ref(false);
    let handleClickGenTxt = () => {
        if(selected.value.length == 0) {
            ElMessage.warning('至少要选一个学生哦~');
            return;
        }
        
        if(!stayFlag.value) {
            let res = '老师好，';
            for(let i of selected.value) {
                for(let item of list) {
                    if(item.No == i) {
                        res += item.room + item.name + '、';
                        break;
                    }
                }
            }
            res = res.slice(0,-1);
            res += '今晚请假不留宿，麻烦老师登记，谢谢。'
            resText.value = res;
            showResText.value = true;
        } else {
            resText.value = '功能开发中，期待一下吧';
            showResText.value = true;
        }
    }
</script>

<template>
    <el-icon :size="30" @click="handleClickClose">
        <circle-close />
    </el-icon>
    <el-row class="row control-bar">
        <el-radio-group v-model="stayFlag">
            <el-radio  :label="true">留宿</el-radio>
            <el-radio  :label="false">不留宿</el-radio>
        </el-radio-group>
        <el-button type="primary" @click="handleClickGenTxt">生成回复文本</el-button>
    </el-row>
    <el-row class="row" :gutter="20">
        <el-checkbox-group v-model="selected"  class="check-group">
            <el-checkbox v-for="item in list" :label="item.No" :key="item.No" border="" class="check" >
                {{ item.No }} - {{ item.name }}
            </el-checkbox>
        </el-checkbox-group>
    </el-row>
    <el-drawer direction="btt" v-model="showResText">
        <el-input type="textarea" autosize="" v-model="resText"></el-input>
    </el-drawer>
</template>

<style scoped>
    .row {
        max-width: 600px;
        margin: 0 auto !important;
    } 
    .check-group {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .check {
        margin-bottom: 20px;
        width: 30%;
        margin-right: 0;
    }
    .control-bar {
        display: flex; 
        width: 100%;
        justify-content: space-between;
        padding-bottom: 30px;
    }
</style>