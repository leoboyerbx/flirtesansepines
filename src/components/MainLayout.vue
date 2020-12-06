<template>
  <section ref="slides" class="slides">
    <SecondSequence :current-state="stateOfSlide(0)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <ScreeningBehaviorsSequence :current-state="stateOfSlide(1)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <SevenSequence/>
    <SampleSlide :current-state="stateOfSlide(2)" @next-slide="nextSlide" @prev-slide="prevSlide" />
    <SecondSequence/>
    <SampleSlide />
  </section>
</template>

<script>
import SampleSlide from "@/components/slides/SampleSlide";
import SecondSequence from "@/components/slides/SecondSequence";
import ScreeningBehaviorsSequence from "@/components/slides/ScreeningBehaviorsSequence";
import SevenSequence from "@/components/slides/SevenSequence";
export default {
  name: 'MainLayout',
  components: {
    ScreeningBehaviorsSequence,
    SampleSlide,
    SecondSequence,
    SevenSequence
  },
  data: () => ({
    currentSlide: 0,
    numberOfSlides: 3
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
