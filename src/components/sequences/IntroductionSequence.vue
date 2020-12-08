<template>
  <article
      :style="{transform: transformProprety }"
      v-on:wheel="onWheel"
      class="experience-introduction"
      :class="currentState"
  >
    <section class="lottie-wrapper">
      <lottieAnimation
          class="intro-lottie"
          path="lottie/introAnim.json"
          :auto-play="false"
          :loop="false"
          @AnimControl="setAnimController"
          :speed="0.4"
      />
    </section>
    <div class="title" :class="{ visible: titleVisible }">
      <h1>Flirt sans épines</h1>
    </div>
    <HIVEstimation class="hiv-estimation" />
  </article>
</template>

<script>
import LottieAnimation from "@/components/lib/LottieAnimation";
import HIVEstimation from "@/components/sequences/partials/HIVEstimation";

export default {
  name: 'IntroductionSequence',
  components: {
    HIVEstimation,
    LottieAnimation
  },
  data: () => ({
    translateY: 0,
    scrollFactor: 10,
    lottieFactor: 1,
    lottiePlaying: false,
    isScrollAnimating: false,
    titleVisible: false
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
    totalFrames () {
      return this.anim.totalFrames || 0
    }
  },
  methods: {
    onWheel (e) {
      if (this.anim.currentFrame < this.totalFrames -1) {
        this.handleWheelLottie(e)
      } else {
        this.handleWheelScroll(e)
      }
    },
    handleWheelScroll (e) {
      if (!this.isScrollAnimating) {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        const scrollLimit = this.$el.offsetHeight - vh

        const canGoUp = e.deltaY < 0 && this.translateY < 0
        const canGoDown = e.deltaY > 0 && this.translateY > -scrollLimit
        if (canGoUp || canGoDown) {
          this.translateY -= e.deltaY * this.scrollFactor
          this.isScrollAnimating = true
          setTimeout(() => {
            this.isScrollAnimating = false
          }, 400)
        } else if (e.deltaY > 0 && this.translateY <= -scrollLimit && !this.displayNextSlide) {
          if (this.currentState !== 'past') {
            this.$emit('next-slide')
          }
        }
      }
      if (this.translateY > 0) this.translateY = 0
    },
    handleWheelLottie (e) {
      if (!this.lottiePlaying && e.deltaY > 0) {
        this.anim.play()
        this.lottiePlaying = true

        if (this.anim.currentFrame < 90) {
          setTimeout(() => {
            this.anim.pause()
            this.lottiePlaying = false
          }, 400)
        } else {
          this.anim.setSpeed(1)
        }
      }

      // if (e.deltaY > 0) {
      //   this.anim.goToAndStop(this.anim.currentFrame + 1, true)
      // }
      // if (e.deltaY > 0) {
      //   console.log(this.anim.currentFrame)
      //   this.anim.playSegments([
      //     [this.anim.currentSlide, this.anim.currentSlide + e.deltaY * this.lottieFactor]
      //   ], false)
      // }
    },
    setAnimController (anim) {
      this.anim = anim
      this.anim.goToAndStop(50, true)
      window.anim = anim
      this.anim.addEventListener('complete', () => {
        this.titleVisible = true
      })
      // window.setInterval(() => {
      //   console.log(this.anim.currentFrame)
      // }, 10)
    },
    getMarkerByKey (key) {
      if (this.anim.animationData.markers) {
        for (const marker of this.anim.animationData.markers) {
          if (marker.cm === key) return marker
        }
        return null
      }
      return null
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
  transition: all .8s ease;

  .lottie-wrapper {
    width: 100%;
    //background-color: $themeRed;
    .intro-lottie {
      position: relative;
      //left: 0;
      //top: 0;
      width: 100%;
      //max-height: 100vh;
      svg {
        height: auto;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -12px;
        height: 20px;
        left: 0;
        width: 100%;
        background-color: #fff;
      }
    }
  }
  .title {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 50%;
    display: flex;
    align-items: center;
    transition: all .8s;
    //transform: translateY(30px);
    opacity: 0;
    h1 {
      font-size: 4rem;
      color: #fff;
      font-family: $titleFont;
      margin: 0;
    }
    &.visible {
      opacity: 1;
      //transform: translateY(0);
    }
  }
  .hiv-estimation {
    transform: translateY(-150px);
  }
}
</style>
