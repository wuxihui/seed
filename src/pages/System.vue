<template>
  <div class="el-system">
      system
      <div class="box">
        <ul id="mostUl">
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>我是需要的div</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
        </ul>
      </div>
      <div class="search" @click="handleSearch">搜索</div>

      <div v-for="(v,i) in list" :key="i">
        <input type="text" v-model="list[i].contactType" />
        <button v-on:click="deleteNode(v, i)"> 删除 </button>
      </div>
      <button v-on:click="addNode()"> 添加 </button>
  </div>
</template>

<script>
 export default {
     name: "system",
     data() {
       return {
          list:[
            {contactType: '', number: ''}
          ],
       }
     },
     methods: {
      handleSearch() {
        let li = document.getElementById("mostUl").getElementsByTagName("li");
        console.log(li);
        for(let i=0; i<li.length; i++) {
            let itemi = li[i];
            let content = itemi.innerHTML;
            let data = "我是需要的div";
            if(content.trim() == data.trim()) {
                let list = document.getElementById("mostUl").getElementsByTagName('li')[i].scrollHeight;
                let targetUl = document.querySelector(".box");
                targetUl.scrollTop = list;
            }
        }
      },
      //添加标本div
      addNode:function() {
          this.list.push({contactType: '', number: ''});
      },
      //删除样本div
      deleteNode:function(v, i) {
        console.log(v);
        console.log(i);
        
          this.list.splice(i,1);  //删除index为i,位置的数组元素
      }
     }
 }
</script>

<style scoped lang="less">
.box {
  height: 100px;
  overflow-y: auto;
}
</style>