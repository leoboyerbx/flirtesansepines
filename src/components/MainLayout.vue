<template>
  <section ref="slides" class="slides">
    <IntroductionSequence :current-state="stateOfSlide(0)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <SeropositivyEstimationSequence :current-state="stateOfSlide(1)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <HIVDiscoverySequence :current-state="stateOfSlide(2)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <ScreeningBehaviorsSequence :current-state="stateOfSlide(3)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <ReasonsOfScreeningLowSequence :current-state="stateOfSlide(4)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <DeathTreatmentSequence :current-state="stateOfSlide(5)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <CondomUsageSequence :current-state="stateOfSlide(6)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <DetailsCondomUsageSequence :current-state="stateOfSlide(7)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <ConclusionSequence :current-state="stateOfSlide(8)" @next-slide="nextSlide" @prev-slide="prevSlide" />
  </section>
</template>

<script>
import IntroductionSequence from "@/components/slides/IntroductionSequence";
import DeathTreatmentSequence from "@/components/slides/DeathTreatmentSequence";
import ScreeningBehaviorsSequence from "@/components/slides/ScreeningBehaviorsSequence";
import SeropositivyEstimationSequence from "@/components/slides/SeropositivyEstimationSequence";
import ReasonsOfScreeningLowSequence from "@/components/slides/ReasonsOfScreeningLowSequence";
import ConclusionSequence from "@/components/slides/ConclusionSequence";
import HIVDiscoverySequence from "@/components/slides/HIVDiscoverySequence";
import CondomUsageSequence from "@/components/slides/CondomUsageSequence";
import DetailsCondomUsageSequence from "@/components/slides/DetailsCondomUsageSequence";

export default {
  name: 'MainLayout',
  components: {
    HIVDiscoverySequence,
    IntroductionSequence,
    SeropositivyEstimationSequence,
    ScreeningBehaviorsSequence,
    ReasonsOfScreeningLowSequence,
    DeathTreatmentSequence,
    CondomUsageSequence,
    DetailsCondomUsageSequence,
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
