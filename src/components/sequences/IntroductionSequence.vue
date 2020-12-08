<template>
  <article :style="{transform: transformProprety }" v-on:wheel="onWheel" class="experience-introduction" :class="currentState">
    <div class="lottie-wrapper">
      <lottieAnimation
          class="intro-lottie"
          path="lottie/introAnim.json"
          :auto-play="true"
          @AnimControl="setAnimController"
      />
    </div>
  </article>
</template>

<script>
import LottieAnimation from "@/components/lib/LottieAnimation";

export default {
  name: 'IntroductionSequence',
  components: {
    LottieAnimation
  },
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
      } else if (e.deltaY > 0 && this.translateY <= -scrollLimit && !this.displayNextSlide) {
        if (this.currentState !== 'past') {
          this.$emit('next-slide')
        }

      }
      if (this.translateY > 0) this.translateY = 0
    },
    setAnimController (anim) {
      this.anim = anim
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

  .lottie-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: $themeRed;
    .intro-lottie {
      position: absolute;
      left: 0;
      bottom: -200px;
      width: 100%;
      max-height: 100vh;
      svg {
        height: auto;
      }
    }
  }
}
</style>
