<template>
  <article
      @scroll="onScroll"
      @wheel="onWheel"
      class="experience-introduction"
      :class="[ currentState, { arriving } ]"
      :style="{ display: displayStyle }"
  >
    <section class="lottie-wrapper" :style="{ height: lottieWrapperHeight + 'px' }">
      <div class="sitcky-wrapper">
        <lottieAnimation
            class="intro-lottie"
            path="lottie/introAnim.json"
            :auto-play="false"
            :loop="false"
            @AnimControl="setAnimController"
            :speed="0.4"
            ref="lottie"
        />
        <div class="title" :class="{ visible: animationFinished }">
          <h1>Flirt sans épines</h1>
        </div>
      </div>
    </section>
    <HIVEstimation @confirm="confirmEstimation" class="hiv-estimation" />
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
    scrollFactor: 12,
    lottieFactor: 1,
    lottiePlaying: false,
    isScrollAnimating: false,
    animationFinished: false,
    lottieScrollHeight: 3000,
    lottieHeight: 0,
    animationEndedScrollOffset: 100,
    locked: true,
    displayStyle: 'block',
    arriving: false
  }),
  mounted () {
    window.addEventListener('resize', this.onResize.bind(this))
    this.$el.addEventListener('transitionend', this.onTransitionEnd)
    this.$el.addEventListener('animationend', this.onAnimationEnd)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this))
  },
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  watch: {
    currentState (newVal) {
      if (newVal === 'current') {
        this.displayStyle = 'block'
        this.arriving = true
      }
    }
  },
  computed: {
    totalFrames () {
      return this.anim.totalFrames || 0
    },
    lottieWrapperHeight () {
      return this.lottieHeight + this.currentLottieScrollHeight
    },
    currentLottieScrollHeight () {
      return this.animationFinished ? 0 : this.lottieScrollHeight
    },
  },
  methods: {
    onTransitionEnd (e) {
      if (e.currentTarget === this.$el && this.currentState === 'past') {
        this.displayStyle = 'none'
      }
    },
    onAnimationEnd (e) {
      if (e.currentTarget === this.$el && this.currentState === 'current') {
        this.arriving = false
      }
    },
    onScroll () {
      const progress = this.$el.scrollTop / (this.lottieScrollHeight - this.animationEndedScrollOffset)

      if (!this.animationFinished ) {
        if (progress < 1) {
          this.handleScrollLottie(progress)

        } else {
          this.animationFinished = true
          this.$el.scrollTop = 0
        }
      }
    },
    onWheel (e) {
      if (!this.locked && e.deltaY > 0 && this.$el.scrollTop === (this.$el.scrollHeight - this.$el.offsetHeight))  {
        this.$emit('next-slide')
      }
    },
    onResize () {
      if (this.$refs.lottie) {
        this.lottieHeight = this.$refs.lottie.$el.offsetHeight
      }
      // this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    },
    handleScrollLottie (progress) {
      if (this.anim) {
        this.anim.goToAndStop(progress * this.totalFrames, true)
      }

    },
    confirmEstimation () {
      this.$emit('next-slide')
    },
    setAnimController (anim) {
      this.anim = anim
      window.anim = anim
      this.anim.addEventListener('complete', () => {
        this.animationFinished = true
        this.$el.scrollTop = 0
      })
      this.onResize()
      // window.setInterval(() => {
      //   console.log(this.anim.currentFrame)
      // }, 10)
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
  height: 100vh;
  transition: all .6s;
  overflow-y: scroll;
  scrollbar-width: none;
  &.past {
    transform: translate3d(0, -100vh, 0);
  }

  &.arriving {
    animation: arriving .6s;
    @keyframes arriving {
      from {
        transform: translate3d(0, -100vh, 0);
      }
    }
  }
  .lottie-wrapper {
    width: 100%;
    //background-color: $themeRed;

    .sitcky-wrapper {
      position: sticky;
      top: 0;
    }
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
        bottom: -10px;
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
    //transform: translateY(-150px);
  }
}
</style>
