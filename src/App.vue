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


@font-face {
    font-family: 'League Spartan';
    src: url('assets/fonts/LeagueSpartan-Extralight.eot');
    src: url('assets/fonts/LeagueSpartan-Extralight.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/LeagueSpartan-Extralight.woff2') format('woff2'),
        url('assets/fonts/LeagueSpartan-Extralight.woff') format('woff'),
        url('assets/fonts/LeagueSpartan-Extralight.ttf') format('truetype'),
        url('assets/fonts/LeagueSpartan-Extralight.svg#LeagueSpartan-Extralight') format('svg');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Soria';
    src: url('assets/fonts/Soria-Soria.eot');
    src: url('assets/fonts/Soria-Soria.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/Soria-Soria.woff2') format('woff2'),
        url('assets/fonts/Soria-Soria.woff') format('woff'),
        url('assets/fonts/Soria-Soria.ttf') format('truetype'),
        url('assets/fonts/Soria-Soria.svg#Soria-Soria') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

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
</style>
