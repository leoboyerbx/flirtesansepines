<template>
  <section
      ref="slides"
      class="slides"
      @wheel="wheelInertia"
  >
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
        :is-inertia="isInertia"
        @start-inertia="isInertia = true"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-enter="endedTransition"
    />
    <ScreeningBehaviorsSequence
        :current-state="stateOfSlide(3)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-enter="endedTransition"
    />


    <DeathNoticeSequence
        :current-state="stateOfSlide(4)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-enter="endedTransition"
    />

    <DeathTreatmentSequence
        :current-state="stateOfSlide(5)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />
    <ScreeningLateSequence
        :current-state="stateOfSlide(6)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />
    <FrequenceCondonUsageSequence
        :current-state="stateOfSlide(7)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />
    <CondomUsageSequence
        :current-state="stateOfSlide(8)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />
    <ConclusionSequence
        :current-state="stateOfSlide(9)"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
        @finished-transition="endedTransition"
    />
  </section>
</template>

<script>
import IntroductionSequence from "@/components/sequences/IntroductionSequence";
import HIVDiscoverySequence from "@/components/sequences/HIVDiscoverySequence";
import TransitionSentenceSequence from "@/components/sequences/TransitionSentenceSequence";
import DeathNoticeSequence from "@/components/sequences/DeathNoticeSequence";
import ScreeningLateSequence from "@/components/sequences/ScreeningLateSequence";
import DeathTreatmentSequence from "@/components/sequences/DeathTreatmentSequence";
import ScreeningBehaviorsSequence from "@/components/sequences/ScreeningBehaviorsSequence";
import CondomUsageSequence from "@/components/sequences/CondomUsageSequence";
import FrequenceCondonUsageSequence from "@/components/sequences/FrequenceCondonUsageSequence";
import ConclusionSequence from "@/components/sequences/ConclusionSequence";
import _debounce from "lodash.debounce";

export default {
  name: 'MainLayout',
  components: {
    DeathTreatmentSequence,
    ScreeningBehaviorsSequence,
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
    numberOfSlides: 10,
    transitionDirection: 1,
    isTransitioning: false,
    isInertia: true
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
    prevSlide (inertia = true) {
      if (!this.isTransitioning && !this.isInertia && this.currentSlide > 0) {
        this.currentSlide--
        this.transitionDirection = -1
        this.isTransitioning = true
        this.isInertia = inertia
      }
    },
    nextSlide (inertia = true) {
      if (!this.isTransitioning && !this.isInertia && this.currentSlide + 1 < this.numberOfSlides) {
        this.currentSlide++
        this.transitionDirection = 1
        this.isTransitioning = true
        this.isInertia = inertia
      }
    },
    keyUp (e) {
      if (e.key === 'ArrowRight') {
        this.nextSlide(true)
      }
      if (e.key === 'ArrowLeft') {
        this.prevSlide(true)
      }
    },
    endedTransition () {
      this.isTransitioning = false
    },
    wheelInertia () {
      this.debouncedInertia()
    },
    debouncedInertia: _debounce(function () {
      this.isInertia = false
    }, 500)
  }
}
</script>


<style scoped lang="scss">


</style>
