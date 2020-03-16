<template>
  <div class="el-system">
      system
      <div class="box">
        <ul id="mostUl">
          <li>我是需要的div</li>
          <li>页面内容</li>
          <li>页面内容</li>
          <li>页面内容</li>
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
  </div>
</template>

<script>
 export default {
     name: "system",
     methods: {
      handleSearch() {
        let li = document.getElementById("mostUl").getElementsByTagName("li");
        console.log(li);
        for(let i=0; i<li.length; i++) {
            let itemi = li[i];
            let content = itemi.innerHTML;
            let data = "我是需要的div";
            if(content.trim() == data.trim()) {
                console.log(888);
                console.log(itemi);
                let list = document.getElementById("mostUl").getElementsByTagName('li')[i].offsetTop;
                let targetUl = document.querySelector(".box");
                console.log(targetUl.scrollTop);
                targetUl.scrollTop = list - 15;
                console.log(list);
                console.log(targetUl.scrollTop);
                
            }
        }
       
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