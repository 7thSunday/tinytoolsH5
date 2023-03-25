<script setup>
    import { ref,defineEmits } from 'vue';
    import { ElCheckboxGroup,ElCheckbox,ElRow,ElCol,ElIcon,ElSelect,ElOption,ElButton,ElMessage,ElDrawer,ElInput } from 'element-plus';
    import { CircleClose } from '@element-plus/icons'
    import { mainStore } from '../store';
    import { storeToRefs } from 'pinia';
    const store = mainStore();
    const { operationFlag } = storeToRefs(store);

    let optionsList = ref([
        {
            value: 'stay',
            label: '留宿'
        },{
            value: 'leave',
            label: '不留宿'
        },{
            value: 'ill',
            label: '身体不适'
        },{
            value: 'grab',
            label: '拿东西'
        },
    ]);

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

        let res = '';
        for(let i of selected.value) {
            for(let item of list.value) {
                if(item.No == i) {
                    res += item.room + item.name + '、';
                    break;
                }
            }
        }
        res = res.slice(0,-1);
        
        switch(operationFlag.value) 
        {
            case 'leave':
                res = '老师好，' + res + '今晚请假不留宿，麻烦老师登记，谢谢。';
                break;
            case 'stay':
                res = '老师好，这周末留宿的学生名单为：' + res + '，麻烦登记，谢谢。';
                break;
            case 'ill':
                res = '老师好，' + res + '同学身体不适，回宿舍休息，麻烦开下门，谢谢。';
                break;
            case 'grab':
                res = '老师好，' + res + '同学回宿舍拿东西，麻烦开门，谢谢。';
                break;
            default:
                res = '如果你能看到这个，那么程序出错了/(ㄒoㄒ)/~~';
        } 
        resText.value = res;
        showResText.value = true;
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

    
    let handleClickClearSelected = () => {
        selected.value = [];
    }
    let handleChangeOperation = () => {
        // selected.value = [];
        return;
    }

    let handleClickCopy = () => {
        const inputo = document.createElement("input");
        document.body.appendChild(inputo);
        inputo.value = resText.value;
        inputo.setAttribute('readOnly', 'readOnly')
        inputo.select();
        document.execCommand("Copy");
        document.body.removeChild(inputo);
        ElMessage.success('已复制到剪贴板~');
        showResText.value = false;
    }
</script>

<template>
    <div class="fix-box">
        <div class=" ctl-bar">
            <el-row class="top-row">
                <el-col :span="2">
                    <el-icon :size="30" @click="handleClickClose" color="#f56c6c">
                        <circle-close />
                    </el-icon>
                </el-col>
                <el-col :span="11">
                    <el-select v-model="operationFlag" @change="handleChangeOperation" class="col-child">
                        <el-option v-for="item in optionsList"  :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" class="col-child" @click="handleClickGenTxt">生成回复文本</el-button>
                </el-col>
            </el-row>
            <el-row class="top-row">
                <el-col :span="6">
                    <el-button type="primary" @click="handleClickClearSelected">清空选中</el-button>
                </el-col>
                <el-col :span="17">
                    <el-input type="text" v-model="inputText" @input="handleSearchInput" placeholder="输入姓名、号数、宿舍查找" clearable></el-input>
                </el-col>
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
    <el-drawer direction="btt" v-model="showResText" :with-header="false">
        <!-- <el-input class="txtarea" type="textarea" autosize="" :rows="5" v-model="resText"></el-input> -->
        <!-- <input class="txtarea" type="textarea" readonly v-model="resText"> -->
        <p class="txtarea">{{ resText }}</p>
        <div class="drawer-btn-box">
            <el-button type="primary" @click="handleClickCopy">复制到剪贴板</el-button>
        </div>
    </el-drawer>
</template>

<style scoped>
    .row {
        max-width: 600px;
        margin: 0 auto !important;
    } 
    .top-row {
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
        width: 32%;
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
        font-size: 16px;
        margin: 0;
        margin-bottom: 20px;
    }
    .col-child {
        width: 100%;
    }
    .drawer-btn-box {
        display: flex;
        justify-content: flex-end;
    }
</style>