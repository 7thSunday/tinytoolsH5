<script setup>
  import  { ElTabs,ElTabPane  } from 'element-plus';
  import { ref,shallowRef } from 'vue';
  import HomePage from './components/homePage.vue';
  import StuInfoPage from './components/stuInfoPage.vue';
  import stayManage from './components/stayManage.vue';
  let activeName = ref('home');

  
  let panelList = shallowRef([]);
  let handlecloseTab = (targetName) => {
    if (activeName.value === targetName) {
      panelList.value.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = panelList.value[index + 1] || panelList.value[index - 1]
          if (nextTab) {
            activeName.value = nextTab.name;
          } else {
            activeName.value = 'home';
          }
        }
      })
    }
    panelList.value = panelList.value.filter((tab) => tab.name !== targetName);
  }

  function addPage (page) {
    for(let extPage of panelList.value) {
      if(extPage.name == page.name) {
        activeName.value = page.name;
        return;
      }
    }
    panelList.value.push(page);
    activeName.value = page.name;
  }
  let showStuInfo = () => {
    let page = {
      title: '信息',
      name: 'StuInfo',
      content: StuInfoPage,
    }
    addPage(page);
  }
  let showManageStay = e => {
    let page = {
      title: '宿管',
      name: 'StayManage',
      content: stayManage,
    }
    addPage(page);
  }
</script>

<template>
    <el-tabs v-model="activeName" tab-position="bottom" type="border-card" class="frame-box" closable="">
        <el-tab-pane label="主页" name="home" :closable="false">
          <home-page 
            @showStuInfo="showStuInfo"
            @ManageStayStatus="showManageStay">
          </home-page>
        </el-tab-pane>
        <el-tab-pane 
          v-for="item in panelList" 
          :key="item.name"
          :label="item.title"
          :name="item.name">
          <component :is="item.content" @close="handlecloseTab(item.name)"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<style>
    .frame-box, .el-tabs__content{
        height: 100%;
    }
    .el-tabs__content  {
        padding-bottom: 45px !important;
    }
    .el-tabs__header.is-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>