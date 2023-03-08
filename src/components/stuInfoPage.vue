<script setup>
    import { ElInput,ElRow,ElCol,ElDrawer,ElIcon, } from 'element-plus';
    import { CircleClose } from '@element-plus/icons'
    import { ref,defineEmits } from 'vue';

    const emits = defineEmits(['close'])

    let dataString = localStorage.getItem('data');
    let list = ref(JSON.parse(dataString));
    
    let showDetails = ref(false),
        infoName = ref(''),
        infoNo = ref(''),
        infoRoom = ref('');
    let handleClickStuBtn = stu => {
        infoName.value = stu.name;
        infoNo.value = stu.No;
        infoRoom.value = stu.room;
        showDetails.value = true;
    }

    let handleClickClose = () => {
        emits('close');
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
        if(keywords==='') return;
        
    }
</script>

<template>
    <!-- <el-row class="row">
        <el-input type="text" v-model="inputText" @input="handleSearchInput" placeholder="输入姓名、号数、宿舍查找"></el-input>
    </el-row> -->
    <el-icon :size="30" @click="handleClickClose">
        <circle-close />
    </el-icon>
      
    <el-row class="row" :gutter="20">
        <el-col v-for="(item,index) in list" :key="index" :span="8" class="button-box">
            <div class="stu-btn" @click="handleClickStuBtn(item)">
                <span>{{ item.No }}</span>
                <span>{{ item.name }}</span>
            </div>
        </el-col>
    </el-row>
    <el-drawer v-model="showDetails" direction="btt">
        <el-row>
            <span>{{ infoNo }}号</span>
            <span>{{ infoName }}</span>
        </el-row>
        <el-row>
            <span>宿舍：{{ infoRoom }}</span>
        </el-row>
    </el-drawer>
</template>

<style scoped>
    .row {
        max-width: 600px;
        margin: 0 auto !important;
    }
    .button-box {
        margin-top: 20px;
    }
    .stu-btn {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border: 1px solid gainsboro;
        border-radius: 3px;
        padding: 5px 10px;
        cursor: pointer;
    }
    .stu-btn:hover {
        border-color: #409eff;
        color: #409eff;
    }
</style>