<script setup>
    import { ref,defineEmits } from 'vue';
    import { ElCheckboxGroup,ElCheckbox,ElRow,ElCol,ElIcon,ElRadioGroup,ElRadio,ElButton,ElMessage,ElDrawer,ElInput } from 'element-plus';
    import { CircleClose } from '@element-plus/icons'
    import { mainStore } from '../store';
    import { storeToRefs } from 'pinia';
    const store = mainStore();
    const { stayFlag } = storeToRefs(store);

    let dataString = localStorage.getItem('data');
    let list = ref(JSON.parse(dataString));

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
                for(let item of list.value) {
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

    let timer = null;
    let inputText = ref('');
    let handleSearchInput = content => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            searchText(content);
        }, 1000);
    }
    function searchText(keywords) {
        if(keywords==='') {
            list.value = JSON.parse(dataString);
            return;
        }
        let key = keywords.toUpperCase();
        let firstCharCode = keywords.charCodeAt(0);
        let field = 'name';
        if(firstCharCode>=48&&firstCharCode<=57) field = 'No';
        else if((firstCharCode>=65&&firstCharCode<=90) || (firstCharCode>=97&&firstCharCode<=122)) field = 'room';
        list.value = list.value.filter((item) => item[field].toString().indexOf(key) > -1);
    }
</script>

<template>
    <div class="fix-box">
        <div class=" ctl-bar">
            <el-row class="top-row">
                <el-icon :size="30" @click="handleClickClose" color="#f56c6c">
                    <circle-close />
                </el-icon>
                <el-radio-group v-model="stayFlag">
                    <el-radio  :label="true">留宿</el-radio>
                    <el-radio  :label="false">不留宿</el-radio>
                </el-radio-group>
                <el-button type="primary" @click="handleClickGenTxt">生成回复文本</el-button>
            </el-row>
            <el-row>
                <el-input type="text" v-model="inputText" @input="handleSearchInput" placeholder="输入姓名、号数、宿舍查找" clearable></el-input>
            </el-row>
        </div>
    </div>
    <el-row class="row" :gutter="20">
        <el-checkbox-group v-model="selected"  class="check-group">
            <el-checkbox v-for="item in list" :label="item.No" :key="item.No" border="" class="check" >
                {{ item.No }} - {{ item.name }}
            </el-checkbox>
        </el-checkbox-group>
    </el-row>
    <el-drawer direction="btt" v-model="showResText">
        <el-input class="txtarea" type="textarea" autosize="" :rows="5" v-model="resText"></el-input>
    </el-drawer>
</template>

<style scoped>
    .row {
        max-width: 600px;
        margin: 0 auto !important;
    } 
    .top-row {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .check-group {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 10px;
        padding-top: 120px;
    }
    .check {
        margin-bottom: 20px;
        width: 30%;
        margin-right: 0;
    }
    .fix-box {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
    }
    .ctl-bar {
        width: 100%;
        height: 110px;
        background: #d9ecff;
        padding: 15px;
    }
    .txtarea {
        font-size: 18px;
        height: 100%;
    }
</style>