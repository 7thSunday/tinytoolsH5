<script setup>
import * as XLSX from 'xlsx';
import {ElContainer,ElHeader,ElMessage} from 'element-plus';
import {defineEmits} from 'vue';

const emits = defineEmits(['success']);

const props = defineProps({
  hint: {
    type: String,
    default: ''
  }
});

let handleFileChange = (e) => {
  const {files} = e.target;
  if(files.length == 0) return;
  const fileReader = new FileReader();
  fileReader.onload = ev => {
    let workbook = null;
    try {
      const {result} = ev.target;
      let data = [];
      workbook = XLSX.read(result, {type: 'binary'});
      if(workbook.Sheets.hasOwnProperty('Sheet1')) {
        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']));
        data = dataTransform(data);
      }
      window.localStorage.setItem('data',JSON.stringify(data));

      ElMessage({
        message: '学生数据导入成功',
        type: 'success',
      });
      emits('success');
    } catch(e) {
      console.log(e);
      ElMessage.error('导入失败');
    }
  }
  fileReader.readAsBinaryString(files[0]);
}

function dataTransform(sheet) {
  let res = [];
  for(let item of sheet) {
    let obj = {
      name: item['姓名'],
      No: item['座号'],
      room: item['宿舍'],
      klass: item['班级'],
      phone: null,
      address: null
    };
    res.push(obj);
  }
  return res;
}

</script>

<template>
  <el-container class="container">
    <el-header>{{ hint }}</el-header>
    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" @input="handleFileChange">
  </el-container>
</template>

<style scoped>
.container {
  height: 100%;
  max-width: 600px;
  justify-content: space-around;
  margin: auto;
  text-align: center;
}
</style>
