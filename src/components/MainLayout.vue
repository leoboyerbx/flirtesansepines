<template>
  <section ref="slides" class="slides">
    <IntroductionSequence :current-state="stateOfSlide(0)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <HIVDiscoverySequence :current-state="stateOfSlide(1)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <TransitionSentenceSequence :current-state="stateOfSlide(2)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <DeathNoticeSequence :current-state="stateOfSlide(3)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <ScreeningLateSequence :current-state="stateOfSlide(4)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <CondomUsageSequence :current-state="stateOfSlide(5)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <FrequenceCondonUsageSequence :current-state="stateOfSlide(6)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <ConclusionSequence :current-state="stateOfSlide(7)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
  </section>
</template>

<script>
import IntroductionSequence from "@/components/sequences/IntroductionSequence";
import HIVDiscoverySequence from "@/components/sequences/HIVDiscoverySequence";
import TransitionSentenceSequence from "@/components/sequences/TransitionSentenceSequence";
import DeathNoticeSequence from "@/components/sequences/DeathNoticeSequence";
import ScreeningLateSequence from "@/components/sequences/ScreeningLateSequence";
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
    numberOfSlides: 20
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
    prevSlide () {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    nextSlide () {
      if (this.currentSlide + 1 < this.numberOfSlides) {
        this.currentSlide++
        console.log(this.currentSlide)

      }
    },
    keyUp (e) {
      if (e.key === 'ArrowRight') {
        this.nextSlide()
      }
      if (e.key === 'ArrowLeft') {
        this.prevSlide()
      }
    }
  }
}
</script>


<style scoped lang="scss">

</style>
