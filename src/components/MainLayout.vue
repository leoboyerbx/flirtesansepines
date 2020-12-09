<template>
  <section ref="slides" class="slides">
    <IntroductionSequence
        :current-state="stateOfSlide(0)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />
    <HIVDiscoverySequence
        :current-state="stateOfSlide(1)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-enter="endedTransition"
    />
    <TransitionSentenceSequence
        :current-state="stateOfSlide(2)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-enter="endedTransition"
    />

    <DeathNoticeSequence 
        :current-state="stateOfSlide(3)" 
        @next-slide="nextSlide" 
        @prev-slide="prevSlide"/>
    

    <ScreeningLateSequence
        :current-state="stateOfSlide(3)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />

    <CondomUsageSequence
        :current-state="stateOfSlide(4)"
        :transition-direction="transitionDirection"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />

    <FrequenceCondonUsageSequence
        :current-state="stateOfSlide(5)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />

    <ConclusionSequence 
        :current-state="stateOfSlide(7)" 
        @next-slide="nextSlide" 
        @prev-slide="prevSlide"/>

  </section>
</template>

<script>
import IntroductionSequence from "@/components/sequences/IntroductionSequence";
import HIVDiscoverySequence from "@/components/sequences/HIVDiscoverySequence";
import TransitionSentenceSequence from "@/components/sequences/TransitionSentenceSequence";
import DeathNoticeSequence from "@/components/sequences/DeathNoticeSequence";
import ScreeningLateSequence from "@/components/sequences/ScreeningLateSequence";
import ScreeningBehaviour from "@/components/sequences/ScreeningBehaviour";
import CondomUsageSequence from "@/components/sequences/CondomUsageSequence";
import FrequenceCondonUsageSequence from "@/components/sequences/FrequenceCondonUsageSequence";
import ConclusionSequence from "@/components/sequences/ConclusionSequence";


export default {
  name: 'MainLayout',
  components: {
    IntroductionSequence,
    HIVDiscoverySequence,
    TransitionSentenceSequence,
    DeathNoticeSequence,
    ScreeningLateSequence,
    CondomUsageSequence,
    FrequenceCondonUsageSequence,
    ConclusionSequence
  },
  data: () => ({
    currentSlide: 0,
    numberOfSlides: 20,
    transitionDirection: 1,
    isTransitioning: false
  }),
  created () {
    window.addEventListener('keydown', this.keyUp)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.keyUp)
  },
  computed: {
    // numberOfSlides () {
    //   return this.$refs.slides.querySelectorAll('.slide').length
    // }
  },
  methods: {
    stateOfSlide (slide) {
      if (slide < this.currentSlide) {
        return 'past'
      }
      if (slide === this.currentSlide) {
        return 'current'
      }
      if (slide > this.currentSlide) {
        return 'future'
      }
    },
    prevSlide (force = false) {
      if (force || !this.isTransitioning && this.currentSlide > 0) {
        this.currentSlide--
        this.transitionDirection = -1
        this.isTransitioning = true
      }
    },
    nextSlide (force = false) {
      if (force || !this.isTransitioning && this.currentSlide + 1 < this.numberOfSlides) {
        this.currentSlide++
        this.transitionDirection = 1
        this.isTransitioning = true
      }
    },
    keyUp (e) {
      if (e.key === 'ArrowRight') {
        this.nextSlide()
      }
      if (e.key === 'ArrowLeft') {
        this.prevSlide()
      }
    },
    endedTransition () {
      this.isTransitioning = false
    }
  }
}
</script>


<style scoped lang="scss">
</style>
