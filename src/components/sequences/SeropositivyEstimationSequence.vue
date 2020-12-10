<template>
  <article class="seropositivity-estimation" :class="currentState">
  <lottie-animation
    path="lottie/pullFlower.json"
    @AnimControl="setAnimcontroller"
  />
  </article>
</template>

<script>
import * as animationData from '@/assets/lottie/pullFlower.json'
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default {
  name: 'SeropositivityEstimationSequence',
  components: {
      LottieAnimation
  },
  data: () => ({
    number:1000,
    defaultOptions: {animationData: animationData},
    animationSpeed: 1,
    anim: null
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  methods: {
    setAnimcontroller (anim) {
      this.anim = anim
      console.log(this.anim.animationData.markers)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.seropositivity-estimation {
  position: absolute;
  left: 0;
  bottom: 0;
  //background-color: #ff0000;
}

</style>
