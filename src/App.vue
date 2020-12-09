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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&family=Yeseva+One&display=swap');

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  font-family: $paragraphFont;
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 10px;
  overflow: hidden;
}
#app {
  margin: 0;
}

@keyframes arriving-from-top {
  from {
    transform: translate3d(0, -100vh, 0);
  }
}
@keyframes arriving-from-bottom {
  from {
    transform: translate3d(0, 100vh, 0);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
}
</style>
