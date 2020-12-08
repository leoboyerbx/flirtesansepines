<template>
  <article :style="{transform: transformProprety }" v-on:wheel="onWheel" class="experience-introduction" :class="currentState">
    <img class="intro-img" src="@/assets/tmpIntro.svg" alt="">
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
    <h1>Coucou</h1>
  </article>
</template>

<script>
import _throttle from 'lodash.throttle'

export default {
  name: 'IntroductionSequence',
  data: () => ({
    translateY: 0,
    scrollFactor: 10
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  computed: {
    transformProprety () {
      return this.currentState ===  'past'
          ? 'translate3d(0, -100%, 0)'
          : 'translate3d(0, ' + this.translateY + 'px ,0)'
    },
  },
  methods: {
    onWheel (e) {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      const scrollLimit = this.$el.offsetHeight - vh

      const canGoUp = e.deltaY < 0 && this.translateY < 0
      const canGoDown = e.deltaY > 0 && this.translateY > -scrollLimit
      if (canGoUp || canGoDown) {
        this.translateY -= e.deltaY * this.scrollFactor
      } else if (e.deltaY > 0 && this.translateY <= -scrollLimit) {
        this.$emit('next-slide')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.experience-introduction {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  transition: all .5s;
  .intro-img {
    width: 100%;
  }
}
</style>
