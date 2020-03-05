<template>
  <div class="container">
    <Head />
    <Home />
  </div>
</template>

<script>
import Head from "@/components/Head.vue"
import Home from "./Home.vue"

export default {
  name: 'index',
  components: {
    Head,
    Home
  }
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  width: 100%;
}
</style>
