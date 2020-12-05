<template>
  <MainLayout />
  
</template>

<script>

import MainLayout from "@/components/MainLayout";

export default {
  name: 'App',
  components: {
    MainLayout  
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  margin: 0;
}
</style>
