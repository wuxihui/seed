<template>
  <div class="el-system">
      system
      <div class="box">
        <ul>
          <li @click="handleClick">dfgfsdg</li>
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
  </div>
</template>

<script>
 export default {
     name: "system",
     methods: {
       handleClick(event) {
          let el = event.currentTarget;
          console.log(el);
          
       }
     }
 }
</script>

<style scoped lang="less">

</style>