<template>
  <section ref="slides" class="slides">
    <IntroductionSequence :current-state="stateOfSlide(0)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <SeropositivyEstimationSequence :current-state="stateOfSlide(1)" @next-slide="nextSlide" @prev-slide="prevSlide"/>
    <ScreeningBehaviorsSequence :current-state="stateOfSlide(2)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <ReasonsOfScreeningLowSequence :current-state="stateOfSlide(3)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <SevenSequence :current-state="stateOfSlide(4)" @next-slide="nextSlide" @prev-slide="prevSlide" />
  </section>
</template>

<script>
import IntroductionSequence from "@/components/slides/IntroductionSequence";
import SevenSequence from "@/components/slides/SevenSequence";
import ScreeningBehaviorsSequence from "@/components/slides/ScreeningBehaviorsSequence";
import SeropositivyEstimationSequence from "@/components/slides/SeropositivyEstimationSequence";
import ReasonsOfScreeningLowSequence from "@/components/slides/ReasonsOfScreeningLowSequence";
export default {
  name: 'MainLayout',
  components: {
    IntroductionSequence,
    SeropositivyEstimationSequence,
    ScreeningBehaviorsSequence,
    ReasonsOfScreeningLowSequence,
    SevenSequence
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
